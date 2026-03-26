import React, { useState } from 'react';
import { Leaf, BarChart3, Presentation, Activity, Camera, Moon, Sun, Globe, Menu, X, User } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ onNav }: { onNav: (page: string) => void }) => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', icon: Activity, label: t('nav.dashboard') },
    { id: 'predict', icon: BarChart3, label: t('nav.predict') },
    { id: 'disease', icon: Camera, label: t('nav.disease') },
    { id: 'presentation', icon: Presentation, label: t('nav.presentation') },
  ];

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'hi', label: 'हि' },
    { code: 'te', label: 'తె' },
    { code: 'pa', label: 'ਪੰ' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-secondary-green/20 dark:border-slate-800 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 cursor-pointer" 
            onClick={() => onNav('home')}
          >
            <div className="bg-primary-green p-1.5 rounded-lg shadow-lg shadow-primary-green/20">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-black text-primary-green dark:text-secondary-green tracking-tight">AgriPredict AI</span>
          </motion.div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ y: -2 }}
                onClick={() => onNav(item.id)}
                className="flex items-center space-x-1.5 px-3 py-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-secondary-green/10 hover:text-primary-green dark:hover:text-secondary-green transition-all font-medium text-sm"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </motion.button>
            ))}
            
            <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-2" />
            
            {/* Language Selector */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-full p-0.5">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code as any)}
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition-all ${
                    language === lang.code 
                      ? 'bg-white dark:bg-slate-700 text-primary-green dark:text-secondary-green shadow-sm' 
                      : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            {/* Theme Toggle */}
            <motion.button
              whileTap={{ rotate: 180 }}
              onClick={toggleTheme}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-secondary-green/20 hover:text-primary-green transition-all"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </motion.button>

            {/* Profile */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={() => onNav('profile')}
              className="p-2 rounded-full bg-primary-green text-white shadow-lg shadow-primary-green/20"
            >
              <User className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button onClick={toggleTheme} className="p-2 text-slate-600 dark:text-slate-300">
               {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-slate-600 dark:text-slate-300"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNav(item.id);
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-200"
                >
                  <item.icon className="w-5 h-5 text-primary-green" />
                  <span className="font-semibold">{item.label}</span>
                </button>
              ))}
              
              <div className="flex items-center justify-between p-3 rounded-xl bg-primary-green/10">
                <div className="flex items-center space-x-2">
                  <Globe className="w-5 h-5 text-primary-green" />
                  <span className="font-semibold text-primary-green">Language</span>
                </div>
                <div className="flex space-x-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code as any)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold ${
                        language === lang.code 
                          ? 'bg-primary-green text-white' 
                          : 'bg-white dark:bg-slate-700 text-slate-400'
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;