import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getUserProfile } from '../userUtils';

// Define the shape of the profile data returned by getUserProfile
interface UserProfile {
  id: string;
  name?: string;
  email?: string;
  photoURL?: string;
  createdAt?: Date; // Made optional since it's not returned by getUserProfile
}

interface UseUserReturn {
  userProfile: UserProfile | null;
  loading: boolean;
}

export const useUser = (): UseUserReturn => {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user?.uid) {
        try {
          const profile = await getUserProfile(user.uid);
          if (profile) {
            setUserProfile({
              ...profile,
              id: profile.id // Ensure id is present
            });
          } else {
            setUserProfile(null);
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
          setUserProfile(null);
        }
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    };

    fetchUserProfile();
  }, [user]);

  return { userProfile, loading };
};