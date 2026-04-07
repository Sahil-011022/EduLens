import { motion } from 'motion/react';
import { Bell, AlertTriangle, Info, CheckCircle } from 'lucide-react';

export default function Alerts() {
  const alerts = [
    { id: 1, type: 'critical', title: 'Critical Attendance Drop', message: 'Rohan Kumar has missed 3 consecutive Math classes.', time: '10m ago', icon: AlertTriangle, color: 'text-red-brand', bg: 'bg-red-brand/10' },
    { id: 2, type: 'warning', title: 'Performance Warning', message: 'Class average for "Calculus" is below 55%.', time: '1h ago', icon: Bell, color: 'text-amber-brand', bg: 'bg-amber-brand/10' },
    { id: 3, type: 'info', title: 'New Submission', message: '12 new assignments uploaded for Physics Unit 2.', time: '3h ago', icon: Info, color: 'text-blue-brand', bg: 'bg-blue-brand/10' },
    { id: 4, type: 'success', title: 'Intervention Complete', message: '1:1 session with Sara K. marked as completed.', time: 'Yesterday', icon: CheckCircle, color: 'text-mint', bg: 'bg-mint/10' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="page-header">
        <h2 className="syne text-3xl font-extrabold text-white">Alerts & Notifications</h2>
        <p className="text-sm text-muted-brand">Stay updated with real-time student insights</p>
      </div>

      <div className="max-w-3xl space-y-4">
        {alerts.map((alert) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card flex gap-4 p-5 transition-all hover:translate-x-1"
          >
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${alert.bg}`}>
              <alert.icon className={`h-5 w-5 ${alert.color}`} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="syne text-[15px] font-bold text-white">{alert.title}</h3>
                <span className="text-[10px] text-muted-brand">{alert.time}</span>
              </div>
              <p className="mt-1 text-[13px] leading-relaxed text-muted-brand">{alert.message}</p>
              <div className="mt-4 flex gap-3">
                <button className="text-[11px] font-bold text-blue-brand hover:underline uppercase tracking-wider">View Details</button>
                <button className="text-[11px] font-bold text-muted-brand hover:text-white uppercase tracking-wider">Dismiss</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
