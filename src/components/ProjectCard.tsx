import { ExternalLink, Github } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { motion } from "framer-motion";

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
        <motion.div
          className="group relative overflow-hidden rounded-lg bg-card border border-border cursor-pointer flex flex-col h-full min-h-[420px]"
          whileHover={{
            y: -5,
            boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)"
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <motion.div
            className="overflow-hidden w-full h-52 flex-shrink-0"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <motion.img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </motion.div>
          <div className="p-6 space-y-4 flex flex-col flex-grow">
            <div className="flex-grow">
              <motion.h3
                className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors mb-3"
              >
                {title}
              </motion.h3>
              <motion.p
                className="text-muted-foreground leading-relaxed text-sm line-clamp-3"
              >
                {description}
              </motion.p>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {techStack.slice(0, 4).map((tech, idx) => (
                <motion.span
                  key={tech}
                  className="rounded-md bg-muted px-2.5 py-1 text-xs text-muted-foreground font-medium"
                  whileHover={{ scale: 1.1, y: -2 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  {tech}
                </motion.span>
              ))}
              {techStack.length > 4 && (
                <span className="rounded-md bg-muted px-2.5 py-1 text-xs text-muted-foreground font-medium">
                  +{techStack.length - 4} more
                </span>
              )}
            </div>

            <div className="flex gap-3 pt-3 mt-auto border-t border-border/50">
              {githubUrl && (
                <motion.a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-foreground text-xs px-3 py-1.5 rounded-md bg-muted hover:bg-primary/20 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github className="h-3.5 w-3.5" />
                  <span>View Code</span>
                </motion.a>
              )}
              {liveUrl && (
                <motion.a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-foreground text-xs px-3 py-1.5 rounded-md bg-muted hover:bg-primary/20 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>Live Demo</span>
                </motion.a>
              )}
            </div>
          </div>
        </motion.div>
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
