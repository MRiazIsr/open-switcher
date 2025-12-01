import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Open Alternative - Free Open Source Alternatives",
    description: "Find free self-hosted alternatives to popular SaaS products.",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} bg-white dark:bg-slate-950 transition-colors duration-300`}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            {/* Навигация / Хедер */}
            <nav className="border-b border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                    <a href="/" className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">
                        Open<span className="text-blue-600">Alternative</span>
                    </a>
                    <ThemeToggle />
                </div>
            </nav>

            {children}
            <Analytics />
        </ThemeProvider>
        </body>
        </html>
    );
}