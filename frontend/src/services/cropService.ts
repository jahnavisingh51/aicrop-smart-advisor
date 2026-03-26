import axios from 'axios';
import { PredictionInput, PredictionResult, DiseaseResult, MarketPrice, WeatherAlert } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const USE_MOCK = import.meta.env.VITE_USE_MOCK_DATA === 'true';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Mock Data Generators
const MOCK_HISTORY: PredictionResult[] = [
  {
    id: 101,
    crop: 'Wheat',
    confidence: 0.94,
    yieldEstimation: 92,
    profitEstimation: 24500,
    rotationSuggestion: 'Rice',
    fertilizerTips: ['Apply Nitrogen early', 'Ensure adequate Potassium'],
    irrigationRecommendation: 'Irrigate every 10 days',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString()
  },
  {
    id: 102,
    crop: 'Cotton',
    confidence: 0.88,
    yieldEstimation: 78,
    profitEstimation: 18200,
    rotationSuggestion: 'Sorghum',
    fertilizerTips: ['Phosphorus rich base', 'Micronutrient mix'],
    irrigationRecommendation: 'Drip irrigation for water efficiency',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString()
  }
];

const MOCK_MARKET_PRICES: MarketPrice[] = [
  { id: 1, cropName: 'Wheat', mandi: 'Ludhiana', price: 2125, trend: 'UP', date: new Date().toISOString() },
  { id: 2, cropName: 'Rice', mandi: 'Amritsar', price: 3450, trend: 'UP', date: new Date().toISOString() },
  { id: 3, cropName: 'Maize', mandi: 'Patiala', price: 1850, trend: 'DOWN', date: new Date().toISOString() },
  { id: 4, cropName: 'Sugarcane', mandi: 'Jalandhar', price: 4200, trend: 'UP', date: new Date().toISOString() },
  { id: 5, cropName: 'Cotton', mandi: 'Bathinda', price: 7200, trend: 'DOWN', date: new Date().toISOString() },
  { id: 6, cropName: 'Chickpea', mandi: 'Moga', price: 5400, trend: 'UP', date: new Date().toISOString() }
];

const MOCK_WEATHER_ALERTS: WeatherAlert[] = [
  { id: 1, type: 'RAIN', severity: 'MEDIUM', message: 'Moderate rainfall expected in the next 48 hours. Postpone irrigation if necessary.', date: new Date().toISOString() },
  { id: 2, type: 'FROST', severity: 'HIGH', message: 'Significant frost warning for tonight. Protect sensitive young crops with mulching.', date: new Date().toISOString() }
];

export const cropService = {
  predict: async (data: PredictionInput): Promise<PredictionResult> => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      return {
        id: Math.floor(Math.random() * 10000),
        crop: 'Maize',
        confidence: 0.95,
        yieldEstimation: 88,
        profitEstimation: 21400,
        rotationSuggestion: 'Soybeans or Chickpeas',
        fertilizerTips: ['Balance NPK at 120:60:40', 'Apply Zinc sulfate for better root health'],
        irrigationRecommendation: 'Moderate watering required; maintain soil moisture above 40%',
        createdAt: new Date().toISOString()
      };
    }
    const response = await api.post('/api/crop/predict', data);
    return response.data;
  },

  getHistory: async (): Promise<PredictionResult[]> => {
    if (USE_MOCK) {
      return MOCK_HISTORY;
    }
    const response = await api.get('/api/farmers/history');
    return response.data;
  }
};

export const diseaseService = {
  detect: async (file: File): Promise<DiseaseResult> => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 2500));
      return {
        id: Math.floor(Math.random() * 10000),
        diseaseName: 'Yellow Rust',
        confidence: 0.91,
        treatment: 'Spray Propiconazole 25 EC at 0.1% or Tebuconazole 250 EC at 0.1% for effective control.',
        recommendations: ['Avoid excess nitrogen', 'Destroy infected plant debris', 'Ensure proper spacing for ventilation'],
        createdAt: new Date().toISOString(),
        imageUrl: URL.createObjectURL(file)
      };
    }
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post('/api/disease/detect', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  }
};

export const marketService = {
  getPrices: async (cropName?: string): Promise<MarketPrice[]> => {
    if (USE_MOCK) {
      return MOCK_MARKET_PRICES;
    }
    const response = await api.get('/api/market/prices', { params: { cropName } });
    return response.data;
  }
};

export const weatherService = {
  getAlerts: async (): Promise<WeatherAlert[]> => {
    if (USE_MOCK) {
      return MOCK_WEATHER_ALERTS;
    }
    const response = await api.get('/api/weather/alerts');
    return response.data;
  }
};