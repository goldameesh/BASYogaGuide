import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);

  const now = new Date();
  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const todayName = days[now.getUTCDay()];
  const currentHour = now.getUTCHours().toString().padStart(2, "0");
  const currentMinute = now.getUTCMinutes().toString().padStart(2, "0");
  const currentTime = `${currentHour}:${currentMinute}`;

  const routines = await base44.asServiceRole.entities.Routine.filter({ is_active: true });

  const reminders = [];
  for (const routine of routines) {
    if (!routine.schedule_days || !routine.schedule_days.includes(todayName)) continue;
    if (!routine.schedule_time) continue;
    // Match within a 5-minute window
    const [rh, rm] = routine.schedule_time.split(":").map(Number);
    const routineMinutes = rh * 60 + rm;
    const nowMinutes = now.getUTCHours() * 60 + now.getUTCMinutes();
    if (Math.abs(routineMinutes - nowMinutes) > 5) continue;

    reminders.push({
      user_email: routine.user_email,
      title: `Time for your "${routine.name}" routine! 🧘`,
      message: `Your scheduled yoga routine "${routine.name}" is ready. It includes ${routine.asanas?.length || 0} asana${routine.asanas?.length !== 1 ? "s" : ""}. Open the app to begin your practice.`,
      is_read: false,
      type: "reminder",
    });
  }

  if (reminders.length > 0) {
    await base44.asServiceRole.entities.Notification.bulkCreate(reminders);
  }

  return Response.json({ sent: reminders.length });
});