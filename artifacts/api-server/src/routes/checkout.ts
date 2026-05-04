import { Router } from "express";
import Stripe from "stripe";

const MENU_PRICES: Record<string, { name: string; price: number }> = {
  bawse:       { name: "Bawse Dawg",              price: 13 },
  dirty:       { name: "Dirty South Dawg",         price: 12 },
  elote:       { name: "Elote Dawg",               price: 12 },
  nash:        { name: "Nash Dawg",                price: 12 },
  nacho:       { name: "Nacho Dawg",               price: 11 },
  plain:       { name: "Plain Jane",               price:  9 },
  big:         { name: "Big Dawg",                 price: 11 },
  demi:        { name: "Demi Dawg",                price: 11 },
  walking:     { name: "Walking Dawg",             price: 12 },
  byo:         { name: "Base Dawg",                price: 10 },
  bawse_fries: { name: "Bawse Fries",              price: 10 },
  elote_fries: { name: "Elote Fries",              price:  9 },
  dirty_fries: { name: "Dirty Fries",              price:  9 },
  nacho_fries: { name: "Nacho Fries",              price:  9 },
  big_fries:   { name: "Big Fries",                price:  8 },
  chips:       { name: "Chips",                    price:  3 },
  fries:       { name: "Fries",                    price:  5 },
  elote_cup:   { name: "Elote Cup",                price:  5 },
  water:       { name: "Water",                    price:  3 },
  soda:        { name: "Soda",                     price:  4 },
  lemonade:    { name: "Lemonade",                 price:  5 },
  fruit_tea:   { name: "Fruit Tea",                price:  5 },
  pie:         { name: "Mini Sweet Potato Pie",    price:  5 },
  brownie:     { name: "Brownie",                  price:  5 },
};

const router = Router();

router.post("/checkout", async (req, res) => {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    res.status(500).json({ error: "Stripe not configured" });
    return;
  }

  const { items, orderType } = req.body as {
    items: Array<{ id: string; quantity: number; instructions?: string; options?: string[] }>;
    orderType: "pickup" | "delivery";
  };

  if (!items || items.length === 0) {
    res.status(400).json({ error: "No items in cart" });
    return;
  }

  try {
    const stripe = new Stripe(secretKey);
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    for (const item of items) {
      const menuItem = MENU_PRICES[item.id];
      if (!menuItem) {
        res.status(400).json({ error: `Unknown item: ${item.id}` });
        return;
      }

      const parts: string[] = [];
      if (item.options && item.options.length > 0) parts.push(...item.options);
      if (item.instructions) parts.push(`Note: ${item.instructions}`);
      const description = parts.length > 0 ? parts.join(" · ") : undefined;

      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: menuItem.name,
            ...(description ? { description } : {}),
          },
          unit_amount: Math.round(menuItem.price * 100),
        },
        quantity: item.quantity,
      });
    }

    const subtotal = items.reduce((sum, item) => {
      const menuItem = MENU_PRICES[item.id];
      return sum + (menuItem ? menuItem.price * item.quantity : 0);
    }, 0);

    const taxAmount = Math.round(subtotal * 0.08 * 100);
    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: { name: "Tax (8%)" },
        unit_amount: taxAmount,
      },
      quantity: 1,
    });

    if (orderType === "delivery") {
      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: { name: "Delivery Fee" },
          unit_amount: 499,
        },
        quantity: 1,
      });
    }

    const origin = (req.headers["origin"] as string) || `http://localhost:${process.env.PORT || 8080}`;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${origin}/order/success?session_id={CHECKOUT_SESSION_ID}&order_type=${orderType}`,
      cancel_url: `${origin}/order`,
      metadata: { orderType },
    });

    res.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: message });
  }
});

export default router;
