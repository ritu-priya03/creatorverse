# Creatorverse (CodePath WEB103 Prework)

CRUD React app for managing favorite content creators using Supabase.

## Quick Start
```bash
npm install
# Add your Supabase creds:
# 1) Copy .env.example to .env
# 2) Put your URL and ANON KEY
npm run dev
```

Open http://localhost:5173

## Environment Variables
Create a `.env` file in the project root:
```
VITE_SUPABASE_URL=YOUR_SUPABASE_URL
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

Or set them directly in `src/client.js` by replacing the placeholders.

## Supabase Setup
1. Create project on supabase.com
2. Create table `creators` (disable RLS for prework simplicity or add anon policy):

SQL:
```sql
create table if not exists public.creators (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  url text not null,
  description text not null,
  imageURL text,
  created_at timestamp with time zone default now()
);
-- If RLS is enabled, add a permissive policy for anon to read/write for demo:
alter table public.creators enable row level security;
create policy "Allow read" on public.creators for select using (true);
create policy "Allow insert" on public.creators for insert with check (true);
create policy "Allow update" on public.creators for update using (true);
create policy "Allow delete" on public.creators for delete using (true);
```

## Scripts
- `npm run dev` – start dev server
- `npm run build` – production build
- `npm run preview` – preview build

## Notes
- Uses React Router v6 and Supabase JS v2.
- Optional styling with PicoCSS.
- Remember to secure RLS before deploying publicly.
