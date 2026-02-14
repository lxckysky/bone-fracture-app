-- Add DELETE policy for cases table
-- This allows doctors and admins to delete cases

create policy "Doctors and Admins can delete cases." on cases
  for delete using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      and profiles.role in ('doctor', 'admin')
    )
  );

-- Add DELETE policy for storage objects
-- This allows anyone to delete scan images
create policy "Anyone can delete scans." on storage.objects
  for delete using ( bucket_id = 'scans' );
