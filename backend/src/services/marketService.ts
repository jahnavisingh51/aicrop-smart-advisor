import prisma from '../client.ts';

export const marketService = {
  getPrices: async (cropName?: string, location?: string) => {
    // In a real app, this would fetch from a Market API or a database updated by a scraper
    const prices = await prisma.marketPrice.findMany({
      where: {
        cropName: cropName || undefined,
        isDeleted: false
      },
      orderBy: {
        date: 'desc'
      }
    });

    // If no prices in DB, seed some mock ones for the presentation
    if (prices.length === 0) {
      const crops = ['Rice', 'Maize', 'Wheat', 'Cotton', 'Sugarcane'];
      const mandis = ['Mumbai Mandi', 'Hyderabad Mandi', 'Delhi Mandi', 'Chennai Mandi'];
      
      const mockPrices = crops.flatMap(c => mandis.map(m => ({
        cropName: c,
        mandi: m,
        price: 1500 + Math.random() * 1000,
        trend: Math.random() > 0.5 ? 'UP' : 'DOWN',
        date: new Date()
      })));

      await prisma.marketPrice.createMany({
        data: mockPrices
      });

      return prisma.marketPrice.findMany({
        where: {
          cropName: cropName || undefined,
          isDeleted: false
        },
        orderBy: {
          date: 'desc'
        }
      });
    }

    return prices;
  }
};
