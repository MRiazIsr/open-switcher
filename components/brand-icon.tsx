"use client";

import { useState } from "react";

// Словарь: Ключ = Имя, Значение = Домен ИЛИ Прямая ссылка на картинку
const DOMAIN_MAP: Record<string, string> = {
    // ФИКС ДЛЯ ZOOM: Берем иконку напрямую у Google, она точно правильная
    "Zoom": "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://zoom.us&size=128",

    // Остальные домены
    "Google Analytics": "google.com",
    "Firebase": "firebase.google.com",
    "Dropbox / Google Drive": "dropbox.com",
    "LastPass / 1Password": "1password.com",
    "Jira": "atlassian.com",
    "Trello": "trello.com",
    "Slack": "slack.com",
    "Notion": "notion.so",
    "Heroku": "heroku.com",
    "GitHub": "github.com",
    "Figma": "figma.com",
    "Shopify": "shopify.com",
    "Salesforce": "salesforce.com",
    "Zapier": "zapier.com",
    "Calendly": "calendly.com",
    "Mailchimp": "mailchimp.com"
};

export function BrandIcon({ name }: { name: string }) {
    const [imageError, setImageError] = useState(false);

    // Логика выбора URL
    let logoUrl = "";
    const mappedValue = DOMAIN_MAP[name];

    if (mappedValue) {
        // Если в словаре полная ссылка (как у Zoom) — берем её
        if (mappedValue.startsWith("http")) {
            logoUrl = mappedValue;
        } else {
            // Иначе строим ссылку через Clearbit
            logoUrl = `https://logo.clearbit.com/${mappedValue}`;
        }
    } else {
        // Если в словаре нет, пытаемся угадать домен
        const cleanName = name.split('/')[0].trim();
        const domain = cleanName.toLowerCase().replace(/\s+/g, '') + '.com';
        logoUrl = `https://logo.clearbit.com/${domain}`;
    }

    // Генерация градиента для буквы (фаллбэк)
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
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden shrink-0 bg-white dark:bg-slate-800 relative group`}>
            {!imageError ? (
                <img
                    src={logoUrl}
                    alt={name}
                    className="w-9 h-9 object-contain transition-transform group-hover:scale-110"
                    onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        setImageError(true);
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