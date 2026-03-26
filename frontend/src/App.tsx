import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PredictorForm from './components/PredictorForm';
import ResultDisplay from './components/ResultDisplay';
import Presentation from './components/Presentation';
import FarmerDashboard from './components/FarmerDashboard';
import DiseaseDetector from './components/DiseaseDetector';
import Chatbot from './components/Chatbot';
import FarmerProfile from './components/FarmerProfile';
import { cropService } from './services/cropService';
import { PredictionInput, PredictionResult } from './types';
import { BarChart3, Leaf, Sprout } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
    const [currentPage, setCurrentPage] = useState('home');
    const [isLoading, setIsLoading] = useState(false);
    const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);

    const handlePredict = async (data: PredictionInput) => {
        setIsLoading(true);
        try {
            const result = await cropService.predict(data);
            setPredictionResult(result);
        } catch (error) {
            console.error('Prediction failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setPredictionResult(null);
    };

    const renderContent = () => {
        switch (currentPage) {
            case 'predict':
                return (
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16"
                    >
                        <div className="text-center space-y-6">
                            <motion.div 
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary-green/10 text-primary-green font-black text-xs uppercase tracking-widest border border-primary-green/20"
                            >
                                <Sprout className="w-4 h-4" />
                                <span>Precision Agriculture Engine</span>
                            </motion.div>
                            <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter">
                                AI Crop <span className="text-primary-green">Predictor</span>
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
                                Input your soil and environmental parameters. Our hybrid ML models will analyze the data to find your most profitable crop match.
                            </p>
                        </div>

                        {!predictionResult ? (
                            <PredictorForm onSubmit={handlePredict} isLoading={isLoading} />
                        ) : (
                            <ResultDisplay result={predictionResult} onReset={handleReset} />
                        )}
                    </motion.div>
                );
            case 'dashboard':
                return (
                    <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <FarmerDashboard />
                    </div>
                );
            case 'disease':
                return (
                    <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <DiseaseDetector />
                    </div>
                );
            case 'profile':
                return (
                    <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <FarmerProfile />
                    </div>
                );
            case 'presentation':
                return (
                    <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Presentation />
                    </div>
                );
            case 'home':
            default:
                return <Hero onStart={() => setCurrentPage('predict')} />;
        }
    };

    return (
        <div className="min-h-screen bg-bg-light dark:bg-slate-950 font-sans selection:bg-primary-green/20 selection:text-primary-green transition-colors duration-500">
            <Navbar onNav={setCurrentPage} />
            
            <main>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentPage}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {renderContent()}
                    </motion.div>
                </AnimatePresence>
            </main>

            <footer className="bg-card-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-20 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
                        <div className="flex flex-col items-center md:items-start space-y-6">
                            <div className="flex items-center space-x-3">
                                <div className="bg-primary-green p-2 rounded-xl">
                                    <Leaf className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">AgriPredict AI</span>
                            </div>
                            <p className="text-slate-400 dark:text-slate-500 text-sm font-bold leading-relaxed max-w-xs text-center md:text-left">
                                Empowering farmers with precision data and AI-driven insights for a sustainable future.
                            </p>
                        </div>
                        
                        <div className="flex flex-col items-center space-y-6">
                            <div className="flex space-x-8 text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">
                                <a href="#" className="hover:text-primary-green transition-colors">Privacy</a>
                                <a href="#" className="hover:text-primary-green transition-colors">Terms</a>
                                <a href="#" className="hover:text-primary-green transition-colors">Contact</a>
                            </div>
                        </div>

                        <div className="flex flex-col items-center md:items-end space-y-6">
                            <div className="flex items-center space-x-3 text-slate-400 dark:text-slate-500">
                                <div className="w-10 h-10 bg-bg-light dark:bg-slate-800 rounded-full flex items-center justify-center hover:bg-primary-green hover:text-white transition-all cursor-pointer">
                                   <BarChart3 className="w-5 h-5" />
                                </div>
                                <div className="w-10 h-10 bg-bg-light dark:bg-slate-800 rounded-full flex items-center justify-center hover:bg-primary-green hover:text-white transition-all cursor-pointer">
                                   <Sprout className="w-5 h-5" />
                                </div>
                            </div>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">© 2026 AgriTech Solutions</span>
                        </div>
                    </div>
                </div>
            </footer>

            <Chatbot />
        </div>
    );
}

export default App;