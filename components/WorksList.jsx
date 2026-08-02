"use client";

import { useState } from "react";
import { ArrowUpRight, Play } from "lucide-react";

export default function WorksList({ works }) {
  const [hoveredId, setHoveredId] = useState(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [expandedId, setExpandedId] = useState(null);

  const hovered = works.find((w) => w.id === hoveredId);

  return (
    <div
      className="relative"
      onMouseMove={(e) => setMouse({ x: e.clientX, y: e.clientY })}
    >
      {works.map((work, i) => {
        const expanded = expandedId === work.id;
        return (
          <div key={work.id} className="work-row-wrap">
            <button
              onMouseEnter={() => setHoveredId(work.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => setExpandedId(expanded ? null : work.id)}
              className="work-row group"
            >
              <span className="eyebrow work-index">{String(i + 1).padStart(2, "0")}</span>
              <span className="work-title font-display">{work.title}</span>
              <span className="work-meta">
                {work.category}
                {work.year ? ` · ${work.year}` : ""}
              </span>
              <ArrowUpRight
                size={20}
                className={`text-muted transition-transform duration-300 ${
                  expanded ? "rotate-90 text-amber" : "group-hover:text-amber group-hover:rotate-45"
                }`}
              />
            </button>

            {expanded && (
              <div className="work-embed">
                <div className="aspect-video rounded-xl overflow-hidden border border-line">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${work.videoId}?autoplay=1&rel=0`}
                    title={work.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Cursor-following preview thumbnail — desktop hover only */}
      {hovered && (
        <div
          className="cursor-preview hidden md:block"
          style={{ left: mouse.x, top: mouse.y }}
          aria-hidden="true"
        >
          <img
            src={`https://img.youtube.com/vi/${hovered.videoId}/hqdefault.jpg`}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="cursor-preview-play">
            <Play size={18} fill="currentColor" />
          </div>
        </div>
      )}
    </div>
  );
}
