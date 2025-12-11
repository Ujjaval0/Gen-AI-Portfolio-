import { motion } from "framer-motion";

export const ScrollIndicator = () => {
    return (
        <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
        >
            <motion.p
                className="text-xs text-muted-foreground uppercase tracking-wider"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
                Scroll
            </motion.p>
            <motion.div
                className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex items-start justify-center p-1.5"
                animate={{ borderColor: ["rgba(var(--muted-foreground), 0.3)", "rgba(var(--muted-foreground), 0.6)", "rgba(var(--muted-foreground), 0.3)"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
                <motion.div
                    className="w-1.5 h-1.5 bg-muted-foreground rounded-full"
                    animate={{ y: [0, 12, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
            </motion.div>
        </motion.div>
    );
};
