import { Team } from '@/types/player';

interface TeamBadgeProps {
  team: Team;
  size?: 'sm' | 'md' | 'lg';
}

export default function TeamBadge({ team, size = 'md' }: TeamBadgeProps) {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  return (
    <span 
      className={`inline-flex items-center rounded-full font-medium text-white ${sizeClasses[size]}`}
      style={{ backgroundColor: team.colors.primary }}
    >
      {team.shortName}
    </span>
  );
}