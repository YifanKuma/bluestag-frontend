// Strong typing for team members
export type TeamMember = {
    name: string;
    role: string;
    bio?: string;
    photo?: string;     // e.g. "/images/team/yifan.jpg"
    initials?: string;  // fallback avatar letters
    tags?: string[];    // <-- optional chips
};

export const team: TeamMember[] = [
    {
        name: "Mel",
        role: "Founder • Product & AI",
        bio: "Leads agent architecture and product. Background in NLP, CV, and scalable systems.",
        initials: "ME",
        tags: ["NLP", "Voice AI", "Product"],
    },
    {
        name: "Jeesie",
        role: "Engineering Advisor",
        bio: "Helps harden infra, latency budgets, and deployment playbooks.",
        initials: "JE",
        tags: ["Infra", "Latency"],
    },
    {
        name: "Yifan",
        role: "Research Advisor",
        bio: "Guides experimentation and evaluation for agent reliability.",
        initials: "YF",
        tags: ["Research", "Eval"],
    },
];