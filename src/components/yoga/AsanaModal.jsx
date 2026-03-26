import { useEffect, useRef, useState } from "react";
import { X, ChevronDown, Sparkles, AlertTriangle, BookOpen, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BODY_REGIONS } from "./bodyMapData";
import VoicePlayer from "./VoicePlayer";

const levelColors = {
  Beginner: "bg-emerald-100 text-emerald-700",
  Intermediate: "bg-amber-100 text-amber-700",
  Advanced: "bg-rose-100 text-rose-700",
};

function AsanaItem({ asana, index }) {
  const [expanded, setExpanded] = useState(false);

  const voiceText = `${asana.name}, also known as ${asana.english}. ${asana.description}. Benefits: ${asana.benefits}. Precautions: ${asana.precautions}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.3 }}
      className="border border-border/60 rounded-xl overflow-hidden bg-background hover:border-primary/30 transition-colors duration-200"
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
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 shrink-0 ${expanded ? "rotate-180" : ""}`} />
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

              {/* Source citation */}
              <div className="flex gap-2.5 p-3 rounded-lg bg-accent/40 border border-border/40">
                <BookOpen className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-1">Source</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{asana.source}</p>
                </div>
              </div>

              {/* Voice Player */}
              <div className="pt-2 border-t border-border/40">
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2">Listen to instructions</p>
                <VoicePlayer text={voiceText} />
              </div>

              {/* YouTube Video */}
              <div className="pt-2 border-t border-border/40">
                {asana.youtube === null ? (
                  <p className="text-xs text-muted-foreground italic">📹 No video available for this pose</p>
                ) : (() => {
                  const videoId = asana.youtube.replace('https://www.youtube.com/embed/', '');
                  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;
                  return (
                    <a
                      href={watchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-xl bg-red-50 border border-red-100 hover:bg-red-100 transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-red-700">Watch on YouTube</p>
                        <p className="text-[10px] text-red-500">{asana.name} demonstration</p>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-red-400 ml-auto group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  );
                })()}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function AsanaModal({ regionId, onClose }) {
  const region = BODY_REGIONS.find((r) => r.id === regionId);
  const hasSpoken = useRef(false);

  // Play audio cue when modal opens
  useEffect(() => {
    if (!region || hasSpoken.current) return;
    hasSpoken.current = true;

    if ("speechSynthesis" in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(`${region.name}`);
      utterance.rate = 0.9;
      utterance.pitch = 1.05;
      utterance.volume = 0.8;
      // Short delay to let the modal render first
      setTimeout(() => window.speechSynthesis.speak(utterance), 200);
    }

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [region]);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Prevent body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  if (!region) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

        {/* Modal */}
        <motion.div
          key="modal-content"
          initial={{ opacity: 0, y: 60, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 60, scale: 0.97 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="relative z-10 w-full sm:max-w-2xl bg-card rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-border/50 shrink-0">
            <div>
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse-glow" />
                <h2 className="font-heading text-xl font-bold">{region.name}</h2>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {region.asanas.length} yoga asanas — tap each to expand details, source & video
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-accent transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable content */}
          <div className="overflow-y-auto p-6 space-y-3 flex-1">
            {region.asanas.map((asana, idx) => (
              <AsanaItem key={asana.name} asana={asana} index={idx} />
            ))}
          </div>

          {/* Disclaimer footer */}
          <div className="px-6 py-3 border-t border-border/40 bg-accent/20 rounded-b-2xl shrink-0">
            <p className="text-[10px] text-muted-foreground text-center leading-relaxed">
              ⚕️ Educational purposes only. Consult a qualified medical professional before beginning any yoga practice.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}