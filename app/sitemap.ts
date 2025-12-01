import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

// ВАШ НОВЫЙ ДОМЕН
const BASE_URL = 'https://openalternatives.online';

interface PageData {
    slug: string;
    // остальные поля нам тут не важны
}

async function getTools(): Promise<PageData[]> {
    const filePath = path.join(process.cwd(), 'db.json');
    if (!fs.existsSync(filePath)) return [];
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents) as PageData[];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const tools = await getTools();

    // 1. Главная страница
    const routes: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
    ];

    // 2. Страницы инструментов (динамические)
    const toolRoutes = tools.map((tool) => ({
        url: `${BASE_URL}/alternative/${tool.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    return [...routes, ...toolRoutes];
}