import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Shield, Volume2, BookOpen, BarChart2, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Sparkles,
    title: "Know Your Body Explorer",
    description: "Tap any of 15 body regions on our interactive anatomical map to discover 3 targeted yoga asanas per region.",
    link: "/explore",
  },
  {
    icon: Volume2,
    title: "Step-by-Step Voice Guidance",
    description: "Follow along with male, female, or kid-friendly voices guiding you through each asana step-by-step.",
    link: "/search",
  },
  {
    icon: BookOpen,
    title: "My Routines",
    description: "Build personalized yoga sequences from 45 asanas and set weekly schedules to stay consistent.",
    link: "/routines",
  },
  {
    icon: Bell,
    title: "Automated Reminders",
    description: "Get in-app notifications at your scheduled practice times so you never miss a session.",
    link: "/routines",
  },
  {
    icon: BarChart2,
    title: "Track Your Progress",
    description: "Log sessions, track total minutes practiced, and visualize your consistency with weekly charts.",
    link: "/progress",
  },
  {
    icon: Shield,
    title: "Safe & Informed Practice",
    description: "Every asana includes benefits, precautions, difficulty levels, and cited sources for trusted guidance.",
    link: "/disclaimers",
  },
];

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/40 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-16 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 text-xs text-muted-foreground bg-accent px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
              45 yoga asanas across 15 body regions
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              Yoga Asana
              <br />
              <span className="text-primary">Guide</span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Explore 45 yoga asanas by body region, follow voice-guided step-by-step instructions, build personalized routines, and track your daily practice — all in one place.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/explore">
                <Button size="lg" className="rounded-full gap-2 px-8 h-12 text-sm font-medium">
                  Know Your Body Explorer <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/routines">
                <Button variant="outline" size="lg" className="rounded-full px-8 h-12 text-sm font-medium">
                  My Routines
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.07, duration: 0.5 }}
              >
                <Link to={feature.link} className="block h-full p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-sm transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-heading text-base font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary/5 border-t border-border/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center">
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold mb-3">
            Begin Your Yoga Journey Today
          </h2>
          <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
            Explore by body region, create your routine, and track your progress — everything you need for a consistent, informed yoga practice.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/explore">
              <Button className="rounded-full gap-2 px-8 h-11">
                Know Your Body Explorer <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/progress">
              <Button variant="outline" className="rounded-full gap-2 px-8 h-11">
                Track Progress
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}