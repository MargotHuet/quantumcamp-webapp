# QuantumCampApp

## Frontend

cd frontend
`npm run dev`

-

## Backend

cd backend
`npm run dev`

## Linter

J'utilise ESLint pour structurer le code:

cd frontend
`npm run lint`

cd backend
`npm run lint`

## Tests

J'utilise Jest pour les tests unitaires:

cd frontend
`npm run test`

## Docker

Pour lancer le frontend avec Docker:
`docker run -p 3020:3020 quantumfrontend`

Pour lancer le backend avec Docker:
`docker run -p 5001:5001 quantumbackend`

Pour lancer Docker avec docker compose:
`docker compose up --build`
