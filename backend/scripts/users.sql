CREATE TABLE public.users (
  id uuid PRIMARY KEY REFERENCES auth.users (id),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow users to read their own data"
ON auth.users
FOR SELECT
USING (auth.uid() = id); -- auth.uid() retourne l'UUID de l'utilisateur connecté
