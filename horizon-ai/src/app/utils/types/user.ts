// utils/types/user.ts

// https://www.mermaidchart.com/app/projects/0559eafc-f70b-441c-a702-11d9758a3290/diagrams/e2cf429a-8ce4-4ec3-9563-abb678163bb8/version/v0.1/edit












// OLD CODE
interface UnknownObject {
    [key: string]: unknown;
}
  
  // Base User Profile Interface
  export interface UserProfile {
    basicInformation: {
      fullName: string;
      username?: string;
      phoneNumber?: string;
      city?: string;
      state?: string;
      country?: string;
      profilePicture?: string;
      bio?: string;
      currentRole?: {
        role: string;
        company: string;
      };
    };
    experience?: {
      resume?: {
        resumeName: string;
        resumeUrl: string;
      } | null;
    };
    education?: {
      educationEntries: Array<{
        institution: string;
        degree: string;
        major: string;
        startDate: string;
        endDate: string;
        gpa?: string;
        isOngoing: boolean;
      }>;
    };
    industryPreferences?: {
      industries: string[];
      roles: string[];
    };
    portfolio?: {
      portfolioLinks: Array<{
        type: string;
        url: string;
      }>;
    };
    additionalInformation?: {
      notes?: string;
    };
    metadata: {
      userId: string;
      userProfileStatus: string;
      email: string;
      emailVerified: boolean;
      createdAt: string;
      updatedAt: string;
    };
    uid?: string;
    email?: string;
    contactInformation?: {
      secondaryEmail?: string;
      phoneNumber?: string;
    };
  }
  
  // Form-specific interfaces
  export interface SignUpFormData {
    email: string;
    password: string;
    confirmPassword: string;
    agreeToTerms: boolean;
  }
  
  export interface OnboardingFormData {
    fullName: string;
    username: string;
    phoneNumber: string;
    university: string;
    dateOfBirth?: string;
    gender?: 'male' | 'female' | 'other' | '';
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  }
  
  // Component Props
  export interface UserNavbarProps {
    children: React.ReactNode;
  }
  
  // Utility Types
  export type InitialUserProfile = {
    email: string;
    uid: string;
    basicInformation: {
      fullName: string;
      profilePicture?: string;
    };
    metadata: {
      createdAt: string;
      updatedAt: string;
    };
    profileComplete?: boolean;
  };
  
  // Supporting Interfaces
  interface EducationEntry {
    degree: string;
    gpa: string;
    startDate: string;
    endDate: string;
    institution: string;
    isOngoing: boolean;
    major: string;

  }
  
  interface Skill {
    name: string;
    proficiency: string;
  }
  
  interface PortfolioLink {
    type: string;
    url: string;
  }
  
  interface Resume {
    resumeName: string;
    resumeUrl: string;
  }
  
  // Fixed Type Guard with proper typing
  export const isUserProfile = (obj: unknown): obj is UserProfile => {
    if (!obj || typeof obj !== 'object') {
      return false;
    }
  
    const profile = obj as UnknownObject;
  
    return (
      typeof profile.uid === 'string' &&
      typeof profile.email === 'string' &&
      typeof profile.fullName === 'string' &&
      (profile.profileComplete === undefined || typeof profile.profileComplete === 'boolean')
    );
  };
  
  // Constants with explicit types
  export const WORKPLACE_PREFERENCES = ['remote', 'hybrid', 'onsite'] as const;
  export type WorkplacePreference = typeof WORKPLACE_PREFERENCES[number];
  
  export const TEAM_SIZE_PREFERENCES = ['small', 'medium', 'large'] as const;
  export type TeamSizePreference = typeof TEAM_SIZE_PREFERENCES[number];
  
  export const PROFICIENCY_LEVELS = ['beginner', 'intermediate', 'advanced', 'expert'] as const;
  export type ProficiencyLevel = typeof PROFICIENCY_LEVELS[number];
  
  // Helper function to validate specific fields
  export const validateUserFields = (data: unknown): data is Partial<UserProfile> => {
    if (!data || typeof data !== 'object') {
      return false;
    }
  
    const fields = data as UnknownObject;
  
    for (const [key, value] of Object.entries(fields)) {
      switch (key) {
        case 'uid':
        case 'email':
        case 'fullName':
        case 'username':
        case 'bio':
        case 'shortBio':
        case 'phoneNumber':
        case 'city':
        case 'state':
        case 'country':
          if (value !== undefined && typeof value !== 'string') {
            return false;
          }
          break;
        case 'profileComplete':
        case 'isOnline':
          if (value !== undefined && typeof value !== 'boolean') {
            return false;
          }
          break;
        case 'createdAt':
        case 'updatedAt':
        case 'lastSeen':
          if (value !== undefined && typeof value !== 'string') {
            return false;
          }
          break;
      }
    }
  
    return true;
  };