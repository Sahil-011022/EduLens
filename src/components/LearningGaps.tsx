import { motion } from 'motion/react';
import { 
  STUDENTS_MOCK, 
  barColor, 
  masteryLabel, 
  masteryText 
} from '../constants';
import { cn } from '../lib/utils';

interface LearningGapsProps {
  isStudent?: boolean;
}

export default function LearningGaps({ isStudent }: LearningGapsProps) {
  const topics = Object.keys(STUDENTS_MOCK[0].topicScores);
  const classAvg = topics.map(t => ({
    t,
    avg: Math.round(STUDENTS_MOCK.reduce((a, s) => a + (s.topicScores as any)[t], 0) / STUDENTS_MOCK.length)
  }));

  if (isStudent) {
    const me = STUDENTS_MOCK[0]; // Demo: first student
    const weakTopics = Object.entries(me.topicScores)
      .filter(([, v]) => (v as number) < 65)
      .sort((a: any, b: any) => a[1] - b[1]);

    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <div className="page-header">
          <h2 className="syne text-3xl font-extrabold text-white">My Learning Gaps</h2>
          <p className="text-sm text-muted-brand">Personalised analysis of where you need to improve</p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="card">
            <h3 className="syne mb-6 text-sm font-bold text-white uppercase tracking-wider">Topics Needing Work</h3>
            <div className="space-y-6">
              {weakTopics.map(([t, score]) => (
                <div key={t} className="rounded-xl bg-white/[0.02] border border-white/5 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="text-[13px] font-bold text-white">{t}</div>
                    <span className={cn("pill", masteryLabel(score as number))}>{masteryText(score as number)}</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                    <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${score}%`, backgroundColor: barColor(score as number) }} />
                  </div>
                  <div className="mt-2 text-[10px] text-muted-brand">
                    {(score as number) < 50 ? "Needs fundamental revision" : "Practice with mixed problem sets"}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="card !mb-0">
              <h3 className="syne mb-4 text-sm font-bold text-white uppercase tracking-wider">AI Study Plan for You</h3>
              <div className="space-y-4">
                {weakTopics.slice(0, 3).map(([t, score]) => (
                  <div key={t} className="flex gap-3 rounded-xl bg-blue-brand/5 border border-blue-brand/10 p-4 text-[12px] leading-relaxed">
                    <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-mint animate-pulse" />
                    <p><strong className="text-white">{t}</strong> ({score}%) — {(score as number) < 50 ? "Start with basics: textbook Chapter 1-3, then 10 problems/day" : "Practice 15 mixed problems/day, focus on application questions"}</p>
                  </div>
                ))}
                <div className="rounded-xl bg-mint/5 border border-mint/10 p-4">
                  <div className="mb-2 text-[11px] font-bold text-mint uppercase tracking-wider">Suggested weekly plan</div>
                  <div className="text-[10px] leading-relaxed text-muted-brand">
                    Mon: {weakTopics[0]?.[0] || "Review"} basics<br/>
                    Tue-Wed: Practice problems<br/>
                    Thu: Mock test<br/>
                    Fri: Review mistakes
                  </div>
                </div>
              </div>
            </div>

            <div className="card !mb-0">
              <h3 className="syne mb-4 text-sm font-bold text-white uppercase tracking-wider">Strengths to Maintain</h3>
              <div className="space-y-2">
                {Object.entries(me.topicScores).filter(([, v]) => (v as number) >= 75).map(([t, score]) => (
                  <div key={t} className="flex items-center justify-between border-b border-white/5 py-2 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-mint" />
                      <div className="text-[12px] text-white">{t}</div>
                    </div>
                    <span className="font-mono text-[11px] font-bold text-mint">{score}%</span>
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
        <h2 className="syne text-3xl font-extrabold text-white">Learning Gaps</h2>
        <p className="text-sm text-muted-brand">Topic-level mastery analysis across all students</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card">
          <h3 className="syne mb-6 text-sm font-bold text-white uppercase tracking-wider">Class-wide Topic Mastery</h3>
          <div className="space-y-4">
            {classAvg.sort((a, b) => a.avg - b.avg).map(({ t, avg }) => (
              <div key={t} className="flex items-center gap-4">
                <div className="w-24 text-[10px] text-muted-brand">{t}</div>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/5">
                  <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${avg}%`, backgroundColor: barColor(avg) }} />
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 text-right font-mono text-[10px]" style={{ color: barColor(avg) }}>{avg}%</div>
                  <span className={cn("pill !text-[8px]", masteryLabel(avg))}>{masteryText(avg)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="card !mb-0">
            <h3 className="syne mb-4 text-sm font-bold text-white uppercase tracking-wider">AI Recommendations</h3>
            <div className="space-y-4">
              {classAvg.sort((a, b) => a.avg - b.avg).slice(0, 3).map(({ t, avg }) => (
                <div key={t} className="flex gap-3 rounded-xl bg-blue-brand/5 border border-blue-brand/10 p-4 text-[12px] leading-relaxed">
                  <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-mint animate-pulse" />
                  <p><strong className="text-white">{t}</strong> ({avg}%) — {avg < 55 ? "Reteach fundamentals. Consider group problem-solving sessions." : avg < 70 ? "Provide targeted worksheets and peer study groups." : "Monitor for consistency in upcoming tests."}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 text-[11px] text-muted-brand">Per-student gap maps below</div>
          </div>

          <div className="card !mb-0 overflow-hidden">
            <h3 className="syne mb-4 text-sm font-bold text-white uppercase tracking-wider">Student Gap Heatmap</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-[9px]">
                <thead>
                  <tr>
                    <th className="pb-2 text-left font-bold text-muted-brand uppercase">Student</th>
                    {topics.slice(0, 5).map(t => <th key={t} className="pb-2 text-left font-bold text-muted-brand uppercase">{t.slice(0, 4)}</th>)}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {STUDENTS_MOCK.map(s => (
                    <tr key={s.id}>
                      <td className="py-2 text-[10px] font-medium text-white">{s.name.split(' ')[0]}</td>
                      {topics.slice(0, 5).map(t => (
                        <td key={t} className="py-2">
                          <div className="flex h-5 w-8 items-center justify-center rounded-[4px] font-mono text-[9px] font-bold text-white opacity-70" style={{ backgroundColor: barColor((s.topicScores as any)[t]) }}>
                            {(s.topicScores as any)[t]}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
