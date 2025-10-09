import { Button } from "@/components/ui/button";

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">AI Engineer Portfolio</h2>
          
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
            <a
              href="#connect"
            >
              <Button className="bg-foreground text-background hover:bg-foreground/90">
                Contact
              </Button>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export { Navigation };
