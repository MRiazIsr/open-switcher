"use client";

import { useState } from "react";
import { Star, Shield, Clock, Github, Zap, UserCheck, ChevronDown, ChevronUp } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';
import { BrandIcon } from '@/components/brand-icon';

interface Repo {
    name: string;
    description: string;
    stars: number;
    url: string;
    license: string;
    last_update: string;
}

export function RepoCard({ repo, saasName }: { repo: Repo, saasName: string }) {
    // Состояние: развернут текст или нет
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="group relative bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col h-full">
            {/* Декоративная полоска сверху */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

            {/* Шапка карточки */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                    <BrandIcon name={repo.name} />
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {repo.name}
                        </h2>
                        <div className="flex items-center gap-1 text-yellow-500 text-sm font-medium mt-0.5">
                            <Star className="w-4 h-4 fill-current" />
                            <span>{(repo.stars / 1000).toFixed(1)}k</span>
                        </div>
                    </div>
                </div>

                <div className="hidden sm:flex items-center px-2.5 py-1 rounded-md bg-gray-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium border border-gray-200 dark:border-slate-700">
                    <Shield className="w-3 h-3 mr-1" />
                    {repo.license || "MIT"}
                </div>
            </div>

            {/* ОПИСАНИЕ С ЛОГИКОЙ РАСКРЫТИЯ */}
            <div
                className="mb-6 flex-grow cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <p className={`text-slate-600 dark:text-slate-400 text-sm leading-relaxed transition-all duration-300 ${
                    isExpanded ? "" : "line-clamp-2"
                }`}>
                    {repo.description || `A powerful open-source alternative to ${saasName}.`}
                </p>

                {/* Кнопка "Читать далее" */}
                <button
                    className="mt-1 flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline focus:outline-none"
                >
                    {isExpanded ? (
                        <>Show less <ChevronUp className="w-3 h-3" /></>
                    ) : (
                        <>Read more <ChevronDown className="w-3 h-3" /></>
                    )}
                </button>
            </div>

            {/* Мета данные */}
            <div className="flex items-center gap-4 text-xs text-slate-400 mb-6 border-b border-gray-50 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    Updated: {repo.last_update}
                </div>
            </div>

            {/* БЛОК КНОПОК (DigitalOcean + Fiverr + Source) */}
            <div className="space-y-3 mt-auto">

                <div className="grid grid-cols-2 gap-3">
                    <a
                        href={repo.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center px-4 py-2.5 border border-gray-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors text-sm"
                    >
                        <Github className="w-4 h-4 mr-2" />
                        Source
                    </a>

                    <a
                        href={SITE_CONFIG.DO_REF}
                        target="_blank"
                        className="flex items-center justify-center px-4 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 text-sm group-hover:scale-105 transform duration-200"
                    >
                        <Zap className="w-4 h-4 mr-2 fill-current" />
                        {SITE_CONFIG.CTA_TEXT}
                    </a>
                </div>

                {/* Кнопка Fiverr (Ghost Style) */}
                <a
                    href={SITE_CONFIG.FIVERR_REF}
                    target="_blank"
                    rel="nofollow noreferrer"
                    className="w-full flex items-center justify-center px-4 py-2 border border-green-200 dark:border-green-900/30 text-green-700 dark:text-green-400 font-medium rounded-xl hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors text-sm"
                >
                    <UserCheck className="w-4 h-4 mr-2" />
                    Hire Expert to Install
                </a>

            </div>
        </div>
    );
}