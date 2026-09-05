-- Per-user ChemVault progress (stars, mastery, quiz log, revision queue).
create table if not exists student_state (
  user_id    text primary key,
  payload    text not null,
  updated_at timestamptz not null default now()
);
