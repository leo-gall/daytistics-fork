create table daytistics (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  date date not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table activities (
  id uuid primary key default gen_random_uuid(),
  daytistic_id uuid references daytistics not null,
  name text not null,
  start_time time not null,
  end_time time not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table wellbeing_ratings (
    id uuid primary key default gen_random_uuid(),
    daytistic_id uuid references daytistics not null,
    time_for_myself integer not null check (time_for_myself between 1 and 5),
    health integer not null check (health between 1 and 5),
    family integer not null check (family between 1 and 5),
    friends integer not null check (friends between 1 and 5),
    work integer not null check (work between 1 and 5),
    feeling_of_happiness integer not null check (feeling_of_happiness between 1 and 5),
    recreation integer not null check (recreation between 1 and 5),
    gratitude integer not null check (gratitude between 1 and 5),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);