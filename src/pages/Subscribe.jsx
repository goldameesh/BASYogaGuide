import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, Lock, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { base44 } from "@/api/base44Client";
import { useSubscription } from "@/hooks/useSubscription";

const FEATURES = [
  "Interactive body map — 15 regions, 45 asanas",
  "Step-by-step voice-guided practice",
  "Build unlimited custom routines",
  "Automated daily reminders",
  "Progress tracking & 7-day charts",
  "Research-curated routine library",
  "New asanas added regularly",
  "Lifetime access — pay once, never again",
];

export default function Subscribe() {
  const { user, status, daysLeft, isPremium } = useSubscription();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle redirect back from Stripe
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("success") === "true") {
      setMessage("🎉 Payment successful! Your lifetime access is now active.");
    } else if (params.get("canceled") === "true") {
      setMessage("Payment canceled. Your trial continues.");
    }
  }, []);

  const handleCheckout = async () => {
    // Block if running inside an iframe (preview mode)
    if (window.self !== window.top) {
      alert("Checkout only works from the published app, not the preview.");
      return;
    }
    setLoading(true);
    const res = await base44.functions.invoke("createCheckout", {
      user_email: user?.email || "",
      discount_percent: user?.discount_applied || 0,
    });
    if (res.data?.url) {
      window.location.href = res.data.url;
    } else {
      setLoading(false);
    }
  };

  if (isPremium) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-heading text-3xl font-bold mb-2">You're All Set!</h1>
          <p className="text-sm text-muted-foreground">You have lifetime access to Yoga Asana Guide. Enjoy your practice!</p>
        </motion.div>
      </div>
    );
  }

  const displayPrice = user?.discount_applied > 0
    ? (0.99 * (1 - user.discount_applied / 100)).toFixed(2)
    : "0.99";

  const isDiscounted = user?.discount_applied > 0;

  return (
    <div className="max-w-lg mx-auto px-4 sm:px-6 py-12 pb-24">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>

        {/* Trial / expiry badge */}
        {status === "trial" && daysLeft !== null && (
          <div className="mb-6 text-center">
            <span className="inline-flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-full bg-amber-100 text-amber-700 border border-amber-200">
              <Star className="w-3.5 h-3.5" />
              Free trial · {daysLeft} day{daysLeft !== 1 ? "s" : ""} remaining
            </span>
          </div>
        )}
        {status === "trial_expired" && (
          <div className="mb-6 text-center">
            <span className="inline-flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-full bg-destructive/10 text-destructive border border-destructive/20">
              <Lock className="w-3.5 h-3.5" />
              Your free trial has ended
            </span>
          </div>
        )}

        {/* Message (post-checkout redirect) */}
        {message && (
          <div className="mb-6 p-4 rounded-xl bg-primary/5 border border-primary/20 text-sm text-center text-primary font-medium">
            {message}
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-heading text-4xl font-bold mb-3">
            Unlock Lifetime Access
          </h1>
          <p className="text-muted-foreground text-sm max-w-sm mx-auto leading-relaxed">
            Try completely free for 7 days. Love it? Get lifetime access for a one-time payment — no subscriptions, no renewals, ever.
          </p>
        </div>

        {/* Pricing card */}
        <div className="rounded-2xl border-2 border-primary bg-card shadow-sm overflow-hidden mb-6">
          <div className="bg-primary/5 px-6 py-4 border-b border-primary/20 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-primary uppercase tracking-wider">Lifetime Access</p>
              <p className="font-heading text-sm font-semibold mt-0.5">One-time payment · Keep forever</p>
            </div>
            <div className="text-right">
              {isDiscounted && (
                <p className="text-xs text-muted-foreground line-through">$0.99</p>
              )}
              <p className="font-heading text-3xl font-bold text-primary">${displayPrice}</p>
              {isDiscounted && (
                <p className="text-[10px] text-primary font-medium">{user.discount_applied}% off applied</p>
              )}
            </div>
          </div>
          <div className="px-6 py-5 space-y-3">
            {FEATURES.map((f, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-2.5 h-2.5 text-primary" />
                </div>
                <p className="text-sm text-foreground/80">{f}</p>
              </div>
            ))}
          </div>
          <div className="px-6 pb-6">
            <Button
              onClick={handleCheckout}
              disabled={loading || isPremium}
              className="w-full h-12 rounded-xl text-sm font-medium gap-2"
            >
              {loading ? "Redirecting to checkout…" : `Get Lifetime Access · $${displayPrice}`}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </Button>
            <p className="text-[11px] text-muted-foreground text-center mt-3">
              Secure checkout via Stripe · 30-day money back guarantee
            </p>
          </div>
        </div>

        {/* Free trial note */}
        <div className="text-center space-y-1">
          <p className="text-xs text-muted-foreground">
            ✨ <strong>7-day free trial</strong> — no credit card required to start
          </p>
          <p className="text-xs text-muted-foreground">
            💛 Built with love by{" "}
            <a href="https://bhramaastraadvisory.com" target="_blank" rel="noopener noreferrer" className="underline">
              Bhramaastra Advisory Services
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}