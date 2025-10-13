import { Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useState } from "react";

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 border-b border-border transition-all duration-300 ${
        scrolled ? "bg-background/60 backdrop-blur-md" : "bg-background/80 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-muted-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-muted-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:your.email@gmail.com"
              className="text-foreground hover:text-muted-foreground transition-colors"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
          
          <div className="flex items-center gap-6">
            <a
              href="#projects"
              className="text-sm text-foreground hover:text-muted-foreground transition-colors duration-200"
            >
              Projects
            </a>
            <a
              href="#about"
              className="text-sm text-foreground hover:text-muted-foreground transition-colors duration-200"
            >
              About
            </a>
            <a
              href="#skills"
              className="text-sm text-foreground hover:text-muted-foreground transition-colors duration-200"
            >
              Skills
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export { Navigation };
