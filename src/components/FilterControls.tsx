import { Team, Position } from '@/types/player';

interface FilterControlsProps {
  teams: Team[];
  positions: Position[];
  onTeamFilter: (teamId: string | null) => void;
  onPositionFilter: (position: Position | null) => void;
  onClearFilters: () => void;
}

export default function FilterControls({ 
  teams, 
  positions, 
  onTeamFilter, 
  onPositionFilter, 
  onClearFilters 
}: FilterControlsProps) {
  return (
    <div className="flex gap-4 items-center">
      <select 
        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        onChange={(e) => onTeamFilter(e.target.value || null)}
      >
        <option value="">All Teams</option>
        {teams.map(team => (
          <option key={team.id} value={team.id}>{team.name}</option>
        ))}
      </select>
      
      <select 
        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        onChange={(e) => onPositionFilter((e.target.value as Position) || null)}
      >
        <option value="">All Positions</option>
        {positions.map(position => (
          <option key={position} value={position}>{position}</option>
        ))}
      </select>
      
      <button 
        onClick={onClearFilters}
        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
      >
        Clear Filters
      </button>
    </div>
  );
}