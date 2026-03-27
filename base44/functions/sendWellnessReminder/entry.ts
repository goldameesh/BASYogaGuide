import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);

  const users = await base44.asServiceRole.entities.User.list();

  const notifications = users
    .filter(u => u.email)
    .map(u => ({
      user_email: u.email,
      title: "How are you feeling today? 🌿",
      message: "Your body deserves a mindful moment. Open the Body Map Explorer to discover yoga asanas perfectly suited to how you feel right now — whether you need to release tension, restore energy, or simply find calm.",
      is_read: false,
      type: "wellness",
    }));

  await base44.asServiceRole.entities.Notification.bulkCreate(notifications);

  return Response.json({ created: notifications.length });
});