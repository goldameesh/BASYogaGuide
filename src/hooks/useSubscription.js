import { useState, useEffect, createContext, useContext } from "react";
import { base44 } from "@/api/base44Client";

export const SubscriptionContext = createContext(null);

export function useSubscription() {
  return useContext(SubscriptionContext);
}

export function useSubscriptionProvider() {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | trial | trial_expired | premium
  const [daysLeft, setDaysLeft] = useState(null);

  useEffect(() => {
    base44.auth.me().then(async (me) => {
      if (!me) { setStatus("trial"); return; }

      // First time user — seed trial dates
      if (!me.trial_started_at) {
        const now = new Date();
        const trialEnd = new Date(now);
        trialEnd.setDate(trialEnd.getDate() + 7);
        await base44.auth.updateMe({
          trial_started_at: now.toISOString(),
          trial_ends_at: trialEnd.toISOString(),
        });
        me.trial_started_at = now.toISOString();
        me.trial_ends_at = trialEnd.toISOString();
      }

      setUser(me);

      if (me.is_premium) {
        setStatus("premium");
        setDaysLeft(null);
        return;
      }

      const trialEnd = me.trial_ends_at ? new Date(me.trial_ends_at) : null;
      if (!trialEnd) {
        setStatus("trial_expired");
        return;
      }

      const now = new Date();
      const diff = Math.ceil((trialEnd - now) / (1000 * 60 * 60 * 24));
      if (diff > 0) {
        setStatus("trial");
        setDaysLeft(diff);
      } else {
        setStatus("trial_expired");
        setDaysLeft(0);
      }
    }).catch(() => {
      setStatus("trial");
    });
  }, []);

  const isPremium = status === "premium";
  const isTrialActive = status === "trial";
  const isExpired = status === "trial_expired";
  const hasAccess = isPremium || isTrialActive;

  return { user, status, daysLeft, isPremium, isTrialActive, isExpired, hasAccess };
}