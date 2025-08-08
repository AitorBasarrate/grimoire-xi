import { Player } from '@/types/player';

interface PlayerCardProps {
  player: Player;
  onClick: (player: Player) => void;
}

export default function PlayerCard({ player, onClick }: PlayerCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer">
      <p className="text-gray-600">PlayerCard component - {player.name}</p>
    </div>
  );
}