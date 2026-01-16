// User data for all 15 login credentials


// ⚠️ DEMO DATA
// This file contains temporary mock data.
// Will be replaced with club backend (Supabase/Firebase).
// Do NOT use in production.


export type UserRole = 'member' | 'bearer' | 'admin';

export interface User {
  id: string;
  rid?: string;
  username?: string;
  password: string;
  role: UserRole;
  name: string;
  email: string;
  phone: string;
  position?: string;
  department?: string;
  joinDate: string;
  attendance?: number;
  dppPoints?: number;
  avatar: string;
}

// 10 Regular Members
export const members: User[] = [
  {
    id: '1',
    rid: '12434547',
    password: 'vishnu2024',
    role: 'member',
    name: 'Vishnu A',
    email: 'rtr.vishnu4@gmail.com',
    phone: '+91 6381131740',
    department: '-',
    joinDate: '2023-08-15',
    attendance: 92,
    dppPoints: 450,
    avatar: "/profile/vishnu.png",
  },

  //////////////////////////////////////////////////////////////fake members data///////////////////////////////////////////////////////////////////
  {
    id: '2',
    rid: '834573402',
    password: 'priya2024',
    role: 'member',
    name: 'Priya Sharma',
    email: 'priya.sharma@rotaract.org',
    phone: '+91 98765 43211',
    department: 'International Service',
    joinDate: '2023-07-20',
    attendance: 88,
    dppPoints: 520,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
  },
  {
    id: '3',
    rid: '834573403',
    password: 'vijay2024',
    role: 'member',
    name: 'Vijay Ramesh',
    email: 'vijay.ramesh@rotaract.org',
    phone: '+91 98765 43212',
    department: 'Club Service',
    joinDate: '2023-09-10',
    attendance: 85,
    dppPoints: 380,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vijay',
  },
  {
    id: '4',
    rid: '834573404',
    password: 'sneha2024',
    role: 'member',
    name: 'Sneha Patel',
    email: 'sneha.patel@rotaract.org',
    phone: '+91 98765 43213',
    department: 'Professional Development',
    joinDate: '2023-06-05',
    attendance: 95,
    dppPoints: 680,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha',
  },
  {
    id: '5',
    rid: '834573405',
    password: 'karthik2024',
    role: 'member',
    name: 'Karthik Reddy',
    email: 'karthik.reddy@rotaract.org',
    phone: '+91 98765 43214',
    department: 'Sports & Recreation',
    joinDate: '2023-08-25',
    attendance: 78,
    dppPoints: 310,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Karthik',
  },
  {
    id: '6',
    rid: '834573406',
    password: 'divya2024',
    role: 'member',
    name: 'Divya Menon',
    email: 'divya.menon@rotaract.org',
    phone: '+91 98765 43215',
    department: 'Environment',
    joinDate: '2023-07-12',
    attendance: 90,
    dppPoints: 475,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Divya',
  },
  {
    id: '7',
    rid: '834573407',
    password: 'rajesh2024',
    role: 'member',
    name: 'Rajesh Krishnan',
    email: 'rajesh.krishnan@rotaract.org',
    phone: '+91 98765 43216',
    department: 'Public Relations',
    joinDate: '2023-09-18',
    attendance: 82,
    dppPoints: 420,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh',
  },
  {
    id: '8',
    rid: '834573408',
    password: 'meera2024',
    role: 'member',
    name: 'Meera Iyer',
    email: 'meera.iyer@rotaract.org',
    phone: '+91 98765 43217',
    department: 'Social Media',
    joinDate: '2023-06-28',
    attendance: 93,
    dppPoints: 590,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Meera',
  },
  {
    id: '9',
    rid: '834573409',
    password: 'suresh2024',
    role: 'member',
    name: 'Suresh Naidu',
    email: 'suresh.naidu@rotaract.org',
    phone: '+91 98765 43218',
    department: 'Finance',
    joinDate: '2023-08-02',
    attendance: 87,
    dppPoints: 440,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Suresh',
  },
  {
    id: '10',
    rid: '834573410',
    password: 'lakshmi2024',
    role: 'member',
    name: 'Lakshmi Nair',
    email: 'lakshmi.nair@rotaract.org',
    phone: '+91 98765 43219',
    department: 'Events',
    joinDate: '2023-07-30',
    attendance: 91,
    dppPoints: 510,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lakshmi',
  },
];//////////////////////////////////////////////////////fake members data////////////////////////////////////////////////////////////////////////////

// 5 Office Bearers
export const bearers: User[] = [
  {
    id: '11',
    rid: '12152803',
    password: 'pavishraj2026',
    role: 'bearer',
    name: 'Rtr. Pavish Raj',
    email: '-',
    phone: '+91 9345792600',
    position: 'President',
    joinDate: '2022-07-01',
    attendance: 98,
    dppPoints: 850,
    avatar: "/profile/pavishraj.jpg",

  },
  {
    id: '12',
    rid: '12209724',
    password: 'thulasi2024',
    role: 'bearer',
    name: 'Rtr. Tulasi Dharan S',
    email: 'rtr.tulasidharans@gmail.com',
    phone: '+91 9842899659',
    position: 'Secretary Admin',
    joinDate: '2022-07-01',
    attendance: 97,
    dppPoints: 820,
    avatar: "/profile/thulasi.jpg",
  },

 {
    id: '12',
    rid: '11937106',
    password: 'sanjay2024',
    role: 'bearer',
    name: 'Rtr. Sanjay B',
    email: 'rtr.sanjaychandar@gmail.com',
    phone: '+91 9629709704',
    position: 'Club-Advisor',
    joinDate: '2022-07-01',
    attendance: 97,
    dppPoints: 820,
    avatar: "/profile/sanjay.png",//not come profile
  },

  {
    id: '12',
    rid: '12290254',
    password: 'shyam2024',
    role: 'bearer',
    name: 'Rtr. Shyam V Madhu',
    email: 'rtr.shyamvmadhu@gmail.com',
    phone: '+91 9842899659',
    position: 'Secretary communication',
    joinDate: '2022-07-01',
    attendance: 97,
    dppPoints: 820,
    avatar:  "/profile/shyam.jpg" ,
  },

  

  {
    id: '13',
    rid: '11937124',
    password: 'deepan2024',
    role: 'bearer',
    name: 'Ipp.Deepan P',
    email: 'rtr.deepanp@gmail.com',
    phone: '+91  6382517017',
    position: 'Immediate past president',
    joinDate: '2022-07-01',
    attendance: 96,
    dppPoints: 790,
    avatar: "/profile/deepan.jpg",
  },

  {
    id: '14',
    rid: '12112531',
    password: 'thennikarthik2024',
    role: 'bearer',
    name: 'Thennikarthik',
    email: 'thenni05bmc@gmail.com',
    phone: '+91 9080275519',
    position: 'Tresurer',
    joinDate: '2022-07-01',
    attendance: 95,
    dppPoints: 760,
    avatar:  "/profile/thenni.jpg",
  },

  {
    id: '15',
    rid: '12098880',
    password: 'mohan2024',
    role: 'bearer',
    name: 'Rtr. Mohana Sundaram S P',
    email: 'rtr.mohanasundaramsp@gmail.com ',
    phone: '+91 9360536183',
    position: 'Vice-President',
    joinDate: '2022-07-01',
    attendance: 94,
    dppPoints: 740,
    avatar: "/profile/mohan.png",//not come profile

  },


  {
    id: '15',
    rid: '12121892',
    password: 'manisha2024',
    role: 'bearer',
    name: 'Rtr. Manishashree S',
    email: 'rtr.manishashrees@gmail.com',
    phone: '+91 7338999807',
    position: 'Joint-Secretary',
    joinDate: '2022-07-01',
    attendance: 94,
    dppPoints: 740,
    avatar:  "/profile/manishashree.jpg",//not come profile
  },
  {
    id: '15',
    rid: '12209718',
    password: 'pazhani2024',
    role: 'bearer',
    name: 'Rtr. Pazhanidharan K N',
    email: 'rtr.pazhanidharankn@gmail.com',
    phone: '+91 8590957767',
    position: 'Chair-All Avenue',
    joinDate: '2022-07-01',
    attendance: 94,
    dppPoints: 740,
    avatar:  "/profile/pazhani.jpg",
  },

];

// 1 Admin
export const admins: User[] = [
  {
    id: 'admin1',
    username: '8823931',
    password: '@RCC-2025',
    role: 'admin',
    name: 'System Administrator',
    email: 'admin@rotaract.org',
    phone: '+91 +91 98428 99659',
    position: 'System Admin',
    joinDate: '2022-01-01',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
  },
];

// Combined user list
export const allUsers: User[] = [...members, ...bearers, ...admins];

// Authentication helper
export const authenticateUser = (
  identifier: string,
  password: string,
  role: UserRole
): User | null => {
  const userList =
    role === 'member' ? members : role === 'bearer' ? bearers : admins;

  const user = userList.find((u) => {
    if (role === 'admin') {
      return u.username === identifier && u.password === password;
    } else {
      return u.rid === identifier && u.password === password;
    }
  });

  return user || null;
};
