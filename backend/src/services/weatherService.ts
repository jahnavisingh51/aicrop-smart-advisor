import prisma from '../client.ts';

export const weatherService = {
  getAlerts: async (location?: string) => {
    // In a real app, this would fetch from a Weather API like OpenWeatherMap or WeatherStack
    const alerts = await prisma.weatherAlert.findMany({
      where: {
        isDeleted: false
      },
      orderBy: {
        date: 'desc'
      }
    });

    if (alerts.length === 0) {
      const mockAlerts = [
        {
          type: 'RAIN',
          severity: 'HIGH',
          message: 'Heavy rainfall predicted in next 24 hours. Consider early harvest for mature crops.',
          date: new Date()
        },
        {
          type: 'DROUGHT',
          severity: 'MEDIUM',
          message: 'Minimal rainfall expected for next 10 days. Monitor irrigation levels closely.',
          date: new Date()
        },
        {
          type: 'FROST',
          severity: 'LOW',
          message: 'Temperature drop expected at night. Protect sensitive crops from frost.',
          date: new Date()
        },
        {
          type: 'SOWING',
          severity: 'MEDIUM',
          message: 'Ideal soil temperature reached for sowing Kharif crops.',
          date: new Date()
        }
      ];

      await prisma.weatherAlert.createMany({
        data: mockAlerts
      });

      return prisma.weatherAlert.findMany({
        where: {
          isDeleted: false
        },
        orderBy: {
          date: 'desc'
        }
      });
    }

    return alerts;
  }
};
