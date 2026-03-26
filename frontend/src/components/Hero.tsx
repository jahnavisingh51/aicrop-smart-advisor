import React from 'react';
import { ArrowRight, Sprout, Microscope, TrendingUp, CloudSun, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Hero = ({ onStart }: { onStart: () => void }) => {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden pt-32 pb-24 md:pt-48 md:pb-32 bg-bg-light dark:bg-slate-950 transition-colors duration-300">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.1, 0.2, 0.1] 
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-24 -left-24 w-96 h-96 bg-primary-green rounded-full blur-3xl" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            opacity: [0.1, 0.15, 0.1] 
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-48 -right-48 w-[500px] h-[500px] bg-accent-blue rounded-full blur-3xl" 
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-secondary-green/20 text-primary-green dark:text-secondary-green font-bold text-sm tracking-wide"
            >
              <Sprout className="w-4 h-4" />
              <span className="uppercase italic">Smart Agriculture for a Better Tomorrow</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight"
            >
              {t('hero.title').split(' ').slice(0, -1).join(' ')} <br />
              <span className="text-primary-green dark:text-secondary-green">{t('hero.title').split(' ').pop()}</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="max-w-xl mx-auto lg:mx-0 text-xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed"
            >
              {t('hero.subtitle')} Optimize selection, identify diseases, and maximize profits with our AI engine.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-5"
            >
              <button 
                onClick={onStart}
                className="group flex items-center space-x-3 px-10 py-5 bg-primary-green hover:bg-emerald-700 text-white rounded-2xl font-black text-lg transition-all shadow-2xl shadow-primary-green/30 hover:shadow-primary-green/50 active:scale-95"
              >
                <span>{t('hero.cta')}</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-10 py-5 bg-card-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-2xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                Learn More
              </button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap justify-center lg:justify-start gap-6 pt-4"
            >
              {['98% Accuracy', '1k+ Farmers', 'Real-time Alerts'].map((item) => (
                <div key={item} className="flex items-center space-x-2 text-slate-500 dark:text-slate-400 font-semibold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-secondary-green" />
                  <span>{item}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Feature Grid / Image Area */}
          <div className="flex-1 w-full max-w-2xl">
            <div className="grid grid-cols-2 gap-4">
              <HeroFeatureCard 
                icon={Activity} 
                title="Yield Forecast" 
                value="+24%" 
                color="bg-primary-green" 
                delay={0.5}
              />
              <HeroFeatureCard 
                icon={CloudSun} 
                title="Soil Health" 
                value="Optimal" 
                color="bg-accent-blue" 
                delay={0.6}
              />
              <HeroFeatureCard 
                icon={TrendingUp} 
                title="Profit Est." 
                value="$12.4k" 
                color="bg-amber-500" 
                delay={0.7}
              />
              <HeroFeatureCard 
                icon={Microscope} 
                title="Lab Tests" 
                value="Secure" 
                color="bg-accent-brown" 
                delay={0.8}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const HeroFeatureCard = ({ icon: Icon, title, value, color, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ y: -10 }}
    className="bg-card-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl"
  >
    <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-black/10`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <p className="text-slate-500 dark:text-slate-400 font-bold text-sm uppercase tracking-wider mb-1">{title}</p>
    <h3 className="text-2xl font-black text-slate-900 dark:text-white">{value}</h3>
  </motion.div>
);

const Activity = (props: any) => <TrendingUp {...props} />; // Alias for placeholder

export default Hero;