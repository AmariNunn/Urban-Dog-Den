import { Router } from "express";
import Stripe from "stripe";

const router = Router();

router.post("/checkout", async (req, res) => {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    res.status(500).json({ error: "Stripe not configured" });
    return;
  }

  const { items, orderType } = req.body as {
    items: Array<{ name: string; price: number; quantity: number; instructions?: string; options?: string[] }>;
    orderType: "pickup" | "delivery";
  };

  if (!items || items.length === 0) {
    res.status(400).json({ error: "No items in cart" });
    return;
  }

  try {
    const stripe = new Stripe(secretKey);

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map((item) => {
      const parts: string[] = [];
      if (item.options && item.options.length > 0) parts.push(...item.options);
      if (item.instructions) parts.push(`Note: ${item.instructions}`);
      const description = parts.length > 0 ? parts.join(" · ") : undefined;

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            ...(description ? { description } : {}),
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      };
    });

    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
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
