"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { BrandIcon } from "@/components/brand-icon";
import { VpnCard } from "@/components/vpn-card";
import { CryptoCard } from "@/components/crypto-card";

interface Repo {
    name: string;
    stars: number;
}

interface PageData {
    saas_name: string;
    slug: string;
    alternatives: Repo[];
}

export function Catalog({ categories }: { categories: PageData[] }) {
    const [search, setSearch] = useState("");
    const [activeLetter, setActiveLetter] = useState<string | null>(null);

    const alphabet = "#ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    const filteredCategories = useMemo(() => {
        let result = categories;

        if (search) {
            const q = search.toLowerCase();
            result = result.filter(
                (c) =>
                    c.saas_name.toLowerCase().includes(q) ||
                    (c.alternatives || []).some((alt) => alt.name.toLowerCase().includes(q))
            );
        }

        if (activeLetter) {
            if (activeLetter === "#") {
                result = result.filter((c) => /^\d/.test(c.saas_name));
            } else {
                result = result.filter((c) =>
                    c.saas_name.toUpperCase().startsWith(activeLetter)
                );
            }
        }

        return result.sort((a, b) => a.saas_name.localeCompare(b.saas_name));
    }, [categories, search, activeLetter]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setActiveLetter(null);
    };

    return (
        <div className="w-full">
            {/* --- SEARCH & FILTER BAR --- */}
            <div className="sticky top-20 z-30 bg-gray-50/95 dark:bg-slate-950/95 backdrop-blur-sm py-4 mb-8 border-b border-gray-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">

                        {/* 1. Поиск стал компактнее (md:w-64 вместо w-96) */}
                        <div className="relative w-full md:w-64 shrink-0">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-4 w-4 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search tools..."
                                value={search}
                                onChange={handleSearch}
                                className="block w-full pl-9 pr-3 py-2 border border-gray-300 dark:border-slate-700 rounded-lg leading-5 bg-white dark:bg-slate-900 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all shadow-sm"
                            />
                        </div>

                        {/* 2. Алфавит теперь в одну строку (flex-nowrap) и с прокруткой на узких экранах */}
                        <div className="hidden md:flex flex-nowrap items-center gap-0.5 overflow-x-auto no-scrollbar max-w-full">
                            {alphabet.map((letter) => (
                                <button
                                    key={letter}
                                    onClick={() => setActiveLetter(activeLetter === letter ? null : letter)}
                                    // 3. Кнопки стали меньше (w-7 h-7 и шрифт поменьше)
                                    className={`shrink-0 w-7 h-7 flex items-center justify-center rounded-md text-[11px] font-bold transition-all ${
                                        activeLetter === letter
                                            ? "bg-blue-600 text-white shadow-md scale-105"
                                            : "text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-800"
                                    }`}
                                >
                                    {letter}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* --- GRID --- */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">

                {filteredCategories.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-xl text-gray-500">No alternatives found for "{search}".</p>
                        <button onClick={() => {setSearch(''); setActiveLetter(null)}} className="mt-4 text-blue-600 hover:underline">Clear filters</button>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCategories.map((cat, index) => (
                        <React.Fragment key={cat.slug}>

                            {index > 0 && (index + 1) % 10 === 0 && (
                                <>
                                    {((index + 1) / 10) % 2 !== 0 ? (
                                        <VpnCard variant="home" />
                                    ) : (
                                        <CryptoCard variant="home" />
                                    )}
                                </>
                            )}

                            <Link
                                href={`/alternative/${cat.slug}`}
                                className="group relative bg-white dark:bg-slate-900 rounded-3xl p-6 border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-start gap-5 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                <div className="relative z-10 shrink-0">
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
                                        Alternatives:
                                    </p>

                                    <div className="flex flex-wrap gap-2">
                                        {(cat.alternatives || []).slice(0, 2).map((alt, i) => (
                                            <span key={i} className="text-xs font-medium px-2 py-1 rounded-md bg-gray-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-gray-200 dark:border-slate-700">
                         {alt.name}
                       </span>
                                        ))}
                                        {(cat.alternatives?.length || 0) > 2 && (
                                            <span className="text-xs font-medium px-2 py-1 rounded-md bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300">
                        +{(cat.alternatives?.length || 0) - 2}
                      </span>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
}