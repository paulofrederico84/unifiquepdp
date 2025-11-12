-- Esquema inicial para Unifique PDP (PostgreSQL)

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  client TEXT,
  owner_id UUID REFERENCES users(id),
  address TEXT,
  due_date DATE,
  data JSONB,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id),
  type TEXT,
  model TEXT,
  manufacturer TEXT,
  position JSONB,
  properties JSONB
);
