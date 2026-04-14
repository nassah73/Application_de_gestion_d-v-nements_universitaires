import React, { useRef, useState } from 'react';
import { BarChart3, PieChart, TrendingUp, Download, Sparkles, Loader2 } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const BARS   = [40, 70, 45, 90, 65, 80, 50];
const DAYS   = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
const RETAIN = [
    { label: 'Workshop React', value: 85, color: 'bg-orange-500' },
    { label: 'Conférence IA',  value: 62, color: 'bg-blue-500'   },
    { label: 'Hackathon 2026', value: 40, color: 'bg-emerald-500' },
];
const KPI = [
    { label: 'Total inscriptions', value: '128', sub: '+15.2% ce mois',  accent: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Taux de présence',   value: '82%',  sub: 'Stable',          accent: 'text-blue-600',    bg: 'bg-blue-50'    },
    { label: 'Événements actifs',  value: '05',   sub: '+2 ce mois',      accent: 'text-orange-600',  bg: 'bg-orange-50'  },
    { label: 'Satisfaction moy.',  value: '4.7★', sub: 'Sur 5 étoiles',   accent: 'text-purple-600',  bg: 'bg-purple-50'  },
];

const Stats = () => {
    const reportRef = useRef(null);
    const [exporting, setExporting] = useState(false);

    const exportPDF = async () => {
        if (!reportRef.current || exporting) return;
        setExporting(true);
        try {
            /* Capture the report section */
            const canvas = await html2canvas(reportRef.current, {
                scale: 2,
                backgroundColor: '#ffffff',
                useCORS: true,
                logging: false,
            });

            const imgData  = canvas.toDataURL('image/png');
            const pdf      = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
            const pageW    = pdf.internal.pageSize.getWidth();
            const pageH    = pdf.internal.pageSize.getHeight();
            const imgW     = pageW - 20;          // 10 mm margin each side
            const imgH     = (canvas.height / canvas.width) * imgW;

            /* Header bar */
            pdf.setFillColor(249, 115, 22);       // orange-500
            pdf.rect(0, 0, pageW, 14, 'F');
            pdf.setTextColor(255, 255, 255);
            pdf.setFontSize(11);
            pdf.setFont('helvetica', 'bold');
            pdf.text('UIZ Events — Rapport Statistiques', 10, 9.5);
            pdf.setFontSize(8);
            pdf.text(new Date().toLocaleDateString('fr-FR', { day:'2-digit', month:'long', year:'numeric' }), pageW - 10, 9.5, { align: 'right' });

            /* Content */
            let yOffset = 20;
            if (yOffset + imgH <= pageH - 15) {
                pdf.addImage(imgData, 'PNG', 10, yOffset, imgW, imgH);
            } else {
                /* Multi-page split */
                let remaining = imgH;
                let srcY = 0;
                while (remaining > 0) {
                    const sliceH = Math.min(pageH - yOffset - 10, remaining);
                    const sliceCanvas = document.createElement('canvas');
                    sliceCanvas.width  = canvas.width;
                    sliceCanvas.height = (sliceH / imgW) * canvas.width;
                    const ctx = sliceCanvas.getContext('2d');
                    ctx.drawImage(canvas, 0, srcY * (canvas.width / imgW), canvas.width, sliceCanvas.height, 0, 0, sliceCanvas.width, sliceCanvas.height);
                    pdf.addImage(sliceCanvas.toDataURL('image/png'), 'PNG', 10, yOffset, imgW, sliceH);
                    remaining -= sliceH;
                    srcY      += sliceH;
                    if (remaining > 0) { pdf.addPage(); yOffset = 15; }
                }
            }

            /* Footer */
            pdf.setFontSize(7);
            pdf.setTextColor(160, 160, 160);
            pdf.text('Généré par UIZ Events Organizer Pro', 10, pageH - 6);
            pdf.text(`Page 1`, pageW - 10, pageH - 6, { align: 'right' });

            pdf.save(`rapport-statistiques-${new Date().toISOString().slice(0,10)}.pdf`);
        } catch (err) {
            console.error('PDF export error:', err);
            alert('Erreur lors de l\'export PDF.');
        } finally {
            setExporting(false);
        }
    };

    return (
        <div className="space-y-8 animate-in text-slate-800">

            {/* Toolbar */}
            <div className="flex justify-between items-center">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Sparkles size={14} className="text-orange-500" />
                        <span className="text-orange-500 text-[10px] font-black uppercase tracking-[0.2em]">Analyses</span>
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight">Statistiques</h3>
                    <p className="text-sm text-slate-400 font-medium mt-1">Performances de vos événements en temps réel.</p>
                </div>
                <button
                    onClick={exportPDF}
                    disabled={exporting}
                    className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-black uppercase tracking-widest transition-all shadow-sm
                        ${exporting
                            ? 'bg-slate-100 text-slate-400 cursor-wait'
                            : 'bg-slate-900 text-white hover:bg-orange-500 hover:shadow-lg hover:shadow-orange-200 active:scale-95'}`}
                >
                    {exporting
                        ? <><Loader2 size={16} className="animate-spin" /> Génération…</>
                        : <><Download size={16} /> Exporter PDF</>}
                </button>
            </div>

            {/* ── Report capture zone ── */}
            <div ref={reportRef} className="space-y-8 bg-white p-2 rounded-3xl">

                {/* KPI row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {KPI.map((k, i) => (
                        <div key={i} className={`${k.bg} rounded-[24px] p-5`}>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{k.label}</p>
                            <p className={`text-2xl font-black ${k.accent}`}>{k.value}</p>
                            <p className="text-[10px] text-slate-400 font-bold mt-1">{k.sub}</p>
                        </div>
                    ))}
                </div>

                {/* Bar chart */}
                <div className="org-card h-80 flex flex-col border-none shadow-xl shadow-slate-200/50">
                    <div className="flex items-center gap-2 mb-6">
                        <BarChart3 className="text-orange-500" size={20} />
                        <span className="text-sm font-black uppercase tracking-tight text-slate-900">Courbe des Inscriptions</span>
                    </div>
                    <div className="flex-1 flex items-end justify-around px-4 pb-2">
                        {BARS.map((h, i) => (
                            <div key={i} className="flex flex-col items-center gap-2 flex-1">
                                <span className="text-[10px] font-black text-slate-400">{h * 2}</span>
                                <div
                                    className="w-full max-w-[40px] bg-orange-100 hover:bg-orange-500 rounded-t-xl transition-all duration-300 cursor-help relative group"
                                    style={{ height: `${h}%` }}
                                >
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                        {h * 2} pers.
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="border-t border-slate-100 pt-3 flex justify-around">
                        {DAYS.map(d => <span key={d} className="text-[10px] font-black text-slate-400 uppercase flex-1 text-center">{d}</span>)}
                    </div>
                </div>

                {/* Bottom two cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Pie chart */}
                    <div className="org-card h-64 flex flex-col border-none shadow-xl shadow-slate-200/50">
                        <div className="flex items-center gap-2 mb-6">
                            <PieChart className="text-blue-500" size={20} />
                            <span className="text-sm font-black uppercase tracking-tight text-slate-900">Répartition par Filière</span>
                        </div>
                        <div className="flex-1 flex items-center justify-center gap-8">
                            <div className="relative w-28 h-28">
                                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e2e8f0" strokeWidth="3.5" />
                                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#3b82f6" strokeWidth="3.5" strokeDasharray="40 60" />
                                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#10b981" strokeWidth="3.5" strokeDasharray="35 65" strokeDashoffset="-40" />
                                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f97316" strokeWidth="3.5" strokeDasharray="25 75" strokeDashoffset="-75" />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-xl font-black text-slate-900">120</span>
                                    <span className="text-[9px] uppercase text-slate-400 font-bold">Total</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                {[['Informatique','#3b82f6','40%'],['Sciences','#10b981','35%'],['Gestion','#f97316','25%']].map(([l,c,p]) => (
                                    <div key={l} className="flex items-center gap-2">
                                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: c }} />
                                        <span className="text-[11px] font-bold text-slate-600">{l}</span>
                                        <span className="text-[11px] font-black text-slate-400 ml-auto">{p}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Retention bars */}
                    <div className="org-card h-64 flex flex-col border-none shadow-xl shadow-slate-200/50">
                        <div className="flex items-center gap-2 mb-6">
                            <TrendingUp className="text-purple-500" size={20} />
                            <span className="text-sm font-black uppercase tracking-tight text-slate-900">Taux de Rétention</span>
                        </div>
                        <div className="flex-1 space-y-5">
                            {RETAIN.map((item, i) => (
                                <div key={i} className="space-y-1.5">
                                    <div className="flex justify-between text-xs font-black uppercase">
                                        <span className="text-slate-600">{item.label}</span>
                                        <span className="text-slate-400">{item.value}%</span>
                                    </div>
                                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                                        <div className={`h-full ${item.color} rounded-full transition-all duration-700`} style={{ width: `${item.value}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* ── End capture zone ── */}
        </div>
    );
};

export default Stats;