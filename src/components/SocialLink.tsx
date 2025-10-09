import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface SocialLinkProps {
  icon: LucideIcon;
  href: string;
  label: string;
  index: number;
}

export const SocialLink = ({ icon: Icon, href, label, index }: SocialLinkProps) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group flex flex-col items-center gap-3 rounded-xl bg-card p-6 shadow-[var(--shadow-sm)] transition-all duration-300 hover:shadow-[var(--shadow-md)] hover:scale-105"
    >
      <div className="rounded-full bg-primary/10 p-4 transition-all duration-300 group-hover:bg-primary group-hover:scale-110">
        <Icon className="h-6 w-6 text-primary transition-colors duration-300 group-hover:text-primary-foreground" />
      </div>
      <span className="text-sm font-medium text-foreground">{label}</span>
    </motion.a>
  );
};
