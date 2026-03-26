import React, { useEffect, useState } from 'react';
import { cropService, marketService, weatherService } from '../services/cropService';
import { PredictionResult, MarketPrice, WeatherAlert } from '../types';
import { 
  History, 
  TrendingUp, 
  CloudRain, 
  ShieldAlert, 
  Calendar, 
  MapPin, 
  IndianRupee,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  LayoutDashboard,
  TrendingDown
} from 'lucide-react';
import { motion } from 'framer-motion';

const FarmerDashboard = () => {
  const [history, setHistory] = useState<PredictionResult[]>([]);
  const [marketPrices, setMarketPrices] = useState<MarketPrice[]>([]);
  const [alerts, setAlerts] = useState<WeatherAlert[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [h, m, a] = await Promise.all([
          cropService.getHistory(),
          marketService.getPrices(),
          weatherService.getAlerts()
        ]);
        setHistory(h);
        setMarketPrices(m);
        setAlerts(a);
      } catch (error) {
        console.error('Dashboard data fetch failed:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-secondary-green/20 border-t-primary-green rounded-full" 
        />
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-12">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Harvest" value="12.4 Tons" icon={Activity} color="bg-primary-green" trend="+12%" />
        <StatCard title="Avg. Yield" value="88%" icon={TrendingUp} color="bg-accent-blue" trend="+5%" />
        <StatCard title="Profit Est." value="₹2.4L" icon={IndianRupee} color="bg-amber-500" trend="+18%" />
        <StatCard title="Active Alerts" value={alerts.length.toString()} icon={ShieldAlert} color="bg-red-500" trend="Critical" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Yield Trends Graph (Simplified) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card-white dark:bg-slate-900 rounded-[2rem] p-8 shadow-xl border border-slate-200 dark:border-slate-800"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white flex items-center space-x-3">
                <LayoutDashboard className="w-6 h-6 text-primary-green" />
                <span>Yield Trends</span>
              </h3>
              <select className="bg-bg-light dark:bg-slate-800 border-none rounded-xl px-4 py-2 text-sm font-bold text-slate-600 dark:text-slate-300">
                <option>Last 6 Months</option>
                <option>Last Year</option>
              </select>
            </div>
            
            <div className="h-64 flex items-end justify-between gap-2 px-2">
              {[45, 60, 85, 70, 95, 80, 90].map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className={`w-full max-w-[40px] rounded-t-xl transition-all duration-300 ${
                      i === 4 ? 'bg-primary-green shadow-lg shadow-primary-green/30' : 'bg-secondary-green/30 dark:bg-secondary-green/10 group-hover:bg-secondary-green/50'
                    }`}
                  />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'][i]}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Prediction History */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="bg-card-white dark:bg-slate-900 rounded-[2rem] p-8 shadow-xl border border-slate-200 dark:border-slate-800"
          >
            <h3 className="text-2xl font-black text-slate-900 dark:text-white flex items-center space-x-3 mb-8">
              <History className="w-6 h-6 text-accent-brown" />
              <span>Prediction History</span>
            </h3>
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 dark:border-slate-800">
                    <th className="pb-6">Crop</th>
                    <th className="pb-6">Yield Est.</th>
                    <th className="pb-6">Est. Profit</th>
                    <th className="pb-6 text-right">Confidence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                  {history.map((item, idx) => (
                    <motion.tr 
                      key={item.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="text-slate-600 dark:text-slate-400 group hover:bg-bg-light dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <td className="py-6">
                        <div className="flex flex-col">
                          <span className="font-black text-slate-900 dark:text-white text-lg">{item.crop}</span>
                          <span className="text-[10px] font-bold text-slate-400 flex items-center mt-1">
                            <Calendar className="w-3 h-3 mr-1" />
                            {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A'}
                          </span>
                        </div>
                      </td>
                      <td className="py-6">
                        <div className="flex items-center space-x-2">
                          <div className="w-16 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-primary-green rounded-full" style={{ width: `${item.yieldEstimation}%` }} />
                          </div>
                          <span className="font-bold text-slate-800 dark:text-slate-200">{item.yieldEstimation}%</span>
                        </div>
                      </td>
                      <td className="py-6 font-black text-primary-green dark:text-secondary-green">
                        ₹{item.profitEstimation.toLocaleString()}
                      </td>
                      <td className="py-6 text-right">
                        <span className="px-3 py-1 bg-bg-light dark:bg-slate-800 rounded-full text-xs font-black text-slate-600 dark:text-slate-400">
                          {(item.confidence * 100).toFixed(0)}%
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-10">
          
          {/* Market Intelligence */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-green/20 rounded-full blur-3xl" />
            
            <h3 className="text-2xl font-black flex items-center space-x-3 mb-8 text-primary-green">
              <TrendingUp className="w-6 h-6" />
              <span>Market Intel</span>
            </h3>
            
            <div className="space-y-6">
              {marketPrices.slice(0, 4).map((market) => (
                <div key={market.id} className="p-5 bg-white/5 rounded-3xl border border-white/10 flex items-center justify-between group hover:bg-white/10 transition-all">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center font-black text-primary-green">
                      {market.cropName[0]}
                    </div>
                    <div>
                      <div className="font-black text-base">{market.cropName}</div>
                      <div className="flex items-center space-x-1 text-[10px] text-white/40 uppercase font-black tracking-widest mt-1">
                        <MapPin className="w-3 h-3" />
                        <span>{market.mandi}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end space-x-1 font-black text-lg text-primary-green">
                      <span>₹{market.price.toFixed(0)}</span>
                    </div>
                    <div className={`flex items-center justify-end text-[10px] font-black uppercase tracking-widest mt-1 ${
                      market.trend === 'UP' ? 'text-emerald-400' : 'text-rose-400'
                    }`}>
                      {market.trend === 'UP' ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
                      <span>{market.trend}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Smart Alerts */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-xl border border-slate-200 dark:border-slate-800"
          >
            <h3 className="text-2xl font-black text-slate-900 dark:text-white flex items-center space-x-3 mb-8">
              <CloudRain className="w-6 h-6 text-accent-blue" />
              <span>Smart Alerts</span>
            </h3>
            
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className={`p-5 rounded-3xl border-2 flex items-start space-x-4 transition-all hover:scale-[1.02] ${
                  alert.severity === 'HIGH' ? 'bg-rose-50 border-rose-100 dark:bg-rose-950/20 dark:border-rose-900/30' : 
                  'bg-sky-50 border-sky-100 dark:bg-sky-950/20 dark:border-sky-900/30'
                }`}>
                  <div className={`p-2 rounded-xl ${
                    alert.severity === 'HIGH' ? 'bg-rose-500' : 'bg-sky-500'
                  }`}>
                    <ShieldAlert className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 dark:text-white text-sm uppercase tracking-wide">{alert.type}</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium leading-relaxed">{alert.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, color, trend }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-card-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between"
  >
    <div className="flex items-center justify-between mb-6">
      <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center shadow-lg shadow-black/10`}>
        <Icon className="w-7 h-7 text-white" />
      </div>
      <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
        trend.includes('+') ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950/40' : 'bg-rose-100 text-rose-600 dark:bg-rose-950/40'
      }`}>
        {trend}
      </div>
    </div>
    <div>
      <p className="text-slate-400 dark:text-slate-500 font-black text-xs uppercase tracking-[0.2em] mb-2">{title}</p>
      <h4 className="text-3xl font-black text-slate-900 dark:text-white">{value}</h4>
    </div>
  </motion.div>
);

export default FarmerDashboard;