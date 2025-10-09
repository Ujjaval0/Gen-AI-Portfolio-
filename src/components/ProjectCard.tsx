import { ExternalLink, Github } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  index: number;
}

export const ProjectCard = ({
  title,
  description,
  techStack,
  githubUrl,
  liveUrl,
}: ProjectCardProps) => {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-card p-6 border border-border transition-all duration-200 hover:border-foreground/20">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
        <p className="text-muted-foreground leading-relaxed text-sm">{description}</p>
        
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-muted px-2.5 py-1 text-xs text-muted-foreground font-medium"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-4 pt-2">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-muted-foreground text-sm transition-colors hover:text-foreground"
            >
              <Github className="h-4 w-4" />
              <span>Code</span>
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-muted-foreground text-sm transition-colors hover:text-foreground"
            >
              <ExternalLink className="h-4 w-4" />
              <span>Demo</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
