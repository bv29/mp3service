import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import config from './config';
import AppRes from './types/AppRes';

// Create Express server
const app = express();

// Set PORT
app.set('port', config.port);

// Parse JSON request body
app.use(express.json());
// Parse URL-encoded request body
app.use(express.urlencoded({ extended: true }));

// Logger
app.use(morgan('dev'));

// Enable CORS
app.use(cors(config.corsOptions));

app.get('/', (req, res) => {
  res.send('Welcome to the Poll Socket Service!');
});

// 404 Handler
app.use((_, res, next) => {
  const status = 404;
  const message = 'Resource not found';
  const errorResponse: AppRes = {
    data: [],
    isError: true,
    errMsg: message,
  };
  res.status(status).send(errorResponse);
});

// Server Error 500 Handler
app.use(
  (
    error: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(error);
    const status = 500;
    const message = error ? JSON.stringify(error) : 'API Server Error';
    const errorResponse: AppRes = {
      data: [],
      isError: true,
      errMsg: message,
    };
    res.status(status).send(errorResponse);
  }
);

export default app;
