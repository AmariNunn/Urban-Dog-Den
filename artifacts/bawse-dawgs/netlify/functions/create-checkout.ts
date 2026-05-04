import Stripe from "stripe";
import type { Handler } from "@netlify/functions";
import { MENU_PRICES } from "./menuPrices";

interface CartItem {
  id: string;
  quantity: number;
  instructions?: string;
  options?: string[];
}

const handler: Handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: "Stripe not configured" }) };
  }

  try {
    const { items, orderType } = JSON.parse(event.body || "{}") as {
      items: CartItem[];
      orderType: "pickup" | "delivery";
    };

    if (!items || items.length === 0) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "No items in cart" }) };
    }

    const stripe = new Stripe(secretKey);

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    for (const item of items) {
      const menuItem = MENU_PRICES[item.id];
      if (!menuItem) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: `Unknown item: ${item.id}` }),
        };
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

    const origin = event.headers["origin"] || event.headers["referer"]?.replace(/\/$/, "") || "http://localhost:3000";
    const siteUrl = process.env.URL || origin;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${siteUrl}/order/success?session_id={CHECKOUT_SESSION_ID}&order_type=${orderType}`,
      cancel_url: `${siteUrl}/order`,
      metadata: { orderType },
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ url: session.url }),
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Checkout error:", message);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: message }),
    };
  }
};

export { handler };
