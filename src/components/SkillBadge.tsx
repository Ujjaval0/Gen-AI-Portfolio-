import { Code2, Database, Cloud, Cpu, GitBranch, Container, Brain, Eye, MessageSquare, Sparkles } from "lucide-react";

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
    <div 
      className="group flex flex-col items-center justify-center gap-2 rounded-lg bg-background/50 backdrop-blur-sm px-4 py-6 border border-border/50 transition-all duration-500 hover:border-primary hover:scale-110 hover:shadow-lg hover:shadow-primary/20 animate-fade-in cursor-pointer"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {Icon ? (
        <Icon className="w-8 h-8 md:w-10 md:h-10 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
      ) : (
        <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-muted text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-all duration-300">
          <span className="text-lg font-bold">{skill.charAt(0)}</span>
        </div>
      )}
      <span className="text-xs md:text-sm text-center text-foreground font-medium group-hover:text-primary transition-colors duration-300">{skill}</span>
    </div>
  );
};
