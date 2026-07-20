"use client";

import { useEffect, useState } from "react";
import getAudioManager from "@/utils/audioManager";

export function useAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const manager = getAudioManager();

  useEffect(() => {
    if (!manager) return;
    setIsPlaying(manager.isPlaying);

    const unsubscribe = manager.subscribe((playing) => {
      setIsPlaying(playing);
    });

    return () => {
      unsubscribe();
    };
  }, [manager]);

  const toggle = () => {
    manager?.toggle();
  };

  const playClick = () => {
    manager?.playClick();
  };

  const playHover = () => {
    manager?.playHover();
  };

  return { isPlaying, toggle, playClick, playHover };
}
