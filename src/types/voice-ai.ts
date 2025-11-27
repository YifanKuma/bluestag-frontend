export type VoiceAIStat = {
    id: number;
    heading: string | null;
    prefix?: string | null;
    value?: number | null;
    suffix?: string | null;
    sub?: string | null;
    explainerTitle?: string | null;
    bullets?: string[] | null;
    hintBars?: boolean | null;
};

export type VoiceAIData = {
    title: string;
    subtitle: string;
    description: string;
    stat: VoiceAIStat[];
};
