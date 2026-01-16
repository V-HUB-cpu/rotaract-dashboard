# Quick Start Guide - Get Your System Running in 30 Minutes

This is a condensed version to get you up and running quickly. For detailed explanations, see `DEPLOYMENT_GUIDE.md`.

## Phase 1: Local Setup (5 minutes)

### 1. Download your code from Figma Make
- Click the export/download button in Figma Make
- Extract the zip file to your desired location

### 2. Install and run locally
```bash
cd rotaract-club-management
npm install
npm run dev
```
- Open http://localhost:5173
- Test login with existing demo credentials
- **You should see your app working!** ✅

---

## Phase 2: Set Up Backend (15 minutes)

### 3. Create Supabase Account
1. Go to https://supabase.com
2. **Important:** Sign up with your club email (e.g., rotaractcoimbatorecity@gmail.com)
3. Create a new project
   - Project name: `rotaract-coimbatore`
   - Database password: (save this securely!)
   - Region: Choose closest to India (e.g., Mumbai)
4. Wait 2-3 minutes for project to initialize

### 4. Set Up Database
1. In Supabase, go to **SQL Editor**
2. Copy the entire database schema from `DEPLOYMENT_GUIDE.md` Section 3 (lines starting with `CREATE TABLE`)
3. Paste and click **Run**
4. You should see "Success" messages ✅

### 5. Get API Keys
1. In Supabase, go to **Settings** > **API**
2. Copy two values:
   - Project URL (looks like: `https://xxxxx.supabase.co`)
   - `anon` `public` key (NOT the service_role key)

### 6. Add Keys to Your Project
Create a file `.env.local` in your project root:
```env
VITE_SUPABASE_URL=paste_your_project_url_here
VITE_SUPABASE_ANON_KEY=paste_your_anon_key_here
```

---

## Phase 3: Connect Your App (10 minutes)

### 7. Install Supabase Client
```bash
npm install @supabase/supabase-js
```

### 8. Create Supabase Configuration
Create file: `/src/app/lib/supabase.ts`

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### 9. Create Your First Admin User
1. In Supabase, go to **Authentication** > **Users**
2. Click **Add User**
3. Fill in:
   - Email: `admin@rotaractcoimbatorecity.org` (or your choice)
   - Password: `Admin@2024` (or your choice)
   - Click **Send Magic Link**: OFF
4. Click **Create User**
5. Copy the User UID (you'll need it next)

6. Go to **SQL Editor** and run:
```sql
INSERT INTO members (
  id, 
  email, 
  full_name, 
  role, 
  member_id, 
  designation,
  status
) VALUES (
  'paste-the-user-uid-here',  -- Replace with UID from step 5
  'admin@rotaractcoimbatorecity.org',
  'Admin User',
  'admin',
  'ADMIN001',
  'System Administrator',
  'active'
);
```

### 10. Test Your Setup
```bash
# Restart your dev server
npm run dev
```

Try logging in with your new admin credentials. If it works, **congratulations!** 🎉

---

## What's Next?

### For Immediate Use (Optional)
- Manually add a few members through Supabase dashboard
- Create some test projects
- Test the member/bearer/admin views

### For Production Launch
1. **Migrate your existing data** (see Section 5 in DEPLOYMENT_GUIDE.md)
2. **Deploy to Vercel** (free hosting):
   - Connect GitHub repository
   - Add environment variables
   - Click Deploy (5 minutes)
3. **Set up team access** (see Section 8 in DEPLOYMENT_GUIDE.md)

---

## Troubleshooting Quick Fixes

### "Cannot find module" errors
```bash
npm install
```

### Login not working
1. Check `.env.local` file exists and has correct values
2. Restart dev server: Stop (Ctrl+C) and run `npm run dev` again
3. Check browser console for error messages

### Database errors
1. Verify you ran all the CREATE TABLE commands
2. Check Supabase project is active (not paused)
3. Verify the member was inserted with correct user UID

### Need help?
- See full DEPLOYMENT_GUIDE.md for detailed solutions
- Check Supabase logs: Dashboard > Logs

---

## Important Files Reference

```
Your Project Structure:
├── .env.local                    # Your secret keys (create this)
├── src/
│   ├── app/
│   │   ├── lib/
│   │   │   └── supabase.ts      # Database connection (create this)
│   │   ├── services/            # API services (create these)
│   │   ├── components/          # Already exists
│   │   └── context/
│   │       └── AuthContext.tsx  # Update this for Supabase auth
│   └── styles/                  # Already configured
├── package.json                 # Already exists
└── DEPLOYMENT_GUIDE.md          # Full documentation
```

---

## Key Points to Remember

✅ **Club Email:** Always use club email, not personal  
✅ **Environment Variables:** Never commit `.env.local` to GitHub  
✅ **API Keys:** Use the `anon` key, not `service_role`  
✅ **Testing:** Test everything in development before production  
✅ **Backups:** Supabase does automatic backups  

---

## Timeline Estimate

- **Today:** Get local setup working + Supabase connected (30 min)
- **This Week:** Migrate your 65 members and 8 projects (2-3 hours)
- **This Week:** Deploy to production (30 min)
- **Next Week:** Train admins and launch to club (ongoing)

---

You're now ready to transform this from a demo into a real production system! Start with Phase 1 and work your way through. Good luck! 🚀
