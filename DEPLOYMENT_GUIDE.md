# Rotaract Club Management System - Production Deployment Guide

## Table of Contents
1. [Running Locally](#1-running-locally)
2. [Current Architecture Overview](#2-current-architecture-overview)
3. [Backend & Database Setup](#3-backend--database-setup)
4. [Authentication System](#4-authentication-system)
5. [Replacing Mock Data](#5-replacing-mock-data)
6. [File Upload & Storage](#6-file-upload--storage)
7. [Production Deployment](#7-production-deployment)
8. [Club Ownership Setup](#8-club-ownership-setup)
9. [Troubleshooting](#9-troubleshooting)

---

## 1. Running Locally

### Step 1: Export Your Code from Figma Make
1. Download all files from Figma Make (there should be a download/export option)
2. You'll get a zip file with the complete project structure

### Step 2: Set Up Your Local Environment
```bash
# Navigate to your project folder
cd rotaract-club-management

# Install dependencies (requires Node.js 18+ and npm)
npm install

# Start development server
npm run dev

# Your app will be available at http://localhost:5173
```

### Step 3: Verify the Project Structure
Your project should have this structure:
```
rotaract-club-management/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── admin/       # Admin pages
│   │   │   ├── bearer/      # Office bearer pages
│   │   │   ├── member/      # Member pages
│   │   │   ├── ui/          # Reusable UI components
│   │   │   └── Login.tsx    # Login page
│   │   ├── context/
│   │   │   └── AuthContext.tsx  # Authentication logic
│   │   ├── data/
│   │   │   ├── users.ts     # Mock user data
│   │   │   └── projects.ts  # Mock project data
│   │   └── App.tsx
│   └── styles/
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

## 2. Current Architecture Overview

### What's Currently Working (Demo Mode)
- ✅ Login page with 3 tabs (Member/Bearer/Admin)
- ✅ 15 hardcoded user credentials
- ✅ Role-based routing and access control
- ✅ All UI components and pages
- ✅ Mock data for 65 members and 8 projects
- ✅ Charts and analytics (using Recharts)
- ✅ Dark theme with role-based colors

### What Needs Implementation
- ❌ Real database connection
- ❌ Backend API for CRUD operations
- ❌ Real authentication system
- ❌ File upload/storage for member photos, project documents
- ❌ Data persistence (changes don't save)
- ❌ User session management
- ❌ Email notifications
- ❌ Data validation and security

---

## 3. Backend & Database Setup

### Recommended Stack: Supabase (Free Tier Available)
Supabase is perfect for this project because it provides:
- PostgreSQL database
- Authentication system
- File storage
- Real-time subscriptions
- Row Level Security (RLS)
- Free tier with 500MB database + 1GB file storage

### Step 1: Create a Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Sign up with your **club's email** (e.g., rotaractcoimbatorecity@gmail.com)
3. Create a new project
4. Save your project URL and API keys

### Step 2: Database Schema

Create these tables in Supabase SQL Editor:

```sql
-- 1. Users/Members Table
CREATE TABLE members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('member', 'bearer', 'admin')),
  member_id TEXT UNIQUE NOT NULL,
  phone TEXT,
  designation TEXT,
  department TEXT,
  year_joined INTEGER,
  profile_photo_url TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Projects Table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  start_date DATE,
  end_date DATE,
  status TEXT DEFAULT 'planning' CHECK (status IN ('planning', 'active', 'completed', 'cancelled')),
  lead_member_id UUID REFERENCES members(id),
  budget DECIMAL(10,2),
  participants_count INTEGER DEFAULT 0,
  impact_metrics JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Project Participants (Many-to-Many)
CREATE TABLE project_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  member_id UUID REFERENCES members(id) ON DELETE CASCADE,
  role TEXT,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(project_id, member_id)
);

-- 4. Attendance Table
CREATE TABLE attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID REFERENCES members(id) ON DELETE CASCADE,
  event_date DATE NOT NULL,
  event_name TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('present', 'absent', 'excused')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Announcements Table
CREATE TABLE announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('general', 'event', 'urgent', 'meeting')),
  author_id UUID REFERENCES members(id),
  published_at TIMESTAMPTZ DEFAULT NOW(),
  is_pinned BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Club Activity/Events Table
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  event_date DATE NOT NULL,
  event_time TIME,
  location TEXT,
  category TEXT NOT NULL,
  organizer_id UUID REFERENCES members(id),
  max_participants INTEGER,
  registration_deadline DATE,
  status TEXT DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Settings Table (for club-wide settings)
CREATE TABLE club_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key TEXT UNIQUE NOT NULL,
  setting_value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_members_email ON members(email);
CREATE INDEX idx_members_role ON members(role);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_attendance_member ON attendance(member_id);
CREATE INDEX idx_attendance_date ON attendance(event_date);
CREATE INDEX idx_announcements_published ON announcements(published_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- RLS Policies (Examples - adjust based on your needs)

-- Members: Users can read all members, but only admins can modify
CREATE POLICY "Anyone can view members" ON members
  FOR SELECT USING (true);

CREATE POLICY "Only admins can insert members" ON members
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM members WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Only admins can update members" ON members
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM members WHERE id = auth.uid() AND role = 'admin')
  );

-- Projects: Everyone can view, bearers and admins can modify
CREATE POLICY "Anyone can view projects" ON projects
  FOR SELECT USING (true);

CREATE POLICY "Bearers and admins can create projects" ON projects
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM members WHERE id = auth.uid() AND role IN ('bearer', 'admin'))
  );

-- Add more policies as needed...
```

### Step 3: Install Supabase Client

```bash
npm install @supabase/supabase-js
```

### Step 4: Configure Supabase Client

Create `/src/app/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types (auto-generated from Supabase)
export type Member = {
  id: string;
  email: string;
  full_name: string;
  role: 'member' | 'bearer' | 'admin';
  member_id: string;
  phone?: string;
  designation?: string;
  department?: string;
  year_joined?: number;
  profile_photo_url?: string;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
};

export type Project = {
  id: string;
  name: string;
  description?: string;
  category: string;
  start_date?: string;
  end_date?: string;
  status: 'planning' | 'active' | 'completed' | 'cancelled';
  lead_member_id?: string;
  budget?: number;
  participants_count: number;
  impact_metrics?: any;
  created_at: string;
  updated_at: string;
};

// Add other types as needed
```

Create `.env.local` file in project root:

```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

**Important:** Add `.env.local` to `.gitignore` so credentials aren't committed to version control.

---

## 4. Authentication System

### Step 1: Migrate from Mock Auth to Supabase Auth

Update `/src/app/context/AuthContext.tsx`:

```typescript
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, type Member } from '@/app/lib/supabase';

interface AuthContextType {
  user: Member | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    checkUser();

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        await fetchUserProfile(session.user.id);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const checkUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        await fetchUserProfile(session.user.id);
      }
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      setUser(data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        await fetchUserProfile(data.user.id);
      }
    } catch (error: any) {
      throw new Error(error.message || 'Login failed');
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
    } catch (error: any) {
      throw new Error(error.message || 'Logout failed');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

### Step 2: Update Login Component

Update `/src/app/components/Login.tsx` to use the new authentication:

```typescript
// Replace the handleSubmit function with:

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');

  try {
    await login(credentials.email, credentials.password);
    toast.success('Login successful!');
  } catch (err: any) {
    setError(err.message || 'Invalid credentials');
    toast.error(err.message || 'Invalid credentials');
  }
};
```

### Step 3: Create Initial Admin User

Run this in Supabase SQL Editor to create your first admin:

```sql
-- First create the auth user (Supabase handles password hashing)
-- You'll need to use Supabase Dashboard > Authentication > Users > Add User
-- Or use the Supabase API

-- Then create the member profile
INSERT INTO members (
  id, 
  email, 
  full_name, 
  role, 
  member_id, 
  designation,
  status
) VALUES (
  'paste-the-uuid-from-auth-user-here',
  'admin@rotaractcoimbatorecity.org',
  'Admin User',
  'admin',
  'ADMIN001',
  'System Administrator',
  'active'
);
```

---

## 5. Replacing Mock Data

### Step 1: Create API Service Layer

Create `/src/app/services/membersService.ts`:

```typescript
import { supabase, type Member } from '@/app/lib/supabase';

export const membersService = {
  // Get all members
  async getAll() {
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .order('full_name');
    
    if (error) throw error;
    return data;
  },

  // Get member by ID
  async getById(id: string) {
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Create member
  async create(member: Partial<Member>) {
    const { data, error } = await supabase
      .from('members')
      .insert(member)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Update member
  async update(id: string, updates: Partial<Member>) {
    const { data, error } = await supabase
      .from('members')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Delete member
  async delete(id: string) {
    const { error } = await supabase
      .from('members')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Get members by role
  async getByRole(role: 'member' | 'bearer' | 'admin') {
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .eq('role', role)
      .order('full_name');
    
    if (error) throw error;
    return data;
  },
};
```

Create similar services for:
- `/src/app/services/projectsService.ts`
- `/src/app/services/attendanceService.ts`
- `/src/app/services/announcementsService.ts`
- `/src/app/services/eventsService.ts`

### Step 2: Update Components to Use Services

Example - Update `/src/app/components/member/MembersPage.tsx`:

```typescript
import { useEffect, useState } from 'react';
import { membersService } from '@/app/services/membersService';
import type { Member } from '@/app/lib/supabase';

export const MembersPage = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      setLoading(true);
      const data = await membersService.getAll();
      setMembers(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading members...</div>;
  if (error) return <div>Error: {error}</div>;

  // Rest of your component...
};
```

### Step 3: Migrate Your Mock Data

Create a migration script `/scripts/migrateData.ts`:

```typescript
import { supabase } from '../src/app/lib/supabase';
import { mockMembers } from '../src/app/data/users'; // Your existing mock data
import { mockProjects } from '../src/app/data/projects';

async function migrateData() {
  console.log('Starting data migration...');

  // Migrate members
  for (const member of mockMembers) {
    try {
      // First create auth user
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: member.email,
        password: member.password, // Use temporary password
        email_confirm: true,
      });

      if (authError) {
        console.error(`Failed to create auth user for ${member.email}:`, authError);
        continue;
      }

      // Then create member profile
      const { error: memberError } = await supabase
        .from('members')
        .insert({
          id: authData.user.id,
          email: member.email,
          full_name: member.name,
          role: member.role,
          member_id: member.id,
          designation: member.designation,
          department: member.department,
          // Map other fields...
        });

      if (memberError) {
        console.error(`Failed to create member profile for ${member.email}:`, memberError);
      } else {
        console.log(`✓ Migrated ${member.email}`);
      }
    } catch (error) {
      console.error(`Error migrating ${member.email}:`, error);
    }
  }

  // Migrate projects
  for (const project of mockProjects) {
    try {
      const { error } = await supabase
        .from('projects')
        .insert({
          name: project.name,
          description: project.description,
          category: project.category,
          // Map other fields...
        });

      if (error) {
        console.error(`Failed to create project ${project.name}:`, error);
      } else {
        console.log(`✓ Migrated project: ${project.name}`);
      }
    } catch (error) {
      console.error(`Error migrating project ${project.name}:`, error);
    }
  }

  console.log('Migration complete!');
}

migrateData();
```

Run the migration:
```bash
npx tsx scripts/migrateData.ts
```

---

## 6. File Upload & Storage

### Step 1: Configure Supabase Storage

1. In Supabase Dashboard, go to **Storage**
2. Create buckets:
   - `member-photos` (for profile pictures)
   - `project-documents` (for project files)
   - `announcements-media` (for announcement attachments)

3. Set bucket policies (make them public or private based on needs)

### Step 2: Create Upload Service

Create `/src/app/services/uploadService.ts`:

```typescript
import { supabase } from '@/app/lib/supabase';

export const uploadService = {
  // Upload member photo
  async uploadMemberPhoto(file: File, memberId: string) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${memberId}-${Date.now()}.${fileExt}`;
    const filePath = `${memberId}/${fileName}`;

    const { data, error } = await supabase.storage
      .from('member-photos')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (error) throw error;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('member-photos')
      .getPublicUrl(filePath);

    return publicUrl;
  },

  // Upload project document
  async uploadProjectDocument(file: File, projectId: string) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = `${projectId}/${fileName}`;

    const { data, error } = await supabase.storage
      .from('project-documents')
      .upload(filePath, file);

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('project-documents')
      .getPublicUrl(filePath);

    return {
      url: publicUrl,
      name: file.name,
      size: file.size,
    };
  },

  // Delete file
  async deleteFile(bucket: string, path: string) {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);

    if (error) throw error;
  },
};
```

### Step 3: Add File Upload Component

Create `/src/app/components/ui/file-upload.tsx`:

```typescript
import React, { useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';
import { Button } from './button';

interface FileUploadProps {
  onUpload: (file: File) => Promise<string>;
  accept?: string;
  maxSize?: number; // in bytes
  currentImage?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onUpload,
  accept = 'image/*',
  maxSize = 5 * 1024 * 1024, // 5MB default
  currentImage,
}) => {
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size
    if (file.size > maxSize) {
      setError(`File size must be less than ${maxSize / 1024 / 1024}MB`);
      return;
    }

    setError(null);
    setUploading(true);

    try {
      // Show preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Upload file
      await onUpload(file);
    } catch (err: any) {
      setError(err.message);
      setPreview(currentImage || null);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      {preview && (
        <div className="relative inline-block">
          <img
            src={preview}
            alt="Preview"
            className="w-32 h-32 rounded-lg object-cover"
          />
          <Button
            size="sm"
            variant="destructive"
            className="absolute -top-2 -right-2"
            onClick={() => {
              setPreview(null);
              if (inputRef.current) inputRef.current.value = '';
            }}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}

      <div>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleFileSelect}
          className="hidden"
          disabled={uploading}
        />
        <Button
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          variant="outline"
        >
          <Upload className="w-4 h-4 mr-2" />
          {uploading ? 'Uploading...' : 'Upload File'}
        </Button>
      </div>

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
};
```

---

## 7. Production Deployment

### Option 1: Vercel (Recommended - Free Tier)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/your-club/rotaract-management.git
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`
   - Click "Deploy"

3. **Custom Domain:**
   - Buy domain (e.g., `manage.rotaractcoimbatorecity.org`)
   - Add to Vercel project settings
   - Update DNS records

### Option 2: Netlify (Alternative - Free Tier)

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop your `dist` folder
   - Or connect GitHub for continuous deployment

3. **Environment Variables:**
   - Add in Netlify Dashboard > Site Settings > Environment Variables

### Option 3: Self-Hosted (Advanced)

If your club has a server:

1. **Build for production:**
   ```bash
   npm run build
   ```

2. **Set up Nginx:**
   ```nginx
   server {
       listen 80;
       server_name manage.yourclub.org;

       root /var/www/rotaract-management/dist;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

3. **Enable HTTPS:**
   ```bash
   sudo certbot --nginx -d manage.yourclub.org
   ```

---

## 8. Club Ownership Setup

### Step 1: Use Club Email for All Services

**Important:** Use your club's official email (e.g., `rotaractcoimbatorecity@gmail.com`) for:
- Supabase account signup
- Vercel/Netlify account
- GitHub repository ownership
- Domain registration

### Step 2: Set Up Team Access

**Supabase:**
1. Dashboard > Settings > Team Settings
2. Invite other admins with club emails
3. Set appropriate roles (Owner, Admin, Developer)

**Vercel/Netlify:**
1. Project Settings > Team
2. Invite club admins
3. Set permissions

**GitHub:**
1. Create organization: `rotaract-club-coimbatore-city`
2. Transfer repository to organization
3. Add team members with appropriate access

### Step 3: Document Credentials

Create a secure document (stored in club's password manager or secure storage):

```
# Rotaract Club Management System - Credentials

## Supabase
- Account Email: rotaractcoimbatorecity@gmail.com
- Project URL: https://xxxxx.supabase.co
- API Keys: [stored securely]
- Database Password: [stored securely]

## Vercel
- Account Email: rotaractcoimbatorecity@gmail.com
- Project URL: https://rotaract-management.vercel.app

## GitHub
- Organization: rotaract-club-coimbatore-city
- Repository: rotaract-management
- Admins: [list of current admins]

## Domain
- Registrar: [domain provider]
- Domain: manage.rotaractclub.org
- Renewal Date: [date]

## Admin Access
Current System Admins:
1. Name - Email - Role - Date Added
2. Name - Email - Role - Date Added

## Backup Schedule
- Database: Automated daily via Supabase
- Code: GitHub with version control
- Files: Supabase Storage with 7-day retention
```

### Step 4: Succession Planning

Create a process document:

```markdown
# Admin Handover Process

When club leadership changes:

1. **Before Transition:**
   - Document all credentials
   - Create backup admin accounts
   - Export important data

2. **During Transition:**
   - Add new admin to all platforms
   - Review system with new admin
   - Transfer knowledge

3. **After Transition:**
   - Update contact information
   - Remove inactive admins
   - Update emergency contacts

4. **Annual Review:**
   - Review user accounts
   - Check backup systems
   - Update documentation
```

---

## 9. Troubleshooting

### Common Issues and Solutions

#### Issue: "Cannot apply unknown utility class 'dark'"
**Solution:** Already fixed - dark mode is now properly configured.

#### Issue: CORS errors when connecting to Supabase
**Solution:**
1. Check Supabase project URL is correct
2. Verify API key is the anon/public key, not the service role key
3. Add your domain to Supabase Dashboard > Authentication > URL Configuration

#### Issue: Authentication not persisting after page reload
**Solution:**
```typescript
// Ensure you're checking for existing session on app load
useEffect(() => {
  supabase.auth.getSession().then(({ data: { session } }) => {
    if (session) {
      // User is logged in
    }
  });
}, []);
```

#### Issue: File uploads failing
**Solution:**
1. Check bucket permissions in Supabase Storage
2. Verify file size limits
3. Check MIME type restrictions

#### Issue: Charts not rendering
**Solution:**
```bash
# Ensure Recharts is properly installed
npm install recharts
```

#### Issue: Build failing in production
**Solution:**
1. Check TypeScript errors: `npm run type-check`
2. Remove unused imports
3. Verify environment variables are set

### Performance Optimization

1. **Enable Database Indexes:**
   ```sql
   CREATE INDEX idx_members_search ON members USING gin(to_tsvector('english', full_name));
   CREATE INDEX idx_projects_dates ON projects(start_date, end_date);
   ```

2. **Add React Query for Caching:**
   ```bash
   npm install @tanstack/react-query
   ```

3. **Implement Pagination:**
   ```typescript
   const { data, error } = await supabase
     .from('members')
     .select('*')
     .range(0, 19) // First 20 items
     .order('full_name');
   ```

---

## Next Steps Checklist

- [ ] Export code from Figma Make
- [ ] Set up local development environment
- [ ] Create Supabase project with club email
- [ ] Set up database schema
- [ ] Configure authentication
- [ ] Create API service layer
- [ ] Migrate mock data to database
- [ ] Set up file storage
- [ ] Update all components to use real data
- [ ] Test thoroughly in development
- [ ] Set up GitHub repository under club organization
- [ ] Deploy to production (Vercel/Netlify)
- [ ] Configure custom domain
- [ ] Set up team access and permissions
- [ ] Document all credentials securely
- [ ] Create admin handover process
- [ ] Train initial admins
- [ ] Launch to club members

---

## Additional Resources

- **Supabase Documentation:** https://supabase.com/docs
- **React Documentation:** https://react.dev
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Vercel Deployment:** https://vercel.com/docs
- **TypeScript Guide:** https://www.typescriptlang.org/docs

---

## Support and Maintenance

### Monthly Tasks
- Review user accounts and remove inactive ones
- Check database size and optimize if needed
- Review and respond to member feedback
- Update announcements and events

### Quarterly Tasks
- Update dependencies: `npm update`
- Review and update security policies
- Backup database manually (in addition to automated)
- Review analytics and usage patterns

### Annual Tasks
- Renew domain and hosting
- Update club information
- Archive old data
- Plan new features based on feedback

---

**Remember:** This is now your production system. Always test changes in a development environment before deploying to production!

For questions or issues, document them in your GitHub repository's Issues section.
