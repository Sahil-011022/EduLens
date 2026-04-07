import { motion } from 'motion/react';
import { 
  STUDENTS_MOCK, 
  riskScore, 
  avgScore, 
  barColor, 
  avatarColor, 
  weakSubject 
} from '../constants';
import { cn } from '../lib/utils';

export default function Students() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="page-header">
        <h2 className="syne text-3xl font-extrabold text-white">Students</h2>
        <p className="text-sm text-muted-brand">Full class performance overview</p>
      </div>
      
      <div className="card">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="syne text-sm font-bold text-white uppercase tracking-wider">All Students</h3>
          <span className="text-[11px] font-medium text-muted-brand">{STUDENTS_MOCK.length} enrolled</span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr className="mono text-[9px] tracking-widest text-muted-brand uppercase">
                <th className="border-b border-white/10 pb-3 text-left font-bold">Student</th>
                <th className="border-b border-white/10 pb-3 text-left font-bold">Grade</th>
                <th className="border-b border-white/10 pb-3 text-left font-bold">Math</th>
                <th className="border-b border-white/10 pb-3 text-left font-bold">Physics</th>
                <th className="border-b border-white/10 pb-3 text-left font-bold">English</th>
                <th className="border-b border-white/10 pb-3 text-left font-bold">Chem</th>
                <th className="border-b border-white/10 pb-3 text-left font-bold">Avg</th>
                <th className="border-b border-white/10 pb-3 text-left font-bold">Att.</th>
                <th className="border-b border-white/10 pb-3 text-left font-bold">Weak Topic</th>
                <th className="border-b border-white/10 pb-3 text-left font-bold">Risk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {STUDENTS_MOCK.map((s, i) => {
                const r = riskScore(s);
                const avg = avgScore(s);
                return (
                  <tr key={s.id} className="group hover:bg-white/[0.02]">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ backgroundColor: avatarColor(i) }}>
                          {s.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="font-medium text-white">{s.name}</span>
                      </div>
                    </td>
                    <td className="py-4 text-muted-brand">{s.grade}</td>
                    <td className="py-4 font-mono font-bold" style={{ color: barColor(s.scores.Math) }}>{s.scores.Math}%</td>
                    <td className="py-4 font-mono font-bold" style={{ color: barColor(s.scores.Physics) }}>{s.scores.Physics}%</td>
                    <td className="py-4 font-mono font-bold" style={{ color: barColor(s.scores.English) }}>{s.scores.English}%</td>
                    <td className="py-4 font-mono font-bold" style={{ color: barColor(s.scores.Chemistry) }}>{s.scores.Chemistry}%</td>
                    <td className="py-4 font-bold text-white">{avg}%</td>
                    <td className="py-4 font-mono" style={{ color: barColor(s.attendance) }}>{s.attendance}%</td>
                    <td className="py-4 text-[10px] text-amber-brand">{weakSubject(s)}</td>
                    <td className="py-4">
                      <span className={cn("pill", r.level === "HIGH" ? "pill-high" : r.level === "MED" ? "pill-med" : "pill-low")}>
                        {r.level}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
