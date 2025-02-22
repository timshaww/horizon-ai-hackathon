// types/project.ts

export type ProjectStatus = 'open' | 'closed' | 'in-progress';
export type ApplicationStatus = 'draft' | 'submitted' | 'under_review' | 'accepted' | 'rejected';
export type TrendDirection = 'up' | 'down';
export type GoalType = 'growth' | 'innovation' | 'efficiency' | 'culture' | 'financial';


//-----------------------------------------------------------------------------------
//                                              Proejct Types
//-----------------------------------------------------------------------------------
export type TicketStatus = 'open' | 'in-progress' | 'resolved' | 'closed' | 'completed';
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TicketType = 'bug' | 'feature' | 'improvement' | 'question';
export type ActivityType = 'task' | 'comment' | 'update';
//-----------------------------------------------------------------------------------

// Database SVG 
// https://www.mermaidchart.com/raw/e2cf429a-8ce4-4ec3-9563-abb678163bb8?theme=light&version=v0.1&format=svg
export interface Project {
  id: string;
  title: string;
  logo?: string | null;
  company: string;
  type: string;
  status: ProjectStatus;
  description: string;
  teamSize: string;
  duration: string;
  location: string;
  skills: string[];
  applicants: number;
  postedDate: string;

  // Project metrics
  metrics: ProjectMetrics;
  stats: ProjectStats[];

  // Project details
  requirements: string[];
  responsibilities: string[];
  benefits: string[];

  // Information
  teamStructure: ProjectTeam[];

  timeline: ProjectTimeline[];

  activities: ProjectActivity[];

  tickets: ProjecTicket[];

  teamMembers: ProjectTeam[];

  // Administrative
  createdAt: string;
  updatedAt: string;
  createdBy: string;

  roles: {
    title: string;
    compensation: {
      type: string;
      paidAmountType?: string;
      paidFrequencyType?: string;
      equityAmountType?: string;
    };
    timeCommitment: {
      hoursPerWeek: {
        min: number;
        max: number;
      };
    };
  }[];

  links: ProjectLink[];

  joinedRole?: {
    roleTitle: string;
    // Add other properties as needed
  };
}


export interface ProjectTask {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  assigneeId: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjecTicket {
  id: string;
  title: string;
  description: string;
  type: TicketType;
  status: TicketStatus;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  assigneeId: string;
  reporterId: string;
  labels: string[];
  createdAt: any;
  updatedAt: any;
  completedAt?: any;
  closedAt?: any;
  dueDate?: string | null;
}

// Project Types
export interface ProjectMetrics {
  progress: number;
  daysRemaining: number;
  completedTasks: number;
  totalTasks: number;
  bugsFix: number;
  velocity: number;
}

export interface ProjectStats {
  label: string;
  value: string;
  trend: TrendDirection;
  change: string;
}

export interface ProjectTeam {
  id: string;
  name: string;
  role: string;
  avatar: string;
  email: string;
  joinedAt: string;
  count: number;
}

export interface ProjectActivity {
  id: string;
  type: ActivityType;
  message: string;
  timestamp: string;
  userId: string;
  status?: 'todo' | 'in-progress' | 'completed';
  priority?: 'low' | 'medium' | 'high';
  dueDate?: string;
  category?: GoalType;
  progress?: number;
  description?: string;
}

export interface ProjectTimeline {
  phase: string;
  duration: string;
  description: string;
}




//-----------------------------------------------------------------------------------
//                                              Application Types
//-----------------------------------------------------------------------------------
export interface ProjectApplication {
  id: string;
  projectId: string;
  userId: string;
  status: ApplicationStatus;
  coverLetter: string;
  resume?: string;
  submittedAt?: string;
  updatedAt: string;
}

export interface UserProjectInteraction {
  projectId: string;
  userId: string;
  saved: boolean;
  applied: boolean;
  applicationId?: string;
}

interface ProjectLink {
  url: string;
  title: string;
  description: string;
}
