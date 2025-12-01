import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import { ArrowRight, Star, Github, TrendingUp, Layers } from 'lucide-react';
import { BrandIcon } from '@/components/brand-icon';

// --- Типы ---
interface Repo {
    name: string;
    stars: number;
}

interface PageData {
    saas_name: string;
    slug: string;
    alternatives: Repo[];
}

// --- Data Fetching ---
async function getCategories() {
    const filePath = path.join(process.cwd(), 'db.json');
    if (!fs.existsSync(filePath)) return [];
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents) as PageData[];
}

export default async function Home() {
    const categories = await getCategories();

    // Stats
    const totalCategories = categories.length;
    const totalTools = categories.reduce((acc, cat) => acc + cat.alternatives.length, 0);
    const totalStars = categories.reduce((acc, cat) =>
        acc + cat.alternatives.reduce((sum, repo) => sum + repo.stars, 0), 0
    );

    const formatStars = (num: number) => {
        if (num > 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num > 1000) return (num / 1000).toFixed(0) + 'k';
        return num;
    };

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-slate-950 font-sans transition-colors duration-300">

            {/* Grid Background */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-40 dark:opacity-20"
                 style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
            </div>

            {/* HERO */}
            <div className="relative z-10 pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
                    <Github className="w-4 h-4" />
                    <span>Open Source is eating the world</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
                    Find <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Free Alternatives</span> <br />
                    to expensive SaaS.
                </h1>

                <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                    Stop paying monthly fees. Discover privacy-friendly, self-hosted replacements for Trello, Slack, Notion, and more.
                </p>

                {/* Stats */}
                <div className="flex flex-wrap justify-center gap-4 md:gap-12 mb-12 text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-2">
                        <Layers className="w-5 h-5 text-blue-500" />
                        <span className="font-semibold text-slate-900 dark:text-white">{totalCategories}</span> Categories
                    </div>
                    <div className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-green-500" />
                        <span className="font-semibold text-slate-900 dark:text-white">{totalTools}</span> Tools Tracked
                    </div>
                    <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-yellow-500 fill-current" />
                        <span className="font-semibold text-slate-900 dark:text-white">{formatStars(totalStars)}</span> GitHub Stars
                    </div>
                </div>
            </div>

            {/* GRID */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((cat) => (
                        <Link
                            key={cat.slug}
                            href={`/alternative/${cat.slug}`}
                            className="group relative bg-white dark:bg-slate-900 rounded-3xl p-6 border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-start gap-5 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            <div className="relative z-10 shrink-0">
                                {/* Используем наш новый компонент здесь */}
                                <BrandIcon name={cat.saas_name} />
                            </div>

                            <div className="relative z-10 flex-1">
                                <div className="flex justify-between items-start">
                                    <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {cat.saas_name}
                                    </h2>
                                    <ArrowRight className="w-5 h-5 text-gray-300 dark:text-slate-600 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                                </div>

                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 mb-3">
                                    Alternatives
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {cat.alternatives.slice(0, 2).map((alt, i) => (
                                        <span key={i} className="text-xs font-medium px-2 py-1 rounded-md bg-gray-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-gray-200 dark:border-slate-700">
                       {alt.name}
                     </span>
                                    ))}
                                    {cat.alternatives.length > 2 && (
                                        <span className="text-xs font-medium px-2 py-1 rounded-md bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300">
                      +{cat.alternatives.length - 2} more
                    </span>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Footer */}
                <div className="mt-20 pt-8 border-t border-gray-200 dark:border-slate-800 text-center text-slate-500 dark:text-slate-400 text-sm">
                    <p>Built with Go & Next.js.</p>
                </div>
            </div>
        </main>
    );
}