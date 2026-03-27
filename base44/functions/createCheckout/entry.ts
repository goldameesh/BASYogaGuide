import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';
import Stripe from 'npm:stripe@14.21.0';

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY"));

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { discount_percent, user_email } = await req.json();

    const PRICE_ID = "price_1TFWYWIkBLsG0c9Y30KBWypO"; // $0.99 lifetime

    // Calculate final amount after discount
    let unitAmount = 99; // cents
    if (discount_percent && discount_percent > 0 && discount_percent <= 100) {
      unitAmount = Math.round(99 * (1 - discount_percent / 100));
      if (unitAmount < 1) unitAmount = 1;
    }

    const sessionParams = {
      payment_method_types: ["card"],
      line_items: [{
        price_data: {
          currency: "usd",
          product: "prod_UDyVBzdgrgsOKV",
          unit_amount: unitAmount,
        },
        quantity: 1,
      }],
      mode: "payment",
      success_url: `${req.headers.get("origin") || "https://app.base44.com"}/subscribe?success=true`,
      cancel_url: `${req.headers.get("origin") || "https://app.base44.com"}/subscribe?canceled=true`,
      metadata: {
        base44_app_id: Deno.env.get("BASE44_APP_ID"),
        user_email: user_email || "",
        discount_applied: discount_percent ? String(discount_percent) : "0",
      },
    };

    if (user_email) {
      sessionParams.customer_email = user_email;
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    return Response.json({ url: session.url, session_id: session.id });
  } catch (error) {
    console.error("Checkout error:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});