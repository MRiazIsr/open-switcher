import fs from 'fs';
import path from 'path';
import { Star, Github, TrendingUp, Layers } from 'lucide-react';
import { Catalog } from '@/components/catalog'; // <-- Новый компонент

// Типы
interface Repo {
    name: string;
    stars: number;
}
interface PageData {
    saas_name: string;
    slug: string;
    alternatives: Repo[];
}

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

    const totalTools = categories.reduce((acc, cat) => {
        // Если alternatives нет (null/undefined), считаем как 0
        return acc + (cat.alternatives?.length || 0);
    }, 0);

    const totalStars = categories.reduce((acc, cat) => {
        // Безопасно проходим по массиву
        const catStars = (cat.alternatives || []).reduce((sum, repo) => sum + repo.stars, 0);
        return acc + catStars;
    }, 0);

    const formatStars = (num: number) => {
        if (num > 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num > 1000) return (num / 1000).toFixed(0) + 'k';
        return num;
    };

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-slate-950 font-sans transition-colors duration-300">
            <div className="fixed inset-0 z-0 pointer-events-none opacity-40 dark:opacity-20"
                 style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
            </div>

            {/* HERO SECTION */}
            <div className="relative z-10 pt-20 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
                    <Github className="w-4 h-4" />
                    <span>Open Source is eating the world</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
                    Find <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Free Alternatives</span> <br />
                    to expensive SaaS.
                </h1>

                {/* STATS */}
                <div className="flex flex-wrap justify-center gap-4 md:gap-12 mt-8 text-slate-500 dark:text-slate-400">
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

            {/* КЛИЕНТСКИЙ КАТАЛОГ С ПОИСКОМ И РЕКЛАМОЙ */}
            <Catalog categories={categories} />

            {/* Footer */}
            <div className="relative z-10 py-10 text-center text-slate-500 dark:text-slate-400 text-sm">
                <p>Built with Go & Next.js.</p>
            </div>
        </main>
    );
}