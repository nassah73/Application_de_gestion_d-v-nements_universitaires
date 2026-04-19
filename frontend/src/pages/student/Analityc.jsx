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

// 1. تسجيل المكونات (هادا كيكون برا ديما)
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

// 2. مكون الـ StatCard (عرفو برا باش تقدر تخدم بيه)
const StatCard = ({ title, value, sub, icon }) => (
  <div className="bg-[#0d1425] p-6 rounded-2xl border border-gray-800 relative overflow-hidden">
    <div className="text-blue-500 text-2xl mb-4">{icon}</div>
    <div className="text-4xl font-bold mb-1">{value}</div>
    <div className="text-gray-400 text-sm">{title}</div>
    <div className="mt-4 text-green-500 text-xs flex items-center">
      <span>{sub}</span>
    </div>
  </div>
);

export default function Main() {
  // --- الداتا الـ Dynamic ---
  const interestsData = [
    { label: 'Academic', value: 40, color: '#3b82f6' },
    { label: 'Sports', value: 30, color: '#f59e0b' },
    { label: 'Cultural', value: 30, color: '#a855f7' },
  ];

  const monthlyData = [
    { month: 'Sep', count: 3 },
    { month: 'Oct', count: 5 },
    { month: 'Nov', count: 4 },
    { month: 'Dec', count: 2 },
    { month: 'Jan', count: 3 },
    { month: 'Feb', count: 4 },
    { month: 'Mar', count: 3 },
  ];

  // --- إعدادات المبيانات ---
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
      backgroundColor: '#3b82f6',
      borderRadius: 5,
    }]
  };

  return (
    <>
      <Navbar />
      <div className="bg-[#050b18] min-h-screen p-8 text-white font-sans">
        {/* Header */}
        <div className="flex items-center mb-8">
          <div className="bg-blue-600 p-3 rounded-xl mr-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold">Student Analytics</h1>
            <p className="text-gray-400">Track your event participation and achievements</p>
          </div>
        </div>

       
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard title="Events Attended" value="24" sub="+12% from last semester" icon="✅" />
          <div className="bg-[#0d1425] p-6 rounded-2xl border border-gray-800 flex flex-col items-center">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-8 border-blue-500 opacity-20"></div>
              <div className="absolute inset-0 rounded-full border-8 border-blue-500 border-t-transparent animate-spin-slow"></div>
              <span className="text-2xl font-bold">92%</span>
            </div>
            <p className="mt-4 text-gray-400 text-sm">Presence Rate</p>
            <p className="text-yellow-500 font-bold">Excellent Performance!</p>
          </div>
          <StatCard title="Total Points Earned" value="1840" sub="Top 15% of students" icon="🏆" />
        </div>

       
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-[#0d1425] p-6 rounded-2xl border border-gray-800">
            <h2 className="text-xl font-semibold mb-6">Interests Distribution</h2>
            <div className="h-64 flex justify-center">
              <Doughnut data={doughnutConfig} options={{ plugins: { legend: { display: false } } ,   animation: {
                      duration: 2000, 
                    }}} />
            </div>
            <div className="mt-6 space-y-2">
              {interestsData.map(item => (
                <div key={item.label} className="flex justify-between text-sm">
                  <span className="flex items-center">
                    <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></span>
                    {item.label}
                  </span>
                  <span>{item.value}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0d1425] p-6 rounded-2xl border border-gray-800">
            <h2 className="text-xl font-semibold mb-6">Monthly Participation</h2>
            <div className="h-64">
              <Bar data={barConfig} options={{
                animation: {
                          duration: 2000, 
                    },
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: { grid: { color: '#1e293b' }, ticks: { color: '#94a3b8' } },
                  x: { grid: { display: false }, ticks: { color: '#94a3b8' } }
                }
              }} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}