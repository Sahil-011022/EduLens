import { motion } from 'motion/react';
import { UserProfile } from '../types';
import { 
  STUDENTS_MOCK, 
  barColor, 
  avatarColor 
} from '../constants';
import { cn } from '../lib/utils';
import { FileText, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

interface AssignmentsProps {
  user: UserProfile;
}

export default function Assignments({ user }: AssignmentsProps) {
  const isStudent = user.role === 'student';
  const me = STUDENTS_MOCK.find(s => s.name.includes(user.displayName.split(' ')[0])) || STUDENTS_MOCK[0];

  const assignments = [
    { id: 1, title: 'Calculus Problem Set 3', sub: 'Math', dueDate: 'Mar 25, 2026', status: 'Pending', color: 'text-amber-brand', bg: 'bg-amber-brand/10' },
    { id: 2, title: 'Thermodynamics Lab Report', sub: 'Physics', dueDate: 'Mar 28, 2026', status: 'Submitted', color: 'text-mint', bg: 'bg-mint/10' },
    { id: 3, title: 'Shakespeare Essay', sub: 'English', dueDate: 'Apr 02, 2026', status: 'Pending', color: 'text-blue-brand', bg: 'bg-blue-brand/10' },
    { id: 4, title: 'Organic Chemistry Quiz', sub: 'Chemistry', dueDate: 'Apr 05, 2026', status: 'Upcoming', color: 'text-muted-brand', bg: 'bg-white/5' },
  ];

  if (isStudent) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <div className="page-header">
          <h2 className="syne text-3xl font-extrabold text-white">My Assignments</h2>
          <p className="text-sm text-muted-brand">Submit and track your coursework</p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="card lg:col-span-2">
            <h3 className="syne mb-6 text-sm font-bold text-white uppercase tracking-wider">Current Assignments</h3>
            <div className="space-y-4">
              {assignments.map((a) => (
                <div key={a.id} className="flex items-center gap-4 rounded-2xl bg-white/[0.02] border border-white/5 p-5 transition-all hover:bg-white/[0.04]">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${a.bg}`}>
                    <FileText className={`h-5 w-5 ${a.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="text-[15px] font-bold text-white">{a.title}</div>
                    <div className="text-[11px] text-muted-brand">{a.sub} · Due {a.dueDate}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={cn("pill px-3 py-1 text-[10px]", a.status === 'Submitted' ? "pill-low" : a.status === 'Pending' ? "pill-med" : "pill-low opacity-50")}>
                      {a.status}
                    </span>
                    <button className="btn btn-primary px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider">
                      {a.status === 'Submitted' ? 'View' : 'Submit'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="card !mb-0">
              <h3 className="syne mb-4 text-sm font-bold text-white uppercase tracking-wider">Submission Stats</h3>
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <div className="syne text-5xl font-extrabold text-white">{me.submissions}%</div>
                <div className="mt-2 text-[11px] text-muted-brand uppercase tracking-widest">Completion rate</div>
                <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                  <div className="h-full rounded-full bg-mint transition-all duration-1000" style={{ width: `${me.submissions}%` }} />
                </div>
              </div>
            </div>

            <div className="card !mb-0">
              <h3 className="syne mb-4 text-sm font-bold text-white uppercase tracking-wider">Recent Feedback</h3>
              <div className="space-y-4">
                {[
                  { title: 'Algebra Quiz', score: '92/100', feedback: 'Excellent work on quadratic equations.' },
                  { title: 'History Essay', score: '78/100', feedback: 'Good analysis, but needs more citations.' },
                ].map((f, i) => (
                  <div key={i} className="border-b border-white/5 pb-3 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between">
                      <div className="text-[12px] font-bold text-white">{f.title}</div>
                      <div className="text-[12px] font-bold text-mint">{f.score}</div>
                    </div>
                    <p className="mt-1 text-[10px] italic text-muted-brand">"{f.feedback}"</p>
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
        <h2 className="syne text-3xl font-extrabold text-white">Assignments Management</h2>
        <p className="text-sm text-muted-brand">Create and grade student assignments</p>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-[12px] font-bold text-white transition-all hover:bg-white/10">
            All Subjects
          </button>
          <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-[12px] font-bold text-white transition-all hover:bg-white/10">
            Active
          </button>
        </div>
        <button className="btn btn-primary px-6 py-2 text-[12px] font-bold uppercase tracking-wider">
          Create Assignment
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="card lg:col-span-2">
          <h3 className="syne mb-6 text-sm font-bold text-white uppercase tracking-wider">Active Assignments</h3>
          <div className="space-y-4">
            {assignments.map((a) => (
              <div key={a.id} className="flex items-center gap-4 rounded-2xl bg-white/[0.02] border border-white/5 p-5 transition-all hover:bg-white/[0.04]">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${a.bg}`}>
                  <FileText className={`h-5 w-5 ${a.color}`} />
                </div>
                <div className="flex-1">
                  <div className="text-[15px] font-bold text-white">{a.title}</div>
                  <div className="text-[11px] text-muted-brand">{a.sub} · Due {a.dueDate}</div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-[10px] text-muted-brand uppercase tracking-widest">Submissions</div>
                    <div className="syne text-[15px] font-bold text-white">18/24</div>
                  </div>
                  <button className="btn btn-primary px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider">
                    Grade
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="card !mb-0">
            <h3 className="syne mb-4 text-sm font-bold text-white uppercase tracking-wider">Submission Alerts</h3>
            <div className="space-y-4">
              {STUDENTS_MOCK.filter(s => s.submissions < 70).map((s, i) => (
                <div key={s.id} className="flex gap-3 border-b border-white/5 pb-3 last:border-0 last:pb-0">
                  <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-red-brand" />
                  <div>
                    <div className="text-[12px] font-bold text-white">{s.name}</div>
                    <div className="text-[10px] text-muted-brand">{s.submissions}% submission rate</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card !mb-0">
            <h3 className="syne mb-4 text-sm font-bold text-white uppercase tracking-wider">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full rounded-xl bg-white/5 p-3 text-left text-[12px] font-medium text-white transition-all hover:bg-white/10">
                Send reminder to all pending
              </button>
              <button className="w-full rounded-xl bg-white/5 p-3 text-left text-[12px] font-medium text-white transition-all hover:bg-white/10">
                Extend deadline for Math set
              </button>
              <button className="w-full rounded-xl bg-white/5 p-3 text-left text-[12px] font-medium text-white transition-all hover:bg-white/10">
                Export submission report
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
