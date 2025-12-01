"use client";

import { Wallet, ArrowRight, Lock } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

interface CryptoCardProps {
    variant?: "home" | "list";
}

export function CryptoCard({ variant = "home" }: CryptoCardProps) {

    if (variant === "list") {
        return (
            <div className="relative group bg-gradient-to-br from-gray-900 to-black border border-orange-500/20 rounded-2xl p-6 text-white shadow-lg hover:shadow-orange-500/10 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between overflow-hidden h-full min-h-[280px]">
                {/* Декор */}
                <div className="absolute -top-10 -right-10 text-orange-500/10 transform rotate-12 transition-transform duration-500">
                    <Wallet size={180} />
                </div>

                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3 text-orange-400 font-bold text-xs uppercase tracking-widest border border-orange-500/30 px-2 py-1 rounded w-fit">
                        <Lock className="w-3 h-3" />
                        Be Your Own Bank
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Not your keys,<br/>not your coins.</h3>
                    <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                        Don't trust exchanges. Secure your crypto assets with the world's most popular hardware wallet.
                    </p>
                </div>

                <a
                    href={SITE_CONFIG.CRYPTO_REF}
                    target="_blank"
                    rel="nofollow noreferrer"
                    className="w-full py-3 bg-orange-500 text-white font-bold rounded-xl text-center text-sm hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 relative z-10 shadow-md shadow-orange-900/20"
                >
                    Get Ledger Nano <ArrowRight className="w-4 h-4" />
                </a>
            </div>
        );
    }

    // Горизонтальная версия для главной
    return (
        <a
            href={SITE_CONFIG.CRYPTO_REF}
            target="_blank"
            rel="nofollow noreferrer"
            className="group relative bg-black border border-gray-800 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-orange-500/30 transition-all duration-300 flex items-center gap-5 overflow-hidden"
        >
            <div className="relative z-10 shrink-0">
                <div className="w-14 h-14 rounded-2xl bg-orange-500 flex items-center justify-center shadow-lg text-white font-bold group-hover:scale-110 transition-transform duration-300">
                    <Wallet className="w-7 h-7" />
                </div>
            </div>

            <div className="relative z-10 flex-1">
                <div className="flex justify-between items-start">
                    <h2 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">
                        Secure Your Crypto
                    </h2>
                    <span className="text-xs bg-orange-500/20 text-orange-300 px-2 py-0.5 rounded border border-orange-500/30">
            Hardware Wallet
          </span>
                </div>
                <p className="text-sm text-gray-400 mt-1 mb-2">
                    The smartest way to secure your digital assets.
                </p>
                <div className="inline-flex items-center text-xs font-bold text-orange-400 group-hover:translate-x-1 transition-transform">
                    Buy Ledger <ArrowRight className="w-3 h-3 ml-1" />
                </div>
            </div>
        </a>
    );
}