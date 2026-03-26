import { useState } from "react";
import { BODY_REGIONS } from "./bodyMapData";

const BODY_FILL = "hsl(155, 15%, 78%)";
const BODY_STROKE = "hsl(155, 10%, 65%)";
const BODY_HOVER = "hsl(155, 25%, 65%)";
const LABEL_COLOR = "hsl(155, 10%, 50%)";
const LINE_COLOR = "hsl(155, 10%, 70%)";
const DOT_COLOR = "hsl(155, 15%, 60%)";

function BodyShape({ region, isHovered, onHover, onClick }) {
  const fill = isHovered ? BODY_HOVER : BODY_FILL;
  const opacity = isHovered ? 1 : 0.85;
  const filter = isHovered ? "url(#glow)" : "none";
  const strokeWidth = isHovered ? 1.2 : 0.8;
  const common = {
    className: "cursor-pointer transition-all duration-300",
    fill,
    stroke: BODY_STROKE,
    strokeWidth,
    opacity,
    style: { filter },
    onMouseEnter: () => onHover(region.id),
    onMouseLeave: () => onHover(null),
    onClick: () => onClick(region.id),
  };

  if (region.shape === "ellipse") {
    return <ellipse cx={region.cx} cy={region.cy} rx={region.rx} ry={region.ry} {...common} />;
  }
  if (region.shape === "rect") {
    return <rect x={region.x} y={region.y} width={region.width} height={region.height} rx={region.rx} {...common} />;
  }
  return <path d={region.d} {...common} />;
}

function LabelLine({ region, isHovered, onHover, onClick }) {
  return (
    <g
      className="cursor-pointer"
      onMouseEnter={() => onHover(region.id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(region.id)}
    >
      <line
        x1={region.dotX} y1={region.dotY}
        x2={region.labelX} y2={region.labelY - 4}
        stroke={LINE_COLOR} strokeWidth="0.6" strokeDasharray="3,3" opacity="0.5"
      />
      <circle cx={region.dotX} cy={region.dotY} r={isHovered ? 3.5 : 2.5} fill={DOT_COLOR}
        className="transition-all duration-200" />
      <text
        x={region.labelX} y={region.labelY}
        textAnchor={region.labelAnchor}
        fill={isHovered ? "hsl(155, 25%, 35%)" : LABEL_COLOR}
        fontSize={isHovered ? "11" : "10"}
        fontWeight={isHovered ? "500" : "400"}
        fontFamily="var(--font-body)"
        className="transition-all duration-200"
      >
        {region.name}
      </text>
    </g>
  );
}

export default function BodyMap({ onSelectRegion, selectedRegion }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="relative w-full flex justify-center">
      <svg
        viewBox="0 0 400 530"
        className="w-full max-w-[320px] md:max-w-[380px] lg:max-w-[420px] h-auto select-none"
        role="img"
        aria-label="Interactive human body map for yoga asanas"
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Body shapes */}
        {BODY_REGIONS.map((region) => (
          <g key={region.id}>
            <BodyShape
              region={region}
              isHovered={hovered === region.id || selectedRegion === region.id}
              onHover={setHovered}
              onClick={onSelectRegion}
            />
          </g>
        ))}

        {/* Labels */}
        {BODY_REGIONS.map((region) => (
          <LabelLine
            key={`label-${region.id}`}
            region={region}
            isHovered={hovered === region.id || selectedRegion === region.id}
            onHover={setHovered}
            onClick={onSelectRegion}
          />
        ))}
      </svg>
    </div>
  );
}