import { useCallback } from 'react';

export const useSound = (soundPath: string, volume: number = 0.3) => {
  const playSound = useCallback(() => {
    const audio = new Audio(soundPath);
    audio.volume = volume;
    audio.play().catch(() => {
      // Silently handle autoplay restrictions
    });
  }, [soundPath, volume]);

  return playSound;
};
