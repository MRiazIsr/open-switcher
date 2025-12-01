import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import { Star, Shield, Clock, ArrowLeft, Github, Zap } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants'; // <--- Импортируем конфиг с рефералкой
import { BrandIcon } from '@/components/brand-icon';

// --- Типы ---
interface Repo {
    name: string;
    description: string;
    stars: number;
    url: string;
    license: string;
    last_update: string;
}

interface PageData {
    saas_name: string;
    slug: string;
    alternatives: Repo[];
}

// --- Получение данных ---
async function getData(slug: string): Promise<PageData | undefined> {
    const filePath = path.join(process.cwd(), 'db.json');
    if (!fs.existsSync(filePath)) return undefined;
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data: PageData[] = JSON.parse(fileContents);
    return data.find((item) => item.slug === slug);
}

export async function generateStaticParams() {
    const filePath = path.join(process.cwd(), 'db.json');
    if (!fs.existsSync(filePath)) return [];
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data: PageData[] = JSON.parse(fileContents);
    return data.map((item) => ({ slug: item.slug }));
}

// --- Страница ---
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const data = await getData(resolvedParams.slug);

    if (!data) notFound();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950 text-slate-900 dark:text-white font-sans transition-colors duration-300">
            {/* Фон */}
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-900/20 -z-10" />

            <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
                {/* Кнопка Назад */}
                <Link
                    href="/"
                    className="inline-flex items-center text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to categories
                </Link>

                {/* Заголовок страницы */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-blue-600 dark:text-blue-300 uppercase bg-blue-100 dark:bg-blue-900/30 rounded-full">
                        Open Source Alternatives
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
                        Stop paying for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">{data.saas_name}</span>
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                        Switch to these powerful, self-hosted alternatives. <br className="hidden md:block"/>
                        Deploy in 1-click or check the source code.
                    </p>
                </div>

                {/* Сетка Альтернатив */}
                <div className="grid gap-6 md:grid-cols-2">
                    {data.alternatives.map((repo) => (
                        <div
                            key={repo.url}
                            className="group relative bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-4">
                                    <BrandIcon name={repo.name} />
                                    <div>
                                        <h2 className="text-xl font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
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

                            <p className="text-slate-600 dark:text-slate-400 mb-6 line-clamp-2 text-sm leading-relaxed flex-grow">
                                {repo.description || `A powerful open-source alternative to ${data.saas_name}.`}
                            </p>

                            <div className="flex items-center gap-4 text-xs text-slate-400 mb-6 border-b border-gray-50 dark:border-slate-800 pb-4">
                                <div className="flex items-center gap-1">
                                    <Clock className="w-3.5 h-3.5" />
                                    Updated: {repo.last_update}
                                </div>
                            </div>

                            {/* КНОПКИ ДЕЙСТВИЯ */}
                            <div className="grid grid-cols-2 gap-3 mt-auto">
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
                                    href={SITE_CONFIG.DO_REF} // <--- ВОТ ВАША ССЫЛКА ИЗ КОНФИГА
                                    target="_blank"
                                    className="flex items-center justify-center px-4 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 text-sm group-hover:scale-105 transform duration-200"
                                >
                                    <Zap className="w-4 h-4 mr-2 fill-current" />
                                    {SITE_CONFIG.CTA_TEXT}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}