# Utiliser une image Node.js officielle
FROM node:18

# Créer le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package.json package-lock.json* ./

# Installer les dépendances
RUN npm install

# Copier le reste du code source
COPY . .

# Exposer le port 5000 (ou celui que tu utilises)
EXPOSE 5001

# Démarrer l'application
CMD ["npm", "run", "start"]
