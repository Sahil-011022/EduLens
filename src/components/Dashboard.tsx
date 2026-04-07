import { motion } from 'motion/react';
import { UserProfile } from '../types';
import { 
  STUDENTS_MOCK, 
  riskScore, 
  avgScore, 
  barColor, 
  avatarColor, 
} from '../constants';
import { cn } from '../lib/utils';

interface DashboardProps {
  user: UserProfile;
}

export default function Dashboard({ user }: DashboardProps) {
  const total = STUDENTS_MOCK.length;
  const atRisk = STUDENTS_MOCK.filter(s => riskScore(s).level === "HIGH").length;
  const avgPerf = Math.round(STUDENTS_MOCK.reduce((a, s) => a + avgScore(s), 0) / total);
  const avgAtt = Math.round(STUDENTS_MOCK.reduce((a, s) => a + s.attendance, 0) / total);
  
  const subjects = ["Math", "Physics", "English", "Chemistry", "History"];
  const subjectGaps = subjects.map(sub => ({
    sub,
    gap: Math.round(STUDENTS_MOCK.filter(s => (s.scores as any)[sub] < 60).length / total * 100)
  })).sort((a, b) => b.gap - a.gap);

  const topicAvg = Object.keys(STUDENTS_MOCK[0].topicScores).map(t => ({
    t,
    avg: Math.round(STUDENTS_MOCK.reduce((a, s) => a + (s.topicScores as any)[t], 0) / total)
  })).sort((a, b) => a.avg - b.avg);
  
  const weakTopic = topicAvg[0];

  if (user.role === 'student') {
    const me = STUDENTS_MOCK.find(s => s.name.includes(user.displayName.split(' ')[0])) || STUDENTS_MOCK[0];
    const r = riskScore(me);
    const topics = Object.entries(me.topicScores).sort((a: any, b: any) => a[1] - b[1]);

    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <div className="page-header">
          <h2 className="syne text-3xl font-extrabold text-white">My Dashboard</h2>
          <p className="text-sm text-muted-brand">Your academic overview · {user.displayName}</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="card !mb-0">
            <div className="mono mb-2 text-[9px] font-bold tracking-widest text-muted-brand uppercase">My Avg Score</div>
            <div className="syne text-3xl font-extrabold text-blue-brand">{avgScore(me)}%</div>
            <div className="mt-1 text-[10px] text-muted-brand">Across all subjects</div>
          </div>
          <div className="card !mb-0">
            <div className="mono mb-2 text-[9px] font-bold tracking-widest text-muted-brand uppercase">Attendance</div>
            <div className={cn("syne text-3xl font-extrabold", me.attendance < 70 ? "text-red-brand" : "text-mint")}>
              {me.attendance}%
            </div>
            <div className="mt-1 text-[10px] text-muted-brand">{me.attendance < 70 ? "Below threshold" : "Good standing"}</div>
          </div>
          <div className="card !mb-0">
            <div className="mono mb-2 text-[9px] font-bold tracking-widest text-muted-brand uppercase">Submissions</div>
            <div className="syne text-3xl font-extrabold text-white">{me.submissions}%</div>
            <div className="mt-1 text-[10px] text-muted-brand">Assignment completion</div>
          </div>
          <div className="card !mb-0">
            <div className="mono mb-2 text-[9px] font-bold tracking-widest text-muted-brand uppercase">Risk Level</div>
            <div className="mt-1">
              <span className={cn("pill px-3 py-1 text-[10px]", r.level === "HIGH" ? "pill-high" : r.level === "MED" ? "pill-med" : "pill-low")}>
                {r.level} RISK
              </span>
            </div>
            <div className="mt-1 text-[10px] text-muted-brand">Overall assessment</div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="card lg:col-span-2">
            <h3 className="syne mb-6 text-sm font-bold text-white uppercase tracking-wider">Subject Performance</h3>
            <div className="space-y-4">
              {Object.entries(me.scores).map(([sub, score]) => (
                <div key={sub} className="flex items-center gap-4">
                  <div className="w-24 text-[11px] text-muted-brand">{sub}</div>
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/5">
                    <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${score}%`, backgroundColor: barColor(score as number) }} />
                  </div>
                  <div className="w-10 text-right text-[11px] font-mono" style={{ color: barColor(score as number) }}>{score}%</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="card !mb-0">
              <h3 className="syne mb-4 text-sm font-bold text-white uppercase tracking-wider">My Weak Topics</h3>
              <div className="space-y-3">
                {topics.slice(0, 4).map(([t, score]) => (
                  <div key={t} className="flex items-center gap-3 border-b border-white/5 pb-3 last:border-0">
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: barColor(score as number) }} />
                    <div className="flex-1">
                      <div className="text-[12px] font-medium text-white">{t}</div>
                      <div className="text-[10px] text-muted-brand">{score}% · {score as number >= 55 ? "Developing" : "Needs Work"}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card !mb-0 bg-blue-brand/5 border-blue-brand/10">
              <h3 className="syne mb-4 text-sm font-bold text-white uppercase tracking-wider">AI Study Plan</h3>
              <div className="space-y-3">
                <div className="flex gap-3 text-[12px] leading-relaxed">
                  <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-mint animate-pulse" />
                  <p>Focus on <strong className="text-white">{topics[0][0]}</strong> — do 20 mixed problems/day for 2 weeks</p>
                </div>
                <div className="flex gap-3 text-[12px] leading-relaxed">
                  <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-mint animate-pulse" />
                  <p>You're improving in <strong className="text-white">{Object.entries(me.scores).sort((a: any, b: any) => b[1] - a[1])[0][0]}</strong> — keep momentum</p>
                </div>
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
        <h2 className="syne text-3xl font-extrabold text-white">Welcome back, {user.displayName.split(' ')[0]} 👋</h2>
        <p className="text-sm text-muted-brand">Here's what's happening with your students today · {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card !mb-0">
          <div className="mono mb-2 text-[9px] font-bold tracking-widest text-muted-brand uppercase">Total Students</div>
          <div className="syne text-3xl font-extrabold text-white">{total}</div>
          <div className="mt-1 text-[10px] text-muted-brand">Spring 2026</div>
        </div>
        <div className="card !mb-0">
          <div className="mono mb-2 text-[9px] font-bold tracking-widest text-muted-brand uppercase">At-Risk</div>
          <div className="syne text-3xl font-extrabold text-red-brand">{atRisk}</div>
          <div className="mt-1 text-[10px] text-muted-brand">Need immediate action</div>
        </div>
        <div className="card !mb-0">
          <div className="mono mb-2 text-[9px] font-bold tracking-widest text-muted-brand uppercase">Avg Score</div>
          <div className="syne text-3xl font-extrabold text-blue-brand">{avgPerf}%</div>
          <div className="mt-1 text-[10px] text-muted-brand">All subjects combined</div>
        </div>
        <div className="card !mb-0">
          <div className="mono mb-2 text-[9px] font-bold tracking-widest text-muted-brand uppercase">Attendance</div>
          <div className="syne text-3xl font-extrabold text-mint">{avgAtt}%</div>
          <div className="mt-1 text-[10px] text-muted-brand">This week</div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="card lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="syne text-sm font-bold text-white uppercase tracking-wider">Subject-wise Learning Gaps</h3>
            <span className="pill pill-low border border-mint/20">AI Detected</span>
          </div>
          <div className="space-y-4">
            {subjectGaps.map(({ sub, gap }) => (
              <div key={sub} className="flex items-center gap-4">
                <div className="w-24 text-[11px] text-muted-brand">{sub}</div>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/5">
                  <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${gap}%`, backgroundColor: barColor(100 - gap) }} />
                </div>
                <div className="w-10 text-right text-[11px] font-mono" style={{ color: barColor(100 - gap) }}>{gap}%</div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-[10px] text-muted-brand">% students scoring below 60</div>
          
          <div className="mt-8 border-t border-white/5 pt-6">
            <h4 className="syne mb-4 text-xs font-bold text-white uppercase tracking-widest">🧠 AI Quick Insights</h4>
            <div className="space-y-3">
              <div className="flex gap-3 rounded-xl bg-blue-brand/5 border border-blue-brand/10 p-4 text-[12px] leading-relaxed">
                <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-mint animate-pulse" />
                <p><strong className="text-white">{weakTopic.t}</strong> has the lowest class mastery at {weakTopic.avg}% — {STUDENTS_MOCK.filter(s => (s.topicScores as any)[weakTopic.t] < 55).length} students need focused revision</p>
              </div>
              <div className="flex gap-3 rounded-xl bg-blue-brand/5 border border-blue-brand/10 p-4 text-[12px] leading-relaxed">
                <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-mint animate-pulse" />
                <p><strong className="text-white">{atRisk} students</strong> show low mastery + low attendance — prioritize 1:1 intervention sessions</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card !mb-0">
            <h3 className="syne mb-4 text-sm font-bold text-white uppercase tracking-wider">⚠ At-Risk Students</h3>
            <div className="space-y-3">
              {STUDENTS_MOCK.filter(s => riskScore(s).level !== "LOW").slice(0, 5).map((s, i) => (
                <div key={s.id} className="flex items-center gap-3 border-b border-white/5 pb-3 last:border-0">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ backgroundColor: avatarColor(i) }}>
                    {s.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <div className="truncate text-[12px] font-medium text-white">{s.name}</div>
                    <div className="text-[10px] text-muted-brand">{avgScore(s)}% avg · {s.attendance}% att</div>
                  </div>
                  <span className={cn("pill", riskScore(s).level === "HIGH" ? "pill-high" : "pill-med")}>
                    {riskScore(s).level}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="card !mb-0">
            <h3 className="syne mb-4 text-sm font-bold text-white uppercase tracking-wider">Weekly Attendance</h3>
            <div className="flex h-20 items-end gap-2">
              {[{ d: "Mon", v: 88 }, { d: "Tue", v: 92 }, { d: "Wed", v: 75 }, { d: "Thu", v: 83 }, { d: "Fri", v: 65 }].map(({ d, v }) => (
                <div key={d} className="flex flex-1 flex-col items-center gap-2">
                  <div className="w-full rounded-t-sm transition-all duration-1000" style={{ height: `${v * 0.6}px`, backgroundColor: v < 75 ? "var(--red-brand)" : "var(--blue-brand)" }} />
                  <div className="text-[9px] text-muted-brand">{d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
