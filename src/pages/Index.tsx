import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { ProjectCard } from "@/components/ProjectCard";
import { SkillBadge } from "@/components/SkillBadge";
import { SocialLink } from "@/components/SocialLink";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

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
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-foreground mb-6"
          >
            Building the Future with{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Artificial Intelligence
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto"
          >
            AI Engineer specializing in deep learning, computer vision, and large language models.
            Transforming complex problems into intelligent solutions.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-[var(--shadow-lg)] transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            View My Work
          </motion.button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-12 text-center">
              About Me
            </h2>
            
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
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
              
              <p>
                What drives me is the intersection of theoretical AI research and practical implementation. I believe
                in writing clean, efficient code and building systems that are not only powerful but also scalable and
                maintainable. I'm constantly exploring new frameworks, papers, and techniques to stay at the forefront
                of this rapidly evolving field.
              </p>

              <p>
                When I'm not training models or optimizing algorithms, I contribute to open-source AI projects and share
                knowledge with the developer community through technical writing and mentorship.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-center"
          >
            Featured Projects
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-muted-foreground mb-16 text-center max-w-2xl mx-auto"
          >
            A selection of my recent AI and machine learning projects demonstrating expertise
            across various domains and technologies.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} {...project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-foreground mb-16 text-center"
          >
            Technical Skills
          </motion.h2>

          <div className="space-y-12">
            {Object.entries(skills).map(([category, skillList], categoryIndex) => (
              <div key={category}>
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                  className="text-2xl font-semibold text-foreground mb-6"
                >
                  {category}
                </motion.h3>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {skillList.map((skill, index) => (
                    <SkillBadge
                      key={skill}
                      skill={skill}
                      index={index + categoryIndex * skillList.length}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media / Connect Section */}
      <section id="connect" className="py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Let's Connect
            </h2>
            
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              I'm always open to discussing new opportunities, collaborations, or just chatting
              about AI and technology. Feel free to reach out through any of these platforms.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {socialLinks.map((link, index) => (
                <SocialLink key={link.label} {...link} index={index} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} AI Engineer Portfolio. Built with React, TypeScript, and Framer Motion.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
