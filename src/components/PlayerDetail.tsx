import { Player } from '@/types/player';

interface PlayerDetailProps {
  player: Player;
}

export default function PlayerDetail({ player }: PlayerDetailProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <p className="text-gray-600">PlayerDetail component - {player.name}</p>
    </div>
  );
}