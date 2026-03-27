import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';
import Stripe from 'npm:stripe@14.21.0';

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY"));

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.text();
    const sig = req.headers.get("stripe-signature");
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");

    let event;
    if (webhookSecret && sig) {
      event = await stripe.webhooks.constructEventAsync(body, sig, webhookSecret);
    } else {
      event = JSON.parse(body);
      console.warn("No webhook secret configured — skipping signature verification");
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const userEmail = session.metadata?.user_email || session.customer_email;
      const discountApplied = parseFloat(session.metadata?.discount_applied || "0");

      console.log(`Payment success for: ${userEmail}, discount: ${discountApplied}%`);

      if (userEmail) {
        const users = await base44.asServiceRole.entities.User.filter({ email: userEmail });
        if (users.length > 0) {
          await base44.asServiceRole.entities.User.update(users[0].id, {
            is_premium: true,
            stripe_customer_id: session.customer || "",
            stripe_payment_intent_id: session.payment_intent || "",
            discount_applied: discountApplied || 0,
          });
          console.log(`Upgraded user ${userEmail} to premium`);

          // Send welcome notification
          await base44.asServiceRole.entities.Notification.create({
            user_email: userEmail,
            title: "🎉 Lifetime Access Unlocked!",
            message: "Thank you for your purchase! You now have lifetime access to Yoga Asana Guide. Enjoy your practice!",
            type: "info",
            is_read: false,
          });
        }
      }
    }

    return Response.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error.message);
    return Response.json({ error: error.message }, { status: 400 });
  }
});