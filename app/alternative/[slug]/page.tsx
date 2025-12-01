import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
// Импортируем иконки
import { Star, Shield, Clock, ExternalLink, ArrowLeft, Server, Github } from 'lucide-react';

// --- Типы данных ---
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

// --- Логика (Backend) ---
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

// --- UI Компоненты ---

// 1. Компонент "Аватарка" (Генерирует градиентный квадрат с буквой)
const RepoIcon = ({ name }: { name: string }) => {
    const letter = name.charAt(0).toUpperCase();
    // Разные градиенты в зависимости от первой буквы (для разнообразия)
    const gradients = [
        'from-blue-500 to-cyan-500',
        'from-purple-500 to-pink-500',
        'from-orange-500 to-red-500',
        'from-emerald-500 to-teal-500'
    ];
    const randomGradient = gradients[name.length % gradients.length];

    return (
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${randomGradient} flex items-center justify-center shadow-lg text-white font-bold text-xl`}>
            {letter}
        </div>
    );
};

// --- Основная страница ---
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const data = await getData(resolvedParams.slug);

    if (!data) notFound();

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
            {/* Верхний декоративный фон */}
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-50 to-transparent -z-10" />

            <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
                {/* Хлебные крошки */}
                <Link
                    href="/"
                    className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to categories
                </Link>

                {/* Заголовок страницы */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-blue-600 uppercase bg-blue-100 rounded-full">
                        Open Source Alternatives
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-6">
                        Stop paying for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{data.saas_name}</span>
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Switch to these powerful, self-hosted alternatives. <br className="hidden md:block"/>
                        Secure, private, and free forever.
                    </p>
                </div>

                {/* Сетка карточек */}
                <div className="grid gap-6 md:grid-cols-2">
                    {data.alternatives.map((repo) => (
                        <div
                            key={repo.url}
                            className="group relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                        >
                            {/* Эффект свечения при наведении */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-4">
                                    <RepoIcon name={repo.name} />
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                            {repo.name}
                                        </h2>
                                        <div className="flex items-center gap-1 text-yellow-500 text-sm font-medium mt-0.5">
                                            <Star className="w-4 h-4 fill-current" />
                                            <span>{(repo.stars / 1000).toFixed(1)}k</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Бейдж Лицензии */}
                                <div className="hidden sm:flex items-center px-2.5 py-1 rounded-md bg-gray-100 text-gray-600 text-xs font-medium border border-gray-200">
                                    <Shield className="w-3 h-3 mr-1" />
                                    {repo.license || "MIT"}
                                </div>
                            </div>

                            <p className="text-gray-600 mb-6 line-clamp-2 h-12 text-sm leading-relaxed">
                                {repo.description || `A powerful open-source alternative to ${data.saas_name} ready for deployment.`}
                            </p>

                            {/* Мета данные */}
                            <div className="flex items-center gap-4 text-xs text-gray-400 mb-6 border-b border-gray-50 pb-4">
                                <div className="flex items-center gap-1">
                                    <Clock className="w-3.5 h-3.5" />
                                    Last update: {repo.last_update}
                                </div>
                            </div>

                            {/* Кнопки действий */}
                            <div className="grid grid-cols-2 gap-3">
                                <a
                                    href={repo.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center justify-center px-4 py-2.5 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-colors text-sm"
                                >
                                    <Github className="w-4 h-4 mr-2" />
                                    Source
                                </a>

                                <a
                                    href="https://hetzner.cloud" // <-- СЮДА ВАШУ РЕФКУ
                                    target="_blank"
                                    className="flex items-center justify-center px-4 py-2.5 bg-gray-900 text-white font-medium rounded-xl hover:bg-blue-600 transition-colors shadow-lg shadow-blue-900/20 text-sm group-hover:scale-105 transform duration-200"
                                >
                                    <Server className="w-4 h-4 mr-2" />
                                    Deploy
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Call to Action внизу */}
                <div className="mt-16 p-8 bg-blue-900 rounded-3xl text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                    <h3 className="text-2xl font-bold text-white mb-2 relative z-10">Missing a tool?</h3>
                    <p className="text-blue-200 mb-6 relative z-10">Help the community by suggesting a new open source alternative.</p>
                    <a href="https://github.com/MRiazIsr/open-switcher" className="inline-block bg-white text-blue-900 px-6 py-3 rounded-full font-bold hover:bg-blue-50 transition relative z-10">
                        Submit on GitHub
                    </a>
                </div>

            </main>
        </div>
    );
}