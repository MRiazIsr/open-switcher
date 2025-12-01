import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';

// Типы данных
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

// Функция для чтения JSON
async function getData(slug: string): Promise<PageData | undefined> {
    const filePath = path.join(process.cwd(), 'db.json');

    // Проверка на существование файла
    if (!fs.existsSync(filePath)) {
        return undefined;
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data: PageData[] = JSON.parse(fileContents);
    return data.find((item) => item.slug === slug);
}

// Генерация статических путей
export async function generateStaticParams() {
    const filePath = path.join(process.cwd(), 'db.json');
    if (!fs.existsSync(filePath)) return [];

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data: PageData[] = JSON.parse(fileContents);

    return data.map((item) => ({
        slug: item.slug,
    }));
}

// --- ГЛАВНОЕ ИЗМЕНЕНИЕ НИЖЕ ---
// Тип params теперь Promise<{ slug: string }>
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    // 1. Сначала ждем разрешения промиса
    const resolvedParams = await params;

    // 2. Теперь используем slug
    const data = await getData(resolvedParams.slug);

    if (!data) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <Link href="/" className="text-blue-600 hover:underline mb-6 block">
                    &larr; Back to all tools
                </Link>

                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Free Open Source Alternatives to <span className="text-blue-600">{data.saas_name}</span>
                    </h1>
                    <p className="text-xl text-gray-600">
                        Don&#39;t pay for {data.saas_name}. Use these self-hosted tools instead.
                    </p>
                </div>

                <div className="grid gap-6">
                    {data.alternatives.map((repo) => (
                        <div key={repo.url} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition duration-200">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">{repo.name}</h2>
                                    <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                    <span className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full font-medium">
                      ★ {(repo.stars / 1000).toFixed(1)}k stars
                    </span>
                                        <span>License: {repo.license}</span>
                                    </div>
                                </div>

                                <a
                                    href="https://hetzner.cloud"
                                    target="_blank"
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition text-center w-full sm:w-auto"
                                >
                                    Deploy Self-Hosted
                                </a>
                            </div>

                            <p className="text-gray-700 mb-6 leading-relaxed">
                                {repo.description || "No description provided."}
                            </p>

                            <div className="border-t pt-4 flex justify-between items-center text-sm">
                                <span className="text-gray-400">Updated: {repo.last_update}</span>
                                <a href={repo.url} target="_blank" className="text-blue-600 hover:underline font-medium">
                                    View Source Code &rarr;
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}