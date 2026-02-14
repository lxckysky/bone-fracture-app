-- Create a table for public profiles (optional, helps with role management)
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  role text default 'user',
  full_name text,
  updated_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- Create a table for analysis cases
create table cases (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  image_url text, -- Public URL from Storage
  image_path text, -- Path in Storage bucket
  fracture_type text,
  confidence float,
  status text, -- 'pending_review', 'ai_confirmed', 'doctor_confirmed'
  ai_diagnosis text,
  doctor_diagnosis text,
  doctor_notes text,
  doctor_id uuid references auth.users,
  language text,
  metadata jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  reviewed_at timestamp with time zone
);

-- Set up RLS for cases
alter table cases enable row level security;

create policy "Users can view their own cases." on cases
  for select using (auth.uid() = user_id);

create policy "Users can insert their own cases." on cases
  for insert with check (auth.uid() = user_id);
  
create policy "Doctors and Admins can view all cases." on cases
  for select using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      and profiles.role in ('doctor', 'admin')
    )
  );

create policy "Doctors and Admins can update cases." on cases
  for update using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      and profiles.role in ('doctor', 'admin')
    )
  );

-- Create a storage bucket for scans
insert into storage.buckets (id, name, public) values ('scans', 'scans', true);

-- Set up storage policies
create policy "Anyone can upload scans." on storage.objects
  for insert with check ( bucket_id = 'scans' );

create policy "Anyone can view scans." on storage.objects
  for select using ( bucket_id = 'scans' );

-- Function to handle new user signup automatically
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', 'user');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to call the function on new user creation
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
