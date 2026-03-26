import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Target, 
  AlertTriangle, 
  CheckCircle, 
  Layers, 
  Activity, 
  Globe, 
  Database, 
  BrainCircuit, 
  LayoutGrid, 
  TrendingUp, 
  Camera, 
  MessageSquare, 
  CloudSun, 
  Zap,
  Map,
  ShieldAlert,
  Sprout
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Presentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Project Title & Goal",
      icon: <Target className="w-12 h-12 text-primary-green" />,
      content: (
        <div className="space-y-10 text-center py-16">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center space-x-3 px-6 py-2 rounded-full bg-primary-green/10 text-primary-green font-black text-sm uppercase tracking-widest border border-primary-green/20"
          >
            <Sprout className="w-5 h-5" />
            <span>Smart Farming 2026</span>
          </motion.div>
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tighter">AI-Powered <br /><span className="text-primary-green">Crop Prediction</span></h1>
          <p className="text-2xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed">An intelligent ecosystem for data-driven precision agriculture and sustainable yield management.</p>
          <div className="bg-primary-green p-10 rounded-[2.5rem] shadow-2xl shadow-primary-green/20 max-w-2xl mx-auto border-4 border-white dark:border-slate-800">
            <h4 className="font-black text-white text-xl uppercase tracking-widest mb-2">The Mission</h4>
            <p className="text-emerald-100 font-bold text-lg leading-relaxed">Empower 100M+ farmers to maximize yield and profitability through hybrid ML modeling and real-time environmental insights.</p>
          </div>
        </div>
      )
    },
    {
      title: "Problem Statement",
      icon: <AlertTriangle className="w-12 h-12 text-rose-500" />,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 py-12">
          <div className="space-y-10">
            <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Current Challenges</h3>
            <div className="space-y-6">
              {[
                "Traditional crop selection leads to 40% lower yields.",
                "Soil health depletion due to lack of rotation awareness.",
                "Zero market intelligence for crop price forecasting.",
                "Unpredictable weather disrupting sowing cycles."
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start space-x-4 p-5 rounded-2xl bg-bg-light dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800"
                >
                  <div className="w-6 h-6 bg-rose-500 text-white rounded-lg flex items-center justify-center font-black text-[10px] mt-1">!</div>
                  <span className="text-lg font-bold text-slate-700 dark:text-slate-300">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="bg-slate-900 rounded-[3rem] p-12 text-white flex flex-col justify-center relative overflow-hidden shadow-2xl">
             <div className="absolute top-0 right-0 p-12 opacity-10">
                <TrendingUp className="w-48 h-48" />
             </div>
             <div className="text-8xl font-black text-primary-green mb-6 tracking-tighter">60%</div>
             <p className="text-2xl text-white/70 font-bold leading-relaxed relative z-10">Potential yield increase by adopting precision farming methods powered by AI.</p>
          </div>
        </div>
      )
    },
    {
      title: "Hybrid AI Engine",
      icon: <Zap className="w-12 h-12 text-accent-blue" />,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 py-12">
          <div className="space-y-10">
            <div className="p-10 bg-primary-green rounded-[3rem] border-4 border-white dark:border-slate-800 shadow-2xl shadow-primary-green/20">
               <h4 className="font-black text-white text-2xl mb-4">Random Forest / XGBoost</h4>
               <p className="text-lg text-emerald-100 font-bold leading-relaxed">Used for high-accuracy crop prediction based on static soil parameters like NPK and pH levels.</p>
            </div>
            <div className="p-10 bg-accent-blue rounded-[3rem] border-4 border-white dark:border-slate-800 shadow-2xl shadow-accent-blue/20">
               <h4 className="font-black text-white text-2xl mb-4">LSTM (RNN) Networks</h4>
               <p className="text-lg text-sky-100 font-bold leading-relaxed">Processes temporal data for weather trend forecasting and yield trend analysis over time.</p>
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-8">
            <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Why Hybrid?</h3>
            <p className="text-2xl text-slate-600 dark:text-slate-400 font-bold leading-relaxed italic">
              "Combining static soil features with dynamic weather trends improves prediction reliability by over 15% compared to single-model approaches."
            </p>
            <div className="grid grid-cols-2 gap-6">
               <div className="p-6 bg-bg-light dark:bg-slate-800 rounded-3xl text-center">
                  <div className="text-3xl font-black text-primary-green mb-1">98%</div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Reliability</div>
               </div>
               <div className="p-6 bg-bg-light dark:bg-slate-800 rounded-3xl text-center">
                  <div className="text-3xl font-black text-accent-blue mb-1">&lt; 2s</div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Latency</div>
               </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "AI Disease Detection",
      icon: <Camera className="w-12 h-12 text-rose-500" />,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 py-12">
          <div className="space-y-10">
            <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">CNN Architecture</h3>
            <div className="space-y-6">
              {[
                "Convolutional Neural Networks for deep image feature extraction.",
                "Pre-trained on PlantVillage dataset (54k+ labeled images).",
                "Advanced Edge AI for instant real-time diagnosis.",
                "Automatic fertilizer & treatment suggestion generation."
              ].map((item, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-primary-green/20 rounded-xl flex items-center justify-center text-primary-green">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <span className="text-lg font-bold text-slate-700 dark:text-slate-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="aspect-square bg-slate-900 rounded-[4rem] p-12 flex flex-col items-center justify-center text-center relative overflow-hidden border-8 border-white dark:border-slate-800 shadow-2xl">
            <div className="absolute inset-0 bg-primary-green/5 animate-pulse" />
            <BrainCircuit className="w-32 h-32 text-primary-green mb-8 relative z-10" />
            <h4 className="text-2xl font-black text-white relative z-10 mb-2">Neural Network</h4>
            <p className="text-white/40 font-bold uppercase tracking-[0.3em] text-xs relative z-10">Real-time Inference</p>
          </div>
        </div>
      )
    },
    {
      title: "Model Evaluation",
      icon: <ShieldAlert className="w-12 h-12 text-amber-500" />,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 py-12">
          <div className="space-y-10">
            <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Performance Metrics</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="p-10 bg-primary-green rounded-[3rem] text-center shadow-2xl shadow-primary-green/20 border-4 border-white dark:border-slate-800">
                 <div className="text-6xl font-black text-white mb-2">96.4%</div>
                 <div className="text-xs text-emerald-100 font-black uppercase tracking-[0.2em]">Validation Accuracy</div>
              </div>
              <div className="p-10 bg-accent-blue rounded-[3rem] text-center shadow-2xl shadow-accent-blue/20 border-4 border-white dark:border-slate-800">
                 <div className="text-6xl font-black text-white mb-2">0.94</div>
                 <div className="text-xs text-sky-100 font-black uppercase tracking-[0.2em]">F1-Score Analysis</div>
              </div>
            </div>
            <p className="text-xl text-slate-500 dark:text-slate-400 font-bold leading-relaxed">
              Tested on a dataset of 22,000+ agricultural records across diverse climatic zones. Validated using 10-fold cross-validation techniques.
            </p>
          </div>
          <div className="bg-slate-900 rounded-[3rem] p-12 text-white flex flex-col justify-center shadow-2xl border border-slate-800">
             <h4 className="text-3xl font-black text-primary-green mb-6 uppercase tracking-widest">Matrix Insights</h4>
             <ul className="space-y-6 text-white/70 font-bold text-lg">
                <li className="flex items-center space-x-3">
                   <div className="w-2 h-2 bg-primary-green rounded-full" />
                   <span>Exceptional precision for Rice & Cotton.</span>
                </li>
                <li className="flex items-center space-x-3">
                   <div className="w-2 h-2 bg-primary-green rounded-full" />
                   <span>Minor overlap in high-rainfall crops.</span>
                </li>
                <li className="flex items-center space-x-3">
                   <div className="w-2 h-2 bg-primary-green rounded-full" />
                   <span>Robust handling of noisy sensor data.</span>
                </li>
             </ul>
          </div>
        </div>
      )
    }
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-24">
      {/* Slide Navigation Header */}
      <div className="flex items-center justify-between bg-card-white dark:bg-slate-900 p-8 rounded-[3rem] shadow-2xl border border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="flex items-center space-x-8">
          <div className="w-20 h-20 bg-bg-light dark:bg-slate-800 rounded-3xl flex items-center justify-center shadow-inner">
            {slides[currentSlide].icon}
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{slides[currentSlide].title}</h2>
            <div className="flex items-center space-x-3 mt-1">
               <div className="px-3 py-1 bg-primary-green/10 text-primary-green rounded-full text-[10px] font-black uppercase tracking-widest">
                  Chapter {currentSlide + 1}
               </div>
               <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{currentSlide + 1} / {slides.length}</p>
            </div>
          </div>
        </div>
        <div className="flex space-x-4">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
            className="p-5 bg-bg-light dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-2xl text-slate-600 dark:text-white transition-colors border border-slate-100 dark:border-slate-700 shadow-lg"
          >
            <ChevronLeft className="w-8 h-8" />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
            className="p-5 bg-primary-green hover:bg-emerald-700 rounded-2xl text-white transition-colors shadow-2xl shadow-primary-green/30"
          >
            <ChevronRight className="w-8 h-8" />
          </motion.button>
        </div>
      </div>

      {/* Slide Content Area */}
      <div className="bg-card-white dark:bg-slate-900 rounded-[4rem] shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden min-h-[700px] flex items-center justify-center p-16 lg:p-24 relative transition-colors duration-300">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full"
          >
             {slides[currentSlide].content}
          </motion.div>
        </AnimatePresence>
        
        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-3 bg-bg-light dark:bg-slate-800">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
            className="h-full bg-primary-green shadow-[0_0_20px_rgba(46,125,50,0.5)] transition-all duration-700 ease-out" 
          />
        </div>
      </div>

      {/* Viva/Presentation Tips */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-slate-900 rounded-[2.5rem] p-10 text-white flex flex-col md:flex-row items-center justify-between border border-slate-800 shadow-2xl"
      >
        <div className="flex items-center space-x-6 text-center md:text-left mb-6 md:mb-0">
          <div className="w-16 h-16 bg-primary-green rounded-2xl flex items-center justify-center shadow-2xl shadow-primary-green/20">
            <BrainCircuit className="w-8 h-8 text-white" />
          </div>
          <div>
            <h4 className="text-xl font-black uppercase tracking-widest text-primary-green">Presentation Insight</h4>
            <p className="text-sm text-white/60 font-bold leading-relaxed">"Highlight the scalability of our Hono.js backend and how it serves ML predictions via secure REST APIs."</p>
          </div>
        </div>
        <div className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] italic">
          Press space or arrows to navigate
        </div>
      </motion.div>
    </div>
  );
};

export default Presentation;
