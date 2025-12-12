import { Navigation } from "@/components/Navigation";
import { ResumeChatBox } from "@/components/ResumeChatBox";
import { MobileChatButton } from "@/components/MobileChatButton";
import { ProjectCard } from "@/components/ProjectCard";
import { SkillCategory } from "@/components/SkillCategory";
import { WorkflowStep } from "@/components/WorkflowStep";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Github, Linkedin, Mail, Lightbulb, Code, TestTube, Rocket } from "lucide-react";
import { useState } from "react";
import neuralOptimizerImg from "@/assets/neural-optimizer.jpg";
import contentGeneratorImg from "@/assets/content-generator.jpg";
import cvPipelineImg from "@/assets/cv-pipeline.jpg";
import rlAgentImg from "@/assets/rl-agent.jpg";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { SplitText } from "@/components/SplitText";
import { ScrollIndicator } from "@/components/ScrollIndicator";


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

const skillCategories = [
  {
    title: "AGENTIC AI & ORCHESTRATION",
    skills: ["LangChain", "LangGraph", "LangSmith", "CrewAI", "AutoGen", "Prompt Engineering"],
    priority: true,
  },
  {
    title: "VECTOR DB & RAG",
    skills: ["Pinecone", "Weaviate", "ChromaDB", "Embedding Models", "Semantic Search"],
    priority: false,
  },
  {
    title: "LLM & MODELS",
    skills: ["OpenAI GPT-4", "Anthropic Claude", "Hugging Face", "Fine-tuning", "Llama"],
    priority: false,
  },
  {
    title: "EVALUATION & OBSERVABILITY",
    skills: ["LangSmith", "Arize Phoenix", "Weights & Biases", "Custom Eval Frameworks"],
    priority: false,
  },
  {
    title: "CORE LANGUAGES & INFRA",
    skills: ["Python", "TypeScript", "FastAPI", "Docker", "AWS SageMaker", "Kubernetes"],
    priority: false,
  },
];

const workflowSteps = [
  {
    number: "01",
    title: "Problem Definition",
    description: "Define clear objectives, success metrics, and constraints. Analyze data availability and quality. Identify potential risks and establish baseline performance benchmarks.",
    icon: Lightbulb,
  },
  {
    number: "02",
    title: "System Design",
    description: "Design scalable architecture, select optimal models and frameworks. Plan data pipelines, API contracts, and infrastructure requirements. Create technical specifications and architecture diagrams.",
    icon: Code,
  },
  {
    number: "03",
    title: "Build & Validate",
    description: "Implement features iteratively with continuous testing. Conduct rigorous evaluation using custom metrics. Optimize for performance, accuracy, and resource efficiency.",
    icon: TestTube,
  },
  {
    number: "04",
    title: "Deploy & Monitor",
    description: "Deploy with CI/CD pipelines and comprehensive monitoring. Track model performance, user feedback, and system health. Iterate based on real-world data and evolving requirements.",
    icon: Rocket,
  },
];

const Index = () => {
  const [resumeOpen, setResumeOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0.8]);
  const scale = useTransform(scrollYProgress, [0, 0.15], [1, 0.98]);

  // Enhanced transition settings
  const springTransition = {
    type: "spring" as const,
    stiffness: 300,
    damping: 25,
  };

  const smoothTransition = {
    duration: 0.5,
    ease: "easeOut" as const,
  };

  const gentleTransition = {
    duration: 0.3,
    ease: "easeInOut" as const,
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section with Chat Widget */}
      <motion.section
        className="relative min-h-[90vh] sm:min-h-[95vh] flex items-center px-3 sm:px-4 md:px-6 pt-12 sm:pt-16 md:pt-18 lg:pt-24 pb-12 sm:pb-16 md:pb-20 lg:pb-24 overflow-hidden"
        style={{ opacity, scale }}
      >
        {/* Background animations removed */}

        {/* Gradient Overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background pointer-events-none z-[1]" />

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 items-start">
            {/* Main Hero Content */}
            <div className="flex-1">
              <motion.p
                className="text-xs uppercase tracking-wider text-muted-foreground mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={smoothTransition}
              >
                AI ENGINEER
              </motion.p>

              <SplitText
                text="I build reliable, production-ready AI agents and agentic systems that actually ship."
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight max-w-4xl"
                delay={0.3}
                stagger={0.02}
              />

              <motion.p
                className="text-lg text-muted-foreground mb-10 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...smoothTransition, delay: 0.8 }}
              >
                Focused on: Multi-agent orchestration, RAG pipelines, evaluation-driven development, and production reliability.
              </motion.p>

              <motion.div
                className="flex items-center gap-4 flex-wrap"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...smoothTransition, delay: 1 }}
              >
                <Button
                  onClick={() => {
                    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="bg-foreground text-background hover:bg-foreground/90 px-6"
                >
                  View Projects
                </Button>
                <Dialog open={resumeOpen} onOpenChange={setResumeOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="px-6"
                    >
                      Resume
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
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-medium">Bachelor’s in Computer Applications (BCA)</h4>
                          </div>
                          <div>
                            <h4 className="font-medium">Diploma in Data Analytics</h4>
                            <p className="text-muted-foreground text-xs">Ducat</p>
                          </div>
                        </div>
                      </section>

                      <section>
                        <h3 className="text-lg font-semibold mb-2">Skills</h3>
                        <p className="text-muted-foreground">Python, PyTorch, TensorFlow, Deep Learning, NLP, Computer Vision, MLOps</p>
                      </section>
                    </div>
                  </DialogContent>
                </Dialog>
              </motion.div>
            </div>

            {/* Chat Widget - Right Side */}
            <div className="hidden lg:block w-full lg:w-auto flex-shrink-0">
              <ResumeChatBox />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <ScrollIndicator />
      </motion.section>

      {/* Projects Section */}
      <section id="projects" className="py-16 md:py-20 px-4 md:px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-foreground mb-3 font-heading"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={smoothTransition}
          >
            Selected Projects
          </motion.h2>

          <motion.p
            className="text-sm md:text-base text-muted-foreground mb-12 md:mb-16"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ ...smoothTransition, delay: 0.1 }}
          >
            A few focused examples. Code and demos available on request.
          </motion.p>

          <AnimatePresence mode="wait">
            <div className="max-w-6xl mx-auto">
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-stretch"
                layout
              >
                {projects.map((project, index) => (
                  <motion.div
                    key={project.title}
                    layout
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{
                      ...springTransition,
                      delay: index * 0.1
                    }}
                    className="flex"
                  >
                    <ProjectCard {...project} index={index} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </AnimatePresence>
        </div>
      </section>

      {/* Workflow Section */}
      <section id="workflow" className="py-16 md:py-20 px-4 md:px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-foreground mb-3 font-heading"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={smoothTransition}
          >
            Workflow
          </motion.h2>

          <motion.p
            className="text-sm md:text-base text-muted-foreground mb-12 md:mb-16"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ ...smoothTransition, delay: 0.1 }}
          >
            My systematic approach to building production-ready AI systems
          </motion.p>

          <div className="max-w-3xl mx-auto">
            {workflowSteps.map((step, index) => (
              <WorkflowStep
                key={step.number}
                number={step.number}
                title={step.title}
                description={step.description}
                icon={step.icon}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 md:py-20 px-4 md:px-6 relative overflow-hidden">

        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-foreground mb-8 md:mb-12 font-heading"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={springTransition}
          >
            Technical Skills
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            layout
          >
            <AnimatePresence>
              {skillCategories.map((category, index) => (
                <SkillCategory
                  key={category.title}
                  title={category.title}
                  skills={category.skills}
                  index={index}
                  priority={category.priority}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-20 px-4 md:px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-foreground mb-6 md:mb-8 font-heading"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={springTransition}
          >
            About Me
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            {/* Profile Photo */}
            <motion.div
              className="flex justify-center lg:justify-end order-2 lg:order-2"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ ...springTransition, delay: 0.2 }}
            >
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl">
                  <motion.img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
                    alt="AI Engineer Profile"
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </div>
                <motion.div
                  className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full flex items-center justify-center"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <span className="text-background text-sm">🚀</span>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* About Text */}
            <motion.div
              className="space-y-4 md:space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed order-1 lg:order-1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ ...smoothTransition, delay: 0.1 }}
            >
              <motion.p
                className="transition-all duration-300 hover:text-foreground"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ ...smoothTransition, delay: 0.1 }}
                whileHover={{ x: 10, scale: 1.02 }}
              >
                I’m Ujjaval Bhardwaj, a developer with a Bachelor’s in Computer Applications (BCA) and a diploma in Data Analytics from Ducat. I focus on Python and large language models, and I’m especially interested in using AI to build clear, developer-friendly tools and workflows
              </motion.p>

              <motion.p
                className="transition-all duration-300 hover:text-foreground"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ ...smoothTransition, delay: 0.3 }}
                whileHover={{ x: 10, scale: 1.02 }}
              >
                I work with LLMs, prompt design, and using different frameworks like LangChain, LangSmith, and CrewAI to build and refine real projects. Building Cool things with Cool People !
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 md:py-12 px-4 md:px-6 font-header-footer border-t border-border">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.p
              className="text-sm text-muted-foreground"
              whileHover={{ scale: 1.05 }}
            >
              © 2025 Ujjaval
            </motion.p>

            <div className="flex items-center gap-4">
              <motion.a
                href="https://github.com/Ujjaval0"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 text-sm"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="h-4 w-4" />
                <span>GitHub</span>
              </motion.a>

              <motion.a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=ujjavalbhardwaj6@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 text-sm"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="h-4 w-4" />
                <span>Email</span>
              </motion.a>

              <motion.a
                href="https://www.linkedin.com/in/ujjaval-bhardwaj-94902b244"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 text-sm"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin className="h-4 w-4" />
                <span>LinkedIn</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </footer>

      {/* Mobile Chat Button - Only visible on mobile/tablet */}
      <MobileChatButton />
    </div>
  );
};

export default Index;

