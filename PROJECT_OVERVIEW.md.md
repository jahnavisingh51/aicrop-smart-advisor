# AI-Powered Crop Prediction and Smart Farming Assistant - Advanced Application Plan

## Project Overview
An advanced, professional, and visually engaging Agri-Tech platform designed for final-year engineering presentation and viva. It helps farmers make data-driven decisions by predicting crops, maximizing yield, preventing diseases, and improving profitability using AI, ML, and real-time data.

## Core Features (Advanced)

### 1. Smart Crop Prediction Engine
- **Inputs**: Soil type, pH, NPK values, temperature, rainfall, humidity.
- **Output**: Best crop recommendation, yield prediction, and profit estimation.
- **Hybrid AI Model**: Uses Random Forest/XGBoost for prediction and LSTM for weather trend forecasting.

### 2. AI-Based Disease Detection
- **Input**: Leaf image upload.
- **Model**: CNN-based detection.
- **Output**: Disease name, treatment suggestions, and fertilizer/pesticide recommendations.

### 3. Market Intelligence & Price Prediction
- **Crop Price Prediction**: Predicts future prices using historical data.
- **Market System**: Suggests nearby markets (mandis) and compares prices.

### 4. Weather & Smart Alerts
- **Weather API**: Real-time updates and forecasts.
- **Smart Alerts**: Rain, drought, frost warnings, and sowing time suggestions.

### 5. AI Chatbot Assistant
- Natural language processing for farmer queries.
- Voice input support for accessibility.

### 6. Smart Irrigation & Crop Rotation
- **Irrigation**: Based on soil moisture and weather forecasts.
- **Rotation**: Suggests next crop after harvest to maintain soil fertility.

### 7. Personalized Farmer Dashboard
- Historical data tracking (Crop history, yield trends, profit analysis).
- Farm Mapping (Interactive map for land area marking).

### 8. Presentation Mode
- 9-12 slide structured presentation built directly into the app.
- Clear headings, architecture diagrams, and workflow explanations.

## Technical Stack
- **Frontend**: React, Tailwind CSS v4, Lucide-Icons, Google Maps API.
- **Backend**: Node.js (Hono.js), Prisma, PostgreSQL.
- **AI/ML**: 
  - LLM Integration (Gemini/OpenAI) via `@uptiqai/integrations-sdk` for Chatbot.
  - Image Storage via `@uptiqai/integrations-sdk` for disease detection.
- **State Management**: React Hooks.

## Implementation Roadmap

### Phase 1: Database & API Specification
- Define Prisma schema with backward compatibility.
- Create `API_SPECIFICATION.md`.

### Phase 2: Frontend Service Layer & Basic UI
- Implement services for crop prediction, disease detection, market, and weather.
- Create the multi-slide presentation component.

### Phase 3: Advanced Features Implementation
- Implement the AI Chatbot using `useChat`.
- Add image upload for disease detection.
- Build the personalized dashboard and farm mapping.

### Phase 4: Backend Logic
- Hono routes for all endpoints.
- Integration with LLM and Storage SDKs.

### Phase 5: Polishing & Build
- Ensure professional UI/UX.
- Run `pnpm build` in both frontend and backend.