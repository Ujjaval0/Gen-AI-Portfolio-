interface SkillBadgeProps {
  skill: string;
  index: number;
}

export const SkillBadge = ({ skill }: SkillBadgeProps) => {
  return (
    <div className="rounded-md bg-muted px-3 md:px-4 py-2 md:py-2.5 text-center border border-border transition-all duration-300 hover:border-primary hover:scale-105 hover:shadow-md animate-fade-in">
      <span className="text-xs md:text-sm text-foreground">{skill}</span>
    </div>
  );
};
