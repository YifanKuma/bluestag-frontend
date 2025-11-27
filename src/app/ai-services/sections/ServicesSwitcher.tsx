import SwitchTabsClient from "./SwitchTabsClient";
import VoiceAISectionWrapper from "../wrappers/VoiceAISectionWrapper";
import VideoAISectionWrapper from "../wrappers/VideoAISectionWrapper";
import AIChatbotSectionWrapper from "../wrappers/AIChatbotSectionWrapper";
import AppDevSectionWrapper from "../wrappers/AppDevSectionWrapper";
import SocialMediaSectionWrapper from "../wrappers/SocialMediaSectionWrapper";

export type CMS_Tab = {
    key: "voice" | "video" | "chatbot" | "appdev" | "social";
    label: string;
};

export default function ServicesSwitcher({tabs}: { tabs: CMS_Tab[] }) {
    const map: Record<string, React.ReactNode> = {
        voice: <VoiceAISectionWrapper/>,
        video: <VideoAISectionWrapper/>,
        chatbot: <AIChatbotSectionWrapper/>,
        appdev: <AppDevSectionWrapper/>,
        social: <SocialMediaSectionWrapper/>,
    };

    return (
        <SwitchTabsClient
            tabs={tabs}
            components={map}
        />
    );
}
