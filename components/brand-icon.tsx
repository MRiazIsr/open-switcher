"use client";

import { useState } from "react";

// Хелпер для генерации ссылки Google Favicon (размер 128px)
const getGoogleIcon = (domain: string) =>
    `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${domain}&size=128`;

// Словарь исключений
const DOMAIN_MAP: Record<string, string> = {
    // --- Adobe Suite (Все ведут на Adobe, но через Google иконка точно будет) ---
    "Adobe Photoshop": getGoogleIcon("photoshop.adobe.com"),
    "Adobe Illustrator": getGoogleIcon("adobe.com"),
    "Adobe Lightroom": getGoogleIcon("lightroom.adobe.com"),
    "Adobe Premiere Pro": getGoogleIcon("adobe.com"),
    "Adobe After Effects": getGoogleIcon("adobe.com"),

    // --- Сложные случаи ---
    "Zoom": getGoogleIcon("zoom.us"),
    "Spotify": getGoogleIcon("open.spotify.com"), // Иконка плеера обычно красивее
    "Google Photos": getGoogleIcon("photos.google.com"),
    "Google Drive": getGoogleIcon("drive.google.com"),
    "Google Analytics": getGoogleIcon("analytics.google.com"),
    "Firebase": getGoogleIcon("firebase.google.com"),

    // --- Стандартные маппинги (просто домены) ---
    "Vercel / Netlify": "vercel.com",
    "Dropbox / Google Drive": "dropbox.com",
    "LastPass / 1Password": "1password.com",
    "Jira": "atlassian.com",
    "Confluence": "atlassian.com",
    "Trello": "trello.com",
    "Notion": "notion.so",
    "Linear": "linear.app",
    "Heroku": "heroku.com",
    "Slack": "slack.com",
    "Discord": "discord.com",
    "GitHub": "github.com",
    "GitLab": "gitlab.com",
    "Figma": "figma.com",
    "Canva": "canva.com",
    "Shopify": "shopify.com",
    "Salesforce": "salesforce.com",
    "HubSpot": "hubspot.com",
    "Mailchimp": "mailchimp.com",
    "Twitter / X": "twitter.com",
    "Instagram": "instagram.com",
    "Reddit": "reddit.com",
    "YouTube": "youtube.com",
    "Netflix": "netflix.com",
    "Medium": "medium.com",
    "Substack": "substack.com",
    "WordPress": "wordpress.org",
    "ChatGPT": "openai.com",
    "MidJourney": "midjourney.com",
    "Home Automation": "home-assistant.io",
    "VPN Services": "wireguard.com"
};

export function BrandIcon({ name }: { name: string }) {
    const [imageError, setImageError] = useState(false);
    const [useGoogleFallback, setUseGoogleFallback] = useState(false);

    // 1. Определяем домен или URL
    let logoUrl = "";
    const mappedValue = DOMAIN_MAP[name];

    // Логика получения URL
    const getUrl = () => {
        // Если мы уже переключились на Google Fallback
        if (useGoogleFallback) {
            // Пытаемся угадать домен из названия
            const cleanName = name.split('/')[0].trim().toLowerCase().replace(/\s+/g, '');
            return getGoogleIcon(`${cleanName}`);
        }

        // Если есть в словаре
        if (mappedValue) {
            if (mappedValue.startsWith("http")) return mappedValue; // Это уже готовая ссылка
            return `https://logo.clearbit.com/${mappedValue}`; // Это домен для Clearbit
        }

        // Иначе пробуем угадать через Clearbit
        const cleanName = name.split('/')[0].trim().toLowerCase().replace(/\s+/g, '');
        return `https://logo.clearbit.com/${cleanName}.com`;
    };

    logoUrl = getUrl();

    // Градиент для буквы
    const letter = name.charAt(0).toUpperCase();
    const gradients = [
        'from-blue-600 to-indigo-600',
        'from-emerald-500 to-teal-500',
        'from-orange-500 to-red-500',
        'from-purple-600 to-pink-600',
        'from-cyan-500 to-blue-500'
    ];
    const index = name.length % gradients.length;
    const gradient = gradients[index];

    return (
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden shrink-0 bg-white dark:bg-slate-800 relative group">
            {!imageError ? (
                <img
                    src={logoUrl}
                    alt={name}
                    className="w-9 h-9 object-contain transition-transform group-hover:scale-110"
                    onError={() => {
                        if (!useGoogleFallback) {
                            // Если Clearbit не сработал -> пробуем Google
                            setUseGoogleFallback(true);
                        } else {
                            // Если и Google не сработал -> показываем букву
                            setImageError(true);
                        }
                    }}
                />
            ) : (
                <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-2xl`}>
                    {letter}
                </div>
            )}
        </div>
    );
}