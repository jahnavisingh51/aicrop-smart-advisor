import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { errorHandler } from './middlewares/error.ts';
import authRoutes from './routes/auth.routes.ts';
import apiRoutes from './routes/api.routes.ts';

const app = new Hono();

// Global Middlewares
app.use('*', logger());
app.use('*', cors({
  origin: '*', // For development, update in production
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
  maxAge: 600,
  credentials: true,
}));

// Default routes
app.get('/', (c) => c.json({ status: 'OK', message: 'AgriPredict AI API' }));
app.get('/version.json', (c) => c.json({ version: '1.0.0' }));

// Auth routes
app.route('/auth', authRoutes);

// API routes
app.route('/api', apiRoutes);
app.route('/ai', apiRoutes); // Both prefixes for flexibility

// Global Error Handler
app.onError(errorHandler);

export default app;
