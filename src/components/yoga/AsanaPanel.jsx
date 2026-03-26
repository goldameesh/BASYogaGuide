import { X, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BODY_REGIONS } from "./bodyMapData";
import AsanaCard from "./AsanaCard";

export default function AsanaPanel({ regionId, onClose }) {
  const region = BODY_REGIONS.find((r) => r.id === regionId);
  if (!region) return null;

  return (
    <AnimatePresence>
      <motion.div
        key={regionId}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="mt-8 max-w-2xl mx-auto"
      >
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-accent transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h2 className="font-heading text-xl font-semibold">{region.name}</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                {region.asanas.length} yoga asanas for this region
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-accent transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          {region.asanas.map((asana, idx) => (
            <AsanaCard key={asana.name} asana={asana} index={idx} />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}