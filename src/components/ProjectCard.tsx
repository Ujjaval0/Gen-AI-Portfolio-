import { ExternalLink, Github } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  index: number;
  image: string;
  fullDescription?: string;
}

export const ProjectCard = ({
  title,
  description,
  techStack,
  githubUrl,
  liveUrl,
  image,
  fullDescription,
}: ProjectCardProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="group relative overflow-hidden rounded-lg bg-card border border-border transition-all duration-300 hover:border-primary hover:shadow-lg cursor-pointer animate-fade-in md:grid md:grid-cols-[350px_1fr] md:gap-6">
          <div className="overflow-hidden md:h-full">
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 aspect-[16/9] md:aspect-square md:max-h-[280px]"
            />
          </div>
          <div className="p-6 space-y-4 flex flex-col justify-center">
            <h3 className="text-xl font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">{title}</h3>
            <p className="text-muted-foreground leading-relaxed text-sm line-clamp-3">{description}</p>
            
            <div className="flex flex-wrap gap-2">
              {techStack.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="rounded-md bg-muted px-2.5 py-1 text-xs text-muted-foreground font-medium transition-transform duration-200 hover:scale-105"
                >
                  {tech}
                </span>
              ))}
              {techStack.length > 4 && (
                <span className="rounded-md bg-muted px-2.5 py-1 text-xs text-muted-foreground font-medium">
                  +{techStack.length - 4} more
                </span>
              )}
            </div>
            
            <div className="flex gap-3 pt-2">
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-foreground text-xs transition-all duration-200 hover:text-primary px-3 py-1.5 rounded-md bg-muted hover:bg-muted/80"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github className="h-3.5 w-3.5" />
                  <span>View Code</span>
                </a>
              )}
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-foreground text-xs transition-all duration-200 hover:text-primary px-3 py-1.5 rounded-md bg-muted hover:bg-muted/80"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>Live Demo</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </DialogTrigger>
      
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="w-full overflow-hidden rounded-lg">
            <img 
              src={image} 
              alt={title} 
              className="w-full object-cover"
            />
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Description</h4>
              <p className="text-muted-foreground leading-relaxed">
                {fullDescription || description}
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Technologies Used</h4>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md bg-muted px-3 py-1.5 text-sm text-muted-foreground font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-foreground text-sm transition-colors hover:text-primary px-4 py-2 rounded-md bg-muted"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github className="h-4 w-4" />
                  <span>View Code</span>
                </a>
              )}
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-foreground text-sm transition-colors hover:text-primary px-4 py-2 rounded-md bg-muted"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Live Demo</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
