-- 🛑 Désactiver temporairement les contraintes de clé étrangère pour éviter les erreurs de suppression
SET session_replication_role = 'replica';
SET CONSTRAINTS ALL DEFERRED;

-- 🔥 Nettoyer les tables pour garantir un état propre à chaque test
DELETE FROM completed_chapters;
DELETE FROM answers;
DELETE FROM courses;
DELETE FROM chapters;
DELETE FROM public.users;
DELETE FROM auth.users;

-- ✅ Réactiver les contraintes de clé étrangère
SET session_replication_role = 'origin';
SET CONSTRAINTS ALL IMMEDIATE;

-- 🔹 Insérer un utilisateur dans `auth.users`
INSERT INTO auth.users (id, email, email_confirmed_at)
VALUES (
  '11111111-1111-1111-1111-111111111111',  
  'margot@test.com',
  NOW()
);

-- 🔹 Insérer le même utilisateur dans `public.users` (DOIT correspondre à `auth.users`)
INSERT INTO public.users (id, name, email, created_at)
VALUES (
  '11111111-1111-1111-1111-111111111111',  
  'Margott',
  'margot@test.com',
  CURRENT_TIMESTAMP
);

-- 🔥 1️⃣ Insérer un chapitre avec un ID FIXE
INSERT INTO chapters (id, title, content, question, course_id)
VALUES (
    '88888888-8888-8888-8888-888888888888',  -- ID FIXE 🔥
    'Notions',
    'Lorem Ipsum dolores sit amet lorem ipsum dolores sit amet lorem ipsum dolores sit amet',
    'Qu’est-ce qu’un qubit?',
    NULL
); 

-- 🔥 2️⃣ Insérer un cours lié au chapitre
INSERT INTO courses (id, title, chapter_id)
VALUES (
  '99999999-9999-9999-9999-999999999999',  -- ID FIXE
  'Chapitre 1: Introduction à l\informatique quantique',
  '88888888-8888-8888-8888-888888888888'  -- Utilisation de l'ID du chapitre
);

-- 🔥 3️⃣ Mettre à jour le chapitre avec le `course_id`
UPDATE chapters
SET course_id = '99999999-9999-9999-9999-999999999999'
WHERE id = '88888888-8888-8888-8888-888888888888';

-- 🔥 4️⃣ Insérer des réponses liées au chapitre
INSERT INTO answers (id, chapter_id, possible_answer, is_correct)
VALUES
  (gen_random_uuid(), '88888888-8888-8888-8888-888888888888', 'Superposition de 0 et de 1', true),
  (gen_random_uuid(), '88888888-8888-8888-8888-888888888888', 'Utilisation de bits (0 et 1)', false),
  (gen_random_uuid(), '88888888-8888-8888-8888-888888888888', 'Superposition de qubits', false),
  (gen_random_uuid(), '88888888-8888-8888-8888-888888888888', 'Utilisation de 0 ou de 1', false);

-- 🔥 5️⃣ Insérer une progression utilisateur (marquer le chapitre comme complété)
INSERT INTO completed_chapters (id, user_id, chapter_id, is_finished)
VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',  -- ID utilisateur existant
  '88888888-8888-8888-8888-888888888888',  -- ID du chapitre inséré
  true
);
