import { motion } from 'motion/react';
import { 
  STUDENTS_MOCK, 
  riskScore, 
  avgScore, 
  barColor, 
  avatarColor 
} from '../constants';
import { cn } from '../lib/utils';

export default function RiskDetection() {
  const atRisk = STUDENTS_MOCK.filter(s => riskScore(s).level !== "LOW")
    .sort((a, b) => {
      const rA = riskScore(a).score;
      const rB = riskScore(b).score;
      return rB - rA;
    });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="page-header">
        <h2 className="syne text-3xl font-extrabold text-white">Risk Detection</h2>
        <p className="text-sm text-muted-brand">AI-driven early warning system for student failure</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="card lg:col-span-2">
          <h3 className="syne mb-6 text-sm font-bold text-white uppercase tracking-wider">Flagged Students</h3>
          <div className="space-y-4">
            {atRisk.map((s, i) => {
              const r = riskScore(s);
              const avg = avgScore(s);
              return (
                <div key={s.id} className="rounded-2xl bg-white/[0.02] border border-white/5 p-5 transition-all hover:bg-white/[0.04]">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-white" style={{ backgroundColor: avatarColor(i) }}>
                        {s.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="text-[15px] font-bold text-white">{s.name}</div>
                        <div className="text-[11px] text-muted-brand">{s.grade} · {avg}% avg score</div>
                      </div>
                    </div>
                    <span className={cn("pill px-4 py-1.5 text-[11px]", r.level === "HIGH" ? "pill-high" : "pill-med")}>
                      {r.level} RISK ({r.score}%)
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="rounded-xl bg-white/5 p-3">
                      <div className="mono text-[8px] font-bold tracking-widest text-muted-brand uppercase">Attendance</div>
                      <div className="mt-1 flex items-center justify-between">
                        <span className="font-syne text-sm font-bold text-white">{s.attendance}%</span>
                        <span className={cn("text-[9px] font-bold", s.attendance < 70 ? "text-red-brand" : "text-amber-brand")}>
                          {s.attendance < 70 ? "CRITICAL" : "LOW"}
                        </span>
                      </div>
                    </div>
                    <div className="rounded-xl bg-white/5 p-3">
                      <div className="mono text-[8px] font-bold tracking-widest text-muted-brand uppercase">Submissions</div>
                      <div className="mt-1 flex items-center justify-between">
                        <span className="font-syne text-sm font-bold text-white">{s.submissions}%</span>
                        <span className={cn("text-[9px] font-bold", s.submissions < 60 ? "text-red-brand" : "text-amber-brand")}>
                          {s.submissions < 60 ? "CRITICAL" : "LOW"}
                        </span>
                      </div>
                    </div>
                    <div className="rounded-xl bg-white/5 p-3">
                      <div className="mono text-[8px] font-bold tracking-widest text-muted-brand uppercase">Learning Gaps</div>
                      <div className="mt-1 flex items-center justify-between">
                        <span className="font-syne text-sm font-bold text-white">{Object.values(s.topicScores).filter(v => (v as number) < 60).length} topics</span>
                        <span className="text-[9px] font-bold text-amber-brand">FLAGGED</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-3 rounded-xl bg-blue-brand/5 border border-blue-brand/10 p-3 text-[11px] leading-relaxed">
                    <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-mint animate-pulse" />
                    <p><strong className="text-white">AI Insight:</strong> {s.name} shows a pattern of declining attendance and low mastery in {Object.entries(s.topicScores).sort((a: any, b: any) => a[1] - b[1])[0][0]}. Recommend 1:1 intervention.</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          <div className="card !mb-0">
            <h3 className="syne mb-6 text-sm font-bold text-white uppercase tracking-wider">Risk Distribution</h3>
            <div className="space-y-6">
              {[
                { label: 'High Risk', count: STUDENTS_MOCK.filter(s => riskScore(s).level === "HIGH").length, color: 'var(--red-brand)' },
                { label: 'Medium Risk', count: STUDENTS_MOCK.filter(s => riskScore(s).level === "MED").length, color: 'var(--amber-brand)' },
                { label: 'Low Risk', count: STUDENTS_MOCK.filter(s => riskScore(s).level === "LOW").length, color: 'var(--mint)' },
              ].map((item, i) => (
                <div key={i}>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-[11px] font-medium text-muted-brand">{item.label}</span>
                    <span className="text-[11px] font-bold text-white">{item.count} students</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                    <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${(item.count / STUDENTS_MOCK.length) * 100}%`, backgroundColor: item.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card !mb-0">
            <h3 className="syne mb-4 text-sm font-bold text-white uppercase tracking-wider">AI Intervention Log</h3>
            <div className="space-y-4">
              {[
                { student: 'Rohan Kumar', action: 'Email sent to parents', date: '2h ago' },
                { student: 'Arjun M.', action: '1:1 Session scheduled', date: '5h ago' },
                { student: 'Sara K.', action: 'Revision plan generated', date: 'Yesterday' },
              ].map((log, i) => (
                <div key={i} className="flex items-start gap-3 border-b border-white/5 pb-3 last:border-0 last:pb-0">
                  <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-brand" />
                  <div>
                    <div className="text-[12px] font-bold text-white">{log.student}</div>
                    <div className="text-[10px] text-muted-brand">{log.action}</div>
                    <div className="mt-1 text-[9px] text-muted-brand opacity-60">{log.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
