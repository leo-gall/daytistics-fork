export default function useLocalSettings() {
    const SETTINGS_KEY = 'daytistics-settings-v1';

    const set = (key: string, value: any) => {
        if (!import.meta.client) {
            throw new Error('setSetting can only be called from the client');
        }

        const existingSettings = localStorage.getItem(SETTINGS_KEY);
        const settings = existingSettings ? JSON.parse(existingSettings) : {};

        settings[key] = value;
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    };

    const get = (key: string, defaultValue: string): any => {
        if (!import.meta.client) {
            return defaultValue;
        }

        const existingSettings = localStorage.getItem(SETTINGS_KEY);
        const settings = existingSettings ? JSON.parse(existingSettings) : {};

        return settings[key] ?? defaultValue;
    };

    return {
        set,
        get,
    };
}
