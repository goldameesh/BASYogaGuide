import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity, Clock, Calendar, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { base44 } from "@/api/base44Client";
import { BODY_REGIONS } from "../components/yoga/bodyMapData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const ALL_ASANA_NAMES = BODY_REGIONS.flatMap(r => r.asanas.map(a => a.name));

function LogSessionForm({ onSave, onCancel, routines }) {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 16));
  const [duration, setDuration] = useState(30);
  const [selectedRoutine, setSelectedRoutine] = useState("");
  const [asanaSearch, setAsanaSearch] = useState("");
  const [selectedAsanas, setSelectedAsanas] = useState([]);
  const [notes, setNotes] = useState("");

  const handleRoutineSelect = (routineId) => {
    setSelectedRoutine(routineId);
    if (routineId) {
      const r = routines.find(r => r.id === routineId);
      if (r?.asanas) setSelectedAsanas(r.asanas);
    }
  };

  const filteredAsanas = ALL_ASANA_NAMES.filter(a =>
    a.toLowerCase().includes(asanaSearch.toLowerCase()) && !selectedAsanas.includes(a)
  );

  const handleSave = () => {
    const routine = routines.find(r => r.id === selectedRoutine);
    onSave({
      date: new Date(date).toISOString(),
      duration_minutes: Number(duration),
      asanas_practiced: selectedAsanas,
      routine_id: selectedRoutine || undefined,
      routine_name: routine?.name || undefined,
      notes: notes.trim(),
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Date & Time</label>
          <input type="datetime-local" value={date} onChange={e => setDate(e.target.value)}
            className="mt-1.5 w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Duration (min)</label>
          <input type="number" value={duration} onChange={e => setDuration(e.target.value)} min={1}
            className="mt-1.5 w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
      </div>

      {routines.length > 0 && (
        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Routine (optional)</label>
          <select value={selectedRoutine} onChange={e => handleRoutineSelect(e.target.value)}
            className="mt-1.5 w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring">
            <option value="">— Free Practice —</option>
            {routines.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
          </select>
        </div>
      )}

      <div>
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
          Asanas Practiced ({selectedAsanas.length})
        </label>
        {selectedAsanas.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-2">
            {selectedAsanas.map(a => (
              <span key={a} className="flex items-center gap-1 text-[10px] px-2 py-1 rounded-full bg-primary/10 text-primary">
                {a}
                <button onClick={() => setSelectedAsanas(prev => prev.filter(x => x !== a))}><X className="w-2.5 h-2.5" /></button>
              </span>
            ))}
          </div>
        )}
        <input type="text" value={asanaSearch} onChange={e => setAsanaSearch(e.target.value)} placeholder="Add asana…"
          className="w-full px-3 py-2 rounded-xl border border-border bg-background text-xs focus:outline-none focus:ring-2 focus:ring-ring" />
        {asanaSearch && (
          <div className="mt-1 max-h-32 overflow-y-auto border border-border/50 rounded-xl">
            {filteredAsanas.slice(0, 8).map(a => (
              <button key={a} onClick={() => { setSelectedAsanas(prev => [...prev, a]); setAsanaSearch(""); }}
                className="w-full text-left px-3 py-2 text-xs hover:bg-accent transition-colors">
                {a}
              </button>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Notes</label>
        <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="How did it feel?" rows={2}
          className="mt-1.5 w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
      </div>

      <div className="flex gap-2">
        <Button onClick={handleSave} className="flex-1 rounded-xl">Log Session</Button>
        <Button variant="outline" onClick={onCancel} className="rounded-xl">Cancel</Button>
      </div>
    </div>
  );
}

export default function Progress() {
  const [sessions, setSessions] = useState([]);
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    base44.auth.me().then(user => {
      if (!user) { setLoading(false); return; }
      setUserEmail(user.email);
      Promise.all([
        base44.entities.Session.filter({ user_email: user.email }, "-date", 50),
        base44.entities.Routine.filter({ user_email: user.email })
      ]).then(([s, r]) => { setSessions(s); setRoutines(r); setLoading(false); });
    }).catch(() => setLoading(false));
  }, []);

  const handleLog = async (data) => {
    const session = await base44.entities.Session.create({ ...data, user_email: userEmail });
    setSessions(prev => [session, ...prev]);
    setShowForm(false);
  };

  const totalMinutes = sessions.reduce((sum, s) => sum + (s.duration_minutes || 0), 0);
  const uniqueDays = new Set(sessions.map(s => s.date?.slice(0, 10))).size;

  // Last 7 days chart data
  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const key = d.toISOString().slice(0, 10);
    const label = d.toLocaleDateString("en", { weekday: "short" });
    const mins = sessions.filter(s => s.date?.slice(0, 10) === key).reduce((s, x) => s + (x.duration_minutes || 0), 0);
    return { label, mins };
  });

  const stats = [
    { icon: Activity, label: "Sessions", value: sessions.length },
    { icon: Clock, label: "Minutes", value: totalMinutes },
    { icon: Calendar, label: "Days", value: uniqueDays },
  ];

  if (!userEmail && !loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="text-muted-foreground text-sm">Please sign in to view your progress.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 pb-24">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="font-heading text-3xl font-bold mb-1">Progress</h1>
            <p className="text-sm text-muted-foreground">Your yoga practice history.</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)} className="rounded-full gap-1.5 shrink-0">
            <Plus className="w-4 h-4" /> Log Session
          </Button>
        </div>

        {showForm && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-5 rounded-2xl border border-primary/20 bg-card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-base font-semibold">Log a Session</h2>
              <button onClick={() => setShowForm(false)}><X className="w-4 h-4 text-muted-foreground" /></button>
            </div>
            <LogSessionForm onSave={handleLog} onCancel={() => setShowForm(false)} routines={routines} />
          </motion.div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                className="p-4 rounded-2xl bg-card border border-border/60 text-center">
                <Icon className="w-5 h-5 text-primary mx-auto mb-2" />
                <p className="font-heading text-2xl font-bold">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Chart */}
        {sessions.length > 0 && (
          <div className="mb-6 p-5 rounded-2xl bg-card border border-border/60">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">Last 7 Days (minutes)</p>
            <ResponsiveContainer width="100%" height={140}>
              <BarChart data={last7} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="label" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }} />
                <Bar dataKey="mins" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Minutes" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Session history */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        ) : sessions.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <Activity className="w-10 h-10 mx-auto mb-3 opacity-20" />
            <p className="text-sm">No sessions logged yet. Log a session to begin tracking!</p>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-3">Recent Sessions</p>
            {sessions.map((s, i) => (
              <motion.div key={s.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border/50">
                <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Activity className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium">{s.routine_name || "Free Practice"}</p>
                    <span className="text-[10px] text-muted-foreground shrink-0">{new Date(s.date).toLocaleDateString("en", { month: "short", day: "numeric" })}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{s.duration_minutes} min · {s.asanas_practiced?.length || 0} asanas</p>
                  {s.notes && <p className="text-xs text-muted-foreground italic mt-1">"{s.notes}"</p>}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}