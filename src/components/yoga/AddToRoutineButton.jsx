import { useState, useEffect } from "react";
import { PlusCircle, Check, ChevronDown } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function AddToRoutineButton({ asanaName }) {
  const [routines, setRoutines] = useState([]);
  const [open, setOpen] = useState(false);
  const [added, setAdded] = useState(null); // routine name just added to
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    base44.auth.me().then(user => {
      if (!user) return;
      base44.entities.Routine.filter({ user_email: user.email }, "name", 50).then(setRoutines);
    }).catch(() => {});
  }, [open]);

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
          className="absolute z-50 top-full mt-1.5 left-0 min-w-[200px] bg-card border border-border rounded-xl shadow-lg overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          {added ? (
            <div className="flex items-center gap-2 px-4 py-3 text-xs text-primary font-medium">
              <Check className="w-3.5 h-3.5" /> {added}
            </div>
          ) : routines.length === 0 ? (
            <div className="px-4 py-3 text-xs text-muted-foreground">No routines yet. Create one in My Routines.</div>
          ) : (
            <>
              <p className="px-4 pt-3 pb-1 text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Select a routine</p>
              {routines.map(r => (
                <button
                  key={r.id}
                  disabled={loading}
                  onClick={() => handleAdd(r)}
                  className="w-full text-left flex items-center justify-between px-4 py-2.5 text-xs hover:bg-accent transition-colors"
                >
                  <span className="font-medium">{r.name}</span>
                  {r.asanas?.includes(asanaName) && <Check className="w-3 h-3 text-primary" />}
                </button>
              ))}
            </>
          )}
        </div>
      )}

      {/* Click-outside close */}
      {open && (
        <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
      )}
    </div>
  );
}