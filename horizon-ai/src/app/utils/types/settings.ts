import { db } from '../firebase/config';
import { doc, getDoc, setDoc, collection } from 'firebase/firestore';

export interface ProfileSettings {
  notifications: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    marketingUpdates: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'private' | 'connections';
    showEmail: boolean;
    showPhone: boolean;
  };
  preferences: {
    darkMode: boolean;
    language: string;
  };
}

const DEFAULT_SETTINGS: ProfileSettings = {
  notifications: {
    emailNotifications: true,
    pushNotifications: true,
    marketingUpdates: false,
  },
  privacy: {
    profileVisibility: 'public',
    showEmail: true,
    showPhone: false,
  },
  preferences: {
    darkMode: false,
    language: 'en',
  },
};

export const getUserSettings = async (userId: string): Promise<ProfileSettings> => {
  try {
    const settingsRef = doc(db, 'users', userId, 'settings', 'profilePreferences');
    const settingsSnap = await getDoc(settingsRef);

    if (!settingsSnap.exists()) {
      // If settings don't exist, create them with defaults
      await setDoc(settingsRef, DEFAULT_SETTINGS);
      return DEFAULT_SETTINGS;
    }

    return settingsSnap.data() as ProfileSettings;
  } catch (error) {
    console.error('Error fetching user settings:', error);
    return DEFAULT_SETTINGS;
  }
};

export const updateUserSettings = async (
  userId: string,
  settings: Partial<ProfileSettings>
): Promise<void> => {
  try {
    const settingsRef = doc(db, 'users', userId, 'settings', 'profilePreferences');
    await setDoc(settingsRef, settings, { merge: true });
  } catch (error) {
    console.error('Error updating user settings:', error);
    throw error;
  }
};

export const updateSingleSetting = async (
  userId: string,
  path: string[],
  value: boolean | string
): Promise<void> => {
  try {
    const settingsRef = doc(db, 'users', userId, 'settings', 'profilePreferences');
    const currentSettings = (await getDoc(settingsRef)).data() as ProfileSettings;
    
    // Create a nested update object
    const updateObject = path.reduceRight((acc, key, index) => {
      return index === path.length - 1 ? { [key]: value } : { [key]: acc };
    }, {} as any);

    await setDoc(settingsRef, updateObject, { merge: true });
  } catch (error) {
    console.error('Error updating setting:', error);
    throw error;
  }
}; 