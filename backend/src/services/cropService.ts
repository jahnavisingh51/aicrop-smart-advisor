import prisma from '../client.ts';

export const cropService = {
  predict: async (data: {
    nitrogen: number;
    phosphorus: number;
    potassium: number;
    temperature: number;
    humidity: number;
    ph: number;
    rainfall: number;
    userId?: string;
  }) => {
    // Advanced Hybrid Model Logic (Simulated)
    // In a real app, this would call a Python/FastAPI service or use a WASM model
    
    // Logic for crop recommendation (Simplified for demonstration)
    let predictedCrop = 'Rice';
    let confidence = 0.85;

    if (data.rainfall < 100) {
      predictedCrop = 'Maize';
      if (data.humidity < 50) predictedCrop = 'Millet';
    } else if (data.temperature > 30) {
      predictedCrop = 'Cotton';
    } else if (data.ph < 5.5) {
      predictedCrop = 'Tea';
    }

    // Yield estimation and Profit (Simulated LSTM/XGBoost logic)
    const yieldEstimation = 75 + Math.random() * 20; // 75-95%
    const profitEstimation = 1200 + Math.random() * 500; // $1200-$1700 per acre

    const rotationSuggestions = [
      'Legumes (to restore nitrogen)',
      'Cover crops (for soil health)',
      'Fallow period'
    ];
    const rotationSuggestion = rotationSuggestions[Math.floor(Math.random() * rotationSuggestions.length)];

    const fertilizerTips = [
      data.nitrogen < 50 ? 'Add Urea to boost Nitrogen levels.' : 'Nitrogen levels are optimal.',
      data.phosphorus < 40 ? 'Apply Rock Phosphate or DAP.' : 'Phosphorus levels are optimal.',
      data.ph < 6 ? 'Apply Lime to increase soil pH.' : data.ph > 7.5 ? 'Add Gypsum to lower soil pH.' : 'pH levels are ideal.'
    ];

    const irrigationRecommendation = data.rainfall < 50 ? 'Heavy irrigation required weekly.' : 'Moderate irrigation based on soil moisture.';

    // Save to history
    const prediction = await prisma.prediction.create({
      data: {
        ...data,
        resultCrop: predictedCrop,
        confidence,
        yieldEstimation,
        profitEstimation,
        rotationSuggestion,
        fertilizerTips: JSON.stringify(fertilizerTips),
        irrigationRecommendation
      }
    });

    return {
      ...prediction,
      fertilizerTips
    };
  },

  getHistory: async (userId?: string) => {
    return prisma.prediction.findMany({
      where: {
        userId: userId || undefined,
        isDeleted: false
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }
};
