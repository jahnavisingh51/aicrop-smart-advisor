import { Hono, Context } from 'hono';
import { cropService } from '../services/cropService.ts';
import { diseaseService } from '../services/diseaseService.ts';
import { marketService } from '../services/marketService.ts';
import { weatherService } from '../services/weatherService.ts';
import catchAsync from '../utils/catchAsync.ts';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { Llm, LlmProvider } from '@uptiqai/integrations-sdk';

const apiRoutes = new Hono();

// --- Crop Routes ---
const predictSchema = z.object({
  nitrogen: z.number(),
  phosphorus: z.number(),
  potassium: z.number(),
  temperature: z.number(),
  humidity: z.number(),
  ph: z.number(),
  rainfall: z.number()
});

apiRoutes.post('/crop/predict', zValidator('json', predictSchema), catchAsync(async (c: Context) => {
  const body = await c.req.json();
  const result = await cropService.predict(body);
  return c.json(result);
}));

apiRoutes.get('/farmers/history', catchAsync(async (c: Context) => {
  const history = await cropService.getHistory();
  return c.json(history);
}));

// --- Disease Routes ---
apiRoutes.post('/disease/detect', catchAsync(async (c: Context) => {
  const formData = await c.req.formData();
  const file = formData.get('file');

  if (!file || !(file instanceof Blob)) {
    return c.json({ error: 'File is required' }, 400);
  }

  const result = await diseaseService.detect(file);
  return c.json(result);
}));

// --- Market Routes ---
apiRoutes.get('/market/prices', catchAsync(async (c: Context) => {
  const cropName = c.req.query('cropName');
  const prices = await marketService.getPrices(cropName);
  return c.json(prices);
}));

// --- Weather Routes ---
apiRoutes.get('/weather/alerts', catchAsync(async (c: Context) => {
  const alerts = await weatherService.getAlerts();
  return c.json(alerts);
}));

// --- AI Chat Route ---
apiRoutes.post('/chat', catchAsync(async (c: Context) => {
  const body = await c.req.json();
  const { messages } = body;

  const llm = new Llm({ provider: process.env.LLM_PROVIDER as LlmProvider });
  
  const systemPrompt = `You are an expert Smart Farming Assistant. 
  You help farmers with crop selection, disease identification, irrigation management, and market price trends. 
  Keep your answers practical, supportive, and scientifically accurate. 
  Respond in the language the user is using. Support regional Indian languages if asked.`;

  const result = await llm.createStream({
    messages: [
      { role: 'system', content: systemPrompt },
      ...messages
    ],
    model: process.env.LLM_MODEL
  });

  c.header('Content-Type', 'text/event-stream');
  c.header('Cache-Control', 'no-cache');
  c.header('Connection', 'keep-alive');

  return c.body(result.data);
}));

export default apiRoutes;