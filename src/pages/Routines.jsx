import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, BookOpen, Clock, ChevronDown, ChevronUp, X, Check, Info, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { base44 } from "@/api/base44Client";
import { BODY_REGIONS } from "../components/yoga/bodyMapData";

const ALL_ASANAS = BODY_REGIONS.flatMap(r => r.asanas.map(a => ({ name: a.name, english: a.english, region: r.name })));
const DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

const PREDEFINED_NAMES = [
  "Morning Energizer",
  "Evening Wind-Down",
  "Stress Relief & Calm",
  "Back Pain Relief",
  "Hip & Lower Body Opener",
  "Core Strength Builder",
  "Full Body Flexibility",
  "Beginner's Daily Flow",
  "Neck & Shoulder Relief",
  "Deep Sleep Preparation",
  "Custom Routine",
];

// Research-based default routines (seeded on first use)
const DEFAULT_ROUTINES = [
  {
    name: "Morning Energizer",
    description: "Start your day with an energizing sequence that awakens the body, improves circulation, and sets a positive tone for the day. Based on Surya Namaskar principles.",
    asanas: ["Tadasana", "Adho Mukha Svanasana", "Bhujangasana", "Virabhadrasana II", "Utkatasana", "Trikonasana"],
    schedule_days: ["Monday","Wednesday","Friday"],
    schedule_time: "07:00",
    is_active: true,
    is_curated: true,
  },
  {
    name: "Stress Relief & Calm",
    description: "A calming sequence targeting the nervous system. Research shows these poses activate the parasympathetic response, reducing cortisol and promoting mental calm.",
    asanas: ["Balasana", "Supta Matsyendrasana", "Pawanmuktasana", "Bhramari Pranayama", "Sukhasana", "Baddha Konasana"],
    schedule_days: ["Tuesday","Thursday","Saturday"],
    schedule_time: "18:00",
    is_active: true,
    is_curated: true,
  },
  {
    name: "Back Pain Relief",
    description: "Clinically recommended sequence for lower and upper back pain. These poses strengthen back muscles, decompress the spine, and relieve chronic tension (NIH-supported research).",
    asanas: ["Marjariasana", "Setu Bandhasana", "Bhujangasana", "Salabhasana", "Supta Matsyendrasana", "Balasana"],
    schedule_days: ["Monday","Wednesday","Friday","Sunday"],
    schedule_time: "08:00",
    is_active: true,
    is_curated: true,
  },
  {
    name: "Core Strength Builder",
    description: "Targets the abdominal and stabilizer muscles. This sequence builds core endurance which supports posture, reduces back pain, and improves overall functional fitness.",
    asanas: ["Navasana", "Chaturanga Dandasana", "Vasisthasana", "Utkatasana", "Adho Mukha Svanasana", "Ardha Matsyendrasana"],
    schedule_days: ["Tuesday","Thursday","Saturday"],
    schedule_time: "07:30",
    is_active: false,
    is_curated: true,
  },
  {
    name: "Evening Wind-Down",
    description: "A gentle bedtime sequence that promotes deep sleep. Studies from Harvard Medical School show yoga nidra and restorative poses significantly improve sleep quality.",
    asanas: ["Sukhasana", "Supta Matsyendrasana", "Baddha Konasana", "Pawanmuktasana", "Balasana"],
    schedule_days: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    schedule_time: "21:00",
    is_active: false,
    is_curated: true,
  },
];

function RoutineForm({ onSave, onCancel, initial }) {
  const [name, setName] = useState(initial?.name || "");
  const [customName, setCustomName] = useState("");
  const [description, setDescription] = useState(initial?.description || "");
  const [selectedAsanas, setSelectedAsanas] = useState(initial?.asanas || []);
  const [scheduleDays, setScheduleDays] = useState(initial?.schedule_days || []);
  const [scheduleTime, setScheduleTime] = useState(initial?.schedule_time || "07:00");
  const [asanaSearch, setAsanaSearch] = useState("");

  const isCustom = name === "Custom Routine";
  const displayName = isCustom ? customName : name;

  // Auto-fill description when selecting a predefined routine name
  const handleNameSelect = (val) => {
    setName(val);
    const preset = DEFAULT_ROUTINES.find(r => r.name === val);
    if (preset) {
      setDescription(preset.description);
      setSelectedAsanas(preset.asanas);
      setScheduleDays(preset.schedule_days);
      setScheduleTime(preset.schedule_time);
    }
  };

  const filteredAsanas = ALL_ASANAS.filter(a =>
    a.name.toLowerCase().includes(asanaSearch.toLowerCase()) ||
    a.english.toLowerCase().includes(asanaSearch.toLowerCase()) ||
    a.region.toLowerCase().includes(asanaSearch.toLowerCase())
  );

  const toggleAsana = (asanaName) => {
    setSelectedAsanas(prev =>
      prev.includes(asanaName) ? prev.filter(a => a !== asanaName) : [...prev, asanaName]
    );
  };

  const toggleDay = (day) => {
    setScheduleDays(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]);
  };

  const finalName = isCustom ? customName.trim() : name;

  const handleSave = () => {
    if (!finalName) return;
    onSave({ name: finalName, description: description.trim(), asanas: selectedAsanas, schedule_days: scheduleDays, schedule_time: scheduleTime, is_active: true });
  };

  return (
    <div className="space-y-5">
      {/* Predefined name dropdown */}
      <div>
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Routine Name *</label>
        <select
          value={name}
          onChange={e => handleNameSelect(e.target.value)}
          className="mt-1.5 w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="">— Choose a routine name —</option>
          {PREDEFINED_NAMES.map(n => <option key={n} value={n}>{n}</option>)}
        </select>
        {isCustom && (
          <input
            type="text"
            value={customName}
            onChange={e => setCustomName(e.target.value)}
            placeholder="Enter your custom routine name…"
            className="mt-2 w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        )}
        {name && !isCustom && (
          <p className="text-[10px] text-primary mt-1.5 flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Asanas & schedule pre-filled from research recommendations. Customize as needed.
          </p>
        )}
      </div>

      <div>
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Description</label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="What is this routine for?"
          rows={2}
          className="mt-1.5 w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
        />
      </div>

      <div>
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
          Asanas ({selectedAsanas.length} selected)
        </label>
        {selectedAsanas.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-2">
            {selectedAsanas.map(a => (
              <span key={a} className="flex items-center gap-1 text-[10px] px-2 py-1 rounded-full bg-primary/10 text-primary">
                {a}
                <button onClick={() => toggleAsana(a)}><X className="w-2.5 h-2.5" /></button>
              </span>
            ))}
          </div>
        )}
        <input
          type="text"
          value={asanaSearch}
          onChange={e => setAsanaSearch(e.target.value)}
          placeholder="Search to add more asanas…"
          className="w-full px-3 py-2 rounded-xl border border-border bg-background text-xs focus:outline-none focus:ring-2 focus:ring-ring"
        />
        {asanaSearch && (
          <div className="mt-1 max-h-36 overflow-y-auto border border-border/50 rounded-xl">
            {filteredAsanas.filter(a => !selectedAsanas.includes(a.name)).slice(0, 10).map(a => (
              <button key={a.name} onClick={() => { toggleAsana(a.name); setAsanaSearch(""); }}
                className="w-full text-left flex items-center justify-between px-3 py-2 text-xs hover:bg-accent transition-colors">
                <span><span className="font-medium">{a.name}</span> <span className="text-muted-foreground">— {a.english} · {a.region}</span></span>
                <Plus className="w-3 h-3 text-primary shrink-0" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">Practice Days</label>
        <div className="flex flex-wrap gap-2">
          {DAYS.map(day => (
            <button
              key={day}
              onClick={() => toggleDay(day)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                scheduleDays.includes(day) ? "bg-primary text-primary-foreground" : "bg-accent text-muted-foreground hover:text-foreground"
              }`}
            >
              {day.slice(0, 3)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Reminder Time</label>
        <input
          type="time"
          value={scheduleTime}
          onChange={e => setScheduleTime(e.target.value)}
          className="mt-1.5 px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="flex gap-2 pt-2">
        <Button onClick={handleSave} disabled={!finalName} className="flex-1 rounded-xl">Save Routine</Button>
        <Button variant="outline" onClick={onCancel} className="rounded-xl">Cancel</Button>
      </div>
    </div>
  );
}

export default function Routines() {
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    base44.auth.me().then(user => {
      if (!user) { setLoading(false); return; }
      setUserEmail(user.email);
      loadRoutines(user.email);
    }).catch(() => setLoading(false));
  }, []);

  const loadRoutines = async (email) => {
    setLoading(true);
    const data = await base44.entities.Routine.filter({ user_email: email }, "-created_date");
    // Seed default routines if user has none
    if (data.length === 0) {
      const created = await Promise.all(
        DEFAULT_ROUTINES.map(r => base44.entities.Routine.create({ ...r, user_email: email }))
      );
      setRoutines(created);
    } else {
      setRoutines(data);
    }
    setLoading(false);
  };

  const handleSave = async (data) => {
    const routine = await base44.entities.Routine.create({ ...data, user_email: userEmail });
    setRoutines(prev => [routine, ...prev]);
    setShowForm(false);
  };

  const handleDelete = async (id) => {
    await base44.entities.Routine.delete(id);
    setRoutines(prev => prev.filter(r => r.id !== id));
  };

  const toggleActive = async (routine) => {
    await base44.entities.Routine.update(routine.id, { is_active: !routine.is_active });
    setRoutines(prev => prev.map(r => r.id === routine.id ? { ...r, is_active: !r.is_active } : r));
  };

  if (!userEmail && !loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="text-muted-foreground text-sm">Please sign in to manage your routines.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 pb-24">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="font-heading text-3xl font-bold mb-1">My Routines</h1>
            <p className="text-sm text-muted-foreground">Personalized yoga sequences with automated reminders.</p>
          </div>
          {!showForm && (
            <Button onClick={() => setShowForm(true)} className="rounded-full gap-1.5 shrink-0">
              <Plus className="w-4 h-4" /> New
            </Button>
          )}
        </div>

        {/* Curated note */}
        <div className="mb-6 flex gap-3 p-4 rounded-xl bg-primary/5 border border-primary/15">
          <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            <span className="font-medium text-foreground">Research-curated routines</span> have been pre-loaded based on peer-reviewed yoga therapy studies and best practices (B.K.S. Iyengar, Bihar School of Yoga, NIH). These are starting points — feel free to add, modify, or delete any routine to suit your personal needs and preferences.
          </p>
        </div>

        {/* Create form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-5 rounded-2xl border border-primary/20 bg-card"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-heading text-base font-semibold">New Routine</h2>
                <button onClick={() => setShowForm(false)}><X className="w-4 h-4 text-muted-foreground" /></button>
              </div>
              <RoutineForm onSave={handleSave} onCancel={() => setShowForm(false)} />
            </motion.div>
          )}
        </AnimatePresence>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        ) : (
          <div className="space-y-3">
            {routines.map((routine, i) => (
              <motion.div
                key={routine.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="border border-border/60 rounded-2xl bg-card overflow-hidden"
              >
                <div className="p-4 flex items-start gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${routine.is_active ? "bg-primary animate-pulse-glow" : "bg-muted-foreground/30"}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-heading font-semibold text-sm">{routine.name}</h3>
                      {routine.is_curated && (
                        <span className="flex items-center gap-0.5 text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-medium">
                          <Sparkles className="w-2.5 h-2.5" /> Curated
                        </span>
                      )}
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${routine.is_active ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                        {routine.is_active ? "Active" : "Paused"}
                      </span>
                    </div>
                    {routine.description && <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed line-clamp-2">{routine.description}</p>}
                    <div className="flex items-center gap-3 mt-2 flex-wrap text-[10px] text-muted-foreground">
                      <span>{routine.asanas?.length || 0} asanas</span>
                      {routine.schedule_days?.length > 0 && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {routine.schedule_days.map(d => d.slice(0,3)).join(", ")} at {routine.schedule_time}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => setExpandedId(expandedId === routine.id ? null : routine.id)} className="p-1.5 rounded-lg hover:bg-accent transition-colors">
                      {expandedId === routine.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    <button onClick={() => toggleActive(routine)} className="p-1.5 rounded-lg hover:bg-accent transition-colors text-[10px] text-muted-foreground whitespace-nowrap">
                      {routine.is_active ? "Pause" : "Resume"}
                    </button>
                    <button onClick={() => handleDelete(routine.id)} className="p-1.5 rounded-lg hover:bg-destructive/10 text-destructive/60 hover:text-destructive transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {expandedId === routine.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden border-t border-border/40"
                    >
                      <div className="px-4 py-3 space-y-2">
                        {routine.description && (
                          <p className="text-xs text-muted-foreground leading-relaxed">{routine.description}</p>
                        )}
                        {routine.asanas?.length > 0 && (
                          <div>
                            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2">Asanas</p>
                            <div className="flex flex-wrap gap-1.5">
                              {routine.asanas.map((a, idx) => (
                                <span key={idx} className="text-[10px] px-2 py-1 rounded-full bg-accent text-muted-foreground">
                                  {idx + 1}. {a}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}