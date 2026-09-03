import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { config } from './config/environment.js';
import routes from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';

const app: Express = express();

// Security & Parsing Middlewares
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Support both /api and root paths for direct & Vercel serverless routing
app.use('/api', routes);
app.use('/', routes);

// Centralized Error Handling Middleware
app.use(errorHandler);

// Start Server locally if not running in serverless environment (Vercel)
if (!process.env.VERCEL && process.env.NODE_ENV !== 'test') {
  app.listen(config.port, () => {
    console.log(`========================================`);
    console.log(` BharatSkill Nexus Server is running`);
    console.log(` Port: ${config.port}`);
    console.log(` Environment: ${config.nodeEnv}`);
    console.log(` Health: http://localhost:${config.port}/api/health`);
    console.log(`========================================`);
  });
}

export default app;
