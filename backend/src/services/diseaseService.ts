import prisma from '../client.ts';
import { Storage, InfraProvider } from '@uptiqai/integrations-sdk';

const storage = new Storage({ provider: process.env.INFRA_PROVIDER as InfraProvider });

export const diseaseService = {
  detect: async (file: Blob, userId?: string) => {
    // 1. Upload to Storage
    const destinationKey = `diseases/${Date.now()}-leaf.png`;
    const uploadResult = await storage.uploadFile({
      file,
      destinationKey
    }) as any; // Cast to any to access url easily

    const imageUrl = uploadResult.url;

    // 2. CNN Detection (Simulated)
    const diseases = ['Leaf Rust', 'Blast Disease', 'Bacterial Blight', 'Mosaic Virus'];
    const diseaseName = diseases[Math.floor(Math.random() * diseases.length)];
    const confidence = 0.92;
    const treatment = 'Apply copper-based fungicides immediately. Increase spacing between plants for better airflow.';
    const recommendations = ['Use resistant varieties', 'Practice crop rotation', 'Remove infected leaves'];

    // 3. Save to History
    const diseaseReport = await prisma.diseaseReport.create({
      data: {
        userId,
        imageUrl,
        diseaseName,
        confidence,
        treatment,
        recommendations: JSON.stringify(recommendations)
      }
    });

    return {
      ...diseaseReport,
      recommendations
    };
  },

  getHistory: async (userId?: string) => {
    return prisma.diseaseReport.findMany({
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