// data/projects.ts
import { Project } from '../types/project';

export const projects: Project[] = [
  {
    id: '1',
    title: 'AI-Powered Healthcare Analytics Platform',
    company: 'HealthTech Solutions',
    type: 'Startup Project',
    status: 'open',
    description: 'Looking for passionate developers and data scientists to build an innovative healthcare analytics platform using machine learning.',
    teamSize: '4-6 members',
    duration: '6 months',
    location: 'Remote',
    skills: ['Python', 'TensorFlow', 'Healthcare', 'React'],
    applicants: 12,
    postedDate: '2024-02-01',

    //-----------------------------------------------------------------------------------
    //                       Project details
    //-----------------------------------------------------------------------------------
    requirements: [
      'Experience with Python and TensorFlow',
      'Understanding of healthcare data',
      'React development experience',
    ],
    responsibilities: [
      'Develop ML models for healthcare data analysis',
      'Build responsive user interfaces',
      'Collaborate with healthcare professionals',
    ],
    benefits: [
      'Remote work flexibility',
      'Healthcare benefits',
      'Professional development budget',
    ],

    //-----------------------------------------------------------------------------------
    //                      Project metrics and stats
    //-----------------------------------------------------------------------------------
    metrics: {
      progress: 68,
      completedTasks: 24,
      totalTasks: 35,
      daysRemaining: 8,
      bugsFix: 8,
      velocity: 85,
    },

    stats: [
      { label: 'Tasks Completed', value: '24/35', trend: 'up', change: '12%' },
      { label: 'Open Issues', value: '3', trend: 'down', change: '25%' },
      { label: 'Team Velocity', value: '85%', trend: 'up', change: '8%' },
      { label: 'Code Coverage', value: '92%', trend: 'up', change: '3%' },
    ],

    // Team information
    teamStructure: [
      { id: '1', name: 'John Doe', role: 'ML Engineer', avatar: 'JD', email: 'john@example.com', joinedAt: '2024-01-15', count: 2 },
      { id: '2', name: 'Jane Smith', role: 'Frontend Developer', avatar: 'JS', email: 'jane@example.com', joinedAt: '2024-01-16', count: 2 },
      { id: '3', name: 'Bob Brown', role: 'Backend Developer', avatar: 'BB', email: 'bob@example.com', joinedAt: '2024-01-17', count: 1 },
      { id: '4', name: 'Alice Green', role: 'Data Scientist', avatar: 'AG', email: 'alice@example.com', joinedAt: '2024-01-18', count: 1 },
      { id: '5', name: 'Charlie White', role: 'DevOps Engineer', avatar: 'CW', email: 'charlie@example.com', joinedAt: '2024-01-19', count: 1 },
      { id: '6', name: 'Diana Black', role: 'UI/UX Designer', avatar: 'DB', email: 'diana@example.com', joinedAt: '2024-01-20', count: 1 },
      { id: '7', name: 'Ethan Blue', role: 'QA Engineer', avatar: 'EB', email: 'ethan@example.com', joinedAt: '2024-01-21', count: 1 },
      { id: '8', name: 'Fiona Red', role: 'Product Manager', avatar: 'FR', email: 'fiona@example.com', joinedAt: '2024-01-22', count: 1 },
      { id: '9', name: 'George Yellow', role: 'Business Analyst', avatar: 'GY', email: 'george@example.com', joinedAt: '2024-01-23', count: 1 },
      { id: '10', name: 'Hannah Purple', role: 'Scrum Master', avatar: 'HP', email: 'hannah@example.com', joinedAt: '2024-01-24', count: 1 },
    ],

    teamMembers: [
      { id: '1', name: 'Sarah Chen', role: 'Tech Lead', avatar: 'SC', email: 'sarah@example.com', joinedAt: '2024-01-15', count: 1 },
      { id: '2', name: 'Mike Johnson', role: 'Frontend Dev', avatar: 'MJ', email: 'mike@example.com', joinedAt: '2024-01-16', count: 1 },
      { id: '3', name: 'Alex Kim', role: 'Backend Dev', avatar: 'AK', email: 'alex@example.com', joinedAt: '2024-01-17', count: 1 },
      { id: '4', name: 'Nina Brown', role: 'Data Analyst', avatar: 'NB', email: 'nina@example.com', joinedAt: '2024-01-18', count: 1 },
      { id: '5', name: 'Oscar Green', role: 'Security Specialist', avatar: 'OG', email: 'oscar@example.com', joinedAt: '2024-01-19', count: 1 },
      { id: '6', name: 'Paula White', role: 'Marketing Manager', avatar: 'PW', email: 'paula@example.com', joinedAt: '2024-01-20', count: 1 },
      { id: '7', name: 'Quincy Black', role: 'Support Engineer', avatar: 'QB', email: 'quincy@example.com', joinedAt: '2024-01-21', count: 1 },
      { id: '8', name: 'Rachel Blue', role: 'Content Writer', avatar: 'RB', email: 'rachel@example.com', joinedAt: '2024-01-22', count: 1 },
      { id: '9', name: 'Sam Red', role: 'Sales Manager', avatar: 'SR', email: 'sam@example.com', joinedAt: '2024-01-23', count: 1 },
      { id: '10', name: 'Tina Yellow', role: 'HR Specialist', avatar: 'TY', email: 'tina@example.com', joinedAt: '2024-01-24', count: 1 },
    ],

    // Project timeline and activities
    timeline: [
      { phase: 'Planning', duration: '2 weeks', description: 'Project setup and planning' },
      { phase: 'Development', duration: '4 months', description: 'Core development phase' },
      { phase: 'Testing', duration: '1 month', description: 'Testing and validation' },
    ],

    activities: [
      {
        id: '1',
        type: 'task',
        message: 'Set up project repository',
        timestamp: '2024-02-05T10:00:00Z',
        userId: '1',
        status: 'completed',
        priority: 'high',
        dueDate: '2024-02-20',
      },
      {
        id: '2',
        type: 'task',
        message: 'Create database schema',
        timestamp: '2024-02-05T08:00:00Z',
        userId: '2',
        status: 'in-progress',
        priority: 'medium',
        dueDate: '2024-02-22',
      },
      {
        id: '3',
        type: 'task',
        message: 'Design user interface',
        timestamp: '2024-02-04T15:00:00Z',
        userId: '3',
        status: 'todo',
        priority: 'high',
        dueDate: '2024-02-25',
      },
    ],

    tickets: [
      {
        id: '1',
        title: 'API Authentication not working',
        description: 'Users are unable to authenticate with the API',
        type: 'bug',
        status: 'open',
        priority: 'high',
        assigneeId: '1', // Sarah Chen
        reporterId: '2', // Mike Johnson
        createdAt: '2024-02-01T10:00:00Z',
        updatedAt: '2024-02-01T10:00:00Z',
        labels: ['api', 'authentication'],
      },
      {
        id: '2',
        title: 'Add dark mode support',
        description: 'Implement dark mode theme across the application',
        type: 'feature',
        status: 'in-progress',
        priority: 'medium',
        assigneeId: '2', // Mike Johnson
        reporterId: '3', // Alex Kim
        createdAt: '2024-02-02T09:00:00Z',
        updatedAt: '2024-02-02T15:00:00Z',
        labels: ['ui', 'enhancement'],
      },
      {
        id: '3',
        title: 'Performance optimization needed',
        description: 'Dashboard loading time is too slow',
        type: 'improvement',
        status: 'open',
        priority: 'urgent',
        assigneeId: '3', // Alex Kim
        reporterId: '1', // Sarah Chen
        createdAt: '2024-02-03T11:00:00Z',
        updatedAt: '2024-02-03T11:00:00Z',
        labels: ['performance', 'dashboard'],
      },
      {
        id: '4',
        title: 'Database schema redesign',
        description: 'The current database schema is not scalable and needs a complete redesign to accommodate future growth and performance improvements. This includes normalizing the tables, optimizing indexes, and ensuring data integrity.',
        type: 'improvement',
        status: 'open',
        priority: 'high',
        assigneeId: '2', // Mike Johnson
        reporterId: '1', // Sarah Chen
        createdAt: '2024-02-04T12:00:00Z',
        updatedAt: '2024-02-04T12:00:00Z',
        labels: ['database', 'schema', 'optimization'],
      },
      {
        id: '5',
        title: 'User authentication enhancement',
        description: 'Enhance the user authentication module to support multi-factor authentication (MFA) and OAuth 2.0. This will improve security and provide users with more options for logging in.',
        type: 'feature',
        status: 'in-progress',
        priority: 'medium',
        assigneeId: '1', // Sarah Chen
        reporterId: '3', // Alex Kim
        createdAt: '2024-02-05T14:00:00Z',
        updatedAt: '2024-02-05T14:00:00Z',
        labels: ['authentication', 'security', 'feature'],
      },
      {
        id: '6',
        title: 'UI/UX overhaul',
        description: 'Conduct a comprehensive UI/UX overhaul to improve the user experience. This includes redesigning the navigation, updating the color scheme, and ensuring the application is fully responsive across all devices.',
        type: 'improvement',
        status: 'open',
        priority: 'high',
        assigneeId: '3', // Alex Kim
        reporterId: '2', // Mike Johnson
        createdAt: '2024-02-06T09:00:00Z',
        updatedAt: '2024-02-06T09:00:00Z',
        labels: ['ui', 'ux', 'design'],
      },
    ],

    //-----------------------------------------------------------------------------------
    //                        Administrative info
    //-----------------------------------------------------------------------------------
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-02-05T00:00:00Z',
    createdBy: 'user123',
    roles: [],
    links: []
  },
];

export const getProjectById = (id: string): Project | undefined => {
  return projects.find(project => project.id === id);
};