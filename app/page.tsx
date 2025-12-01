import Link from 'next/link';
import fs from 'fs';
import path from 'path';

interface PageData {
    saas_name: string;
    slug: string;
    alternatives: any[];
}

async function getCategories() {
    const filePath = path.join(process.cwd(), 'db.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents) as PageData[];
}

export default async function Home() {
    const categories = await getCategories();

    return (
        <main className="min-h-screen bg-white">
            <div className="max-w-5xl mx-auto py-20 px-6">
                <h1 className="text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
                    The <span className="text-blue-600">Open Switcher</span>.
                </h1>
                <p className="text-2xl text-gray-500 mb-16 max-w-2xl">
                    Find privacy-friendly, self-hosted alternatives to popular SaaS products. Save money, own your data.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((cat) => (
                        <Link
                            key={cat.slug}
                            href={`/alternative/${cat.slug}`}
                            className="group block p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition"
                        >
                            <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition">
                                {cat.saas_name} Alternatives &rarr;
                            </h2>
                            <p className="mt-2 text-gray-500">
                                {cat.alternatives.length} free tools available
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}