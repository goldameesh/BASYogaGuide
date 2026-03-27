import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What is Yoga Asana Guide?",
    a: "Yoga Asana Guide is an all-in-one interactive yoga app. You can explore 45 yoga asanas by body region using our anatomical body map, follow step-by-step voice-guided instructions, build personalized routines with automated reminders, and track your daily practice progress.",
  },
  {
    q: "How do I use the Know Your Body Explorer?",
    a: "Navigate to the 'Know Your Body Explorer' page and tap any highlighted body region. You'll see 3 yoga asanas targeting that area. Expand any asana card to see detailed steps, benefits, precautions, and a guided audio player.",
  },
  {
    q: "How does the guided voice player work?",
    a: "Each asana has 5–6 step-by-step instructions. Press 'Start Guide' to hear each step read aloud in your chosen voice (Male, Female, or Kid). You can skip forward or back between steps, pause, or stop at any time.",
  },
  {
    q: "What are My Routines?",
    a: "My Routines lets you create personalized yoga sequences by selecting asanas from the full library. For each routine, you can set a weekly schedule (which days and what time) and the app will send you an in-app notification reminder at the right time.",
  },
  {
    q: "How do routine reminders work?",
    a: "When you create a routine and set a schedule, our automated system checks your active routines daily and sends you a personalized in-app notification at your scheduled time. Look for the bell icon in the top navigation to see your notifications.",
  },
  {
    q: "How do I track my progress?",
    a: "Visit the 'Progress' page to log your yoga sessions. Record the date, duration, which routine or asanas you practiced, and any notes. The page shows your total sessions, total minutes, days practiced, and a 7-day bar chart of your activity.",
  },
  {
    q: "What voice options are available?",
    a: "Three voice options: Male (deeper tone), Female (natural tone), and Kid (higher pitch, great for young practitioners). Voice playback uses your browser's built-in speech synthesis, which works on most modern devices.",
  },
  {
    q: "Is this app suitable for beginners?",
    a: "Absolutely! Each asana is labeled Beginner, Intermediate, or Advanced. The Search page lets you filter by level so you can start with what suits you. Always listen to your body and consult a professional if you have any concerns.",
  },
  {
    q: "How many asanas are included?",
    a: "45 yoga asanas across 15 body regions (3 per region). You can browse all of them on the Search page, filter by difficulty level, and add any to your personal routines.",
  },
  {
    q: "Is this medical advice?",
    a: "No. This app provides yoga information for educational purposes only. It is not medical advice. Please consult a qualified medical professional for any health concerns or injuries before practicing. See our Disclaimers page for full details.",
  },
  {
    q: "Can children use this app?",
    a: "Yes! The kid-friendly voice option makes it accessible for young practitioners. Children should always practice under adult supervision, and parents should review precautions for each asana.",
  },
];

export default function FAQs() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="text-center mb-10">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold mb-3">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Everything you need to know about using the Yoga Asana Guide.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="border border-border/60 rounded-xl px-5 bg-card data-[state=open]:border-primary/20 transition-colors"
            >
              <AccordionTrigger className="text-sm font-medium text-left py-4 hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </div>
  );
}