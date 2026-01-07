// LocalStorage utility for alarm settings
const ALARM_SETTINGS_KEY = 'studyClock_alarmSettings';

export interface AlarmSettings {
  selectedAlarmId: string;
  selectedAlarmType: 'predefined' | 'custom';
}

// Predefined alarms available in public/audio folder
export const PREDEFINED_ALARMS = [
  {
    id: 'alarm_1',
    name: 'Classic Alarm 1',
    path: '/audio/Alarm_1.mp3',
    isDefault: true,
  },
  { id: 'alarm_2', name: 'Classic Alarm 2', path: '/audio/Alarm_2.mp3' },
  { id: 'alarm_3', name: 'Gentle Wake 1', path: '/audio/Alarm_3.mp3' },
  { id: 'alarm_4', name: 'Gentle Wake 2', path: '/audio/Alarm_4.mp3' },
  { id: 'alarm_5', name: 'Energetic Alarm', path: '/audio/Alarm_5.mp3' },
  { id: 'alarm_6', name: 'Soft Chime', path: '/audio/Alarm_6.mp3' },
  { id: 'alarm_classic', name: 'Classic (Legacy)', path: '/audio/alarm.mp3' },
  { id: 'alarm_crystal', name: 'Crystal Bell', path: '/audio/crystal.mp3' },
];

const DEFAULT_SETTINGS: AlarmSettings = {
  selectedAlarmId: 'alarm_1', // Default to Alarm_1.mp3
  selectedAlarmType: 'predefined',
};

// Get alarm settings from localStorage
export const getAlarmSettings = (): AlarmSettings => {
  try {
    const stored = localStorage.getItem(ALARM_SETTINGS_KEY);
    if (!stored) return DEFAULT_SETTINGS;
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error reading alarm settings:', error);
    return DEFAULT_SETTINGS;
  }
};

// Save alarm settings to localStorage
export const saveAlarmSettings = (settings: AlarmSettings): void => {
  try {
    localStorage.setItem(ALARM_SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Error saving alarm settings:', error);
  }
};

// Set selected alarm (predefined)
export const setSelectedPredefinedAlarm = (alarmId: string): void => {
  const alarm = PREDEFINED_ALARMS.find((a) => a.id === alarmId);
  if (!alarm) {
    console.error('Invalid predefined alarm ID:', alarmId);
    return;
  }

  saveAlarmSettings({
    selectedAlarmId: alarmId,
    selectedAlarmType: 'predefined',
  });
};

// Set selected alarm (custom)
export const setSelectedCustomAlarm = (customAlarmId: string): void => {
  saveAlarmSettings({
    selectedAlarmId: customAlarmId,
    selectedAlarmType: 'custom',
  });
};

// Get current alarm path
export const getCurrentAlarmPath = (): string => {
  const settings = getAlarmSettings();

  if (settings.selectedAlarmType === 'predefined') {
    const alarm = PREDEFINED_ALARMS.find(
      (a) => a.id === settings.selectedAlarmId
    );
    return alarm?.path || PREDEFINED_ALARMS[0].path;
  }

  // For custom alarms, return the ID (will be handled differently)
  return settings.selectedAlarmId;
};

// Check if current selection is custom
export const isCustomAlarmSelected = (): boolean => {
  const settings = getAlarmSettings();
  return settings.selectedAlarmType === 'custom';
};

// Reset to default alarm
export const resetToDefaultAlarm = (): void => {
  saveAlarmSettings(DEFAULT_SETTINGS);
};
