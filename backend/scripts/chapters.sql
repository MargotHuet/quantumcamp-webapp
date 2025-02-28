INSERT INTO chapters (id, tile, content, question, created_at)
VALUES(
    gen_random_uuid(),
    'Cest quoi un algorithme?',
    'Un algorithme est une suite d''instructions détaillées qui permettent de ...', 
    'Quel est le but d''un algorithme?',
    NOW(),
)