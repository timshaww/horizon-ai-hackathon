// Create new file with the following schema types
export interface ProjectDescription {
  shortDescription: string;
  longDescription?: string;
  problem?: string;
  solution?: string;
  targetAudience?: string;
}

export interface ProjectIndustry {
  selectedIndustries: string[];
  selectedSubcategories?: string[];
  customIndustry?: string;
}

export interface ProjectProgress {
  status: 'idea' | 'prototype' | 'ready_to_launch' | 'scaling';
  statusDetails?: string;
}

export interface ProjectFunding {
  fundingStage?: string;
  currentFunding?: string;
  fundingNeeds?: string[];
  resourceNeeds?: string[];
  additionalDetails?: string;
}

export interface ProjectBasics {
  name: string;
  logo?: string;
  description: ProjectDescription;
  industry: ProjectIndustry;
  progress: ProjectProgress;
  funding: ProjectFunding;
}

export interface ProjectRole {
  id: string;
  type: string;
  title: string;
  openings: number;
  description: string;
  available: string[];
  compensation: {
    type: 'paid' | 'equity' | 'both';
    details: string | null;
    equityType: 'percentage' | 'shares' | 'discuss' | null;
    equityAmountType: string | null;
    paidAmountType: 'exact' | 'range' | null;
    paidFrequencyType: 'per-hour' | 'per-month' | 'per-year' | null;
  };
  timeCommitment: {
    hoursPerWeek: {
      min: number;
      max: number;
    };
    timeRange: 'full-time' | 'part-time';
  };
  skills: {
    id: string;
    name: string;
    importance: 'required' | 'preferred';
  }[];
}

export interface ProjectMetadata {
  adminId: string;
  updatedAt: any; // Firebase Timestamp
  createdAt: any; // Firebase Timestamp
  status: 'draft' | 'published' | 'archived';
}

export interface Project {
  basics: ProjectBasics;
  team: {
    roles: ProjectRole[];
  };
  metadata: ProjectMetadata;
  projectId?: string;
} 