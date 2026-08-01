"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Play, Pause, ArrowLeft, Volume2, Headphones, Sparkles } from "lucide-react";

/* ---------------------------------------------------------
   Content: quotes + chakra meditation data
--------------------------------------------------------- */

const QUOTES = [
  "Progress isn't a straight line, and neither is peace of mind.",
  "You don't have to fix everything today. Breathing well is enough for now.",
  "Rest is not a reward for productivity. It's a requirement for being human.",
  "Small, steady care for yourself outlasts occasional grand gestures.",
  "Your feelings are information, not instructions.",
  "The calmest people you know are still practicing, not finished.",
  "Notice one good thing today. That's the whole practice.",
  "You are allowed to take up space, even in your own mind.",
  "Healing isn't linear, but it is happening.",
  "A slower breath can change the next five minutes of your life.",
  "You are not behind. There is no schedule for becoming yourself.",
  "Kindness toward yourself is a skill, and skills improve with practice.",
  "The goal isn't to never struggle. It's to struggle with support.",
  "Today, let good enough be good enough.",
  "Your nervous system remembers safety. Give it a reason to.",
  "You can hold two things at once: this is hard, and I am capable.",
  "Stillness is not empty. It's where you hear yourself think.",
  "One honest breath is worth more than ten held ones.",
  "You are the calm you've been looking for, one practice at a time.",
  "Growth often looks like rest from the outside.",
  "Show up for yourself the way you would for a friend.",
];

function todaysQuote() {
  const start = new Date(new Date().getFullYear(), 0, 0);
  const diff = new Date() - start;
  const dayOfYear = Math.floor(diff / 86400000);
  return QUOTES[dayOfYear % QUOTES.length];
}

// Carrier tone + beat (L/R difference) per center. Beat frequencies sit in the
// theta/alpha range commonly used for relaxed, meditative listening.
const CHAKRAS = [
  {
    id: "root",
    name: "Root",
    sanskrit: "Muladhara",
    focus: "Grounding & stability",
    color: "#C8443D",
    colorSoft: "#3A2224",
    carrier: 396,
    beat: 6,
    duration: 300,
    steps: [
      "Settle into a comfortable seated position and let your spine lengthen naturally.",
      "Bring your attention to where your body meets the ground beneath you.",
      "With each exhale, imagine roots extending downward, anchoring you to the earth.",
      "Notice any tension in your legs or hips, and let it soften with your breath.",
      "Silently repeat: I am supported. I am safe. I am here.",
      "Slowly bring movement back to your fingers and toes before opening your eyes.",
    ],
  },
  {
    id: "sacral",
    name: "Sacral",
    sanskrit: "Svadhisthana",
    focus: "Creativity & flow",
    color: "#D97D34",
    colorSoft: "#3A2C1E",
    carrier: 417,
    beat: 6,
    duration: 330,
    steps: [
      "Rest your hands gently over your lower belly and take three slow breaths.",
      "Picture a warm, fluid light pooling just below your navel.",
      "Let your breath move like water — no force, only flow.",
      "Notice any emotion that arises, and let it pass through without judgment.",
      "Silently repeat: I allow myself to feel. I allow myself to flow.",
      "Gently deepen your breath and return your awareness to the room.",
    ],
  },
  {
    id: "solar",
    name: "Solar Plexus",
    sanskrit: "Manipura",
    focus: "Confidence & drive",
    color: "#E0B23C",
    colorSoft: "#3A3320",
    carrier: 528,
    beat: 8,
    duration: 360,
    steps: [
      "Sit tall and place a hand just above your stomach.",
      "Breathe in for a count of four, feeling your midsection expand.",
      "Hold briefly, sensing a quiet strength gathering there.",
      "Exhale for a count of six, releasing self-doubt with the breath.",
      "Silently repeat: I trust my own direction.",
      "Take one final full breath, then open your eyes.",
    ],
  },
  {
    id: "heart",
    name: "Heart",
    sanskrit: "Anahata",
    focus: "Compassion & connection",
    color: "#4C8C6B",
    colorSoft: "#1F3329",
    carrier: 639,
    beat: 7,
    duration: 390,
    steps: [
      "Rest a hand over your chest and feel it rise and fall.",
      "Bring to mind someone or something you feel grateful for.",
      "On your next inhale, breathe in warmth; on the exhale, offer it outward.",
      "Let your shoulders soften away from your ears.",
      "Silently repeat: I give and receive with an open heart.",
      "Sit for a moment in the quiet that follows.",
    ],
  },
  {
    id: "throat",
    name: "Throat",
    sanskrit: "Vishuddha",
    focus: "Expression & truth",
    color: "#3E8FB0",
    colorSoft: "#1E2E36",
    carrier: 741,
    beat: 9,
    duration: 330,
    steps: [
      "Roll your shoulders back and let your throat soften.",
      "Inhale slowly through the nose, exhale with a soft, audible sigh.",
      "Notice anything left unsaid, and simply acknowledge it without needing to act.",
      "Imagine a clear light at the base of your throat, unobstructed.",
      "Silently repeat: I speak and hear the truth with ease.",
      "Let your breath return to its natural, quiet rhythm.",
    ],
  },
  {
    id: "third-eye",
    name: "Third Eye",
    sanskrit: "Ajna",
    focus: "Insight & clarity",
    color: "#4C5FA6",
    colorSoft: "#212537",
    carrier: 852,
    beat: 5,
    duration: 360,
    steps: [
      "Close your eyes and rest your gaze gently inward, toward the space between your brows.",
      "Slow your breath until it feels almost imperceptible.",
      "Let go of the need to figure anything out right now.",
      "Notice whatever quietly arises — an image, a feeling, a thought — without chasing it.",
      "Silently repeat: I see clearly. I trust what I know.",
      "When ready, let your awareness widen back out to the room.",
    ],
  },
  {
    id: "crown",
    name: "Crown",
    sanskrit: "Sahasrara",
    focus: "Spaciousness & presence",
    color: "#8B5FBF",
    colorSoft: "#2A2138",
    carrier: 963,
    beat: 4,
    duration: 420,
    steps: [
      "Let your body settle completely, spine tall but unforced.",
      "Imagine the crown of your head opening softly, like a window letting in light.",
      "With each breath, feel the boundary between yourself and the space around you soften.",
      "Rest here without an agenda — nothing to reach for, nothing to fix.",
      "Silently repeat: I am part of something larger than myself.",
      "Slowly, gently, return your attention to the room around you.",
    ],
  },
];

/* ---------------------------------------------------------
   Audio engine: two detuned oscillators panned hard L/R
--------------------------------------------------------- */

function useBinauralBeat({ baseFreq, beatFreq, playing, volume }) {
  const ctxRef = useRef(null);
  const nodesRef = useRef(null);

  useEffect(() => {
    if (!playing) return undefined;

    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioCtx();
    ctxRef.current = ctx;

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.0001, ctx.currentTime);
    masterGain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 1.2);
    masterGain.connect(ctx.destination);

    const left = ctx.createOscillator();
    left.type = "sine";
    left.frequency.setValueAtTime(baseFreq, ctx.currentTime);
    const leftPan = ctx.createStereoPanner();
    leftPan.pan.setValueAtTime(-1, ctx.currentTime);
    left.connect(leftPan).connect(masterGain);

    const right = ctx.createOscillator();
    right.type = "sine";
    right.frequency.setValueAtTime(baseFreq + beatFreq, ctx.currentTime);
    const rightPan = ctx.createStereoPanner();
    rightPan.pan.setValueAtTime(1, ctx.currentTime);
    right.connect(rightPan).connect(masterGain);

    left.start();
    right.start();
    nodesRef.current = { left, right, masterGain };

    return () => {
      const nodes = nodesRef.current;
      const activeCtx = ctxRef.current;
      if (nodes && activeCtx) {
        const now = activeCtx.currentTime;
        try {
          nodes.masterGain.gain.cancelScheduledValues(now);
          nodes.masterGain.gain.setValueAtTime(nodes.masterGain.gain.value, now);
          nodes.masterGain.gain.linearRampToValueAtTime(0.0001, now + 0.25);
        } catch (e) {
          /* no-op */
        }
      }
      setTimeout(() => {
        try {
          nodes?.left.stop();
          nodes?.right.stop();
          activeCtx?.close();
        } catch (e) {
          /* no-op */
        }
      }, 300);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, baseFreq, beatFreq]);

  useEffect(() => {
    const nodes = nodesRef.current;
    const activeCtx = ctxRef.current;
    if (nodes && activeCtx) {
      nodes.masterGain.gain.linearRampToValueAtTime(volume, activeCtx.currentTime + 0.15);
    }
  }, [volume]);
}

/* ---------------------------------------------------------
   Small presentational pieces
--------------------------------------------------------- */

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function BreathingOrb({ color, active }) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 180, height: 180 }}>
      <div
        className="orb-ring"
        style={{
          background: `radial-gradient(circle at 35% 30%, ${color}CC, ${color}22 60%, transparent 72%)`,
        }}
      />
      <div
        className="orb-core breathe"
        style={{
          background: `radial-gradient(circle at 40% 35%, ${color}FF, ${color}88 55%, ${color}22 100%)`,
          boxShadow: `0 0 60px ${color}55`,
          animationPlayState: active ? "running" : "running",
        }}
      />
    </div>
  );
}

function QuoteCard({ quote }) {
  return (
    <div className="rounded-2xl border card-surface px-6 py-5 sm:px-8 sm:py-6">
      <div className="flex items-center gap-2 mb-3 label-eyebrow">
        <Sparkles size={14} strokeWidth={2} />
        <span>Today's reflection</span>
      </div>
      <p className="quote-text">{quote}</p>
    </div>
  );
}

function ChakraCard({ chakra, onSelect }) {
  return (
    <button
      onClick={() => onSelect(chakra)}
      className="chakra-card group rounded-2xl border card-surface text-left px-5 py-5 w-full transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      style={{ outlineColor: chakra.color }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="label-eyebrow mb-1">{chakra.sanskrit}</div>
          <h3 className="chakra-name">{chakra.name}</h3>
          <p className="chakra-focus">{chakra.focus}</p>
        </div>
        <span
          className="chakra-dot shrink-0"
          style={{ background: chakra.color, boxShadow: `0 0 18px ${chakra.color}99` }}
        />
      </div>
      <div className="flex items-center justify-between mt-5 pt-4 chakra-card-footer">
        <span className="meta-text">{Math.round(chakra.duration / 60)} min guided</span>
        <span className="meta-text meta-hz">
          {chakra.carrier} Hz · {chakra.beat} Hz beat
        </span>
      </div>
    </button>
  );
}

/* ---------------------------------------------------------
   Player screen
--------------------------------------------------------- */

function PlayerScreen({ chakra, onBack }) {
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [volume, setVolume] = useState(0.35);
  const intervalRef = useRef(null);

  useBinauralBeat({
    baseFreq: chakra.carrier,
    beatFreq: chakra.beat,
    playing,
    volume,
  });

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setElapsed((prev) => {
          if (prev + 1 >= chakra.duration) {
            clearInterval(intervalRef.current);
            setPlaying(false);
            return chakra.duration;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing]);

  const stepDuration = chakra.duration / chakra.steps.length;
  const stepIndex = Math.min(chakra.steps.length - 1, Math.floor(elapsed / stepDuration));
  const progress = elapsed / chakra.duration;
  const finished = elapsed >= chakra.duration;

  const handleToggle = () => {
    if (finished) {
      setElapsed(0);
      setPlaying(true);
    } else {
      setPlaying((p) => !p);
    }
  };

  const handleBack = () => {
    setPlaying(false);
    onBack();
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-6 pb-16 pt-8" style={{ background: `linear-gradient(180deg, ${chakra.colorSoft}, var(--ink) 60%)` }}>
      <div className="w-full max-w-md">
        <button onClick={handleBack} className="back-btn mb-8">
          <ArrowLeft size={16} strokeWidth={2} />
          <span>All centers</span>
        </button>

        <div className="flex flex-col items-center text-center mb-8">
          <BreathingOrb color={chakra.color} active={playing} />
          <div className="label-eyebrow mt-6">{chakra.sanskrit}</div>
          <h1 className="player-title">{chakra.name}</h1>
          <p className="chakra-focus mt-1">{chakra.focus}</p>
        </div>

        <div className="rounded-2xl border card-surface px-6 py-6 mb-6">
          <p className="step-text" key={stepIndex}>
            {chakra.steps[stepIndex]}
          </p>
        </div>

        <div className="mb-6">
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${progress * 100}%`, background: chakra.color }}
            />
          </div>
          <div className="flex justify-between mt-2 meta-text">
            <span>{formatTime(elapsed)}</span>
            <span>{formatTime(chakra.duration)}</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 mb-8">
          <button
            onClick={handleToggle}
            className="play-btn"
            style={{ background: chakra.color }}
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? <Pause size={22} fill="currentColor" /> : <Play size={22} fill="currentColor" style={{ marginLeft: 2 }} />}
          </button>
        </div>

        <div className="flex items-center gap-3 mb-3">
          <Volume2 size={16} strokeWidth={2} className="meta-text" />
          <input
            type="range"
            min="0"
            max="0.7"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="volume-slider w-full"
            style={{ accentColor: chakra.color }}
          />
        </div>

        <div className="flex items-center gap-2 justify-center meta-text headphone-note">
          <Headphones size={14} strokeWidth={2} />
          <span>Best experienced with stereo headphones</span>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   Home screen
--------------------------------------------------------- */

function HomeScreen({ onSelect }) {
  const quote = useMemo(() => todaysQuote(), []);
  const todayLabel = useMemo(
    () => new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" }),
    []
  );

  return (
    <div className="min-h-screen px-6 pb-20 pt-10 sm:pt-14">
      <div className="w-full max-w-3xl mx-auto">
        <header className="flex flex-col items-center text-center mb-10">
          <div className="label-eyebrow mb-4">{todayLabel}</div>
          <BreathingOrb color="#8B5FBF" active />
          <h1 className="app-title mt-6">Still Point</h1>
          <p className="app-subtitle mt-2">A quiet daily practice, paired with sound.</p>
        </header>

        <section className="mb-10">
          <QuoteCard quote={quote} />
        </section>

        <section>
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="section-title">Guided centers</h2>
            <span className="meta-text">7 practices</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {CHAKRAS.map((c) => (
              <ChakraCard key={c.id} chakra={c} onSelect={onSelect} />
            ))}
          </div>
        </section>

        <footer className="mt-14 disclaimer">
          Chakra associations and binaural beat frequencies are offered here as a traditional,
          complementary wellness practice — not a clinically proven treatment. If you're
          managing a mental health condition, this app is a companion to professional care,
          not a substitute for it.
        </footer>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   Root app
--------------------------------------------------------- */

export default function StillPointApp() {
  const [active, setActive] = useState(null);

  const handleSelect = useCallback((chakra) => setActive(chakra), []);
  const handleBack = useCallback(() => setActive(null), []);

  return (
    <div className="wellness-app">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Sora:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

        .wellness-app {
          --ink: #171225;
          --surface: #221C36;
          --line: #3A3153;
          --text: #F3EFE7;
          --text-muted: #ABA1C4;
          background: var(--ink);
          color: var(--text);
          font-family: 'Sora', sans-serif;
          min-height: 100vh;
        }

        .app-title {
          font-family: 'Fraunces', serif;
          font-weight: 500;
          font-size: 2.5rem;
          letter-spacing: -0.01em;
        }
        .app-subtitle {
          color: var(--text-muted);
          font-size: 0.95rem;
        }
        .player-title {
          font-family: 'Fraunces', serif;
          font-weight: 500;
          font-size: 2rem;
          margin-top: 0.15rem;
        }
        .section-title {
          font-family: 'Fraunces', serif;
          font-weight: 500;
          font-size: 1.25rem;
        }
        .label-eyebrow {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text-muted);
        }
        .card-surface {
          background: var(--surface);
          border-color: var(--line);
        }
        .quote-text {
          font-family: 'Fraunces', serif;
          font-weight: 400;
          font-size: 1.35rem;
          line-height: 1.5;
          color: var(--text);
        }
        .chakra-name {
          font-family: 'Fraunces', serif;
          font-weight: 500;
          font-size: 1.15rem;
          margin-top: 0.1rem;
        }
        .chakra-focus {
          color: var(--text-muted);
          font-size: 0.85rem;
          margin-top: 0.15rem;
        }
        .chakra-dot {
          width: 12px;
          height: 12px;
          border-radius: 999px;
          margin-top: 4px;
        }
        .chakra-card-footer {
          border-top: 1px solid var(--line);
        }
        .meta-text {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.72rem;
          color: var(--text-muted);
          letter-spacing: 0.02em;
        }
        .meta-hz { opacity: 0.85; }

        .back-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          color: var(--text-muted);
          font-size: 0.85rem;
          font-family: 'Sora', sans-serif;
          transition: color 0.2s ease;
        }
        .back-btn:hover { color: var(--text); }

        .step-text {
          font-family: 'Fraunces', serif;
          font-size: 1.15rem;
          line-height: 1.6;
          text-align: center;
          animation: fadein 0.6s ease;
        }
        @keyframes fadein {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .progress-track {
          width: 100%;
          height: 3px;
          background: var(--line);
          border-radius: 999px;
          overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          transition: width 1s linear;
        }

        .play-btn {
          width: 64px;
          height: 64px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #171225;
          transition: transform 0.15s ease;
        }
        .play-btn:hover { transform: scale(1.05); }
        .play-btn:active { transform: scale(0.96); }

        .volume-slider {
          height: 3px;
          background: var(--line);
          border-radius: 999px;
        }

        .headphone-note { opacity: 0.75; }

        .disclaimer {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.7rem;
          line-height: 1.6;
          color: var(--text-muted);
          border-top: 1px solid var(--line);
          padding-top: 1.25rem;
          text-align: center;
          max-width: 40rem;
          margin-left: auto;
          margin-right: auto;
          opacity: 0.8;
        }

        .orb-ring {
          position: absolute;
          width: 180px;
          height: 180px;
          border-radius: 999px;
          filter: blur(2px);
        }
        .orb-core {
          position: relative;
          width: 92px;
          height: 92px;
          border-radius: 999px;
        }
        .breathe {
          animation: breathe 5.5s ease-in-out infinite;
        }
        @keyframes breathe {
          0%, 100% { transform: scale(0.85); }
          50% { transform: scale(1.08); }
        }
        @media (prefers-reduced-motion: reduce) {
          .breathe { animation: none; }
          .step-text { animation: none; }
        }
      `}</style>

      {active ? (
        <PlayerScreen chakra={active} onBack={handleBack} />
      ) : (
        <HomeScreen onSelect={handleSelect} />
      )}
    </div>
  );
}
