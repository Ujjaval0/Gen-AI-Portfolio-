import { Navigation } from "@/components/Navigation";
import { ProjectCard } from "@/components/ProjectCard";
import { SkillBadge } from "@/components/SkillBadge";
import { SocialLink } from "@/components/SocialLink";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "Neural Network Optimizer",
    description: "Developed a custom optimization algorithm that reduces training time by 40% for large-scale neural networks. Implemented adaptive learning rate scheduling and gradient clipping techniques.",
    techStack: ["PyTorch", "Python", "CUDA", "TensorFlow"],
    githubUrl: "https://github.com/yourusername/neural-optimizer",
    liveUrl: "https://demo.neural-optimizer.com",
  },
  {
    title: "AI-Powered Content Generator",
    description: "Built a fine-tuned GPT model for generating marketing content with context-aware suggestions. Achieved 85% user satisfaction rate with generated content quality.",
    techStack: ["OpenAI API", "LangChain", "FastAPI", "React"],
    githubUrl: "https://github.com/yourusername/content-generator",
    liveUrl: "https://content-gen-demo.com",
  },
  {
    title: "Computer Vision Pipeline",
    description: "Created an end-to-end object detection and tracking system for real-time video analysis. Processes 30 FPS on standard hardware with 92% accuracy.",
    techStack: ["YOLOv8", "OpenCV", "Docker", "AWS"],
    githubUrl: "https://github.com/yourusername/cv-pipeline",
  },
  {
    title: "Reinforcement Learning Game Agent",
    description: "Trained an AI agent using Deep Q-Learning to master complex strategy games. Agent achieved superhuman performance after 10 million training iterations.",
    techStack: ["Stable-Baselines3", "Gymnasium", "NumPy", "Matplotlib"],
    githubUrl: "https://github.com/yourusername/rl-agent",
    liveUrl: "https://rl-agent-demo.com",
  },
];

const skills = {
  "AI & Machine Learning": [
    "Deep Learning",
    "Neural Networks",
    "Computer Vision",
    "NLP",
    "Reinforcement Learning",
    "LLMs",
  ],
  "Programming Languages": [
    "Python",
    "TypeScript",
    "C++",
    "SQL",
    "Rust",
  ],
  "Frameworks & Tools": [
    "PyTorch",
    "TensorFlow",
    "Scikit-learn",
    "Hugging Face",
    "LangChain",
    "OpenCV",
    "FastAPI",
    "Docker",
  ],
  "Cloud & MLOps": [
    "AWS SageMaker",
    "Google Cloud AI",
    "MLflow",
    "Weights & Biases",
    "Kubernetes",
  ],
};

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/yourusername",
    label: "GitHub",
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/yourusername",
    label: "LinkedIn",
  },
  {
    icon: Twitter,
    href: "https://twitter.com/yourusername",
    label: "Twitter",
  },
  {
    icon: Mail,
    href: "mailto:your.email@gmail.com",
    label: "Email",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center px-6 pt-32 pb-20">
        <div className="container mx-auto max-w-5xl">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-6">
            AI ENGINEER
          </p>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight max-w-4xl">
            I build reliable, production-ready AI features and full-stack apps.
          </h1>
          
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl">
            Focused on pragmatic, high-impact solutions: fast iterations, clean architecture, and measurable outcomes.
          </p>

          <div className="flex items-center gap-4 flex-wrap">
            <Button 
              onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-foreground text-background hover:bg-foreground/90 px-6"
            >
              View Projects
            </Button>
            <Button 
              variant="outline"
              className="px-6"
            >
              View Resume
            </Button>
            <span className="text-muted-foreground">you@example.com</span>
          </div>
        </div>
      </section>


      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl font-bold text-foreground mb-3">
            Selected Projects
          </h2>
          
          <p className="text-muted-foreground mb-16">
            A few focused examples. Code and demos available on request.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} {...project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl font-bold text-foreground mb-8">
            About Me
          </h2>
          
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed max-w-3xl">
            <p>
              I'm an AI Engineer passionate about pushing the boundaries of what's possible with machine learning.
              With a strong foundation in mathematics and computer science, I specialize in developing cutting-edge
              AI systems that solve real-world problems.
            </p>
            
            <p>
              My expertise spans across deep learning architectures, natural language processing, and computer vision.
              I've successfully deployed production-grade AI models that process millions of requests daily, achieving
              significant improvements in accuracy and performance.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl font-bold text-foreground mb-12">
            Technical Skills
          </h2>

          <div className="space-y-12">
            {Object.entries(skills).map(([category, skillList]) => (
              <div key={category}>
                <h3 className="text-xl font-semibold text-foreground mb-6">
                  {category}
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {skillList.map((skill, index) => (
                    <SkillBadge
                      key={skill}
                      skill={skill}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media / Connect Section */}
      <section id="connect" className="py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Let's Connect
          </h2>
          
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
            I'm always open to discussing new opportunities, collaborations, or just chatting
            about AI and technology. Feel free to reach out through any of these platforms.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl">
            {socialLinks.map((link, index) => (
              <SocialLink key={link.label} {...link} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="container mx-auto max-w-5xl">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} AI Engineer Portfolio. Built with React, TypeScript, and Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
