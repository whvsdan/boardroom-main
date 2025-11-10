-- Create storage buckets for blog, speaker, and sponsor images if they don't exist
insert into storage.buckets (id, name, public) 
values ('blog-images', 'blog-images', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public) 
values ('speaker-images', 'speaker-images', true)
on conflict (id) do nothing;

-- Added sponsor-images bucket for sponsor logo storage
insert into storage.buckets (id, name, public) 
values ('sponsor-images', 'sponsor-images', true)
on conflict (id) do nothing;

-- Removed "if not exists" clause - storage policies don't support it in Supabase
-- Drop existing policies first to avoid conflicts
drop policy if exists "blog-images-upload" on storage.objects;
drop policy if exists "blog-images-read" on storage.objects;
drop policy if exists "speaker-images-upload" on storage.objects;
drop policy if exists "speaker-images-read" on storage.objects;
-- Added drop policies for sponsor-images
drop policy if exists "sponsor-images-upload" on storage.objects;
drop policy if exists "sponsor-images-read" on storage.objects;

-- Allow authenticated users to upload to blog-images bucket
create policy "blog-images-upload" on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'blog-images');

-- Allow public to read blog-images
create policy "blog-images-read" on storage.objects
  for select
  to public
  using (bucket_id = 'blog-images');

-- Allow authenticated users to upload to speaker-images bucket
create policy "speaker-images-upload" on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'speaker-images');

-- Allow public to read speaker-images
create policy "speaker-images-read" on storage.objects
  for select
  to public
  using (bucket_id = 'speaker-images');

-- Added policies for sponsor-images bucket
-- Allow authenticated users to upload to sponsor-images bucket
create policy "sponsor-images-upload" on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'sponsor-images');

-- Allow public to read sponsor-images
create policy "sponsor-images-read" on storage.objects
  for select
  to public
  using (bucket_id = 'sponsor-images');
