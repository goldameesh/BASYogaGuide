import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);

  // Allow scheduled/service-role calls (no user auth required for automation)
  const users = await base44.asServiceRole.entities.User.list();

  const results = [];

  for (const user of users) {
    if (!user.email) continue;

    const firstName = user.full_name ? user.full_name.split(" ")[0] : "there";

    const body = `
Hi ${firstName},

We hope you're doing well. 🌿

Life can get busy — and it's easy to forget to pause and check in with yourself. That's exactly why we built the <strong>Yoga Asana Guide</strong>: to be your personal wellness companion, available whenever you need it.

<strong>How are you feeling today?</strong>

Whether you're experiencing tension in your shoulders, fatigue in your legs, stress in your mind, or simply want to energise your body — our interactive body map helps you discover the perfect yoga asanas tailored to how you feel <em>right now</em>.

Here's what you can explore:
<ul>
  <li>🗺️ <strong>15 body regions</strong> — tap any area to find targeted asanas</li>
  <li>🎙️ <strong>Voice-guided instructions</strong> — hands-free, calm, and easy to follow</li>
  <li>📚 <strong>Trusted sources</strong> — every asana is backed by credible yoga literature</li>
  <li>🎥 <strong>Video demonstrations</strong> — watch on YouTube for visual guidance</li>
</ul>

You deserve a few mindful minutes today. Let your body guide you.

<a href="https://app.bhramaastraadvisory.com/explore" style="background:#4a7c6b;color:#fff;padding:10px 24px;border-radius:24px;text-decoration:none;font-weight:600;display:inline-block;margin-top:8px;">Open Your Body Map →</a>

With warmth,<br/>
<strong>The BAS Intelligence Team</strong><br/>
Bhramaastra Advisory Services<br/>
<a href="https://bhramaastraadvisory.com">bhramaastraadvisory.com</a> | <a href="mailto:connect@bhramaastraadvisory.com">connect@bhramaastraadvisory.com</a>

<hr/>
<small>© 2026 Bhramaastra Advisory Services. All rights reserved.<br/>
Researched, Designed and Built by Amish Shah — Owner & Founder, Bhramaastra Advisory Services.</small>
    `.trim();

    try {
      await base44.asServiceRole.integrations.Core.SendEmail({
        to: user.email,
        subject: "How are you feeling today? 🌿 Your yoga companion is here",
        body,
      });
      results.push({ email: user.email, status: "sent" });
    } catch (err) {
      results.push({ email: user.email, status: "failed", error: err.message });
    }
  }

  return Response.json({ sent: results.filter(r => r.status === "sent").length, results });
});