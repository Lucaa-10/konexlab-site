-- 1. Enable the pg_net extension (required for webhooks)
create extension if not exists pg_net;

-- 2. Create the Trigger Function
create or replace function public.handle_new_lead()
returns trigger as $$
begin
  perform net.http_post(
    url := 'https://aqehwgjrcixrnzdpqvtt.supabase.co/functions/v1/odoo-sync',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer ' || current_setting('app.settings.service_role_key') || '"}',
    body := json_build_object('record', new)::jsonb
  );
  return new;
end;
$$ language plpgsql security definer;

-- 3. Create the Trigger
drop trigger if exists on_new_lead on public.leads;
create trigger on_new_lead
  after insert on public.leads
  for each row execute procedure public.handle_new_lead();
