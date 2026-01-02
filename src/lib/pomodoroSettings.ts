export interface PomodoroPackage {
  id: string;
  name: string;
  pomodoro: number; // minutes
  shortBreak: number; // minutes
  longBreak: number; // minutes
}

export const DEFAULT_PACKAGE: PomodoroPackage = {
  id: 'default',
  name: 'Standard Pomodoro',
  pomodoro: 25,
  shortBreak: 5,
  longBreak: 15,
};

const STORAGE_KEY_PACKAGES = 'pomodoro-packages-list';
const STORAGE_KEY_ACTIVE = 'pomodoro-active-package-id';

export const getPackages = (): PomodoroPackage[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_PACKAGES);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Ensure default is always there if list is empty? Or just return parsed.
      // If user deleted default, maybe that's fine, but let's ensure at least one package exists.
      if (parsed.length === 0) return [DEFAULT_PACKAGE];
      return parsed;
    }
  } catch (e) {
    console.error('Failed to parse packages', e);
  }
  return [DEFAULT_PACKAGE];
};

export const savePackages = (packages: PomodoroPackage[]) => {
  localStorage.setItem(STORAGE_KEY_PACKAGES, JSON.stringify(packages));
  window.dispatchEvent(new Event('pomodoro-packages-updated'));
};

export const getActivePackageId = (): string => {
  return localStorage.getItem(STORAGE_KEY_ACTIVE) || 'default';
};

export const setActivePackageId = (id: string) => {
  localStorage.setItem(STORAGE_KEY_ACTIVE, id);
  window.dispatchEvent(new Event('pomodoro-package-changed'));
};

export const getActivePackage = (): PomodoroPackage => {
  const packages = getPackages();
  const activeId = getActivePackageId();
  return (
    packages.find((p) => p.id === activeId) || packages[0] || DEFAULT_PACKAGE
  );
};
