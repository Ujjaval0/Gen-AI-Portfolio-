import { motion } from "framer-motion";

interface SkillBadgeProps {
  skill: string;
  index: number;
}

export const SkillBadge = ({ skill, index }: SkillBadgeProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="rounded-lg bg-card px-6 py-3 text-center shadow-[var(--shadow-sm)] transition-all duration-300 hover:shadow-[var(--shadow-md)] hover:scale-105"
    >
      <span className="text-sm font-medium text-foreground">{skill}</span>
    </motion.div>
  );
};
