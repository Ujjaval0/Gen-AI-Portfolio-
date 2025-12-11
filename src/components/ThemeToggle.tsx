import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";

export const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.button
            onClick={toggleTheme}
            className="relative p-1.5 sm:p-2 rounded-lg hover:bg-muted/50 text-foreground hover:text-primary transition-colors"
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            whileHover={{
                scale: 1.1,
                rotate: theme === "light" ? -15 : 15,
                y: -1,
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
        >
            <AnimatePresence mode="wait" initial={false}>
                {theme === "light" ? (
                    <motion.div
                        key="sun"
                        initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                        exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <Sun className="h-4 w-4 sm:h-5 sm:w-5" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="moon"
                        initial={{ rotate: 90, opacity: 0, scale: 0.6 }}
                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                        exit={{ rotate: -90, opacity: 0, scale: 0.6 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <Moon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
    );
};
