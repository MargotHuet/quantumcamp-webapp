# Utilisation de l'image officielle de Node.js version 20
FROM node:20

# Définir le répertoire de travail à l'intérieur du conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json pour installer les dépendances
COPY package.json package-lock.json* ./

# Installation des dépendances
RUN npm install

# Copier tout le contenu du dossier frontend dans le conteneur
COPY . .

# Exposer le port 3000 (le port par défaut pour les applications Next.js en mode dev)
EXPOSE 3000

# Commande pour démarrer l'application en mode développement
CMD ["npm", "run", "dev"]
