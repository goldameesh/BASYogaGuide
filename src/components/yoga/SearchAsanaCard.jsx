import { useState } from "react";
import AddToRoutineButton from "./AddToRoutineButton";
import { ChevronDown, Sparkles, AlertTriangle, BookOpen, ExternalLink, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import GuidedPlayer from "./GuidedPlayer";

const levelColors = {
  Beginner: "bg-emerald-100 text-emerald-700",
  Intermediate: "bg-amber-100 text-amber-700",
  Advanced: "bg-rose-100 text-rose-700",
};

export default function SearchAsanaCard({ asana, index }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
      className="border border-border/60 rounded-xl overflow-hidden bg-background hover:border-primary/30 transition-colors"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left px-5 py-4 flex items-center justify-between gap-3"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-heading text-base font-semibold">{asana.name}</h3>
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${levelColors[asana.level]}`}>{asana.level}</span>
          </div>
          <div className="flex items-center gap-3 mt-0.5">
            <p className="text-xs text-muted-foreground">{asana.english}</p>
            <span className="flex items-center gap-1 text-[10px] text-primary/70">
              <MapPin className="w-3 h-3" />{asana.region}
            </span>
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform shrink-0 ${expanded ? "rotate-180" : ""}`} />
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
              <div className="flex gap-2.5 p-3 rounded-lg bg-accent/40 border border-border/40">
                <BookOpen className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-1">Source</p>
                  <p className="text-xs text-muted-foreground">{asana.source}</p>
                </div>
              </div>
              <div className="pt-2 border-t border-border/40">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Guided Practice</p>
                  <AddToRoutineButton asanaName={asana.name} />
                </div>
                <GuidedPlayer asana={asana} />
              </div>
              {asana.youtube && (() => {
                const videoId = asana.youtube.replace('https://www.youtube.com/embed/', '');
                return (
                  <a href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl bg-red-50 border border-red-100 hover:bg-red-100 transition-colors group">
                    <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-red-700">Watch on YouTube</p>
                      <p className="text-[10px] text-red-500">{asana.name} demonstration</p>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-red-400 ml-auto" />
                  </a>
                );
              })()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}