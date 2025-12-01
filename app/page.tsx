import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import { ArrowRight, Star, Github, TrendingUp, Layers } from 'lucide-react';

// --- Типы данных ---
interface Repo {
    name: string;   // <--- Добавили это поле
    stars: number;
}

interface PageData {
    saas_name: string;
    slug: string;
    alternatives: Repo[];
}

// --- Получение данных (Server Side) ---
async function getCategories() {
    const filePath = path.join(process.cwd(), 'db.json');
    // Если файла нет (первый запуск), вернем пустой массив, чтобы не крашилось
    if (!fs.existsSync(filePath)) return [];

    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents) as PageData[];
}

// --- Компонент иконки (тот же, что и внутри, для консистентности) ---
const CategoryIcon = ({ name }: { name: string }) => {
    const letter = name.charAt(0).toUpperCase();
    const gradients = [
        'from-blue-600 to-indigo-600',
        'from-emerald-500 to-teal-500',
        'from-orange-500 to-red-500',
        'from-purple-600 to-pink-600',
        'from-cyan-500 to-blue-500'
    ];
    // Хеш функция для стабильного цвета
    const index = name.length % gradients.length;
    const gradient = gradients[index];

    return (
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg text-white font-bold text-2xl transform group-hover:scale-110 transition-transform duration-300`}>
            {letter}
        </div>
    );
};

export default async function Home() {
    const categories = await getCategories();

    // --- Подсчет статистики для важности ---
    const totalCategories = categories.length;
    const totalTools = categories.reduce((acc, cat) => acc + cat.alternatives.length, 0);
    const totalStars = categories.reduce((acc, cat) =>
        acc + cat.alternatives.reduce((sum, repo) => sum + repo.stars, 0), 0
    );

    // Форматирование числа звезд (например 1.2M)
    const formatStars = (num: number) => {
        if (num > 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num > 1000) return (num / 1000).toFixed(0) + 'k';
        return num;
    };

    return (
        <main className="min-h-screen bg-gray-50 font-sans selection:bg-blue-100 selection:text-blue-900">

            {/* --- Декоративный фон (Сетка) --- */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-40"
                 style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
            </div>

            {/* --- HERO SECTION --- */}
            <div className="relative z-10 pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium mb-6 animate-fade-in-up">
                    <Github className="w-4 h-4" />
                    <span>Open Source is eating the world</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-6">
                    Find <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Free Alternatives</span> <br />
                    to expensive SaaS.
                </h1>

                <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                    Stop paying monthly fees for tools you can host yourself.
                    Discover privacy-friendly, open-source replacements for Trello, Slack, Notion, and more.
                </p>

                {/* --- Статистика (Stats Bar) --- */}
                <div className="flex flex-wrap justify-center gap-4 md:gap-12 mb-12 text-gray-500">
                    <div className="flex items-center gap-2">
                        <Layers className="w-5 h-5 text-blue-500" />
                        <span className="font-semibold text-gray-900">{totalCategories}</span> Categories
                    </div>
                    <div className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-green-500" />
                        <span className="font-semibold text-gray-900">{totalTools}</span> Tools Tracked
                    </div>
                    <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-yellow-500 fill-current" />
                        <span className="font-semibold text-gray-900">{formatStars(totalStars)}</span> Total GitHub Stars
                    </div>
                </div>
            </div>

            {/* --- GRID SECTION --- */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((cat) => (
                        <Link
                            key={cat.slug}
                            href={`/alternative/${cat.slug}`}
                            className="group relative bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-start gap-5 overflow-hidden"
                        >
                            {/* Фоновый градиент при ховере */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            <div className="relative z-10 shrink-0">
                                <CategoryIcon name={cat.saas_name} />
                            </div>

                            <div className="relative z-10 flex-1">
                                <div className="flex justify-between items-start">
                                    <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                        {cat.saas_name}
                                    </h2>
                                    <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                                </div>

                                <p className="text-sm text-gray-500 mt-1 mb-3">
                                    Alternatives
                                </p>

                                {/* Мини-превью (tags) */}
                                <div className="flex flex-wrap gap-2">
                                    {cat.alternatives.slice(0, 2).map((alt, i) => (
                                        <span key={i} className="text-xs font-medium px-2 py-1 rounded-md bg-gray-100 text-gray-600 border border-gray-200">
                       {alt.name}
                     </span> // В JSON у альтернатив может не быть поля name на уровне списка, если структура другая, проверьте seed.
                             // В моем коде выше seed создавал структуру RepoDetails.
                                    ))}
                                    {cat.alternatives.length > 2 && (
                                        <span className="text-xs font-medium px-2 py-1 rounded-md bg-blue-50 text-blue-600">
                      +{cat.alternatives.length - 2} more
                    </span>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Footer */}
                <div className="mt-20 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
                    <p>Built with Go & Next.js. Automated via GitHub Actions.</p>
                    <div className="mt-2 flex justify-center gap-4">
                        <a href="https://github.com/MRiazIsr/open-switcher" className="hover:text-black transition">Add a Tool</a>
                        <span>•</span>
                        <a href="#" className="hover:text-black transition">Deploy Your Own</a>
                    </div>
                </div>
            </div>
        </main>
    );
}