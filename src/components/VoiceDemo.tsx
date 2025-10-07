"use client";
import {Play, Pause} from "lucide-react";
import {useRef, useState} from "react";

export default function VoiceDemo() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [playing, setPlaying] = useState(false);

    const toggle = () => {
        const a = audioRef.current;
        if (!a) return;
        if (playing) {
            a.pause();
        } else {
            a.play();
        }
    };

    return (
        <div className="rounded-2xl border border-gray-200 p-6 flex items-center justify-between">
            <div>
                <p className="text-sm text-gray-600">Sample call</p>
                <p className="font-semibold">“Delivery confirmation — Logistics scenario”</p>
            </div>
            <button
                onClick={toggle}
                className="inline-flex items-center gap-2 rounded-xl bg-sky-700 px-4 py-2 font-semibold text-white hover:opacity-90"
            >
                {playing ? <Pause className="h-4 w-4"/> : <Play className="h-4 w-4"/>}
                {playing ? "Pause" : "Play"}
            </button>
            <audio
                ref={audioRef}
                src="/audio/sample.mp3"
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onEnded={() => setPlaying(false)}
            />
        </div>
    );
}