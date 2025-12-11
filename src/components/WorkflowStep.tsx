import { motion } from "framer-motion";

interface WorkflowStepProps {
    number: string;
    title: string;
    description: string;
    icon: any; // Not used anymore but kept for compatibility
    index: number;
}

export function WorkflowStep({ number, title, description, index }: WorkflowStepProps) {
    const isLast = index === 3; // Last step (index 3 for 4 steps)

    return (
        <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration: 0.5,
                delay: index * 0.15,
                ease: "easeOut"
            }}
            className="relative flex gap-6 sm:gap-8"
        >
            {/* Left side - Dot and animated vertical line */}
            <div className="flex flex-col items-center">
                {/* Animated Dot */}
                <motion.div
                    className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-primary relative z-10 flex-shrink-0"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                        duration: 0.3,
                        delay: index * 0.15,
                        type: "spring",
                        stiffness: 300
                    }}
                >
                    {/* Pulse effect */}
                    <motion.div
                        className="absolute inset-0 rounded-full bg-primary"
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.8, 0, 0.8]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </motion.div>

                {/* Animated Vertical Line */}
                {!isLast && (
                    <motion.div
                        className="w-0.5 bg-primary mt-2"
                        initial={{ height: 0 }}
                        whileInView={{ height: "100%" }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 0.6,
                            delay: index * 0.15 + 0.2,
                            ease: "easeOut"
                        }}
                    />
                )}
            </div>

            {/* Right side - Content */}
            <div className={`flex-1 ${!isLast ? 'pb-8 sm:pb-12' : 'pb-0'}`}>
                {/* Step number badge */}
                <span className="inline-block text-xs font-mono font-semibold text-primary/60 mb-2">
                    STEP {number}
                </span>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2 sm:mb-3">
                    {title}
                </h3>

                {/* Description */}
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {description}
                </p>
            </div>
        </motion.div>
    );
}
