"use client";

import {INTEGRATION_ICON_MAP} from "@/data/integrations";
import type {IntegrationItem} from "@/types/home-page";

export default function IntegrationsSection({
                                                items,
                                            }: {
    items: IntegrationItem[];

}) {
    return (
        <section className="w-full py-16 md:py-24 text-white overflow-hidden">
            <div className="mx-auto max-w-7xl px-5 text-center">
                <h2 className="text-3xl md:text-5xl font-extrabold mb-3 md:mb-4">
                    Plug into your stack
                </h2>
                <p className="text-neutral-400 mb-8 md:mb-14 text-base md:text-lg">
                    Native connectors and webhooks. Zero heavy lifting.
                </p>

                {/* Mobile */}
                <div className="flex md:hidden overflow-x-auto gap-4 pb-4 snap-x snap-mandatory no-scrollbar">
                    {items.map((item) => {
                        const Icon = INTEGRATION_ICON_MAP[item.icon_key];
                        return (
                            <div
                                key={item.id}
                                className="snap-start flex-shrink-0 w-[200px] rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 p-4 text-left"
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <div
                                        className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 text-blue-400">
                                        {Icon && <Icon size={22}/>}
                                    </div>
                                    <h3 className="font-semibold text-base text-white leading-tight">
                                        {item.name}
                                    </h3>
                                </div>
                                <p className="text-xs text-neutral-400">{item.desc}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Desktop */}
                <div className="hidden md:grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((item) => {
                        const Icon = INTEGRATION_ICON_MAP[item.icon_key];
                        return (
                            <div
                                key={item.id}
                                className="group flex items-center rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 p-6"
                            >
                                <div
                                    className="flex items-center justify-center w-14 h-14 rounded-xl bg-white/10 text-blue-400 mr-5">
                                    {Icon && <Icon size={24}/>}
                                </div>
                                <div className="text-left">
                                    <h3 className="font-semibold text-lg text-white">
                                        {item.name}
                                    </h3>
                                    <p className="text-sm text-neutral-400">{item.desc}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
