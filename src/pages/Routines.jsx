import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, BookOpen, Clock, ChevronDown, ChevronUp, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { base44 } from "@/api/base44Client";
import { BODY_REGIONS } from "../components/yoga/bodyMapData";

const ALL_ASANAS = BODY_REGIONS.flatMap(r => r.asanas.map(a => ({ name: a.name, english: a.english, region: r.name })));
const DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

function RoutineForm({ onSave, onCancel, initial }) {
  const [name, setName] = useState(initial?.name || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [selectedAsanas, setSelectedAsanas] = useState(initial?.asanas || []);
  const [scheduleDays, setScheduleDays] = useState(initial?.schedule_days || []);
  const [scheduleTime, setScheduleTime] = useState(initial?.schedule_time || "07:00");
  const [asanaSearch, setAsanaSearch] = useState("");

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

  const handleSave = () => {
    if (!name.trim()) return;
    onSave({ name: name.trim(), description: description.trim(), asanas: selectedAsanas, schedule_days: scheduleDays, schedule_time: scheduleTime, is_active: true });
  };

  return (
    <div className="space-y-5">
      <div>
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Routine Name *</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="e.g. Morning Flow"
          className="mt-1.5 w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
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
          Select Asanas ({selectedAsanas.length} selected)
        </label>
        <input
          type="text"
          value={asanaSearch}
          onChange={e => setAsanaSearch(e.target.value)}
          placeholder="Search asanas…"
          className="mb-2 w-full px-3 py-2 rounded-xl border border-border bg-background text-xs focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <div className="max-h-48 overflow-y-auto space-y-1 border border-border/50 rounded-xl p-2">
          {filteredAsanas.map(a => (
            <button
              key={a.name}
              onClick={() => toggleAsana(a.name)}
              className={`w-full text-left flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-all ${
                selectedAsanas.includes(a.name) ? "bg-primary/10 text-primary border border-primary/20" : "hover:bg-accent"
              }`}
            >
              <span>
                <span className="font-medium">{a.name}</span>
                <span className="text-muted-foreground ml-2">{a.english}</span>
                <span className="text-[10px] text-muted-foreground ml-1">· {a.region}</span>
              </span>
              {selectedAsanas.includes(a.name) && <Check className="w-3 h-3 shrink-0" />}
            </button>
          ))}
        </div>
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
        <Button onClick={handleSave} disabled={!name.trim()} className="flex-1 rounded-xl">Save Routine</Button>
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
      if (!user) return;
      setUserEmail(user.email);
      loadRoutines(user.email);
    }).catch(() => setLoading(false));
  }, []);

  const loadRoutines = async (email) => {
    setLoading(true);
    const data = await base44.entities.Routine.filter({ user_email: email }, "-created_date");
    setRoutines(data);
    setLoading(false);
  };

  const handleSave = async (data) => {
    await base44.entities.Routine.create({ ...data, user_email: userEmail });
    setShowForm(false);
    loadRoutines(userEmail);
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
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="font-heading text-3xl font-bold mb-1">My Routines</h1>
            <p className="text-sm text-muted-foreground">Create personalized yoga sequences with automated reminders.</p>
          </div>
          {!showForm && (
            <Button onClick={() => setShowForm(true)} className="rounded-full gap-1.5 shrink-0">
              <Plus className="w-4 h-4" /> New
            </Button>
          )}
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
        ) : routines.length === 0 && !showForm ? (
          <div className="text-center py-20">
            <BookOpen className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">No routines yet. Create your first one!</p>
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
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${routine.is_active ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                        {routine.is_active ? "Active" : "Paused"}
                      </span>
                    </div>
                    {routine.description && <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{routine.description}</p>}
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
                    <button onClick={() => toggleActive(routine)} className="p-1.5 rounded-lg hover:bg-accent transition-colors text-xs text-muted-foreground">
                      {routine.is_active ? "Pause" : "Resume"}
                    </button>
                    <button onClick={() => handleDelete(routine.id)} className="p-1.5 rounded-lg hover:bg-destructive/10 text-destructive/60 hover:text-destructive transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {expandedId === routine.id && routine.asanas?.length > 0 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden border-t border-border/40"
                    >
                      <div className="px-4 py-3">
                        <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2">Asanas in this routine</p>
                        <div className="flex flex-wrap gap-1.5">
                          {routine.asanas.map((a, idx) => (
                            <span key={idx} className="text-[10px] px-2 py-1 rounded-full bg-accent text-muted-foreground">
                              {idx + 1}. {a}
                            </span>
                          ))}
                        </div>
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