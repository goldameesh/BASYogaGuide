import { useState } from "react";
import { motion } from "framer-motion";
import BodyMap from "../components/yoga/BodyMap";
import AsanaPanel from "../components/yoga/AsanaPanel";

export default function Explore() {
  const [selectedRegion, setSelectedRegion] = useState(null);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 pb-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-2"
      >
        <h1 className="font-heading text-2xl sm:text-3xl font-bold mb-2">
          Body Map Explorer
        </h1>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Tap any body part to discover yoga asanas that target that area.
          Each asana includes voice-guided instructions.
        </p>
      </motion.div>

      {/* Hint */}
      <div className="text-center mb-6">
        <span className="inline-flex items-center gap-2 text-xs text-muted-foreground bg-accent/50 px-3 py-1.5 rounded-full">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
          Click or tap a body part to explore
        </span>
      </div>

      {/* Body Map */}
      <BodyMap
        onSelectRegion={setSelectedRegion}
        selectedRegion={selectedRegion}
      />

      {/* Stats */}
      <p className="text-center text-xs text-muted-foreground mt-4 mb-2">
        15 interactive body regions · 45 yoga asanas
      </p>

      {/* Asana Panel */}
      {selectedRegion && (
        <AsanaPanel
          regionId={selectedRegion}
          onClose={() => setSelectedRegion(null)}
        />
      )}
    </div>
  );
}