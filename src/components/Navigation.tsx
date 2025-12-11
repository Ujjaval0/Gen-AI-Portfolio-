import { Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SmoothTabs } from "./SmoothTabs";
import { ThemeToggle } from "./ThemeToggle";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const tabs = [
    { id: "projects", label: "Projects", href: "#projects" },
    { id: "workflow", label: "Workflow", href: "#workflow" },
    { id: "skills", label: "Skills", href: "#skills" },
    { id: "about", label: "About Me", href: "#about" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Update scrolled state
      setIsScrolled(currentScrollY > 50);

      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <motion.div
      className="sticky top-4 sm:top-6 left-0 right-0 z-50 px-3 sm:px-4 md:px-6"
      initial={{ y: 0, opacity: 1 }}
      animate={{
        y: isVisible ? 0 : -100,
        opacity: isVisible ? 1 : 0
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut"
      }}
    >
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.6,
          ease: "easeOut"
        }}
        className={`mx-auto max-w-3xl transition-all duration-300 font-header-footer rounded-xl sm:rounded-2xl ${isScrolled
          ? "backdrop-blur-xl bg-background/70 shadow-2xl border border-border/50"
          : "backdrop-blur-lg bg-background/40 border border-border/30"
          }`}
        style={{
          backdropFilter: isScrolled ? "blur(20px) saturate(180%)" : "blur(16px) saturate(150%)",
        }}
      >
        <div className="px-2 sm:px-3 md:px-4 py-2">
          <div className="flex items-center justify-between gap-2 sm:gap-3">
            {/* Left: Animated Logo */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.2,
                type: "spring",
                stiffness: 200,
                damping: 20
              }}
            >
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex items-center cursor-pointer"
                aria-label="Scroll to top"
              >
                <motion.div
                  className="relative w-8 h-8 flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Animated circles */}
                  <motion.div
                    className="absolute w-6 h-6 rounded-full border-2 border-primary"
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  <motion.div
                    className="absolute w-4 h-4 rounded-full bg-primary/50"
                    animate={{
                      scale: [1, 0.8, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div
                    className="absolute w-2 h-2 rounded-full bg-primary"
                    animate={{
                      scale: [1, 1.5, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
              </button>
            </motion.div>

            {/* Center: Navigation Tabs */}
            <motion.div
              className="hidden md:block flex-shrink-0"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.3,
                type: "spring",
                stiffness: 200,
                damping: 20
              }}
            >
              <SmoothTabs tabs={tabs} />
            </motion.div>

            {/* Right: Social Icons + Theme Toggle */}
            <motion.div
              className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.2,
                type: "spring",
                stiffness: 200,
                damping: 20
              }}
            >
              {/* LinkedIn Icon */}
              <motion.a
                href="https://www.linkedin.com/in/ujjaval-bhardwaj-94902b244"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors p-1.5 rounded-lg hover:bg-muted/50"
                aria-label="LinkedIn"
                whileHover={{
                  scale: 1.1,
                  rotate: -3,
                  y: -1
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <Linkedin className="h-4 w-4" />
              </motion.a>

              {/* Email Icon */}
              <motion.a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=ujjavalbhardwaj6@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors p-1.5 rounded-lg hover:bg-muted/50"
                aria-label="Email"
                whileHover={{
                  scale: 1.1,
                  y: -2,
                  rotate: 1
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <Mail className="h-4 w-4" />
              </motion.a>

              {/* Theme Toggle */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.4,
                  delay: 0.4,
                  type: "spring",
                  stiffness: 200,
                  damping: 20
                }}
              >
                <ThemeToggle />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.nav>
    </motion.div>
  );
};

export { Navigation };
