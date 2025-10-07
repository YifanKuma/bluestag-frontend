"use client";

import {useEffect, useRef, useState} from "react";
import {PhoneCall, X, Play} from "lucide-react";
import type {Scenario} from "@/types/demo";

export default function DemoModal({
                                      open,
                                      onClose,
                                      scenario,
                                  }: {
    open: boolean;
    onClose: () => void;
    scenario: Scenario;
}) {
    const [idx, setIdx] = useState(0);
    const [started, setStarted] = useState(false);
    const [ringing, setRinging] = useState(false);
    const ringRef = useRef<HTMLAudioElement | null>(null);
    const voiceRef = useRef<HTMLAudioElement | null>(null);
    const ticker = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (open) {
            setIdx(0);
            setStarted(false);
            setRinging(false);
        } else {
            if (ticker.current) clearInterval(ticker.current);
            ringRef.current?.pause();
            voiceRef.current?.pause();
        }
    }, [open]);

    const startSim = () => {
        if (started) return;
        setStarted(true);
        setRinging(true);
        ringRef.current?.play().catch(() => {
        });
        setTimeout(() => {
            setRinging(false);
            ringRef.current?.pause();
            if (scenario.audio) voiceRef.current?.play().catch(() => {
            });
            ticker.current = setInterval(() => {
                setIdx((i) => {
                    if (i + 1 >= scenario.transcript.length) {
                        if (ticker.current) clearInterval(ticker.current);
                        return i + 1;
                    }
                    return i + 1;
                });
            }, 1100);
        }, 1500);
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50" onClick={onClose}/>
            <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-xl border border-gray-200">
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-700">
              <PhoneCall size={18}/>
            </span>
                        <h4 className="font-semibold">{scenario.title}</h4>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100">
                        <X size={18}/>
                    </button>
                </div>

                <div className="p-4">
                    {!started ? (
                        <div className="rounded-xl border border-dashed border-gray-300 p-6 text-center text-gray-600">
                            <p className="text-sm">Click “Start Demo” to simulate a 2-minute call.</p>
                            <button
                                onClick={startSim}
                                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                            >
                                <Play size={16}/> Start Demo
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-3 max-h-[50vh] overflow-auto pr-1">
                            {ringing && <div className="text-center text-sm text-gray-500">📞 Ringing…</div>}
                            {scenario.transcript.slice(0, idx).map((m, i) => (
                                <div key={i} className={`flex ${m.who === "Agent" ? "justify-start" : "justify-end"}`}>
                                    <div
                                        className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                                            m.who === "Agent" ? "bg-gray-100 text-gray-900" : "bg-blue-600 text-white"
                                        }`}
                                    >
                                        <div className="text-xs opacity-70 mb-1">{m.who}</div>
                                        <div>{m.text}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-between p-4 border-t border-gray-200">
                    <div className="text-xs text-gray-500">This is a simulated call for demo purposes.</div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => {
                                if (!started) startSim();
                                else setIdx((i) => Math.min(i + 1, scenario.transcript.length));
                            }}
                            className="rounded-xl border px-3 py-1.5 hover:bg-gray-50"
                        >
                            {started ? "Next line" : "Start Demo"}
                        </button>
                        <button onClick={onClose}
                                className="rounded-xl bg-blue-600 px-3 py-1.5 text-white hover:bg-blue-700">
                            Close
                        </button>
                    </div>
                </div>

                <audio ref={ringRef} src="/audio/ring.mp3" preload="auto"/>
                {scenario.audio && <audio ref={voiceRef} src={scenario.audio} preload="auto"/>}
            </div>
        </div>
    );
}