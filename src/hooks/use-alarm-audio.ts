import { useEffect, useRef } from 'react';
import {
  getCurrentAlarmPath,
  isCustomAlarmSelected,
  getAlarmSettings,
} from '@/utils/alarmSettings';
import { getCustomAlarmURL } from '@/utils/alarmStorage';

/**
 * Hook to manage alarm audio for timer components
 * Automatically loads the user's selected alarm (predefined or custom)
 */
export const useAlarmAudio = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const loadAlarm = async () => {
      try {
        const settings = getAlarmSettings();
        let audioUrl: string;

        if (isCustomAlarmSelected()) {
          // Load custom alarm from IndexedDB
          const customUrl = await getCustomAlarmURL(settings.selectedAlarmId);
          if (customUrl) {
            audioUrl = customUrl;
          } else {
            // Fallback to default if custom alarm not found
            console.warn('Custom alarm not found, using default');
            audioUrl = '/audio/Alarm_1.mp3';
          }
        } else {
          // Load predefined alarm
          audioUrl = getCurrentAlarmPath();
        }

        // Create new audio instance
        audioRef.current = new Audio(audioUrl);
      } catch (error) {
        console.error('Error loading alarm:', error);
        // Fallback to default alarm
        audioRef.current = new Audio('/audio/Alarm_1.mp3');
      }
    };

    loadAlarm();

    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const playAlarm = async () => {
    if (audioRef.current) {
      try {
        audioRef.current.currentTime = 0;
        await audioRef.current.play();
      } catch (error) {
        console.error('Error playing alarm:', error);
      }
    }
  };

  const stopAlarm = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return {
    playAlarm,
    stopAlarm,
    audioRef,
  };
};
