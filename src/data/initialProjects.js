export const initialProjects = [
  {
    id: 1,
    name: 'Enterprise CRM System',
    description:
      'Complete customer relationship management system with advanced analytics and reporting',
    budget: 45000,
    completion: 75,
    priority: 'high',
    status: 'active',
    deadline: '2026-02-15',
    startDate: '2025-09-01',
    category: 'Software Development',
    tags: ['CRM', 'Enterprise', 'Analytics'],
    client: 'TechCorp Industries',
    members: [
      {
        id: 1,
        name: 'John Doe',
        avatar: 'https://i.pravatar.cc/150?img=1',
        role: 'Project Lead',
      },
      {
        id: 2,
        name: 'Jane Smith',
        avatar: 'https://i.pravatar.cc/150?img=2',
        role: 'Senior Developer',
      },
      {
        id: 3,
        name: 'Mike Johnson',
        avatar: 'https://i.pravatar.cc/150?img=3',
        role: 'UI/UX Designer',
      },
    ],
    milestones: [
      { id: 1, title: 'Requirements Gathering', completed: true, date: '2025-09-15' },
      { id: 2, title: 'Design Phase', completed: true, date: '2025-10-20' },
      { id: 3, title: 'Development Phase', completed: false, date: '2026-01-15' },
      { id: 4, title: 'Testing & QA', completed: false, date: '2026-02-01' },
      { id: 5, title: 'Deployment', completed: false, date: '2026-02-15' },
    ],
    tasks: {
      total: 48,
      completed: 36,
      inProgress: 8,
      pending: 4,
    },
  },
  {
    id: 2,
    name: 'Mobile Banking App',
    description: 'Secure mobile banking application with biometric authentication',
    budget: 32000,
    completion: 45,
    priority: 'medium',
    status: 'active',
    deadline: '2026-03-20',
    startDate: '2025-10-15',
    category: 'Mobile Development',
    tags: ['Mobile', 'Banking', 'Security'],
    client: 'National Bank',
    members: [
      {
        id: 4,
        name: 'Sarah Williams',
        avatar: 'https://i.pravatar.cc/150?img=4',
        role: 'Mobile Developer',
      },
      {
        id: 5,
        name: 'Tom Brown',
        avatar: 'https://i.pravatar.cc/150?img=5',
        role: 'Security Specialist',
      },
    ],
    milestones: [
      { id: 1, title: 'Planning & Design', completed: true, date: '2025-11-01' },
      { id: 2, title: 'Backend Development', completed: true, date: '2025-12-15' },
      { id: 3, title: 'Mobile App Development', completed: false, date: '2026-02-15' },
      { id: 4, title: 'Security Audit', completed: false, date: '2026-03-01' },
      { id: 5, title: 'Launch', completed: false, date: '2026-03-20' },
    ],
    tasks: {
      total: 35,
      completed: 16,
      inProgress: 12,
      pending: 7,
    },
  },
  {
    id: 3,
    name: 'E-commerce Platform',
    description: 'Full-featured e-commerce platform with inventory management',
    budget: 58000,
    completion: 90,
    priority: 'high',
    status: 'active',
    deadline: '2026-01-30',
    startDate: '2025-07-01',
    category: 'Web Development',
    tags: ['E-commerce', 'Web', 'Payment'],
    client: 'RetailMax',
    members: [
      {
        id: 6,
        name: 'Emily Davis',
        avatar: 'https://i.pravatar.cc/150?img=6',
        role: 'Full Stack Developer',
      },
      {
        id: 7,
        name: 'David Wilson',
        avatar: 'https://i.pravatar.cc/150?img=7',
        role: 'Frontend Developer',
      },
      {
        id: 8,
        name: 'Lisa Anderson',
        avatar: 'https://i.pravatar.cc/150?img=8',
        role: 'Backend Developer',
      },
      {
        id: 9,
        name: 'Chris Martin',
        avatar: 'https://i.pravatar.cc/150?img=9',
        role: 'QA Engineer',
      },
    ],
    milestones: [
      { id: 1, title: 'Platform Architecture', completed: true, date: '2025-08-01' },
      { id: 2, title: 'Core Features', completed: true, date: '2025-10-15' },
      { id: 3, title: 'Payment Integration', completed: true, date: '2025-12-01' },
      { id: 4, title: 'Testing Phase', completed: false, date: '2026-01-20' },
      { id: 5, title: 'Go Live', completed: false, date: '2026-01-30' },
    ],
    tasks: {
      total: 62,
      completed: 56,
      inProgress: 4,
      pending: 2,
    },
  },
  {
    id: 4,
    name: 'AI Analytics Dashboard',
    description: 'Advanced analytics dashboard with machine learning capabilities',
    budget: 67000,
    completion: 30,
    priority: 'high',
    status: 'active',
    deadline: '2026-04-30',
    startDate: '2025-11-01',
    category: 'AI & Analytics',
    tags: ['AI', 'Analytics', 'Machine Learning'],
    client: 'DataInsights Corp',
    members: [
      {
        id: 10,
        name: 'Robert Chen',
        avatar: 'https://i.pravatar.cc/150?img=10',
        role: 'AI Engineer',
      },
      {
        id: 11,
        name: 'Maria Garcia',
        avatar: 'https://i.pravatar.cc/150?img=11',
        role: 'Data Scientist',
      },
      {
        id: 12,
        name: 'James Lee',
        avatar: 'https://i.pravatar.cc/150?img=12',
        role: 'Backend Developer',
      },
    ],
    milestones: [
      { id: 1, title: 'Data Pipeline Setup', completed: true, date: '2025-11-20' },
      { id: 2, title: 'ML Model Development', completed: false, date: '2026-02-15' },
      { id: 3, title: 'Dashboard Development', completed: false, date: '2026-03-20' },
      { id: 4, title: 'Integration & Testing', completed: false, date: '2026-04-15' },
      { id: 5, title: 'Deployment', completed: false, date: '2026-04-30' },
    ],
    tasks: {
      total: 42,
      completed: 13,
      inProgress: 15,
      pending: 14,
    },
  },
  {
    id: 5,
    name: 'Healthcare Portal',
    description: 'Patient management portal with telemedicine features',
    budget: 52000,
    completion: 60,
    priority: 'critical',
    status: 'active',
    deadline: '2026-02-28',
    startDate: '2025-08-15',
    category: 'Healthcare',
    tags: ['Healthcare', 'Portal', 'Telemedicine'],
    client: 'MediCare Plus',
    members: [
      {
        id: 13,
        name: 'Dr. Amanda White',
        avatar: 'https://i.pravatar.cc/150?img=13',
        role: 'Medical Consultant',
      },
      {
        id: 14,
        name: 'Kevin Park',
        avatar: 'https://i.pravatar.cc/150?img=14',
        role: 'Full Stack Developer',
      },
      {
        id: 15,
        name: 'Nancy Rodriguez',
        avatar: 'https://i.pravatar.cc/150?img=15',
        role: 'UX Designer',
      },
    ],
    milestones: [
      { id: 1, title: 'HIPAA Compliance Review', completed: true, date: '2025-09-10' },
      { id: 2, title: 'Portal Development', completed: true, date: '2025-11-30' },
      { id: 3, title: 'Telemedicine Integration', completed: false, date: '2026-01-30' },
      { id: 4, title: 'Security Testing', completed: false, date: '2026-02-15' },
      { id: 5, title: 'Launch', completed: false, date: '2026-02-28' },
    ],
    tasks: {
      total: 55,
      completed: 33,
      inProgress: 14,
      pending: 8,
    },
  },
  {
    id: 6,
    name: 'Social Media Management Tool',
    description: 'Multi-platform social media management and analytics tool',
    budget: 28000,
    completion: 15,
    priority: 'low',
    status: 'active',
    deadline: '2026-05-15',
    startDate: '2025-12-01',
    category: 'SaaS',
    tags: ['Social Media', 'Analytics', 'Automation'],
    client: 'SocialPro Agency',
    members: [
      {
        id: 16,
        name: 'Alex Turner',
        avatar: 'https://i.pravatar.cc/150?img=16',
        role: 'Full Stack Developer',
      },
      {
        id: 17,
        name: 'Sophie Miller',
        avatar: 'https://i.pravatar.cc/150?img=17',
        role: 'Frontend Developer',
      },
    ],
    milestones: [
      { id: 1, title: 'Platform Research', completed: true, date: '2025-12-15' },
      { id: 2, title: 'API Integrations', completed: false, date: '2026-02-01' },
      { id: 3, title: 'Dashboard Development', completed: false, date: '2026-03-15' },
      { id: 4, title: 'Analytics Module', completed: false, date: '2026-04-15' },
      { id: 5, title: 'Beta Launch', completed: false, date: '2026-05-15' },
    ],
    tasks: {
      total: 38,
      completed: 6,
      inProgress: 10,
      pending: 22,
    },
  },
];

// Helper function to get project by ID
export const getProjectById = (id) => {
  return initialProjects.find((project) => project.id === id);
};

// Helper function to get projects by status
export const getProjectsByStatus = (status) => {
  return initialProjects.filter((project) => project.status === status);
};

// Helper function to get projects by priority
export const getProjectsByPriority = (priority) => {
  return initialProjects.filter((project) => project.priority === priority);
};
