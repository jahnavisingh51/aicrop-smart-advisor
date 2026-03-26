import React from 'react';
import { PredictionResult } from '../types';
import { 
  CheckCircle2, 
  TrendingUp, 
  Lightbulb, 
  Sprout, 
  AlertCircle, 
  RefreshCw, 
  IndianRupee, 
  RotateCw, 
  Droplets, 
  FlaskConical,
  Zap,
  Star
} from 'lucide-react';
import { motion } from 'framer-motion';

interface ResultDisplayProps {
    result: PredictionResult;
    onReset: () => void;
}

const ResultDisplay = ({ result, onReset }: ResultDisplayProps) => {
    return (
        <div className="max-w-6xl mx-auto space-y-12 pb-20">
            {/* Main Result Card */}
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card-white dark:bg-slate-900 rounded-[3.5rem] overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 transition-colors duration-300"
            >
                {/* Banner */}
                <div className="bg-primary-green p-12 lg:p-20 text-white flex flex-col md:flex-row justify-between items-center relative overflow-hidden">
                    <motion.div 
                        animate={{ 
                            rotate: [0, 10, 0],
                            scale: [1, 1.1, 1]
                        }}
                        transition={{ duration: 10, repeat: Infinity }}
                        className="absolute -top-10 -right-10 p-8 opacity-10 pointer-events-none"
                    >
                        <Sprout className="w-64 h-64" />
                    </motion.div>
                    
                    <div className="relative z-10 text-center md:text-left space-y-4">
                        <div className="inline-flex items-center space-x-2 px-4 py-1 rounded-full bg-white/20 text-white font-black text-xs uppercase tracking-[0.2em] backdrop-blur-md border border-white/30">
                            <Star className="w-3.5 h-3.5 fill-white" />
                            <span>Top Recommended Crop</span>
                        </div>
                        <h2 className="text-6xl md:text-8xl font-black tracking-tighter">{result.crop}</h2>
                        <p className="text-emerald-100 text-lg font-bold max-w-md">Our AI analysis suggests that {result.crop} will thrive best in your current soil conditions.</p>
                    </div>

                    <div className="relative z-10 mt-10 md:mt-0">
                        <div className="w-48 h-48 rounded-full border-8 border-white/20 flex flex-col items-center justify-center backdrop-blur-sm bg-white/10 shadow-2xl">
                            <div className="text-[10px] text-white/70 uppercase font-black tracking-widest mb-1">AI Confidence</div>
                            <div className="text-5xl font-black">{(result.confidence * 100).toFixed(0)}%</div>
                        </div>
                    </div>
                </div>

                <div className="p-12 lg:p-16">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Key Metrics Grid */}
                        <div className="lg:col-span-5 grid grid-cols-1 gap-6">
                            <ResultStatCard 
                                icon={TrendingUp} 
                                label="Yield Estimation" 
                                value={`${result.yieldEstimation.toFixed(0)}%`} 
                                subValue="Above average for this season"
                                color="text-accent-blue"
                                bg="bg-accent-blue/5 dark:bg-accent-blue/10"
                            />
                            <ResultStatCard 
                                icon={IndianRupee} 
                                label="Profit Estimation" 
                                value={`₹${result.profitEstimation.toLocaleString()}`} 
                                subValue="Projected net profit per acre"
                                color="text-primary-green"
                                bg="bg-primary-green/5 dark:bg-primary-green/10"
                            />
                            <ResultStatCard 
                                icon={RotateCw} 
                                label="Rotation Suggestion" 
                                value={result.rotationSuggestion} 
                                subValue="Best next crop for soil health"
                                color="text-accent-brown"
                                bg="bg-accent-brown/5 dark:bg-accent-brown/10"
                            />
                        </div>

                        {/* Detailed Insights */}
                        <div className="lg:col-span-7 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <motion.div 
                                    whileHover={{ y: -5 }}
                                    className="bg-bg-light dark:bg-slate-800/50 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800"
                                >
                                    <div className="flex items-center space-x-3 mb-6">
                                        <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
                                           <FlaskConical className="w-5 h-5 text-white" />
                                        </div>
                                        <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-widest text-sm">Fertilizer Strategy</h4>
                                    </div>
                                    <ul className="space-y-4">
                                        {result.fertilizerTips.map((tip, idx) => (
                                            <li key={idx} className="flex items-start space-x-3 text-slate-600 dark:text-slate-400 text-sm font-bold leading-relaxed">
                                                <CheckCircle2 className="w-4 h-4 text-primary-green mt-1 flex-shrink-0" />
                                                <span>{tip}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>

                                <motion.div 
                                    whileHover={{ y: -5 }}
                                    className="bg-bg-light dark:bg-slate-800/50 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800"
                                >
                                    <div className="flex items-center space-x-3 mb-6">
                                        <div className="w-10 h-10 bg-accent-blue rounded-xl flex items-center justify-center">
                                           <Droplets className="w-5 h-5 text-white" />
                                        </div>
                                        <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-widest text-sm">Irrigation Plan</h4>
                                    </div>
                                    <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm mb-4">
                                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-bold italic">
                                            "{result.irrigationRecommendation}"
                                        </p>
                                    </div>
                                    <div className="flex items-center space-x-2 text-[10px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest">
                                        <Zap className="w-3.5 h-3.5 text-amber-500" />
                                        <span>Updated every 4 hours based on sensor data</span>
                                    </div>
                                </motion.div>
                            </div>

                            <div className="bg-primary-green/10 dark:bg-primary-green/5 p-8 rounded-[2.5rem] border border-primary-green/20">
                                <div className="flex items-center space-x-4 mb-4">
                                    <Lightbulb className="w-6 h-6 text-primary-green" />
                                    <h4 className="text-xl font-black text-primary-green">Expert Pro Tip</h4>
                                </div>
                                <p className="text-slate-700 dark:text-slate-300 font-bold leading-relaxed">
                                    To further maximize your {result.crop} yield, consider using bio-fertilizers alongside the recommended NPK levels. Maintaining soil organic matter is key for sustainable profit growth.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="px-12 pb-16 flex flex-col items-center">
                    <div className="w-full h-px bg-slate-100 dark:bg-slate-800 mb-12" />
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onReset}
                        className="group flex items-center space-x-3 px-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-3xl font-black text-lg transition-all shadow-2xl"
                    >
                        <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                        <span>Perform New Analysis</span>
                    </motion.button>
                </div>
            </motion.div>

            {/* Disclaimer */}
            <div className="flex items-center space-x-3 justify-center text-slate-400 dark:text-slate-500 text-xs uppercase tracking-[0.3em] font-black">
                <AlertCircle className="w-5 h-5" />
                <span>AI Predictions are for guidance and based on scientific modeling</span>
            </div>
        </div>
    );
};

const ResultStatCard = ({ icon: Icon, label, value, subValue, color, bg }: any) => (
    <motion.div 
        whileHover={{ x: 10 }}
        className={`${bg} p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 flex items-center justify-between group transition-all`}
    >
        <div className="flex items-center space-x-6">
            <div className={`w-16 h-16 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center shadow-lg shadow-black/5 ${color}`}>
                <Icon className="w-8 h-8" />
            </div>
            <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
                <h4 className={`text-4xl font-black ${color}`}>{value}</h4>
                <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 mt-1">{subValue}</p>
            </div>
        </div>
    </motion.div>
);

export default ResultDisplay;
