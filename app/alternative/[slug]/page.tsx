import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import { ArrowLeft } from 'lucide-react';
import { VpnCard } from '@/components/vpn-card';
import { RepoCard } from '@/components/repo-card';

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

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const data = await getData(resolvedParams.slug);

    if (!data) notFound();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950 text-slate-900 dark:text-white font-sans transition-colors duration-300">
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-900/20 -z-10" />

            <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
                <Link
                    href="/"
                    className="inline-flex items-center text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to categories
                </Link>

                {/* Заголовок */}
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

                {/* Сетка карточек */}
                <div className="grid gap-6 md:grid-cols-2">
                    {data.alternatives.map((repo, index) => (
                        <React.Fragment key={repo.url}>

                            {/* Реклама VPN на 2-й позиции */}
                            {index === 1 && <VpnCard variant="list" />}

                            {/* Новая умная карточка */}
                            <RepoCard repo={repo} saasName={data.saas_name} />

                        </React.Fragment>
                    ))}

                    {data.alternatives.length === 1 && <VpnCard variant="list" />}
                </div>
            </main>
        </div>
    );
}