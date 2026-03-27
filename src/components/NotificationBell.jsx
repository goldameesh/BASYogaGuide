import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export default function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    base44.auth.me().then(user => {
      if (!user) return;
      setUserEmail(user.email);
      loadNotifications(user.email);
    }).catch(() => {});
  }, []);

  const loadNotifications = async (email) => {
    const data = await base44.entities.Notification.filter({ user_email: email }, "-created_date", 20);
    setNotifications(data);
  };

  const markAllRead = async () => {
    const unread = notifications.filter(n => !n.is_read);
    await Promise.all(unread.map(n => base44.entities.Notification.update(n.id, { is_read: true })));
    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  if (!userEmail) return null;

  return (
    <div className="relative">
      <button
        onClick={() => { setOpen(!open); if (!open && unreadCount > 0) markAllRead(); }}
        className="relative p-2 rounded-lg hover:bg-accent transition-colors"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-primary-foreground text-[9px] font-bold rounded-full flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 w-80 bg-card border border-border/60 rounded-2xl shadow-xl z-50 overflow-hidden"
            >
              <div className="px-4 py-3 border-b border-border/40 flex items-center justify-between">
                <h3 className="text-sm font-semibold">Notifications</h3>
                {notifications.length > 0 && (
                  <button onClick={markAllRead} className="text-xs text-primary hover:underline">Mark all read</button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="text-xs text-muted-foreground text-center py-8">No notifications yet</p>
                ) : (
                  notifications.map(n => (
                    <div key={n.id} className={`px-4 py-3 border-b border-border/30 last:border-0 ${!n.is_read ? "bg-primary/5" : ""}`}>
                      <div className="flex items-start gap-2.5">
                        <span className="text-base mt-0.5">🌿</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-foreground leading-snug">{n.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{n.message}</p>
                          <Link
                            to="/explore"
                            onClick={() => setOpen(false)}
                            className="text-[10px] text-primary font-medium mt-1 inline-block hover:underline"
                          >
                            Open Body Map →
                          </Link>
                        </div>
                        {!n.is_read && <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1" />}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}