import { useState, useEffect, useRef } from "react";
import { Volume2, Square, User, Baby } from "lucide-react";
import { Button } from "@/components/ui/button";

const VOICE_OPTIONS = [
  { id: "male", label: "Male", icon: User, pitch: 0.85, rate: 0.92 },
  { id: "female", label: "Female", icon: User, pitch: 1.15, rate: 0.95 },
  { id: "kid", label: "Kid", icon: Baby, pitch: 1.6, rate: 1.05 },
];

export default function VoicePlayer({ text }) {
  const [selectedVoice, setSelectedVoice] = useState("female");
  const [isPlaying, setIsPlaying] = useState(false);
  const [voices, setVoices] = useState([]);
  const utteranceRef = useRef(null);

  useEffect(() => {
    const loadVoices = () => {
      const v = window.speechSynthesis.getVoices();
      setVoices(v);
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const handlePlay = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    const option = VOICE_OPTIONS.find((v) => v.id === selectedVoice);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = option.pitch;
    utterance.rate = option.rate;

    // Try to find an appropriate voice
    if (voices.length > 0) {
      const englishVoices = voices.filter((v) => v.lang.startsWith("en"));
      if (selectedVoice === "male") {
        const male = englishVoices.find((v) => v.name.toLowerCase().includes("male") || v.name.toLowerCase().includes("daniel") || v.name.toLowerCase().includes("james"));
        if (male) utterance.voice = male;
      } else if (selectedVoice === "female") {
        const female = englishVoices.find((v) => v.name.toLowerCase().includes("female") || v.name.toLowerCase().includes("samantha") || v.name.toLowerCase().includes("karen"));
        if (female) utterance.voice = female;
      }
      // Kid voice uses pitch manipulation so any voice works
    }

    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    utteranceRef.current = utterance;

    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <div className="flex items-center bg-accent/60 rounded-full p-0.5 gap-0.5">
        {VOICE_OPTIONS.map((opt) => {
          const Icon = opt.icon;
          return (
            <button
              key={opt.id}
              onClick={() => {
                if (isPlaying) {
                  window.speechSynthesis.cancel();
                  setIsPlaying(false);
                }
                setSelectedVoice(opt.id);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                selectedVoice === opt.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="w-3 h-3" />
              {opt.label}
            </button>
          );
        })}
      </div>
      <Button
        size="sm"
        variant={isPlaying ? "destructive" : "default"}
        onClick={handlePlay}
        className="rounded-full gap-1.5 h-8 px-4 text-xs"
      >
        {isPlaying ? (
          <>
            <Square className="w-3 h-3" /> Stop
          </>
        ) : (
          <>
            <Volume2 className="w-3 h-3" /> Listen
          </>
        )}
      </Button>
    </div>
  );
}