import { Code2, Database, Cloud, Cpu, GitBranch, Container, Brain, Eye, MessageSquare, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface SkillBadgeProps {
  skill: string;
  index: number;
}

const skillIcons: Record<string, any> = {
  "Python": Code2,
  "TypeScript": Code2,
  "JavaScript": Code2,
  "C++": Code2,
  "SQL": Database,
  "Rust": Code2,
  "PyTorch": Brain,
  "TensorFlow": Brain,
  "React": Code2,
  "Node.js": Code2,
  "Docker": Container,
  "Kubernetes": Container,
  "Git": GitBranch,
  "AWS SageMaker": Cloud,
  "Google Cloud AI": Cloud,
  "Computer Vision": Eye,
  "NLP": MessageSquare,
  "Deep Learning": Brain,
  "Neural Networks": Brain,
  "LLMs": Sparkles,
};

export const SkillBadge = ({ skill, index }: SkillBadgeProps) => {
  const Icon = skillIcons[skill];
  
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.5, y: 50 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.05,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        scale: 1.15, 
        rotate: [0, -5, 5, 0],
        boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
      }}
      whileTap={{ scale: 0.95 }}
      className="group flex flex-col items-center justify-center gap-2 rounded-lg bg-card backdrop-blur-sm px-4 py-6 border border-border/50 cursor-pointer"
    >
      <motion.div
        whileHover={{ rotate: 360, scale: 1.2 }}
        transition={{ duration: 0.6 }}
      >
        {Icon ? (
          <Icon className="w-8 h-8 md:w-10 md:h-10 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
        ) : (
          <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-muted text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-all duration-300">
            <span className="text-lg font-bold">{skill.charAt(0)}</span>
          </div>
        )}
      </motion.div>
      <motion.span 
        className="text-xs md:text-sm text-center text-foreground font-medium group-hover:text-primary transition-colors duration-300"
        whileHover={{ y: -3 }}
      >
        {skill}
      </motion.span>
    </motion.div>
  );
};
