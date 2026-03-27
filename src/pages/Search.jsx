import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Filter, X } from "lucide-react";
import { BODY_REGIONS } from "../components/yoga/bodyMapData";
import SearchAsanaCard from "../components/yoga/SearchAsanaCard";

const ALL_ASANAS = BODY_REGIONS.flatMap(r => r.asanas.map(a => ({ ...a, region: r.name, regionId: r.id })));
const LEVELS = ["Beginner", "Intermediate", "Advanced"];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState("");

  const results = useMemo(() => {
    const q = query.toLowerCase();
    return ALL_ASANAS.filter(a => {
      const matchesQuery = !q ||
        a.name.toLowerCase().includes(q) ||
        a.english.toLowerCase().includes(q) ||
        a.benefits.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.region.toLowerCase().includes(q);
      const matchesLevel = !level || a.level === level;
      return matchesQuery && matchesLevel;
    });
  }, [query, level]);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 pb-24">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold mb-2">Search Asanas</h1>
          <p className="text-sm text-muted-foreground">Search across 45 asanas by name, benefits, or body region</p>
        </div>

        {/* Search bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name, benefit, region…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-3 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {query && (
            <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2">
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
        </div>

        {/* Level filter */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Level:</span>
          {["", ...LEVELS].map(l => (
            <button
              key={l || "all"}
              onClick={() => setLevel(l)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                level === l ? "bg-primary text-primary-foreground" : "bg-accent text-muted-foreground hover:text-foreground"
              }`}
            >
              {l || "All"}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-xs text-muted-foreground mb-4">
          {results.length} asana{results.length !== 1 ? "s" : ""} found
        </p>

        {/* Results */}
        <div className="space-y-3">
          {results.map((asana, i) => (
            <SearchAsanaCard key={`${asana.name}-${i}`} asana={asana} index={i} />
          ))}
          {results.length === 0 && (
            <div className="text-center py-16 text-muted-foreground text-sm">
              No asanas match your search. Try different keywords.
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}