import React, { useState, useEffect } from 'react';
import Navbar from "../../assets/NavBar";
import axios from 'axios';
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
import { motion } from 'framer-motion';

ChartJS.register(
  CategoryScale, LinearScale, BarElement, ArcElement, 
  PointElement, LineElement, Tooltip, Legend
);

// مصفوفة الألوان باش نخدمو بها ف كاع البلايص
const CHART_COLORS = ['#cd7329', '#eb8232', '#fba76b', '#ffd1a9', '#944a10'];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
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
    <div className="text-[#cd7329] text-2xl mb-4 opacity-80">{icon}</div>
    <div className="text-4xl font-bold mb-1 group-hover:scale-105 origin-left transition-transform duration-300">
      {value}
    </div>
    <div className="text-slate-400 text-sm">{title}</div>
    <div className="mt-4 text-emerald-400 text-xs font-bold"><span>{sub}</span></div>
  </motion.div>
);

export default function StudentAnalytics() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    eventsAttended: 0,
    presenceRate: 0,
    totalPoints: 0,
    interests: [],
    monthlyActivity: []
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
        try {
            const userData = JSON.parse(localStorage.getItem('user'));
            const studentId = userData?._id || userData?.user?._id; 

            if (!studentId) return;

            const response = await axios.get(`http://localhost:5000/api/analytics/my-stats?studentId=${studentId}`);
            setStats(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching analytics:", error);
            setLoading(false);
        }
    };
    fetchAnalytics();
  }, []);

  // إعدادات الدائرة (Interests) مع الألوان
  const doughnutConfig = {
    labels: stats.interests.map(d => d.label),
    datasets: [{
      data: stats.interests.map(d => d.value),
      backgroundColor: CHART_COLORS,
      borderWidth: 2,
      borderColor: '#0f172a',
      cutout: '70%',
    }]
  };

  // إعدادات الأعمدة (Monthly)
  const barConfig = {
    labels: stats.monthlyActivity.map(d => d.month),
    datasets: [{
      label: 'Événements',
      data: stats.monthlyActivity.map(d => d.count),
      backgroundColor: '#cd7329',
      borderRadius: 6,
    }]
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: { 
          stepSize: 1, // باش يبانو أرقام صحيحة 1, 2...
          color: '#94a3b8' 
        },
        grid: { color: 'rgba(255, 255, 255, 0.05)' }
      },
      x: {
        ticks: { color: '#94a3b8' },
        grid: { display: false }
      }
    },
    plugins: {
      legend: { display: false }
    }
  };

  if (loading) return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white font-sans">Chargement des analyses...</div>;

  return (
    <>
      <Navbar />
      <motion.div 
        initial="hidden" animate="visible" variants={containerVariants}
        className="bg-slate-900 min-h-screen p-8 pt-[100px] text-white font-sans relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-slate-900/90 pointer-events-none z-0"></div>
        
        <motion.div variants={itemVariants} className="flex items-center mb-8 relative z-10">
          <div className="bg-white/10 backdrop-blur-md border border-white/10 p-3 rounded-xl mr-4 shadow-lg text-[#cd7329]">
             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-[#cd7329]">Analyses de l'étudiant</h1>
            <p className="text-slate-400">Suivez votre participation aux événements et vos réalisations</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 relative z-10">
          <StatCard title="Événements assistés" value={stats.eventsAttended} sub="Registre d'activité" icon="✅" />
          
          <motion.div variants={itemVariants} className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-lg flex flex-col items-center">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-8 border-white/5"></div>
              <motion.div 
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                className="absolute inset-0 rounded-full border-8 border-[#cd7329] border-t-transparent"
              ></motion.div>
              <span className="text-2xl font-bold text-white">{stats.presenceRate}%</span>
            </div>
            <p className="mt-4 text-slate-400 text-sm font-medium">Taux de présence</p>
          </motion.div>

          <StatCard title="Total des points gagnés" value={stats.totalPoints} sub="Points de récompense" icon="🏆" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 relative z-10">
          <motion.div variants={itemVariants} className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-lg">
            <h2 className="text-xl font-bold text-white mb-6">Répartition des intérêts</h2>
            <div className="h-64 flex justify-center">
              <Doughnut data={doughnutConfig} options={{ plugins: { legend: { display: false } } }} />
            </div>
            <div className="mt-6 space-y-3">
              {stats.interests.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm text-slate-300">
                  <div className="flex items-center">
                    {/* حل مشكلة ألوان المفتاح */}
                    <div className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: CHART_COLORS[idx % CHART_COLORS.length] }}></div>
                    <span>{item.label}</span>
                  </div>
                  <span className="font-bold text-white bg-white/5 px-2 py-1 rounded">{item.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-lg">
            <h2 className="text-xl font-bold text-white mb-6">Participation mensuelle</h2>
            <div className="h-64">
              {/* حل مشكلة الهيستوغرام بزيادة الأوبشنز */}
              <Bar data={barConfig} options={barOptions} />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}