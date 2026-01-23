# Tameerox Website - Setup Instructions

## ✅ White Screen Issue - FIXED!

### Problem Identified
The website was showing a white screen due to a **`ReferenceError: process is not defined`** error in `src/lib/supabaseClient.js`.

### Root Cause
The code was trying to access `process.env.NEXT_PUBLIC_SUPABASE_URL` as a fallback, but `process` is not available in Vite's browser environment. This caused the entire React application to crash silently before rendering.

### Solution Applied
1. **Fixed `supabaseClient.js`**: Removed the `process.env` references and kept only `import.meta.env` which is the correct way to access environment variables in Vite.
2. **Created `.env` file**: Added a `.env` file with placeholder Supabase credentials.

---

## 🚀 Next Steps: Configure Supabase

To make your website fully functional with database features, you need to set up Supabase:

### Option 1: Use Existing Supabase Project
If you already have a Supabase project:

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Select your project
3. Go to **Settings** → **API**
4. Copy your **Project URL** and **anon/public key**
5. Update the `.env` file:

```env
VITE_SUPABASE_URL=https://your-actual-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-actual-anon-key-here
```

### Option 2: Create New Supabase Project
If you don't have a Supabase project yet:

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Click **"New Project"**
3. Fill in:
   - **Name**: Tameerox Website
   - **Database Password**: Choose a strong password
   - **Region**: Choose closest to Qatar (e.g., Singapore or Mumbai)
4. Wait for the project to be created (~2 minutes)
5. Go to **Settings** → **API**
6. Copy your **Project URL** and **anon/public key**
7. Update the `.env` file with your actual credentials

### Option 3: Run Without Database (Static Mode)
If you don't need database features right now:

The website will work with the placeholder values, but you'll see Supabase connection errors in the console. The static content will still display fine.

---

## 📊 Set Up Database Tables

Once you have your Supabase credentials configured, run these SQL scripts in your Supabase SQL Editor:

1. **`supabase_schema.sql`** - Creates the main tables (services, projects)
2. **`supabase_site_content.sql`** - Adds site content
3. **`update_services_schema.sql`** - Updates services schema
4. **`update_projects_schema.sql`** - Updates projects schema
5. **`supabase_triggers.sql`** - Sets up triggers

### How to Run SQL Scripts:
1. Go to your Supabase project dashboard
2. Click **SQL Editor** in the left sidebar
3. Click **"New Query"**
4. Copy and paste the content of each SQL file
5. Click **"Run"**
6. Repeat for all SQL files

---

## 🔧 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

---

## 🌐 Current Status

✅ **Website is now loading correctly!**
- Header with navigation is visible
- Hero section displays properly
- All React components are rendering
- No more white screen!

⚠️ **Supabase Connection**
- Currently using placeholder credentials
- You'll see connection errors in console until you add real credentials
- Static content works fine without database

---

## 📝 Important Notes

1. **Never commit `.env` to Git**: The `.env` file is already in `.gitignore`
2. **Environment Variables**: After changing `.env`, restart the dev server
3. **Production Deployment**: Set environment variables in your hosting platform (Vercel, Netlify, etc.)

---

## 🆘 Troubleshooting

### White screen returns?
- Check browser console for errors
- Verify `.env` file exists and has correct format
- Restart the dev server

### Supabase errors?
- Verify your credentials in `.env`
- Check if your Supabase project is active
- Ensure RLS policies are set up correctly

### Build errors?
- Run `npm install` to ensure all dependencies are installed
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`

---

## 📞 Support

If you encounter any issues, check:
1. Browser console for JavaScript errors
2. Terminal for build/server errors
3. Supabase dashboard for database connection issues

---

**Last Updated**: January 23, 2026
**Status**: ✅ White Screen Fixed - Ready for Development
