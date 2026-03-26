import React from 'react';
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  Award, 
  Settings, 
  LogOut, 
  ChevronRight, 
  ShieldCheck,
  Zap,
  Sprout
} from 'lucide-react';
import { motion } from 'framer-motion';

const FarmerProfile = () => {
  const farmer = {
    name: 'Rajesh Kumar',
    location: 'Ludhiana, Punjab',
    phone: '+91 98765 43210',
    email: 'rajesh.kumar@agrimail.com',
    memberSince: 'March 2024',
    landSize: '15 Acres',
    crops: ['Wheat', 'Rice', 'Sugarcane'],
    points: 1250,
    rank: 'Gold Master Farmer'
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-24">
      {/* Profile Header */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card-white dark:bg-slate-900 rounded-[3rem] p-12 shadow-2xl border border-slate-200 dark:border-slate-800 transition-colors duration-300 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <Sprout className="w-64 h-64 text-primary-green" />
        </div>

        <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
          <div className="relative">
            <div className="w-48 h-48 bg-primary-green/10 rounded-full border-8 border-primary-green/20 p-2 overflow-hidden shadow-2xl">
               <div className="w-full h-full bg-primary-green rounded-full flex items-center justify-center">
                  <User className="w-24 h-24 text-white" />
               </div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-amber-500 text-white p-3 rounded-2xl shadow-xl shadow-amber-500/30">
               <Award className="w-6 h-6" />
            </div>
          </div>

          <div className="text-center md:text-left space-y-6">
            <div>
               <h2 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter">{farmer.name}</h2>
               <div className="flex items-center justify-center md:justify-start space-x-2 text-primary-green font-black text-xs uppercase tracking-widest mt-2">
                 <ShieldCheck className="w-4 h-4" />
                 <span>Verified Farmer • {farmer.rank}</span>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ProfileInfoItem icon={MapPin} text={farmer.location} />
              <ProfileInfoItem icon={Phone} text={farmer.phone} />
              <ProfileInfoItem icon={Mail} text={farmer.email} />
              <ProfileInfoItem icon={Calendar} text={`Member since ${farmer.memberSince}`} />
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <button className="flex items-center space-x-2 px-6 py-3 bg-primary-green text-white rounded-2xl font-black text-sm shadow-xl shadow-primary-green/20 hover:scale-105 transition-all">
                <Settings className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
              <button className="flex items-center space-x-2 px-6 py-3 bg-rose-500 text-white rounded-2xl font-black text-sm shadow-xl shadow-rose-500/20 hover:scale-105 transition-all">
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column - Farm Details */}
        <div className="space-y-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-card-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-xl border border-slate-200 dark:border-slate-800"
          >
            <h3 className="text-2xl font-black text-slate-900 dark:text-white flex items-center space-x-3 mb-8">
              <Zap className="w-6 h-6 text-amber-500" />
              <span>Farm Assets</span>
            </h3>
            <div className="space-y-6">
              <FarmAssetItem label="Cultivated Land" value={farmer.landSize} />
              <FarmAssetItem label="Primary Crops" value={farmer.crops.join(', ')} />
              <FarmAssetItem label="Farmer Points" value={farmer.points.toString()} />
              <FarmAssetItem label="Soil Quality" value="A+ Grade" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-primary-green rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
            <h4 className="text-xl font-black mb-4">Mastery Progress</h4>
            <div className="space-y-4 relative z-10">
               <div className="flex justify-between text-xs font-black uppercase tracking-widest text-emerald-100">
                  <span>To Platinum</span>
                  <span>750 Points Left</span>
               </div>
               <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
                  <div className="w-[60%] h-full bg-white rounded-full shadow-lg" />
               </div>
               <p className="text-xs text-emerald-50 leading-relaxed font-bold">
                  Keep using the AI predictor to earn more points and unlock premium market insights.
               </p>
            </div>
          </motion.div>
        </div>

        {/* Right Column - Activity & Settings */}
        <div className="lg:col-span-2 space-y-10">
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-card-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-xl border border-slate-200 dark:border-slate-800"
          >
            <h3 className="text-2xl font-black text-slate-900 dark:text-white flex items-center space-x-3 mb-8">
              <Calendar className="w-6 h-6 text-accent-blue" />
              <span>Recent Activity</span>
            </h3>
            <div className="space-y-6">
              <ActivityItem 
                title="Crop Prediction Run" 
                desc="Wheat analysis completed with 94% confidence." 
                time="2 hours ago" 
                color="bg-primary-green"
              />
              <ActivityItem 
                title="Disease Scan" 
                desc="Detected Yellow Rust in Sugarcane. Treatment suggested." 
                time="1 day ago" 
                color="bg-rose-500"
              />
              <ActivityItem 
                title="Market Price Alert" 
                desc="Wheat prices rose by 5% in Ludhiana Mandi." 
                time="2 days ago" 
                color="bg-amber-500"
              />
              <ActivityItem 
                title="Weather Warning" 
                desc="Predicted heavy rainfall in next 48 hours." 
                time="3 days ago" 
                color="bg-accent-blue"
              />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <QuickLinkCard icon={Settings} title="Notification Settings" />
            <QuickLinkCard icon={ShieldCheck} title="Privacy & Security" />
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileInfoItem = ({ icon: Icon, text }: any) => (
  <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-400 font-bold text-sm bg-bg-light dark:bg-slate-800 px-4 py-2 rounded-2xl border border-slate-100 dark:border-slate-700 transition-all hover:bg-white dark:hover:bg-slate-950">
    <Icon className="w-4 h-4 text-primary-green" />
    <span>{text}</span>
  </div>
);

const FarmAssetItem = ({ label, value }: any) => (
  <div className="flex items-center justify-between group">
    <div>
       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-primary-green transition-colors">{label}</p>
       <h5 className="text-base font-black text-slate-900 dark:text-white">{value}</h5>
    </div>
    <div className="w-8 h-8 bg-bg-light dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-300 dark:text-slate-600 group-hover:text-primary-green group-hover:bg-primary-green/10 transition-all">
       <ChevronRight className="w-4 h-4" />
    </div>
  </div>
);

const ActivityItem = ({ title, desc, time, color }: any) => (
  <div className="flex items-start space-x-4 p-4 rounded-3xl hover:bg-bg-light dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-700">
    <div className={`w-3 h-3 rounded-full mt-1.5 ${color} shadow-lg shadow-black/10`} />
    <div className="flex-1">
       <div className="flex items-center justify-between mb-1">
          <h5 className="font-black text-slate-900 dark:text-white text-sm">{title}</h5>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{time}</span>
       </div>
       <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{desc}</p>
    </div>
  </div>
);

const QuickLinkCard = ({ icon: Icon, title }: any) => (
  <motion.button
    whileHover={{ y: -5, scale: 1.02 }}
    className="bg-card-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between w-full text-left"
  >
    <div className="flex items-center space-x-4">
       <div className="w-12 h-12 bg-bg-light dark:bg-slate-800 rounded-2xl flex items-center justify-center text-primary-green">
          <Icon className="w-6 h-6" />
       </div>
       <span className="font-black text-slate-900 dark:text-white text-sm uppercase tracking-widest">{title}</span>
    </div>
    <ChevronRight className="w-5 h-5 text-slate-300" />
  </motion.button>
);

export default FarmerProfile;
