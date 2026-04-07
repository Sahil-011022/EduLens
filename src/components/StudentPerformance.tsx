import { motion } from 'motion/react';
import { UserProfile } from '../types';
import { 
  STUDENTS_MOCK, 
  avgScore, 
  barColor, 
  avatarColor 
} from '../constants';
import { cn } from '../lib/utils';

interface StudentPerformanceProps {
  user: UserProfile;
}

export default function StudentPerformance({ user }: StudentPerformanceProps) {
  const isStudent = user.role === 'student';
  const me = STUDENTS_MOCK.find(s => s.name.includes(user.displayName.split(' ')[0])) || STUDENTS_MOCK[0];

  if (isStudent) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <div className="page-header">
          <h2 className="syne text-3xl font-extrabold text-white">My Performance</h2>
          <p className="text-sm text-muted-brand">Detailed score breakdown and progress</p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="card lg:col-span-2">
            <h3 className="syne mb-6 text-sm font-bold text-white uppercase tracking-wider">Subject Scores</h3>
            <div className="space-y-8">
              {Object.entries(me.scores).map(([sub, score]) => (
                <div key={sub} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-[13px] font-bold text-white">{sub}</div>
                    <div className="font-mono text-[13px] font-bold" style={{ color: barColor(score as number) }}>{score}%</div>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
                    <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${score}%`, backgroundColor: barColor(score as number) }} />
                  </div>
                  <div className="flex justify-between text-[10px] text-muted-brand">
                    <span>Class Avg: {Math.round(STUDENTS_MOCK.reduce((a, s) => a + (s.scores as any)[sub], 0) / STUDENTS_MOCK.length)}%</span>
                    <span>Rank: #{STUDENTS_MOCK.sort((a, b) => (b.scores as any)[sub] - (a.scores as any)[sub]).findIndex(s => s.id === me.id) + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="card !mb-0">
              <h3 className="syne mb-4 text-sm font-bold text-white uppercase tracking-wider">Overall Mastery</h3>
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-4 border-white/5">
                  <div className="absolute inset-0 rounded-full border-4 border-blue-brand/30 transition-all duration-1000" style={{ clipPath: `inset(${100 - avgScore(me)}% 0 0 0)` }} />
                  <div className="syne text-3xl font-extrabold text-white">{avgScore(me)}%</div>
                </div>
                <div className="mt-4 text-[11px] text-muted-brand uppercase tracking-widest">Aggregate Score</div>
              </div>
            </div>

            <div className="card !mb-0">
              <h3 className="syne mb-4 text-sm font-bold text-white uppercase tracking-wider">Recent Progress</h3>
              <div className="space-y-4">
                {[
                  { test: 'Unit Test 3', sub: 'Math', score: 88, delta: '+5%' },
                  { test: 'Midterm', sub: 'Physics', score: 72, delta: '-2%' },
                  { test: 'Quiz 2', sub: 'English', score: 95, delta: '+10%' },
                ].map((test, i) => (
                  <div key={i} className="flex items-center justify-between border-b border-white/5 pb-3 last:border-0 last:pb-0">
                    <div>
                      <div className="text-[12px] font-bold text-white">{test.test}</div>
                      <div className="text-[10px] text-muted-brand">{test.sub}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[12px] font-bold text-white">{test.score}%</div>
                      <div className={cn("text-[10px] font-bold", test.delta.startsWith('+') ? "text-mint" : "text-red-brand")}>{test.delta}</div>
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

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="page-header">
        <h2 className="syne text-3xl font-extrabold text-white">Student Performance</h2>
        <p className="text-sm text-muted-brand">Comparative analysis and grading overview</p>
      </div>

      <div className="card">
        <h3 className="syne mb-6 text-sm font-bold text-white uppercase tracking-wider">Class Rankings</h3>
        <div className="space-y-4">
          {STUDENTS_MOCK.sort((a, b) => avgScore(b) - avgScore(a)).map((s, i) => (
            <div key={s.id} className="flex items-center gap-4 rounded-xl bg-white/[0.02] border border-white/5 p-4 transition-all hover:bg-white/[0.04]">
              <div className="mono w-6 text-[11px] font-bold text-muted-brand">#{i + 1}</div>
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ backgroundColor: avatarColor(i) }}>
                {s.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1">
                <div className="text-[13px] font-bold text-white">{s.name}</div>
                <div className="text-[10px] text-muted-brand">{s.grade}</div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="text-[10px] text-muted-brand uppercase tracking-widest">Avg Score</div>
                  <div className="syne text-[15px] font-bold text-white">{avgScore(s)}%</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-muted-brand uppercase tracking-widest">Attendance</div>
                  <div className="syne text-[15px] font-bold text-white">{s.attendance}%</div>
                </div>
                <div className="h-8 w-1.5 rounded-full" style={{ backgroundColor: barColor(avgScore(s)) }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
