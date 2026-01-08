export interface CounterPackage {
  id: string;
  name: string;
  duration: number; // seconds
}

export const DEFAULT_COUNTER_PACKAGE: CounterPackage = {
  id: 'default',
  name: 'Standard Countdown',
  duration: 10, // 10 seconds
};

const STORAGE_KEY_PACKAGES = 'counter-packages-list';
const STORAGE_KEY_ACTIVE = 'counter-active-package-id';

export const getCounterPackages = (): CounterPackage[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_PACKAGES);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.length === 0) return [DEFAULT_COUNTER_PACKAGE];
      return parsed;
    }
  } catch (e) {
    console.error('Failed to parse counter packages', e);
  }
  return [DEFAULT_COUNTER_PACKAGE];
};

export const saveCounterPackages = (packages: CounterPackage[]) => {
  localStorage.setItem(STORAGE_KEY_PACKAGES, JSON.stringify(packages));
  window.dispatchEvent(new Event('counter-packages-updated'));
};

export const getActiveCounterPackageId = (): string => {
  return localStorage.getItem(STORAGE_KEY_ACTIVE) || 'default';
};

export const setActiveCounterPackageId = (id: string) => {
  localStorage.setItem(STORAGE_KEY_ACTIVE, id);
  window.dispatchEvent(new Event('counter-package-changed'));
};

export const getActiveCounterPackage = (): CounterPackage => {
  const packages = getCounterPackages();
  const activeId = getActiveCounterPackageId();
  return (
    packages.find((p) => p.id === activeId) ||
    packages[0] ||
    DEFAULT_COUNTER_PACKAGE
  );
};
