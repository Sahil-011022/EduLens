import { motion } from 'motion/react';
import { FileText, Download, Filter } from 'lucide-react';

export default function Reports() {
  const reports = [
    { title: 'Monthly Class Performance', type: 'Academic', date: 'Mar 2026', format: 'PDF', size: '2.4 MB' },
    { title: 'Attendance Summary - Term 1', type: 'Attendance', date: 'Feb 2026', format: 'Excel', size: '1.1 MB' },
    { title: 'AI Risk Assessment Report', type: 'AI Insights', date: 'Mar 15, 2026', format: 'PDF', size: '4.8 MB' },
    { title: 'Student Learning Gap Analysis', type: 'Academic', date: 'Mar 10, 2026', format: 'PDF', size: '3.2 MB' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="page-header">
        <h2 className="syne text-3xl font-extrabold text-white">Reports</h2>
        <p className="text-sm text-muted-brand">Generate and download detailed academic reports</p>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-[12px] font-bold text-white transition-all hover:bg-white/10">
            <Filter className="h-4 w-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-[12px] font-bold text-white transition-all hover:bg-white/10">
            All Types
          </button>
        </div>
        <button className="btn btn-primary px-6 py-2 text-[12px] font-bold uppercase tracking-wider">
          Generate New Report
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reports.map((report, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="card group relative overflow-hidden p-6"
          >
            <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 translate-y-[-8px] opacity-[0.03] transition-transform group-hover:scale-110">
              <FileText className="h-full w-full" />
            </div>
            
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-brand/10">
              <FileText className="h-5 w-5 text-blue-brand" />
            </div>
            
            <h3 className="syne text-[15px] font-bold text-white">{report.title}</h3>
            <div className="mt-2 flex items-center gap-3 text-[11px] text-muted-brand">
              <span>{report.type}</span>
              <span className="h-1 w-1 rounded-full bg-white/20" />
              <span>{report.date}</span>
            </div>
            
            <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
              <span className="mono text-[10px] font-bold text-muted-brand uppercase">{report.format} · {report.size}</span>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-white transition-all hover:bg-blue-brand hover:text-bg">
                <Download className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
