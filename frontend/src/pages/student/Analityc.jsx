import Navbar from "../../assets/NavBar";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { motion } from 'framer-motion'; // زدنا framer-motion

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

// إعدادات التحريك للـ Container والأبناء
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 } // العناصر كيبانو بالتتابع
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
};

const StatCard = ({ title, value, sub, icon }) => (
  <motion.div 
    variants={itemVariants}
    whileHover={{ y: -5, backgroundColor: "rgba(255, 255, 255, 0.12)" }}
    className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-lg relative overflow-hidden group transition-all"
  >
    <motion.div 
      initial={{ scale: 0 }} 
      animate={{ scale: 1 }} 
      className="text-[#cd7329] text-2xl mb-4 opacity-80"
    >
      {icon}
    </motion.div>
    <div className="text-4xl font-bold mb-1 group-hover:scale-105 origin-left transition-transform duration-300">
      {value}
    </div>
    <div className="text-slate-400 text-sm">{title}</div>
    <div className="mt-4 text-emerald-400 text-xs flex items-center font-bold">
      <span>{sub}</span>
    </div>
  </motion.div>
);

export default function Main() {
  const interestsData = [
    { label: 'Academic', value: 40, color: '#cd7329' },
    { label: 'Sports', value: 30, color: '#eb8232' },
    { label: 'Cultural', value: 30, color: '#fba76b' },
  ];

  const monthlyData = [
    { month: 'Sep', count: 3 }, { month: 'Oct', count: 5 },
    { month: 'Nov', count: 4 }, { month: 'Dec', count: 2 },
    { month: 'Jan', count: 3 }, { month: 'Feb', count: 4 },
    { month: 'Mar', count: 3 },
  ];

  const doughnutConfig = {
    labels: interestsData.map(d => d.label),
    datasets: [{
      data: interestsData.map(d => d.value),
      backgroundColor: interestsData.map(d => d.color),
      borderWidth: 0,
      cutout: '70%',
    }]
  };

  const barConfig = {
    labels: monthlyData.map(d => d.month),
    datasets: [{
      label: 'Events',
      data: monthlyData.map(d => d.count),
      backgroundColor: '#cd7329',
      borderRadius: 5,
    }]
  };

  return (
    <>
      <Navbar />
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="bg-slate-900 min-h-screen p-8 pt-[100px] text-white font-sans relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-slate-900/90 pointer-events-none z-0"></div>
        
        {/* Header */}
        <motion.div variants={itemVariants} className="flex items-center mb-8 relative z-10">
          <motion.div 
            whileHover={{ rotate: 360 }}
            transition={{ duration: 1 }}
            className="bg-white/10 backdrop-blur-md border border-white/10 p-3 rounded-xl mr-4 shadow-lg"
          >
            <svg className="w-8 h-8 text-[#cd7329]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
            </svg>
          </motion.div>
          <div>
            <h1 className="text-3xl font-bold text-[#cd7329]">Student Analytics</h1>
            <p className="text-slate-400">Track your event participation and achievements</p>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 relative z-10">
          <StatCard title="Events Attended" value="24" sub="+12% from last semester" icon="✅" />
          
          <motion.div 
            variants={itemVariants}
            className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-lg flex flex-col items-center"
          >
            <div className="relative w-32 h-32 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-8 border-[#cd7329] opacity-20"></div>
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                className="absolute inset-0 rounded-full border-8 border-[#cd7329] border-t-transparent"
              ></motion.div>
              <motion.span 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="text-2xl font-bold text-white"
              >92%</motion.span>
            </div>
            <p className="mt-4 text-slate-400 text-sm">Presence Rate</p>
            <p className="text-[#cd7329] font-bold">Excellent Performance!</p>
          </motion.div>

          <StatCard title="Total Points Earned" value="1840" sub="Top 15% of students" icon="🏆" />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 relative z-10">
          <motion.div variants={itemVariants} className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-lg">
            <h2 className="text-xl font-bold text-white mb-6">Interests Distribution</h2>
            <div className="h-64 flex justify-center">
              <Doughnut 
                data={doughnutConfig} 
                options={{ 
                  plugins: { legend: { display: false } },
                  animation: { duration: 2500, easing: 'easeOutQuart' } 
                }} 
              />
            </div>
            <div className="mt-6 space-y-2">
              {interestsData.map((item, idx) => (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + (idx * 0.1) }}
                  key={item.label} 
                  className="flex justify-between text-sm text-slate-300 font-medium"
                >
                  <span className="flex items-center">
                    <span className="w-3 h-3 rounded-full mr-2 shadow-sm" style={{ backgroundColor: item.color }}></span>
                    {item.label}
                  </span>
                  <span className="font-bold text-white">{item.value}%</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-lg">
            <h2 className="text-xl font-bold text-white mb-6">Monthly Participation</h2>
            <div className="h-64">
              <Bar 
                data={barConfig} 
                options={{
                  animation: { duration: 2500, easing: 'easeOutBounce' },
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } },
                    x: { grid: { display: false }, ticks: { color: '#94a3b8' } }
                  }
                }} 
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}