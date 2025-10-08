"use client";

import {useState} from "react";
import DemoModal from "@/components/DemoModal";
import type {Scenario} from "@/types/demo"; // if you have this type. If not, remove this line.

const defaultScenario: Scenario = {
    title: "Logistics: Delivery Confirmation",
    transcript: [
        {who: "Agent", text: "Hi! I'm your delivery assistant. Are you available between 2–4 PM today?"},
        {who: "Caller", text: "Yes, that window works for me."},
        {who: "Agent", text: "Great. I’ll confirm the driver and send a text 30 minutes before arrival."},
        {who: "Caller", text: "Perfect, thanks!"},
    ],
    // audio is optional in your type; include if your DemoModal uses it:
    // audio: "/audio/sample-logistics.mp3",
};

export default function DemoModalClient() {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* put your button/triggers anywhere */}
            {/* <Button onClick={() => setOpen(true)}>Live Call</Button> */}

            <DemoModal
                open={open}                 // ✅ correct prop name
                onClose={() => setOpen(false)} // ✅ matches expected type
                scenario={defaultScenario}  // ✅ required by DemoModal
                // If DemoModal ALSO accepts onStartCall as an optional prop, you can pass it:
                // onStartCall={() => {/* start demo */}}
            />
        </>
    );
}