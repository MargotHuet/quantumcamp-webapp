SELECT question
FROM chapters
WHERE id = 'chapterId';

INSERT INTO answers (id, chapter_id, possible_answers, is_correct)
VALUES
    (gen_random_uuid(), '29510cae-e1be-4622-91ub-bcfffcc0dc0a', 'Superposition de 0 et de 1', true),
    (gen_random_uuid(), '29510cae-e1be-4622-91ub-bcfffcc0dc0a', 'Utilisation de bits (0 et 1)', false),
    (gen_random_uuid(), '29510cae-e1be-4622-91ub-bcfffcc0dc0a', 'Superposition de qubits', false),
    (gen_random_uuid(), '29510cae-e1be-4622-91ub-bcfffcc0dc0a', 'Utilisation de 0 ou de 1', false);
