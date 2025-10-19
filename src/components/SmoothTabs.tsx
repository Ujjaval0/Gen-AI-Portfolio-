import { motion } from "framer-motion";
import { useState } from "react";

interface Tab {
  id: string;
  label: string;
  href: string;
}

interface SmoothTabsProps {
  tabs: Tab[];
}

export const SmoothTabs = ({ tabs }: SmoothTabsProps) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const handleClick = (href: string, id: string) => {
    setActiveTab(id);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex items-center gap-1 bg-muted/30 backdrop-blur-sm rounded-lg p-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleClick(tab.href, tab.id)}
          className="relative px-4 py-2 text-sm transition-colors duration-200"
        >
          {activeTab === tab.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-background rounded-md border border-border/50"
              transition={{
                type: "spring",
                stiffness: 380,
                damping: 30,
              }}
            />
          )}
          <span className={`relative z-10 transition-colors ${
            activeTab === tab.id ? "text-foreground" : "text-muted-foreground"
          }`}>
            {tab.label}
          </span>
        </button>
      ))}
    </div>
  );
};
