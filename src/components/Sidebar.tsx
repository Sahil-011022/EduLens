import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  LogOut, 
  GraduationCap,
  Target,
  Calendar,
  AlertTriangle,
  Bell,
  FileBarChart,
  Sparkles,
  CheckSquare,
  History
} from 'lucide-react';
import { UserProfile } from '../types';
import { cn } from '../lib/utils';

interface SidebarProps {
  user: UserProfile;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

export default function Sidebar({ user, activeTab, setActiveTab, onLogout }: SidebarProps) {
  const teacherNav = [
    {
      section: "Overview",
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'students', label: 'Students', icon: Users },
      ]
    },
    {
      section: "Analytics",
      items: [
        { id: 'gaps', label: 'Learning Gaps', icon: Target },
        { id: 'attendance', label: 'Attendance', icon: Calendar },
        { id: 'risk', label: 'Risk Detection', icon: AlertTriangle },
      ]
    },
    {
      section: "Actions",
      items: [
        { id: 'alerts', label: 'Alerts', icon: Bell },
        { id: 'reports', label: 'Reports', icon: FileBarChart },
        { id: 'chat', label: 'AI Assistant', icon: MessageSquare },
        { id: 'upload', label: 'Upload Data', icon: GraduationCap },
        { id: 'exam', label: 'Exam Management', icon: CheckSquare },
      ]
    }
  ];

  const studentNav = [
    {
      section: "My Portal",
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'performance', label: 'My Performance', icon: GraduationCap },
        { id: 'gaps', label: 'Learning Gaps', icon: Target },
      ]
    },
    {
      section: "Tracking",
      items: [
        { id: 'attendance', label: 'Attendance', icon: Calendar },
        { id: 'assignments', label: 'Assignments', icon: FileBarChart },
      ]
    },
    {
      section: "Feedback",
      items: [
        { id: 'chat', label: 'AI Assistant', icon: MessageSquare },
        { id: 'exam', label: 'My Exams', icon: History },
      ]
    }
  ];

  const nav = user.role === 'student' ? studentNav : teacherNav;

  return (
    <div className="fixed left-0 top-0 flex h-screen w-64 flex-col border-r border-white/10 bg-[#070e1b] p-0">
      <div className="border-b border-white/10 px-6 py-5">
        <h2 className="font-syne text-2xl font-extrabold text-white">
          Edu<span className="text-mint">Lens</span>
        </h2>
        <p className="mono mt-1 text-[9px] tracking-widest text-muted-brand uppercase">
          {user.role} PORTAL
        </p>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        {nav.map((section) => (
          <div key={section.section} className="mb-4">
            <h3 className="mono mb-2 px-6 text-[9px] font-bold tracking-widest text-white/25 uppercase">
              {section.section}
            </h3>
            <div className="space-y-0.5">
              {section.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={cn(
                    "flex w-full items-center gap-3 border-r-2 px-6 py-2.5 transition-all",
                    activeTab === item.id 
                      ? "border-blue-brand bg-blue-brand/10 text-white" 
                      : "border-transparent text-muted-brand hover:bg-white/5 hover:text-white"
                  )}
                >
                  <item.icon size={18} className={cn(activeTab === item.id ? "opacity-100" : "opacity-70")} />
                  <span className="text-[13px] font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10 p-4">
        <div className="mb-4 flex items-center gap-3 px-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-blue-brand/30 bg-blue-brand/15 text-[12px] font-bold text-blue-brand">
            {user.displayName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
          </div>
          <div className="overflow-hidden">
            <p className="truncate text-[13px] font-medium text-white">{user.displayName}</p>
            <p className="text-[9px] font-bold tracking-wider text-blue-brand uppercase">{user.role}</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="flex w-full items-center justify-center rounded-xl border border-red-brand/15 bg-red-brand/10 py-2.5 text-[12px] font-medium text-red-brand transition-all hover:bg-red-brand/20"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
