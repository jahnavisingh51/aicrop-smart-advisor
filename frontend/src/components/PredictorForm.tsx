import React, { useState } from 'react';
import { PredictionInput } from '../types';
import { Leaf, Thermometer, Droplets, CloudRain, Zap, FlaskConical, Beaker, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface PredictorFormProps {
    onSubmit: (data: PredictionInput) => void;
    isLoading: boolean;
}

const PredictorForm = ({ onSubmit, isLoading }: PredictorFormProps) => {
    const [formData, setFormData] = useState<PredictionInput>({
        nitrogen: 50,
        phosphorus: 50,
        potassium: 50,
        ph: 6.5,
        temperature: 25,
        humidity: 60,
        rainfall: 100
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: parseFloat(value)
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <motion.form 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onSubmit={handleSubmit} 
            className="bg-card-white dark:bg-slate-900 rounded-[3rem] p-10 lg:p-16 shadow-2xl border border-slate-200 dark:border-slate-800 max-w-5xl mx-auto transition-colors duration-300"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                {/* Soil Nutrients Section */}
                <div className="space-y-10">
                    <div className="flex items-center justify-between">
                        <h3 className="flex items-center space-x-3 text-2xl font-black text-slate-900 dark:text-white">
                            <FlaskConical className="w-6 h-6 text-primary-green" />
                            <span>Soil Nutrients</span>
                        </h3>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-bg-light dark:bg-slate-800 px-3 py-1 rounded-full flex items-center">
                           <HelpCircle className="w-3 h-3 mr-1" />
                           What are these?
                        </div>
                    </div>
                    
                    <div className="space-y-8">
                        <RangeInput 
                            label="Nitrogen (N)" 
                            name="nitrogen" 
                            value={formData.nitrogen} 
                            min={0} max={150} 
                            onChange={handleChange} 
                            color="bg-primary-green"
                        />
                        <RangeInput 
                            label="Phosphorus (P)" 
                            name="phosphorus" 
                            value={formData.phosphorus} 
                            min={0} max={150} 
                            onChange={handleChange} 
                            color="bg-accent-blue"
                        />
                        <RangeInput 
                            label="Potassium (K)" 
                            name="potassium" 
                            value={formData.potassium} 
                            min={0} max={150} 
                            onChange={handleChange} 
                            color="bg-accent-brown"
                        />

                        <div className="space-y-3">
                            <label className="block text-sm font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center space-x-2">
                                <Beaker className="w-4 h-4 text-primary-green" />
                                <span>pH Level (0-14)</span>
                            </label>
                            <input 
                                type="number" step="0.1" name="ph" value={formData.ph} onChange={handleChange} min="0" max="14"
                                className="w-full px-6 py-4 bg-bg-light dark:bg-slate-800 border-2 border-transparent focus:border-primary-green focus:bg-white dark:focus:bg-slate-950 rounded-2xl font-black text-slate-900 dark:text-white focus:outline-none transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* Environmental Factors Section */}
                <div className="space-y-10">
                    <h3 className="flex items-center space-x-3 text-2xl font-black text-slate-900 dark:text-white">
                        <Zap className="w-6 h-6 text-accent-blue" />
                        <span>Environmental Data</span>
                    </h3>

                    <div className="space-y-8">
                        <div className="space-y-3">
                            <label className="block text-sm font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center space-x-2">
                                <Thermometer className="w-4 h-4 text-rose-500" />
                                <span>Temperature (°C)</span>
                            </label>
                            <input 
                                type="number" name="temperature" value={formData.temperature} onChange={handleChange}
                                className="w-full px-6 py-4 bg-bg-light dark:bg-slate-800 border-2 border-transparent focus:border-primary-green focus:bg-white dark:focus:bg-slate-950 rounded-2xl font-black text-slate-900 dark:text-white focus:outline-none transition-all"
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="block text-sm font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center space-x-2">
                                <Droplets className="w-4 h-4 text-accent-blue" />
                                <span>Humidity (%)</span>
                            </label>
                            <input 
                                type="number" name="humidity" value={formData.humidity} onChange={handleChange} min="0" max="100"
                                className="w-full px-6 py-4 bg-bg-light dark:bg-slate-800 border-2 border-transparent focus:border-primary-green focus:bg-white dark:focus:bg-slate-950 rounded-2xl font-black text-slate-900 dark:text-white focus:outline-none transition-all"
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="block text-sm font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center space-x-2">
                                <CloudRain className="w-4 h-4 text-indigo-500" />
                                <span>Rainfall (mm)</span>
                            </label>
                            <input 
                                type="number" name="rainfall" value={formData.rainfall} onChange={handleChange} min="0"
                                className="w-full px-6 py-4 bg-bg-light dark:bg-slate-800 border-2 border-transparent focus:border-primary-green focus:bg-white dark:focus:bg-slate-950 rounded-2xl font-black text-slate-900 dark:text-white focus:outline-none transition-all"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-20 flex flex-col items-center">
                <p className="text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-[0.3em] mb-6">Process data through Hybrid AI Model</p>
                <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isLoading}
                    className={`group relative flex items-center space-x-4 px-12 py-6 bg-primary-green text-white rounded-3xl font-black text-xl transition-all shadow-2xl shadow-primary-green/30 ${isLoading ? 'opacity-70 cursor-wait' : 'hover:bg-emerald-700 hover:shadow-primary-green/50'}`}
                >
                    {isLoading ? (
                        <>
                            <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full" 
                            />
                            <span>AI Engine Processing...</span>
                        </>
                    ) : (
                        <>
                            <Leaf className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                            <span>Analyze & Predict Crop</span>
                        </>
                    )}
                </motion.button>
            </div>
        </motion.form>
    );
};

const RangeInput = ({ label, name, value, min, max, onChange, color }: any) => (
    <div className="space-y-4">
        <div className="flex justify-between items-center">
            <label className="text-sm font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">{label}</label>
            <span className="font-black text-primary-green text-lg">{value}</span>
        </div>
        <input 
            type="range" name={name} min={min} max={max} value={value} onChange={onChange}
            className={`w-full h-3 bg-bg-light dark:bg-slate-800 rounded-full appearance-none cursor-pointer accent-primary-green`}
        />
        <div className="flex justify-between text-[10px] font-black text-slate-300 uppercase tracking-widest">
            <span>Minimum</span>
            <span>Optimal</span>
            <span>Maximum</span>
        </div>
    </div>
);

export default PredictorForm;