import { motion } from "framer-motion";
import { AlertTriangle, Shield, Heart, Scale } from "lucide-react";

const sections = [
  {
    icon: AlertTriangle,
    title: "Educational Purpose Only",
    content:
      "This application provides yoga information for educational purposes only. The content is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.",
  },
  {
    icon: Shield,
    title: "Not Medical Advice",
    content:
      "The yoga asanas, descriptions, benefits, and precautions presented in this app do not constitute medical advice. They are general guidelines based on traditional yoga practices. Individual results may vary, and what works for one person may not be suitable for another. Never disregard professional medical advice or delay in seeking it because of something you have read in this app.",
  },
  {
    icon: Heart,
    title: "Practice at Your Own Risk",
    content:
      "Yoga practice involves physical movements that can carry a risk of injury if not performed correctly. By using this app, you acknowledge that you are practicing yoga at your own risk. We strongly recommend consulting with a qualified yoga instructor, especially for intermediate and advanced asanas. If you experience any pain, dizziness, or discomfort during practice, stop immediately and seek medical attention.",
  },
  {
    icon: Scale,
    title: "Accuracy of Information",
    content:
      "While we strive to provide accurate and up-to-date information, we make no warranties or representations about the accuracy, reliability, completeness, or timeliness of the content. The information may contain errors or omissions, and we reserve the right to make changes or corrections at any time without notice.",
  },
];

const additionalPoints = [
  "This app is not intended for persons with serious medical conditions, recent surgeries, or chronic injuries without explicit doctor approval.",
  "Pregnant individuals should consult their healthcare provider before practicing any asana shown in this app.",
  "The voice guidance feature is for convenience only and should not replace instruction from a certified yoga teacher.",
  "Children should practice only under adult supervision.",
  "We do not collect, store, or share any personal health information through this app.",
  "The difficulty levels (Beginner, Intermediate, Advanced) are general guidelines and may vary based on individual physical condition and experience.",
];

export default function Disclaimers() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="text-center mb-10">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold mb-3">
            Disclaimers
          </h1>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Please read these important disclaimers before using the Yoga Asana Guide.
          </p>
        </div>

        {/* Main sections */}
        <div className="space-y-5 mb-10">
          {sections.map((section, i) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.3 }}
                className="p-6 rounded-2xl bg-card border border-border/60"
              >
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-4.5 h-4.5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-semibold mb-2">{section.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{section.content}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional points */}
        <div className="p-6 rounded-2xl bg-accent/30 border border-border/40">
          <h3 className="font-heading text-base font-semibold mb-4">Additional Important Notes</h3>
          <ul className="space-y-3">
            {additionalPoints.map((point, i) => (
              <li key={i} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* Last updated */}
        <p className="text-center text-xs text-muted-foreground mt-8">
          Last updated: March 2026
        </p>
      </motion.div>
    </div>
  );
}