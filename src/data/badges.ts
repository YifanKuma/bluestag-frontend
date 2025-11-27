import {
    Cloud,
    Zap,
    ShieldCheck,
    Cpu,
    Database,
} from "lucide-react";

import type {LucideIcon} from "lucide-react";

export const BADGE_ICON_MAP: Record<string, LucideIcon> = {
    cloud: Cloud,
    lightning: Zap,
    secure: ShieldCheck,
    compute: Cpu,
    storage: Database,

    default: Cpu,
};
