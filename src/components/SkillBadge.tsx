interface SkillBadgeProps {
  skill: string;
  index: number;
}

export const SkillBadge = ({ skill }: SkillBadgeProps) => {
  return (
    <div className="rounded-md bg-muted px-4 py-2.5 text-center border border-border transition-colors duration-200 hover:border-foreground/20">
      <span className="text-sm text-foreground">{skill}</span>
    </div>
  );
};
