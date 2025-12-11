import { useState } from "react";
import { motion } from "framer-motion";

interface Tab {
    id: string;
    label: string;
    href: string;
}

interface SmoothTabsProps {
    tabs: Tab[];
}

export const SmoothTabs = ({ tabs }: SmoothTabsProps) => {
    const [activeTab, setActiveTab] = useState<string | null>(null);

    const handleClick = (href: string, id: string) => {
        setActiveTab(id);
        const element = document.querySelector(href);
        element?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="flex gap-1 sm:gap-2">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => handleClick(tab.href, tab.id)}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-colors rounded-full ${activeTab === tab.id ? "text-primary" : "text-foreground hover:text-primary"
                        }`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
};
