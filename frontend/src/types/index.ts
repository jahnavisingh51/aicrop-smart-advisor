export interface SoilData {
    nitrogen: number;
    phosphorus: number;
    potassium: number;
    ph: number;
}

export interface EnvironmentalData {
    temperature: number;
    humidity: number;
    rainfall: number;
}

export interface PredictionInput extends SoilData, EnvironmentalData {}

export interface PredictionResult {
    id?: number;
    crop: string;
    confidence: number;
    yieldEstimation: number;
    profitEstimation: number;
    rotationSuggestion?: string;
    fertilizerTips: string[];
    irrigationRecommendation?: string;
    createdAt?: string;
}

export interface DiseaseResult {
    id: number;
    diseaseName: string;
    confidence: number;
    treatment: string;
    recommendations: string[];
    imageUrl: string;
    createdAt: string;
}

export interface MarketPrice {
    id: number;
    cropName: string;
    mandi: string;
    price: number;
    trend: 'UP' | 'DOWN' | 'STABLE';
    date: string;
}

export interface WeatherAlert {
    id: number;
    type: 'RAIN' | 'DROUGHT' | 'FROST' | 'SOWING';
    severity: 'LOW' | 'MEDIUM' | 'HIGH';
    message: string;
    date: string;
}

export interface CropInfo {
    name: string;
    optimalN: [number, number];
    optimalP: [number, number];
    optimalK: [number, number];
    optimalPH: [number, number];
    optimalTemp: [number, number];
    optimalHumidity: [number, number];
    optimalRain: [number, number];
    description: string;
    fertilizerTips: string[];
}