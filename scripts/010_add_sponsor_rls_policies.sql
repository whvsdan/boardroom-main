-- Add RLS policies for sponsors table admin management
drop policy if exists "sponsors_insert_authenticated" on public.sponsors;
drop policy if exists "sponsors_update_authenticated" on public.sponsors;
drop policy if exists "sponsors_delete_authenticated" on public.sponsors;

create policy "sponsors_insert_authenticated" on public.sponsors
  for insert
  with check (auth.role() = 'authenticated');

create policy "sponsors_update_authenticated" on public.sponsors
  for update
  using (auth.role() = 'authenticated');

create policy "sponsors_delete_authenticated" on public.sponsors
  for delete
  using (auth.role() = 'authenticated');
