"use client";

import { ShieldCheck, ArrowRight, Lock, Wifi } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

interface VpnCardProps {
    variant?: "home" | "list"; // 'home' - для главной, 'list' - для страницы инструмента
}

export function VpnCard({ variant = "home" }: VpnCardProps) {

    // ВАРИАНТ 1: Вертикальная карточка (для страницы инструмента / списка)
    if (variant === "list") {
        return (
            <div className="relative group bg-gradient-to-br from-teal-600 to-emerald-800 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between overflow-hidden h-full min-h-[280px]">
                {/* Декор фона */}
                <div className="absolute -bottom-6 -right-6 text-white/10 transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
                    <ShieldCheck size={140} />
                </div>

                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3 text-teal-100 font-bold text-xs uppercase tracking-widest border border-teal-400/30 px-2 py-1 rounded w-fit">
                        <Lock className="w-3 h-3" />
                        Privacy First
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Exposed IP?</h3>
                    <p className="text-teal-50 text-sm mb-6 leading-relaxed">
                        Self-hosting is great, but don't expose your home IP address.
                        <br/><br/>
                        Secure your connection with <strong>Surfshark VPN</strong>.
                    </p>
                </div>

                <a
                    href={SITE_CONFIG.VPN_REF}
                    target="_blank"
                    rel="nofollow noreferrer"
                    className="w-full py-3 bg-white text-teal-800 font-bold rounded-xl text-center text-sm hover:bg-teal-50 transition-colors flex items-center justify-center gap-2 relative z-10 shadow-md"
                >
                    Get 82% Discount <ArrowRight className="w-4 h-4" />
                </a>
            </div>
        );
    }

    // ВАРИАНТ 2: Горизонтальная карточка (для Главной страницы)
    return (
        <a
            href={SITE_CONFIG.VPN_REF}
            target="_blank"
            rel="nofollow noreferrer"
            className="group relative bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-5 overflow-hidden"
        >
            {/* Иконка */}
            <div className="relative z-10 shrink-0">
                <div className="w-14 h-14 rounded-2xl bg-teal-500 flex items-center justify-center shadow-lg text-white font-bold group-hover:scale-110 transition-transform duration-300">
                    <Wifi className="w-7 h-7" />
                </div>
            </div>

            <div className="relative z-10 flex-1">
                <div className="flex justify-between items-start">
                    <h2 className="text-xl font-bold text-white group-hover:text-teal-400 transition-colors">
                        Surfshark VPN Deal
                    </h2>
                    <span className="text-xs bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded border border-teal-500/30">
            82% OFF
          </span>
                </div>

                <p className="text-sm text-slate-400 mt-1 mb-2">
                    Protect your self-hosted apps and browse anonymously.
                </p>

                <div className="inline-flex items-center text-xs font-bold text-teal-400 group-hover:translate-x-1 transition-transform">
                    Claim Deal <ArrowRight className="w-3 h-3 ml-1" />
                </div>
            </div>
        </a>
    );
}