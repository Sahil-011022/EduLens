import { motion } from 'motion/react';
import { 
  STUDENTS_MOCK, 
  ATTENDANCE_DATA_MOCK, 
  barColor 
} from '../constants';
import { cn } from '../lib/utils';

interface AttendanceProps {
  isStudent?: boolean;
}

export default function Attendance({ isStudent }: AttendanceProps) {
  const dates = Object.keys(ATTENDANCE_DATA_MOCK);

  if (isStudent) {
    const me = STUDENTS_MOCK[0]; // Demo: first student
    const attended = dates.filter(d => (ATTENDANCE_DATA_MOCK as any)[d][me.id]);

    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <div className="page-header">
          <h2 className="syne text-3xl font-extrabold text-white">My Attendance</h2>
          <p className="text-sm text-muted-brand">Track your presence and get alerts</p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="card">
            <h3 className="syne mb-6 text-sm font-bold text-white uppercase tracking-wider">Attendance Record</h3>
            <div className="space-y-2">
              {dates.map(d => (
                <div key={d} className="flex items-center justify-between border-b border-white/5 py-2.5 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className={cn("h-2 w-2 rounded-full", (ATTENDANCE_DATA_MOCK as any)[d][me.id] ? "bg-mint" : "bg-red-brand")} />
                    <div className="text-[12px] text-white font-medium">
                      {new Date(d).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}
                    </div>
                  </div>
                  <span className={cn("text-[10px] font-bold uppercase tracking-wider", (ATTENDANCE_DATA_MOCK as any)[d][me.id] ? "text-mint" : "text-red-brand")}>
                    {(ATTENDANCE_DATA_MOCK as any)[d][me.id] ? "Present" : "Absent"}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 border-t border-white/5 pt-4 text-[12px] text-muted-brand">
              Attended {attended.length} of {dates.length} recorded days — {Math.round(attended.length / dates.length * 100)}% recent rate
            </div>
          </div>

          <div className="card">
            <h3 className="syne mb-6 text-sm font-bold text-white uppercase tracking-wider">Attendance Summary</h3>
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="syne text-5xl font-extrabold" style={{ color: barColor(me.attendance) }}>{me.attendance}%</div>
              <div className="mt-2 text-[11px] text-muted-brand uppercase tracking-widest">Overall attendance rate</div>
              <div className="mt-4">
                <span className={cn("pill px-4 py-1.5 text-[11px]", me.attendance < 70 ? "pill-high" : me.attendance < 85 ? "pill-med" : "pill-low")}>
                  {me.attendance < 70 ? "CRITICAL" : me.attendance < 85 ? "WARNING" : "GOOD"}
                </span>
              </div>
            </div>
            <div className="mt-6 rounded-xl bg-blue-brand/5 border border-blue-brand/10 p-4 text-[12px] leading-relaxed">
              <div className="flex gap-3">
                <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-mint animate-pulse" />
                <p>
                  {me.attendance < 85 
                    ? "Your attendance is below the recommended 85% threshold. Missing classes directly impacts your understanding of topics — try to attend all sessions next week."
                    : "Great attendance! Keep it up — consistent presence is strongly linked to better scores."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="page-header">
        <h2 className="syne text-3xl font-extrabold text-white">Attendance Tracking</h2>
        <p className="text-sm text-muted-brand">Daily records and pattern analysis</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card">
          <h3 className="syne mb-6 text-sm font-bold text-white uppercase tracking-wider">Recent Attendance (Last 5 Days)</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[11px]">
              <thead>
                <tr className="mono text-[9px] tracking-widest text-muted-brand uppercase">
                  <th className="pb-3 text-left font-bold">Student</th>
                  {dates.map(d => <th key={d} className="pb-3 text-left font-bold">{d.slice(5)}</th>)}
                  <th className="pb-3 text-left font-bold">Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {STUDENTS_MOCK.map(s => {
                  const rate = Math.round(dates.filter(d => (ATTENDANCE_DATA_MOCK as any)[d][s.id]).length / dates.length * 100);
                  return (
                    <tr key={s.id}>
                      <td className="py-3 font-medium text-white">{s.name.split(' ')[0]}</td>
                      {dates.map(d => (
                        <td key={d} className="py-3">
                          <div className={cn("flex h-5 w-5 items-center justify-center rounded-[4px] font-mono text-[9px] font-bold text-white", (ATTENDANCE_DATA_MOCK as any)[d][s.id] ? "bg-mint/30" : "bg-red-brand/30")}>
                            {(ATTENDANCE_DATA_MOCK as any)[d][s.id] ? "✓" : "✗"}
                          </div>
                        </td>
                      ))}
                      <td className="py-3">
                        <span className="font-mono font-bold" style={{ color: barColor(rate) }}>{rate}%</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card !mb-0">
            <h3 className="syne mb-4 text-sm font-bold text-white uppercase tracking-wider">Low Attendance Alerts</h3>
            <div className="space-y-4">
              {STUDENTS_MOCK.filter(s => s.attendance < 75).map((s, i) => (
                <div key={s.id} className="flex gap-3 border-b border-white/5 pb-4 last:border-0 last:pb-0">
                  <div className="mt-1 h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: s.attendance < 60 ? "var(--red-brand)" : "var(--amber-brand)" }} />
                  <div>
                    <div className="text-[13px] font-bold text-white">{s.name} — {s.attendance}% attendance</div>
                    <div className="mono mt-1 text-[10px] tracking-wider text-muted-brand uppercase">
                      {s.attendance < 60 ? "CRITICAL — below 60% threshold" : "WARNING — below 75% threshold"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card !mb-0">
            <h3 className="syne mb-4 text-sm font-bold text-white uppercase tracking-wider">Overall Attendance Rate</h3>
            <div className="space-y-3">
              {STUDENTS_MOCK.map(s => (
                <div key={s.id} className="flex items-center gap-4">
                  <div className="w-20 text-[10px] text-muted-brand">{s.name.split(' ')[0]}</div>
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/5">
                    <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${s.attendance}%`, backgroundColor: barColor(s.attendance) }} />
                  </div>
                  <div className="w-8 text-right font-mono text-[10px]" style={{ color: barColor(s.attendance) }}>{s.attendance}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
