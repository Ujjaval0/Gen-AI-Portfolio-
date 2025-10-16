import { Navigation } from "@/components/Navigation";
import { ProjectCard } from "@/components/ProjectCard";
import { SkillBadge } from "@/components/SkillBadge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import neuralOptimizerImg from "@/assets/neural-optimizer.jpg";
import contentGeneratorImg from "@/assets/content-generator.jpg";
import cvPipelineImg from "@/assets/cv-pipeline.jpg";
import rlAgentImg from "@/assets/rl-agent.jpg";

const projects = [
  {
    title: "Neural Network Optimizer",
    description: "Developed a custom optimization algorithm that reduces training time by 40% for large-scale neural networks.",
    fullDescription: "Developed a custom optimization algorithm that reduces training time by 40% for large-scale neural networks. Implemented adaptive learning rate scheduling and gradient clipping techniques. The system includes automatic hyperparameter tuning, distributed training support, and memory optimization for large batch processing. Successfully deployed in production, handling over 100 training jobs daily.",
    techStack: ["PyTorch", "Python", "CUDA", "TensorFlow", "NumPy", "Pandas"],
    githubUrl: "https://github.com",
    liveUrl: "https://demo.example.com",
    image: neuralOptimizerImg,
  },
  {
    title: "AI-Powered Content Generator",
    description: "Built a fine-tuned GPT model for generating marketing content with context-aware suggestions.",
    fullDescription: "Built a fine-tuned GPT model for generating marketing content with context-aware suggestions. Achieved 85% user satisfaction rate with generated content quality. Features include multi-language support, brand voice customization, SEO optimization, and real-time collaboration. Integrated with popular CMS platforms and social media management tools.",
    techStack: ["OpenAI API", "LangChain", "FastAPI", "React", "PostgreSQL", "Redis"],
    githubUrl: "https://github.com",
    liveUrl: "https://demo.example.com",
    image: contentGeneratorImg,
  },
  {
    title: "Computer Vision Pipeline",
    description: "Created an end-to-end object detection and tracking system for real-time video analysis.",
    fullDescription: "Created an end-to-end object detection and tracking system for real-time video analysis. Processes 30 FPS on standard hardware with 92% accuracy. Includes multi-object tracking, scene understanding, anomaly detection, and automated alert system. Deployed across multiple security installations with 99.9% uptime.",
    techStack: ["YOLOv8", "OpenCV", "Docker", "AWS", "Python", "TensorRT"],
    githubUrl: "https://github.com",
    image: cvPipelineImg,
  },
  {
    title: "Reinforcement Learning Game Agent",
    description: "Trained an AI agent using Deep Q-Learning to master complex strategy games.",
    fullDescription: "Trained an AI agent using Deep Q-Learning to master complex strategy games. Agent achieved superhuman performance after 10 million training iterations. Implemented advanced exploration strategies, experience replay, and double Q-learning. The agent demonstrates emergent strategic thinking and adapts to opponent playstyles in real-time.",
    techStack: ["Stable-Baselines3", "Gymnasium", "NumPy", "Matplotlib", "PyTorch", "Ray"],
    githubUrl: "https://github.com",
    liveUrl: "https://demo.example.com",
    image: rlAgentImg,
  },
];

const skills = [
  "Deep Learning",
  "Neural Networks",
  "Computer Vision",
  "NLP",
  "Reinforcement Learning",
  "LLMs",
  "Python",
  "TypeScript",
  "C++",
  "SQL",
  "Rust",
  "PyTorch",
  "TensorFlow",
  "Scikit-learn",
  "Hugging Face",
  "LangChain",
  "OpenCV",
  "FastAPI",
  "Docker",
  "AWS SageMaker",
  "Google Cloud AI",
  "MLflow",
  "Weights & Biases",
  "Kubernetes",
  "React",
  "Node.js",
  "Git",
];

const Index = () => {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Custom cursor effect
  useState(() => {
    const cursorDot = document.createElement('div');
    const cursorOutline = document.createElement('div');
    
    cursorDot.classList.add('cursor-dot');
    cursorOutline.classList.add('cursor-outline');
    
    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorOutline);
    
    const moveCursor = (e: MouseEvent) => {
      cursorDot.style.left = `${e.clientX}px`;
      cursorDot.style.top = `${e.clientY}px`;
      cursorOutline.style.left = `${e.clientX - 16}px`;
      cursorOutline.style.top = `${e.clientY - 16}px`;
    };
    
    const handleHover = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        document.body.classList.add('cursor-hover');
      } else {
        document.body.classList.remove('cursor-hover');
      }
    };
    
    const trackMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousemove', trackMousePosition);
    document.addEventListener('mouseover', handleHover);
    
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousemove', trackMousePosition);
      document.removeEventListener('mouseover', handleHover);
      document.body.removeChild(cursorDot);
      document.body.removeChild(cursorOutline);
      document.body.classList.remove('cursor-hover');
    };
  });

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Navigation />

      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float-slow"
          style={{ 
            top: '10%', 
            left: '10%',
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        />
        <div 
          className="absolute w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float"
          style={{ 
            bottom: '10%', 
            right: '10%',
            transform: `translate(${mousePosition.x * -0.03}px, ${mousePosition.y * -0.03}px)`
          }}
        />
        <div 
          className="absolute w-64 h-64 bg-primary/10 rounded-full blur-2xl animate-float-slow"
          style={{ 
            top: '50%', 
            left: '50%',
            animationDelay: '2s',
            transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.015}px)`
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center px-4 md:px-6 pt-24 md:pt-32 pb-16 md:pb-20">
        <div className="container mx-auto max-w-5xl relative z-10">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-6 animate-slide-in-left">
            AI ENGINEER
          </p>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight max-w-4xl animate-slide-in-right" style={{ animationDelay: '0.1s' }}>
            I build reliable, production-ready AI features and full-stack apps.
          </h1>
          
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
            Focused on pragmatic, high-impact solutions: fast iterations, clean architecture, and measurable outcomes.
          </p>

          <div className="flex items-center gap-4 flex-wrap animate-slide-in-up" style={{ animationDelay: '0.3s' }}>
            <Button 
              onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-foreground text-background hover:bg-foreground/90 px-6 transition-all duration-500 hover:scale-110 hover-lift animate-glow"
            >
              View Projects
            </Button>
            <Dialog open={resumeOpen} onOpenChange={setResumeOpen}>
              <DialogTrigger asChild>
                <Button 
                  variant="outline"
                  className="px-6 transition-all duration-500 hover:scale-110 hover-lift"
                >
                  View Resume
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Resume</DialogTitle>
                </DialogHeader>
                <div className="space-y-6 text-sm">
                  <section>
                    <h3 className="text-lg font-semibold mb-2">Experience</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium">Senior AI Engineer - Tech Company</h4>
                        <p className="text-muted-foreground text-xs">2022 - Present</p>
                        <ul className="list-disc list-inside mt-2 text-muted-foreground space-y-1">
                          <li>Led development of production AI systems serving millions of users</li>
                          <li>Improved model inference speed by 40% through optimization</li>
                          <li>Mentored junior engineers on ML best practices</li>
                        </ul>
                      </div>
                    </div>
                  </section>
                  
                  <section>
                    <h3 className="text-lg font-semibold mb-2">Education</h3>
                    <div>
                      <h4 className="font-medium">Master of Science in Computer Science</h4>
                      <p className="text-muted-foreground text-xs">University Name - 2020</p>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold mb-2">Skills</h3>
                    <p className="text-muted-foreground">Python, PyTorch, TensorFlow, Deep Learning, NLP, Computer Vision, MLOps</p>
                  </section>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>


      {/* Projects Section */}
      <section id="projects" className="py-16 md:py-20 px-4 md:px-6 bg-muted/30 relative">
        <div className="container mx-auto max-w-5xl relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 animate-slide-in-left">
            Selected Projects
          </h2>
          
          <p className="text-sm md:text-base text-muted-foreground mb-12 md:mb-16 animate-slide-in-right" style={{ animationDelay: '0.1s' }}>
            A few focused examples. Code and demos available on request.
          </p>

          <div className="space-y-8">
            {projects.map((project, index) => (
              <div 
                key={project.title} 
                className={index % 2 === 0 ? "animate-slide-in-left" : "animate-slide-in-right"}
                style={{ animationDelay: `${0.2 + index * 0.15}s` }}
              >
                <ProjectCard {...project} index={index} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-20 px-4 md:px-6 relative">
        <div className="container mx-auto max-w-5xl relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 md:mb-8 animate-scale-in">
            About Me
          </h2>
          
          <div className="space-y-4 md:space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl">
            <p className="animate-slide-in-left transition-all duration-500 hover:text-foreground hover:translate-x-2" style={{ animationDelay: '0.1s' }}>
              I'm an AI Engineer passionate about pushing the boundaries of what's possible with machine learning.
              With a strong foundation in mathematics and computer science, I specialize in developing cutting-edge
              AI systems that solve real-world problems.
            </p>
            
            <p className="animate-slide-in-right transition-all duration-500 hover:text-foreground hover:translate-x-2" style={{ animationDelay: '0.2s' }}>
              My expertise spans across deep learning architectures, natural language processing, and computer vision.
              I've successfully deployed production-grade AI models that process millions of requests daily, achieving
              significant improvements in accuracy and performance.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 md:py-20 px-4 md:px-6 bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-shimmer" style={{ top: '20%' }} />
          <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent animate-shimmer" style={{ top: '80%', animationDelay: '1.5s' }} />
        </div>
        <div className="container mx-auto max-w-5xl relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 md:mb-12 animate-scale-in">
            Technical Skills
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {skills.map((skill, index) => (
              <SkillBadge
                key={skill}
                skill={skill}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 md:py-12 px-4 md:px-6 relative">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center justify-center animate-fade-in">
            <p className="text-sm text-muted-foreground transition-all duration-300 hover:text-foreground">
              © 2025 Ujjaval Bhardwaj
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
