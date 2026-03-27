import { useState, useEffect } from "react";
import { PlusCircle, Check, ChevronDown, Sparkles } from "lucide-react";
import { base44 } from "@/api/base44Client";

// Keyword map: routine name fragments → relevant asana keywords
const ROUTINE_KEYWORDS = {
  "morning energizer": ["energizing", "circulation", "awaken", "stimulate", "energize", "strength", "warm"],
  "evening wind-down": ["calming", "relax", "sleep", "rest", "gentle", "calm", "wind", "parasympathetic"],
  "stress relief": ["anxiety", "stress", "nervous", "calm", "mind", "cortisol", "relax", "breath", "meditation"],
  "back pain": ["back", "spine", "lumbar", "lower back", "upper back", "posture", "decompress", "sciatica"],
  "hip": ["hip", "groin", "pelvis", "pigeon", "butterfly", "squat"],
  "core strength": ["core", "abdominal", "abs", "plank", "stability", "balance", "tones"],
  "flexibility": ["stretch", "flexible", "mobility", "range of motion", "open", "lengthen"],
  "beginner": ["beginner", "gentle", "easy", "basic", "simple", "foundational"],
  "neck": ["neck", "cervical", "shoulder", "throat"],
  "sleep": ["sleep", "bedtime", "rest", "relax", "calm", "night", "wind"],
};

function scoreRoutine(routine, asana) {
  let score = 0;
  const routineNameLower = routine.name.toLowerCase();
  const routineDescLower = (routine.description || "").toLowerCase();
  const asanaText = `${asana.name} ${asana.english} ${asana.benefits} ${asana.description} ${asana.region}`.toLowerCase();

  // Match routine keywords against asana text
  for (const [routineFragment, keywords] of Object.entries(ROUTINE_KEYWORDS)) {
    if (routineNameLower.includes(routineFragment)) {
      for (const kw of keywords) {
        if (asanaText.includes(kw)) score += 2;
      }
    }
  }

  // Also match asana text words against routine description
  const asanaWords = asanaText.split(/\s+/).filter(w => w.length > 4);
  for (const word of asanaWords) {
    if (routineDescLower.includes(word)) score += 1;
  }

  // If asana already in routine, flag it
  if (routine.asanas?.includes(asana.name)) score = -1;

  return score;
}

export default function AddToRoutineButton({ asana }) {
  const [routines, setRoutines] = useState([]);
  const [open, setOpen] = useState(false);
  const [added, setAdded] = useState(null);
  const [loading, setLoading] = useState(false);

  const asanaName = asana?.name || asana; // support both object and string

  useEffect(() => {
    if (!open) return;
    base44.auth.me().then(user => {
      if (!user) return;
      base44.entities.Routine.filter({ user_email: user.email }, "name", 50).then(setRoutines);
    }).catch(() => {});
  }, [open]);

  const rankedRoutines = [...routines].sort((a, b) => {
    const scoreA = typeof asana === "object" ? scoreRoutine(a, asana) : 0;
    const scoreB = typeof asana === "object" ? scoreRoutine(b, asana) : 0;
    return scoreB - scoreA;
  });

  const topRoutine = rankedRoutines[0];
  const topScore = typeof asana === "object" && topRoutine ? scoreRoutine(topRoutine, asana) : 0;

  const handleAdd = async (routine) => {
    if (routine.asanas?.includes(asanaName)) {
      setAdded(`Already in "${routine.name}"`);
      setTimeout(() => { setAdded(null); setOpen(false); }, 1500);
      return;
    }
    setLoading(true);
    const updated = [...(routine.asanas || []), asanaName];
    await base44.entities.Routine.update(routine.id, { asanas: updated });
    setLoading(false);
    setAdded(`Added to "${routine.name}"`);
    setTimeout(() => { setAdded(null); setOpen(false); }, 1800);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
        className="flex items-center gap-1.5 text-[11px] font-medium px-3 py-1.5 rounded-full border border-primary/30 text-primary bg-primary/5 hover:bg-primary/10 transition-colors"
      >
        <PlusCircle className="w-3.5 h-3.5" />
        Add to Routine
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          className="absolute z-50 top-full mt-1.5 left-0 min-w-[220px] bg-card border border-border rounded-xl shadow-lg overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          {added ? (
            <div className="flex items-center gap-2 px-4 py-3 text-xs text-primary font-medium">
              <Check className="w-3.5 h-3.5" /> {added}
            </div>
          ) : rankedRoutines.length === 0 ? (
            <div className="px-4 py-3 text-xs text-muted-foreground">No routines yet. Create one in My Routines.</div>
          ) : (
            <>
              <p className="px-4 pt-3 pb-1 text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Select a routine</p>
              {rankedRoutines.map((r, idx) => {
                const isAlreadyAdded = r.asanas?.includes(asanaName);
                const isBest = idx === 0 && topScore > 0 && !isAlreadyAdded;
                return (
                  <button
                    key={r.id}
                    disabled={loading || isAlreadyAdded}
                    onClick={() => handleAdd(r)}
                    className={`w-full text-left flex items-center justify-between px-4 py-2.5 text-xs transition-colors ${
                      isBest ? "bg-primary/5 hover:bg-primary/10" : "hover:bg-accent"
                    } ${isAlreadyAdded ? "opacity-50 cursor-default" : ""}`}
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <span className="font-medium truncate">{r.name}</span>
                      {isBest && (
                        <span className="flex items-center gap-0.5 text-[9px] px-1.5 py-0.5 rounded-full bg-primary/15 text-primary font-semibold shrink-0">
                          <Sparkles className="w-2.5 h-2.5" /> Best fit
                        </span>
                      )}
                    </div>
                    {isAlreadyAdded && <Check className="w-3 h-3 text-primary shrink-0" />}
                  </button>
                );
              })}
            </>
          )}
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
      )}
    </div>
  );
}