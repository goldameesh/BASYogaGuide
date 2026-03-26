import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Shield, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Sparkles,
    title: "15 Body Regions",
    description: "Tap any body part on our interactive anatomical map to discover targeted yoga asanas.",
  },
  {
    icon: Volume2,
    title: "Voice Guidance",
    description: "Listen to instructions in male, female, or kid-friendly voices for hands-free practice.",
  },
  {
    icon: Shield,
    title: "Safe Practice",
    description: "Each asana includes benefits, precautions, and difficulty levels for informed practice.",
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
              Discover yoga asanas that target specific body regions. Each asana includes detailed descriptions,
              voice-guided instructions, and trusted health information.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/explore">
                <Button size="lg" className="rounded-full gap-2 px-8 h-12 text-sm font-medium">
                  Explore Body Map <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/faqs">
                <Button variant="outline" size="lg" className="rounded-full px-8 h-12 text-sm font-medium">
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/20 transition-colors duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary/5 border-t border-border/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center">
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold mb-3">
            Begin Your Yoga Journey
          </h2>
          <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
            Click on any body part to discover targeted yoga asanas with voice-guided instructions.
          </p>
          <Link to="/explore">
            <Button className="rounded-full gap-2 px-8 h-11">
              Open Body Map <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}