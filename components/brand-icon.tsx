"use client";

import { useState } from "react";
import Image from "next/image";

// Хелпер: Используем Unavatar с отключенным фаллбэком (чтобы получить 404 если нет иконки)
const getIconUrl = (domain: string) =>
    `https://unavatar.io/${domain}?fallback=false`;

const DOMAIN_MAP: Record<string, string> = {
    // --- Adobe (Unavatar отлично находит их) ---
    "Adobe Photoshop": "photoshop.adobe.com",
    "Adobe Illustrator": "illustrator.adobe.com",
    "Adobe Lightroom": "lightroom.adobe.com",
    "Adobe Premiere Pro": "adobe.com",
    "Adobe After Effects": "adobe.com",

    // --- Специфичные домены ---
    "Notion": "notion.so",
    "Linear": "linear.app",
    "Zoom": "zoom.us",
    "BigBlueButton": "bigbluebutton.org",
    "Jira": "atlassian.com",
    "Confluence": "atlassian.com",
    "StatusPage": "atlassian.com",
    "Home Automation": "home-assistant.io",
    "Terraform": "terraform.io",
    "Jenkins": "jenkins.io",
    "Sentry": "sentry.io",
    "Linktree": "linktr.ee",
    "WordPress": "wordpress.org",
    "Obsidian": "obsidian.md",
    "Vercel / Netlify": "vercel.com",
    "Bitbucket": "bitbucket.org",
    "Postman": "postman.com",

    // --- Прямые ссылки (если нужно жестко задать картинку) ---
    // Unavatar обычно справляется сам, но можно оставить для надежности
    "Spotify": "spotify.com",
    "Google Photos": "photos.google.com",
};

export function BrandIcon({ name }: { name: string }) {
    const [imageError, setImageError] = useState(false);
    const [prevName, setPrevName] = useState(name);

    // Сброс состояния при смене пропсов (State during render)
    if (name !== prevName) {
        setPrevName(name);
        setImageError(false);
    }

    const resolveLogoUrl = () => {
        let source = DOMAIN_MAP[name];
        if (!source) {
            source = name.split('/')[0].trim().toLowerCase().replace(/\s+/g, '');
        }

        // Если это уже полная ссылка (http)
        if (source.startsWith("http")) return source;

        // Если это домен (есть точка)
        if (source.includes(".")) return getIconUrl(source);

        // Если просто слово -> добавляем .com
        return getIconUrl(`${source}.com`);
    };

    const logoUrl = resolveLogoUrl();

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
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden shrink-0 bg-white dark:bg-slate-800 relative group bg-gray-50 dark:bg-slate-900">
            {!imageError && logoUrl ? (
                <Image
                    src={logoUrl}
                    alt={name}
                    width={36}
                    height={36}
                    className="w-9 h-9 object-contain transition-transform group-hover:scale-110"
                    onError={() => setImageError(true)}
                    unoptimized // Разрешаем внешние URL
                />
            ) : (
                // Фаллбэк (Буква)
                <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-2xl`}>
                    {letter}
                </div>
            )}
        </div>
    );
}