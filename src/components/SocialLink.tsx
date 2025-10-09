import { LucideIcon } from "lucide-react";

interface SocialLinkProps {
  icon: LucideIcon;
  href: string;
  label: string;
  index: number;
}

export const SocialLink = ({ icon: Icon, href, label }: SocialLinkProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col items-center gap-3 rounded-lg bg-card p-6 border border-border transition-all duration-200 hover:border-foreground/20"
    >
      <div className="rounded-full bg-muted p-3 transition-colors duration-200 group-hover:bg-foreground">
        <Icon className="h-5 w-5 text-foreground transition-colors duration-200 group-hover:text-background" />
      </div>
      <span className="text-sm text-foreground">{label}</span>
    </a>
  );
};
