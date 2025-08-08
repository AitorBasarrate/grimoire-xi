import { Player } from '@/types/player';

// Mock data will be implemented in task 2.1
export const mockPlayers: Player[] = [];

export function getAllPlayers(): Player[] {
  return mockPlayers;
}

export function getPlayerById(id: string): Player | undefined {
  return mockPlayers.find(player => player.id === id);
}