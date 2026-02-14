# Professional Body Fracture AI Analysis System 🏥

A Next.js application for analyzing X-ray images using AI (YOLO11x-cls) to detect bone fractures. The system supports multiple languages, role-based access (User/Doctor/Admin), and integrates with Supabase for data persistence.

## Features ✨

- **AI Analysis**: Detects 12 types of bone fractures with confidence scoring.
- **Multilingual**: Supports English, Thai, Chinese, and Japanese.
- **Role-Based Access**:
  - **Public**: Use AI analysis (demo mode).
  - **User**: Save history, view past scans.
  - **Doctor**: Review low-confidence cases, override AI diagnosis.
  - **Admin**: Manage users and system roles.
- **Modern UI**: Built with Tailwind CSS, featuring glassmorphism and premium medical aesthetics.
- **Cloud Powered**: Uses Supabase for Authentication, Database, and Storage.

## Tech Stack 🛠️

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Python (FastAPI) + YOLO11x-cls (Simulated/Real)
- **Database & Auth**: Supabase (PostgreSQL)

## Getting Started 🚀

### 1. Prerequisites
- Node.js & npm/yarn
- Python 3.8+ (for local backend)
- A [Supabase](https://supabase.com/) project

### 2. Setup Supabase
1. Create a new project in Supabase.
2. Go to the **SQL Editor** in your Supabase dashboard.
3. Copy and run the contents of `supabase_setup.sql` (located in the project root or provided by the AI).
   - This sets up the `profiles` and `cases` tables, storage buckets, and RLS policies.
4. Get your **Project URL** and **anon public key** from Project Settings > API.

### 3. Environment Variables
Copy `.env.example` to `.env.local` and fill in your Supabase credentials:

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 4. Install Dependencies
```bash
npm install
```

### 5. Run the Application
Start the frontend:
```bash
npm run dev
```

Start the backend (optional, for local AI processing):
```bash
# In /backend directory
pip install -r requirements.txt
python main.py
```

## Storage vs Database
- **Images** are stored in Supabase Storage (`scans` bucket).
- **Metadata** (Diagnosis, User info) is stored in Supabase Database (`cases`, `profiles` tables).

