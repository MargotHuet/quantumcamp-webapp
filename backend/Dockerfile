# Utiliser une image Node.js officielle
FROM node:18

# Créer le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code source
COPY . .

# Exposer le port 5000 (ou celui que tu utilises)
EXPOSE 5002

# Démarrer l'application
CMD ["npm", "start"]
