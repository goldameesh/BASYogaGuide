import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

/**
 * Admin-only backend function to manage user subscriptions.
 * 
 * Actions:
 *   extend_trial  — extend a user's trial by N days (or set a specific end date)
 *   grant_premium — grant free premium/lifetime access to a user
 *   revoke_premium — revoke premium access
 *   set_discount  — store a discount % for the user (used in checkout)
 *   get_users     — list all users with subscription info
 * 
 * Payload examples:
 *   { action: "extend_trial",  user_email: "x@y.com", days: 30 }
 *   { action: "extend_trial",  user_email: "x@y.com", until: "2026-12-31" }
 *   { action: "grant_premium", user_email: "x@y.com", notes: "influencer promo" }
 *   { action: "revoke_premium",user_email: "x@y.com" }
 *   { action: "set_discount",  user_email: "x@y.com", discount_percent: 50 }
 *   { action: "get_users" }
 */
Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    // Admin guard
    const user = await base44.auth.me();
    if (user?.role !== 'admin') {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const { action, user_email, days, until, discount_percent, notes } = await req.json();

    if (action === "get_users") {
      const users = await base44.asServiceRole.entities.User.list("-created_date", 100);
      const summary = users.map(u => ({
        id: u.id,
        email: u.email,
        full_name: u.full_name,
        is_premium: u.is_premium || false,
        trial_started_at: u.trial_started_at || null,
        trial_ends_at: u.trial_ends_at || null,
        discount_applied: u.discount_applied || 0,
        notes: u.notes || "",
        created_date: u.created_date,
      }));
      return Response.json({ users: summary, total: summary.length });
    }

    if (!user_email) {
      return Response.json({ error: "user_email is required" }, { status: 400 });
    }

    const users = await base44.asServiceRole.entities.User.filter({ email: user_email });
    if (users.length === 0) {
      return Response.json({ error: `User not found: ${user_email}` }, { status: 404 });
    }
    const targetUser = users[0];

    if (action === "extend_trial") {
      let newEndDate;
      if (until) {
        newEndDate = new Date(until).toISOString();
      } else if (days) {
        const base = targetUser.trial_ends_at
          ? new Date(targetUser.trial_ends_at)
          : new Date();
        // If trial already expired, extend from today
        if (base < new Date()) {
          base.setTime(new Date().getTime());
        }
        base.setDate(base.getDate() + Number(days));
        newEndDate = base.toISOString();
      } else {
        return Response.json({ error: "Provide 'days' or 'until'" }, { status: 400 });
      }

      await base44.asServiceRole.entities.User.update(targetUser.id, {
        trial_ends_at: newEndDate,
        is_premium: false,
        notes: notes || targetUser.notes || "",
      });

      console.log(`Trial extended for ${user_email} until ${newEndDate}`);
      return Response.json({ success: true, user_email, trial_ends_at: newEndDate });
    }

    if (action === "grant_premium") {
      await base44.asServiceRole.entities.User.update(targetUser.id, {
        is_premium: true,
        notes: notes || targetUser.notes || "Manual grant by admin",
      });

      // Notify user
      await base44.asServiceRole.entities.Notification.create({
        user_email,
        title: "🎁 Lifetime Access Granted!",
        message: "Great news! You've been granted lifetime access to Yoga Asana Guide. Enjoy all features, on us!",
        type: "info",
        is_read: false,
      });

      console.log(`Premium granted to ${user_email}`);
      return Response.json({ success: true, user_email, is_premium: true });
    }

    if (action === "revoke_premium") {
      const now = new Date();
      const trialEnd = new Date(now);
      trialEnd.setDate(trialEnd.getDate() + 7); // give 7-day grace
      await base44.asServiceRole.entities.User.update(targetUser.id, {
        is_premium: false,
        trial_ends_at: trialEnd.toISOString(),
        notes: notes || targetUser.notes || "Revoked by admin",
      });
      console.log(`Premium revoked for ${user_email}`);
      return Response.json({ success: true, user_email, is_premium: false, grace_until: trialEnd.toISOString() });
    }

    if (action === "set_discount") {
      if (discount_percent === undefined || discount_percent < 0 || discount_percent > 100) {
        return Response.json({ error: "discount_percent must be 0–100" }, { status: 400 });
      }
      await base44.asServiceRole.entities.User.update(targetUser.id, {
        discount_applied: discount_percent,
        notes: notes || targetUser.notes || `Discount set: ${discount_percent}%`,
      });
      console.log(`Discount ${discount_percent}% set for ${user_email}`);
      return Response.json({ success: true, user_email, discount_applied: discount_percent });
    }

    return Response.json({ error: `Unknown action: ${action}` }, { status: 400 });

  } catch (error) {
    console.error("adminManageSubscription error:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});