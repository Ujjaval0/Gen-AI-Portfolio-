import { motion } from "framer-motion";

interface SkillCategoryProps {
    title: string;
    skills: string[];
    index: number;
    priority: boolean;
}

export const SkillCategory = ({ title, skills, index, priority }: SkillCategoryProps) => {
    const containerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring" as const,
                stiffness: 260,
                damping: 20,
                delay: index * 0.1,
            },
        },
    };

    const skillVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: (i: number) => ({
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring" as const,
                stiffness: 300,
                damping: 24,
                delay: index * 0.1 + i * 0.05,
            },
        }),
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className={`p-6 rounded-xl border-2 transition-all duration-300 ${priority
                    ? "border-primary/50 bg-primary/5 shadow-lg shadow-primary/10"
                    : "border-border/50 bg-card/50"
                }`}
        >
            <motion.h3
                className={`text-sm font-bold mb-4 tracking-wide ${priority ? "text-primary" : "text-muted-foreground"
                    }`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.1 }}
            >
                {title}
                {priority && (
                    <motion.span
                        className="ml-2 text-xs text-primary/70"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                    >
                        ⭐
                    </motion.span>
                )}
            </motion.h3>

            <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                    <motion.span
                        key={skill}
                        custom={i}
                        variants={skillVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        whileHover={{
                            scale: 1.08,
                            backgroundColor: priority ? "rgba(139, 92, 246, 0.15)" : "rgba(255, 255, 255, 0.1)",
                            transition: { type: "spring", stiffness: 400, damping: 17 },
                        }}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-default ${priority
                                ? "bg-primary/10 text-primary border border-primary/20"
                                : "bg-muted/50 text-foreground border border-border/30"
                            }`}
                    >
                        {skill}
                    </motion.span>
                ))}
            </div>
        </motion.div>
    );
};
