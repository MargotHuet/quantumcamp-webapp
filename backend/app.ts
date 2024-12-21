import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { Request, Response, NextFunction } from 'express';

// Définir __dirname dans un module ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import chaptersRouter from './routes/chapters.js';
import answersRouter from './routes/answers.js';

interface CustomError extends Error {
  status?: number; 
}

const app = express();

// Activer CORS
app.use(cors({
  origin: ['http://localhost:3020', 'http://188.165.238.74:3020'],
  credentials: true,             
  allowedHeaders: ['Content-Type', 'Authorization'], 
}));

app.get('/products/:id', function (req, res) {
  res.json({ msg: 'This is CORS-enabled for all origins!' });
});

// Configuration du moteur de vues
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/chapters', chaptersRouter);
app.use('/answers', answersRouter);


// Gestion des erreurs 404
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// Gestionnaire d'erreurs
app.use(function (err: CustomError, req: Request, res: Response) {
  // définir les variables locales, uniquement fournir l'erreur en développement
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // afficher la page d'erreur
  res.status(err.status || 500);
  res.render('error');
});


export default app;
