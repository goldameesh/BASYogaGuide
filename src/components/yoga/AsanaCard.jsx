import { useState } from "react";
import { ChevronDown, Shield, Sparkles, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import VoicePlayer from "./VoicePlayer";

const levelColors = {
  Beginner: "bg-emerald-100 text-emerald-700",
  Intermediate: "bg-amber-100 text-amber-700",
  Advanced: "bg-rose-100 text-rose-700",
};

export default function AsanaCard({ asana, index }) {
  const [expanded, setExpanded] = useState(false);

  const voiceText = `${asana.name}, also known as ${asana.english}. ${asana.description}. Benefits: ${asana.benefits}. Precautions: ${asana.precautions}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.3 }}
      className="border border-border/60 rounded-xl overflow-hidden bg-card hover:border-primary/30 transition-colors duration-200"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left px-5 py-4 flex items-center justify-between gap-3"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2.5 flex-wrap">
            <h3 className="font-heading text-base font-semibold">{asana.name}</h3>
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${levelColors[asana.level]}`}>
              {asana.level}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">{asana.english}</p>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-muted-foreground transition-transform duration-200 shrink-0 ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 space-y-4">
              <p className="text-sm text-foreground/80 leading-relaxed">{asana.description}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex gap-2.5 p-3 rounded-lg bg-primary/5">
                  <Sparkles className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] font-medium text-primary uppercase tracking-wider mb-1">Benefits</p>
                    <p className="text-xs text-foreground/70 leading-relaxed">{asana.benefits}</p>
                  </div>
                </div>
                <div className="flex gap-2.5 p-3 rounded-lg bg-destructive/5">
                  <AlertTriangle className="w-4 h-4 text-destructive/70 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] font-medium text-destructive/70 uppercase tracking-wider mb-1">Precautions</p>
                    <p className="text-xs text-foreground/70 leading-relaxed">{asana.precautions}</p>
                  </div>
                </div>
              </div>

              {/* Voice Player */}
              <div className="pt-2 border-t border-border/40">
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  Listen to instructions
                </p>
                <VoicePlayer text={voiceText} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}