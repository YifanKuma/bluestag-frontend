export type Who = "Agent" | "Caller";

export type Msg = Readonly<{ who: Who; text: string }>;

export type Scenario = Readonly<{
    title: string;
    transcript: ReadonlyArray<Msg>;
    audio?: string;
}>;

export const tabs = ["Logistics", "Healthcare", "Financial", "Education", "Recruitment", "Ecommerce"] as const;
export type Tab = (typeof tabs)[number];