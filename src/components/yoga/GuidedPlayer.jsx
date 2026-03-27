import { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipForward, SkipBack, Square, User, Baby } from "lucide-react";
import { Button } from "@/components/ui/button";

const VOICE_OPTIONS = [
  { id: "male", label: "Male", pitch: 0.85, rate: 0.9 },
  { id: "female", label: "Female", pitch: 1.15, rate: 0.93 },
  { id: "kid", label: "Kid", icon: Baby, pitch: 1.6, rate: 1.0 },
];

export default function GuidedPlayer({ asana }) {
  const steps = asana.steps || [asana.description];
  const [selectedVoice, setSelectedVoice] = useState("female");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [voices, setVoices] = useState([]);
  const playingRef = useRef(false);
  const currentStepRef = useRef(0);

  useEffect(() => {
    const load = () => setVoices(window.speechSynthesis.getVoices());
    load();
    window.speechSynthesis.onvoiceschanged = load;
    return () => { window.speechSynthesis.cancel(); playingRef.current = false; };
  }, []);

  const getVoice = (id) => {
    const english = voices.filter(v => v.lang.startsWith("en"));
    const pool = english.length > 0 ? english : voices;
    const female = ["samantha","karen","victoria","moira","alice","ava","zira","kate","serena","female","woman"];
    const male = ["daniel","james","alex","tom","fred","male","man","gordon","rishi","oliver"];
    if (id === "male") return pool.find(v => male.some(n => v.name.toLowerCase().includes(n))) || pool[0];
    return pool.find(v => female.some(n => v.name.toLowerCase().includes(n))) || pool[1] || pool[0];
  };

  const speakStep = (stepIndex) => {
    if (stepIndex >= steps.length) { stop(); return; }
    window.speechSynthesis.cancel();
    const opt = VOICE_OPTIONS.find(v => v.id === selectedVoice);
    const text = `Step ${stepIndex + 1}. ${steps[stepIndex]}`;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = opt.pitch;
    utterance.rate = opt.rate;
    const voice = getVoice(selectedVoice);
    if (voice) utterance.voice = voice;
    utterance.onend = () => {
      if (!playingRef.current) return;
      const next = currentStepRef.current + 1;
      if (next < steps.length) {
        currentStepRef.current = next;
        setCurrentStep(next);
        setTimeout(() => speakStep(next), 600);
      } else {
        stop();
      }
    };
    utterance.onerror = () => stop();
    window.speechSynthesis.speak(utterance);
  };

  const play = () => {
    playingRef.current = true;
    currentStepRef.current = currentStep;
    setIsPlaying(true);
    speakStep(currentStep);
  };

  const pause = () => {
    playingRef.current = false;
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  };

  const stop = () => {
    playingRef.current = false;
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setCurrentStep(0);
    currentStepRef.current = 0;
  };

  const goToStep = (idx) => {
    const wasPlaying = playingRef.current;
    pause();
    const newIdx = Math.max(0, Math.min(steps.length - 1, idx));
    setCurrentStep(newIdx);
    currentStepRef.current = newIdx;
    if (wasPlaying) { setTimeout(() => { playingRef.current = true; setIsPlaying(true); speakStep(newIdx); }, 100); }
  };

  return (
    <div className="space-y-3">
      {/* Steps list */}
      <div className="space-y-1.5">
        {steps.map((step, i) => (
          <button
            key={i}
            onClick={() => goToStep(i)}
            className={`w-full text-left flex gap-3 p-2.5 rounded-lg transition-all text-xs leading-relaxed ${
              i === currentStep
                ? "bg-primary/10 border border-primary/20 text-foreground"
                : "hover:bg-accent/60 text-muted-foreground"
            }`}
          >
            <span className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5 ${
              i === currentStep ? "bg-primary text-primary-foreground" : "bg-accent text-muted-foreground"
            }`}>{i + 1}</span>
            {step}
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Voice selector */}
        <div className="flex items-center bg-accent/60 rounded-full p-0.5 gap-0.5">
          {VOICE_OPTIONS.map(opt => (
            <button key={opt.id} onClick={() => { if (isPlaying) pause(); setSelectedVoice(opt.id); }}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                selectedVoice === opt.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}>{opt.label}</button>
          ))}
        </div>

        <div className="flex items-center gap-1 ml-auto">
          <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => goToStep(currentStep - 1)} disabled={currentStep === 0}>
            <SkipBack className="w-3.5 h-3.5" />
          </Button>
          <Button size="sm" className="rounded-full gap-1.5 h-8 px-4 text-xs" onClick={isPlaying ? pause : play}>
            {isPlaying ? <><Pause className="w-3 h-3" /> Pause</> : <><Play className="w-3 h-3" /> {currentStep > 0 ? "Resume" : "Start Guide"}</>}
          </Button>
          <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => goToStep(currentStep + 1)} disabled={currentStep >= steps.length - 1}>
            <SkipForward className="w-3.5 h-3.5" />
          </Button>
          {(isPlaying || currentStep > 0) && (
            <Button size="icon" variant="ghost" className="h-8 w-8" onClick={stop}>
              <Square className="w-3.5 h-3.5" />
            </Button>
          )}
        </div>
      </div>

      <p className="text-[10px] text-muted-foreground">Step {currentStep + 1} of {steps.length}</p>
    </div>
  );
}