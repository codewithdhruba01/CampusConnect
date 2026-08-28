# Supabase Setup Guide

This guide will help you set up Supabase for the Campus Connect project to enable real-time database functionality.

## Step 1: Create a Supabase Project
1. Go to [Supabase](https://supabase.com/) and sign in or create an account.
2. Click on **New Project**.
3. Select your organization, give your project a name (e.g., `campus-connect`), and generate a secure password.
4. Choose the region closest to you and click **Create New Project**.
5. Wait a few minutes for the project to be provisioned.

## Step 2: Get Your API Keys
1. In your Supabase project dashboard, go to **Project Settings** (the gear icon on the left sidebar).
2. Click on **API** under the Configuration section.
3. You will see your **Project URL** and **anon public key**.

## Step 3: Configure Environment Variables
1. In the root directory of this project (where `package.json` is located), create a new file named `.env.local`.
2. Add the following lines to the file, replacing the placeholder values with your actual URL and Key:

```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

> **Note:** `.env.local` is already ignored by Git, so your keys will stay secure on your local machine.

## Step 4: Create the Database Table
1. In your Supabase dashboard, go to the **SQL Editor** from the left sidebar.
2. Click on **New Query**.
3. Paste the following SQL code into the editor:

```sql
-- Create the classrooms table
CREATE TABLE public.classrooms (
  id text PRIMARY KEY,
  name text NOT NULL,
  description text,
  category text,
  profile_pic text,
  created_at timestamp with time zone DEFAULT now(),
  created_by text,
  members_count integer DEFAULT 1,
  members jsonb,
  color text
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.classrooms ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read classrooms
CREATE POLICY "Allow public read access"
  ON public.classrooms
  FOR SELECT
  TO public
  USING (true);

-- Create policy to allow anyone to create new classrooms
CREATE POLICY "Allow public insert access"
  ON public.classrooms
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create policy to allow anyone to update classrooms (e.g. for joining)
CREATE POLICY "Allow public update access"
  ON public.classrooms
  FOR UPDATE
  TO public
  USING (true);
```

4. Click **Run** (or press `Cmd/Ctrl + Enter`) to execute the query. You should see a "Success" message.

## Step 5: Run the Project
You are all set! Now you can run the project locally:

```bash
npm install
npm run dev
```

Your app will now connect to Supabase, and any classrooms you create or join will be saved to your cloud database.
