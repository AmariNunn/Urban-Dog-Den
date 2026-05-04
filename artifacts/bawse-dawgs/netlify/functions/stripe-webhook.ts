import Stripe from "stripe";
import type { Handler } from "@netlify/functions";

const handler: Handler = async (event) => {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!secretKey) {
    return { statusCode: 500, body: JSON.stringify({ error: "Stripe not configured" }) };
  }

  const stripe = new Stripe(secretKey);
  const sig = event.headers["stripe-signature"];

  if (!sig || !webhookSecret) {
    console.warn("Missing stripe-signature or STRIPE_WEBHOOK_SECRET — skipping verification");
    return { statusCode: 400, body: JSON.stringify({ error: "Missing signature or webhook secret" }) };
  }

  let stripeEvent: Stripe.Event;

  try {
    stripeEvent = stripe.webhooks.constructEvent(event.body || "", sig, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Webhook error";
    return { statusCode: 400, body: JSON.stringify({ error: `Webhook Error: ${message}` }) };
  }

  switch (stripeEvent.type) {
    case "checkout.session.completed": {
      const session = stripeEvent.data.object as Stripe.Checkout.Session;
      console.log("Order paid:", session.id, "Type:", session.metadata?.orderType);
      break;
    }
    case "payment_intent.payment_failed": {
      const intent = stripeEvent.data.object as Stripe.PaymentIntent;
      console.log("Payment failed:", intent.id);
      break;
    }
    default:
      break;
  }

  return { statusCode: 200, body: JSON.stringify({ received: true }) };
};

export { handler };
