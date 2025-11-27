import fetch from "node-fetch";

const API_URL = "http://localhost:1337/api/languages";
const TOKEN = "8712f91e3d3b37fae6df9a2a7ee685b008c23e019bffa1d9d8bf9b91343ea8f5b7dfe8605dfa68feb7654e8a39e8eb78d50b639dbd2c95ab51d6f43b3f327859e53c1c8dcd52a14f11590c9d186f994df8dbc744f3aea1a1129694100712c195587c2e05f8a88290aef6e96f9a17b1e0faa4f0b6004fb5274c67e96c7291f038";

const languages = [
    {name: "Bulgarian", native: "Български", code: "bg", flag: "🇧🇬"},
    {name: "Chinese", native: "中文", code: "zh", flag: "🇨🇳"},
    {name: "Czech", native: "Čeština", code: "cs", flag: "🇨🇿"},
    {name: "Danish", native: "Dansk", code: "da", flag: "🇩🇰"},
    {name: "Dutch", native: "Nederlands", code: "nl", flag: "🇳🇱"},
    {name: "English (US)", native: "English (US)", code: "en-US", flag: "🇺🇸"},
    {name: "Finnish", native: "Suomi", code: "fi", flag: "🇫🇮"},
    {name: "French", native: "Français", code: "fr", flag: "🇫🇷"},
    {name: "German", native: "Deutsch", code: "de", flag: "🇩🇪"},
    {name: "Greek", native: "Ελληνικά", code: "el", flag: "🇬🇷"},
    {name: "Hungarian", native: "Magyar", code: "hu", flag: "🇭🇺"},
    {name: "Italian", native: "Italiano", code: "it", flag: "🇮🇹"},
    {name: "Japanese", native: "日本語", code: "ja", flag: "🇯🇵"},
    {name: "Polish", native: "Polski", code: "pl", flag: "🇵🇱"},
    {name: "Portuguese", native: "Português", code: "pt", flag: "🇵🇹"},
    {name: "Romanian", native: "Română", code: "ro", flag: "🇷🇴"},
    {name: "Slovak", native: "Slovenčina", code: "sk", flag: "🇸🇰"},
    {name: "Spanish", native: "Español", code: "es", flag: "🇪🇸"},
    {name: "Vietnamese", native: "Tiếng Việt", code: "vi", flag: "🇻🇳"}
];

for (const lang of languages) {
    await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`
        },
        body: JSON.stringify({data: lang})
    });
}

console.log("Done!");
