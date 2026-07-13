-- Contact form submissions for weareandale.com
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  message text not null default '',
  lang text not null default 'EN'
);

alter table public.contact_messages enable row level security;

-- The public site may only insert; reading is reserved to the service role / dashboard
create policy "anyone can submit a contact message"
  on public.contact_messages for insert
  to anon
  with check (true);
