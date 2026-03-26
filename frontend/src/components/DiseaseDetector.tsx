import React, { useState } from 'react';
import { diseaseService } from '../services/cropService';
import { DiseaseResult } from '../types';
import { 
  Camera, 
  Upload, 
  CheckCircle, 
  AlertTriangle, 
  ShieldCheck, 
  Leaf, 
  ArrowRight,
  Loader2,
  Trash2,
  Image as ImageIcon,
  Zap,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DiseaseDetector = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [result, setResult] = useState<DiseaseResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setIsLoading(true);
    try {
      const res = await diseaseService.detect(selectedFile);
      setResult(res);
    } catch (error) {
      console.error('Disease detection failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setResult(null);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-16 pb-20">
      <div className="text-center space-y-6">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-accent-blue/10 text-accent-blue font-black text-xs uppercase tracking-widest border border-accent-blue/20"
        >
          <Zap className="w-4 h-4" />
          <span>Advanced CNN Leaf Analysis</span>
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter"
        >
          AI Disease <span className="text-primary-green">Lab</span>
        </motion.h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
          Upload a clear image of your crop's leaf. Our advanced convolutional neural network will analyze it for disease and suggest instant treatment.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
        {/* Upload Section */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-card-white dark:bg-slate-900 rounded-[3rem] p-10 shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center min-h-[500px] transition-colors duration-300"
        >
          {!previewUrl ? (
            <label className="w-full h-full flex flex-col items-center justify-center p-16 border-4 border-dashed border-slate-100 dark:border-slate-800 rounded-[2.5rem] hover:bg-bg-light dark:hover:bg-slate-800/50 hover:border-primary-green transition-all cursor-pointer group">
              <div className="w-24 h-24 bg-primary-green/10 text-primary-green rounded-[2rem] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <Upload className="w-10 h-10" />
              </div>
              <div className="text-center space-y-4">
                <div className="text-2xl font-black text-slate-900 dark:text-white">Drop your image here</div>
                <div className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full inline-block">JPG, PNG, WEBP (Max 10MB)</div>
              </div>
              <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
            </label>
          ) : (
            <div className="w-full h-full flex flex-col justify-between space-y-10">
              <div className="relative flex-1 aspect-video rounded-[2.5rem] overflow-hidden border-4 border-slate-100 dark:border-slate-800 shadow-2xl bg-bg-light dark:bg-slate-950">
                <img src={previewUrl} alt="Leaf preview" className="w-full h-full object-contain" />
                <motion.button 
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={reset}
                  className="absolute top-6 right-6 p-4 bg-rose-500 text-white rounded-2xl shadow-2xl hover:bg-rose-600 transition-colors"
                >
                  <Trash2 className="w-6 h-6" />
                </motion.button>
              </div>
              
              <AnimatePresence>
                {!result && (
                  <motion.button 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    onClick={handleUpload}
                    disabled={isLoading}
                    className="w-full py-6 bg-primary-green text-white rounded-[2rem] font-black text-xl flex items-center justify-center space-x-3 hover:bg-emerald-700 shadow-2xl shadow-primary-green/30 transition-all disabled:opacity-50 active:scale-95"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        <span>CNN Model Analyzing...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-6 h-6" />
                        <span>Run Full Diagnosis</span>
                      </>
                    )}
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          )}
        </motion.div>

        {/* Results Section */}
        <motion.div 
           initial={{ opacity: 0, x: 30 }}
           animate={{ opacity: 1, x: 0 }}
           className="bg-slate-900 rounded-[3rem] p-10 lg:p-12 text-white shadow-2xl min-h-[500px] flex flex-col justify-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 p-12 opacity-5 pointer-events-none">
            <Camera className="w-64 h-64" />
          </div>

          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center space-y-6 py-12 relative z-10"
              >
                <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/10">
                  <Leaf className="w-10 h-10 text-white/20" />
                </div>
                <div>
                  <h4 className="text-2xl font-black text-white/40 mb-2">Waiting for Scan</h4>
                  <p className="text-white/20 text-sm font-bold uppercase tracking-[0.2em]">Upload an image to start AI detection</p>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-10 relative z-10"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <div className="inline-flex items-center space-x-2 px-3 py-1 bg-primary-green/20 rounded-lg text-primary-green text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                      Diagnosis Result
                    </div>
                    <h3 className="text-5xl font-black tracking-tight">{result.diseaseName}</h3>
                  </div>
                  <div className="px-6 py-4 bg-white/5 rounded-3xl border border-white/10 text-center backdrop-blur-md">
                     <div className="text-[10px] text-white/40 uppercase font-black tracking-widest mb-1">AI Confidence</div>
                     <div className="text-3xl font-black text-primary-green">{(result.confidence * 100).toFixed(0)}%</div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="p-8 bg-rose-500/10 border-2 border-rose-500/20 rounded-[2.5rem] flex items-start space-x-5">
                     <div className="p-3 bg-rose-500 rounded-2xl shadow-xl shadow-rose-500/20">
                        <AlertTriangle className="w-6 h-6 text-white" />
                     </div>
                     <div>
                       <h4 className="font-black text-rose-400 uppercase tracking-widest text-sm mb-2">Recommended Treatment</h4>
                       <p className="text-sm text-white/80 font-bold leading-relaxed">{result.treatment}</p>
                     </div>
                  </div>

                  <div className="space-y-4">
                     <div className="flex items-center justify-between">
                        <h4 className="font-black text-sm uppercase tracking-widest flex items-center space-x-3 text-white/60">
                          <CheckCircle className="w-5 h-5 text-primary-green" />
                          <span>Preventive Actions</span>
                        </h4>
                        <div className="flex items-center space-x-1 text-[10px] text-white/30">
                           <Info className="w-3 h-3" />
                           <span>Organic Certified</span>
                        </div>
                     </div>
                     <div className="grid grid-cols-1 gap-3">
                       {result.recommendations.map((rec, i) => (
                         <motion.div 
                            key={i}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center space-x-4 text-xs font-bold text-white/70 bg-white/5 p-4 rounded-2xl border border-white/5 group hover:bg-white/10 transition-colors"
                          >
                           <div className="w-6 h-6 bg-primary-green rounded-lg flex items-center justify-center font-black text-[10px] text-white">
                             {i+1}
                           </div>
                           <span>{rec}</span>
                         </motion.div>
                       ))}
                     </div>
                  </div>
                </div>
                
                <button 
                  onClick={reset}
                  className="w-full py-5 bg-white text-slate-900 rounded-[2rem] font-black text-lg hover:bg-primary-green hover:text-white transition-all shadow-2xl active:scale-95"
                >
                  Scan Another Leaf
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <FeatureItem icon={ImageIcon} title="High Precision" desc="Analyzing over 50,000 leaf parameters per scan." />
         <FeatureItem icon={Zap} title="Instant Scan" desc="Get results in less than 2 seconds using edge computing." />
         <FeatureItem icon={ShieldCheck} title="Verified Treatments" desc="All suggestions are based on agricultural research papers." />
      </div>
    </div>
  );
};

const FeatureItem = ({ icon: Icon, title, desc }: any) => (
  <div className="bg-card-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 flex items-start space-x-4">
    <div className="w-12 h-12 bg-bg-light dark:bg-slate-800 rounded-xl flex items-center justify-center flex-shrink-0">
      <Icon className="w-6 h-6 text-primary-green" />
    </div>
    <div>
      <h5 className="font-black text-slate-900 dark:text-white uppercase tracking-widest text-sm mb-1">{title}</h5>
      <p className="text-xs text-slate-500 dark:text-slate-400 font-bold leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default DiseaseDetector;