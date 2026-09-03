import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { config } from './config/environment.js';
import routes from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';

const app: Express = express();

// Security & Parsing Middlewares
app.use(cors({
  origin: config.clientUrl || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api', routes);

// 404 Route Handler
app.use('*', (_req: Request, res: Response) => {
  res.status(404).json({
    status: 'error',
    message: 'Resource not found'
  });
});

// Centralized Error Handling Middleware
app.use(errorHandler);

// Start Server
app.listen(config.port, () => {
  console.log(`========================================`);
  console.log(` BharatSkill Nexus Server is running`);
  console.log(` Port: ${config.port}`);
  console.log(` Environment: ${config.nodeEnv}`);
  console.log(` Health: http://localhost:${config.port}/api/health`);
  console.log(`========================================`);
});

export default app;
