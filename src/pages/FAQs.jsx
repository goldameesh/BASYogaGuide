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
    a: "Yoga Asana Guide is an interactive educational app that helps you discover yoga asanas (poses) targeted to specific body regions. Simply tap a body part on our anatomical map to find relevant poses with detailed instructions, benefits, and precautions.",
  },
  {
    q: "How do I use the interactive body map?",
    a: "Navigate to the 'Explore' page and click or tap on any highlighted body part. You'll see a list of yoga asanas that benefit that area. Each asana card can be expanded to reveal full details, and you can use the voice player to listen to instructions.",
  },
  {
    q: "What are the voice options?",
    a: "We offer three voice options for listening to asana instructions: Male voice (deeper tone), Female voice (natural tone), and Kid voice (higher pitch, great for young practitioners or a lighter experience). The voice uses your browser's built-in speech synthesis.",
  },
  {
    q: "Is this app suitable for beginners?",
    a: "Absolutely! Each asana is labeled with its difficulty level — Beginner, Intermediate, or Advanced. We recommend starting with beginner-level asanas and gradually progressing. Always listen to your body and consult a professional if unsure.",
  },
  {
    q: "Can I use this app offline?",
    a: "The body map and all asana data are built into the app, so the core content works without an internet connection. However, the voice synthesis feature requires your browser's speech capabilities, which are typically available offline on most modern devices.",
  },
  {
    q: "How many asanas are included?",
    a: "Currently, the guide includes 45 yoga asanas across 15 body regions, with 3 asanas per region. Each asana covers a different difficulty level to provide options for all experience levels.",
  },
  {
    q: "Is this medical advice?",
    a: "No. This app provides yoga information for educational purposes only. It is not medical advice. Please consult a qualified medical professional for any health concerns, injuries, or pain before practicing any yoga asanas. See our Disclaimers page for full details.",
  },
  {
    q: "Can children use this app?",
    a: "Yes! The kid-friendly voice option makes it accessible for young practitioners. However, children should always practice under adult supervision, and parents should review the precautions for each asana to ensure safe practice.",
  },
  {
    q: "How do I report an issue or suggest improvements?",
    a: "We welcome your feedback! Please reach out through the app's contact channels. We're constantly working to add more asanas, improve descriptions, and enhance the overall experience.",
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