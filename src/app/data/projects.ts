// Projects and Announcements data

export interface Project {
  id: string;
  title: string;
  description: string;
  status: 'Completed' | 'Ongoing' | 'Planned';
  date: string;
  participants: number;
  dppAwarded: number;
  category: string;
  image?: string;
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  date: string;
  priority: 'High' | 'Medium' | 'Low';
  author: string;
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'Beach Cleanup Drive',
    description: 'Community service project to clean local beaches and raise awareness about marine pollution.',
    status: 'Completed',
    date: '2024-01-15',
    participants: 45,
    dppAwarded: 150,
    category: 'Environment',
  },
  {
    id: '2',
    title: 'Digital Literacy Program',
    description: 'Teaching basic computer skills to underprivileged children in rural areas.',
    status: 'Ongoing',
    date: '2024-01-10',
    participants: 32,
    dppAwarded: 120,
    category: 'Education',
  },
  {
    id: '3',
    title: 'Blood Donation Camp',
    description: 'Organizing blood donation drive in partnership with local hospitals.',
    status: 'Completed',
    date: '2023-12-20',
    participants: 58,
    dppAwarded: 180,
    category: 'Health',
  },
  {
    id: '4',
    title: 'Career Guidance Workshop',
    description: 'Professional development workshop for college students with industry experts.',
    status: 'Ongoing',
    date: '2024-01-08',
    participants: 28,
    dppAwarded: 100,
    category: 'Professional Development',
  },
  {
    id: '5',
    title: 'Tree Plantation Drive',
    description: 'Planting 1000 trees across the city to combat climate change.',
    status: 'Completed',
    date: '2023-12-10',
    participants: 52,
    dppAwarded: 160,
    category: 'Environment',
  },
  {
    id: '6',
    title: 'Sports Day for Kids',
    description: 'Organizing sports activities for children from local orphanages.',
    status: 'Planned',
    date: '2024-02-05',
    participants: 0,
    dppAwarded: 0,
    category: 'Club Service',
  },
  {
    id: '7',
    title: 'Food Distribution',
    description: 'Weekly food distribution program for homeless people.',
    status: 'Ongoing',
    date: '2024-01-01',
    participants: 38,
    dppAwarded: 140,
    category: 'Community Service',
  },
  {
    id: '8',
    title: 'International Night',
    description: 'Cultural exchange event celebrating diversity and international understanding.',
    status: 'Planned',
    date: '2024-02-14',
    participants: 0,
    dppAwarded: 0,
    category: 'International Service',
  },
];

export const announcements: Announcement[] = [
  {
    id: '1',
    title: 'General Body Meeting',
    message: 'Monthly GBM scheduled for January 20, 2024 at 6:00 PM. Attendance is mandatory for all members.',
    date: '2024-01-12',
    priority: 'High',
    author: 'Rahul Venkatesh',
  },
  {
    id: '2',
    title: 'Project Registration Open',
    message: 'Registration is now open for upcoming Beach Cleanup Drive. Please register by January 18th.',
    date: '2024-01-10',
    priority: 'Medium',
    author: 'Anjali Subramaniam',
  },
  {
    id: '3',
    title: 'DPP Update',
    message: 'DPP points for December projects have been updated. Check your profile for details.',
    date: '2024-01-08',
    priority: 'Low',
    author: 'Naveen Prakash',
  },
  {
    id: '4',
    title: 'New Member Orientation',
    message: 'Welcome session for new members on January 25, 2024. All new members must attend.',
    date: '2024-01-11',
    priority: 'Medium',
    author: 'Kavya Balakrishnan',
  },
  {
    id: '5',
    title: 'District Conference',
    message: 'Save the date! District Conference scheduled for March 15-17, 2024. Early bird registration open.',
    date: '2024-01-13',
    priority: 'High',
    author: 'Arjun Srinivasan',
  },
];

// Member project participation data
export const memberProjects = [
  { projectId: '1', projectTitle: 'Beach Cleanup Drive', date: '2024-01-15', status: 'Completed', dppEarned: 50 },
  { projectId: '2', projectTitle: 'Digital Literacy Program', date: '2024-01-10', status: 'Ongoing', dppEarned: 40 },
  { projectId: '3', projectTitle: 'Blood Donation Camp', date: '2023-12-20', status: 'Completed', dppEarned: 60 },
  { projectId: '5', projectTitle: 'Tree Plantation Drive', date: '2023-12-10', status: 'Completed', dppEarned: 55 },
];

// Analytics data
export const memberGrowthData = [
  { month: 'Jul', members: 45 },
  { month: 'Aug', members: 52 },
  { month: 'Sep', members: 58 },
  { month: 'Oct', members: 61 },
  { month: 'Nov', members: 63 },
  { month: 'Dec', members: 65 },
];

export const projectDistributionData = [
  { name: 'Community Service', value: 25 },
  { name: 'Environment', value: 30 },
  { name: 'Education', value: 20 },
  { name: 'Health', value: 15 },
  { name: 'Professional Dev', value: 10 },
];

export const attendanceData = [
  { month: 'Jul', attendance: 82 },
  { month: 'Aug', attendance: 85 },
  { month: 'Sep', attendance: 88 },
  { month: 'Oct', attendance: 87 },
  { month: 'Nov', attendance: 90 },
  { month: 'Dec', attendance: 88 },
];

export const dppMonthlyData = [
  { month: 'Jul', points: 1200 },
  { month: 'Aug', points: 1350 },
  { month: 'Sep', points: 1450 },
  { month: 'Oct', points: 1380 },
  { month: 'Nov', points: 1520 },
  { month: 'Dec', points: 1550 },
];
