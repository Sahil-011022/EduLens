import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import Splash from './components/Splash';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Students from './components/Students';
import LearningGaps from './components/LearningGaps';
import Attendance from './components/Attendance';
import RiskDetection from './components/RiskDetection';
import Alerts from './components/Alerts';
import Reports from './components/Reports';
import AIAssistant from './components/AIAssistant';
import UploadData from './components/UploadData';
import ExamTab from './components/ExamTab';
import StudentPerformance from './components/StudentPerformance';
import Assignments from './components/Assignments';
import { UserProfile } from './types';
import { auth, db } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          setUser({ ...userDoc.data(), uid: firebaseUser.uid } as UserProfile);
        } else {
          // Handle case where auth exists but firestore doc doesn't (e.g. manual auth)
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            displayName: firebaseUser.displayName || 'User',
            role: 'student'
          } as UserProfile);
        }
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = (userData: UserProfile) => {
    setUser(userData);
    setActiveTab('dashboard');
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-bg text-white font-sans overflow-x-hidden">
      <AnimatePresence mode="wait">
        {showSplash ? (
          <Splash key="splash" onComplete={() => setShowSplash(false)} />
        ) : !user ? (
          <Login key="login" onLogin={handleLogin} />
        ) : (
          <div key="app" className="flex min-h-screen">
            <Sidebar 
              user={user} 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
              onLogout={handleLogout} 
            />
            <main className="ml-64 flex-1 p-8">
              <AnimatePresence mode="wait">
                <div key={activeTab}>
                  {activeTab === 'dashboard' && <Dashboard user={user} />}
                  {activeTab === 'students' && <Students />}
                  {activeTab === 'gaps' && (user.role === 'student' ? <LearningGaps isStudent /> : <LearningGaps />)}
                  {activeTab === 'attendance' && (user.role === 'student' ? <Attendance isStudent /> : <Attendance />)}
                  {activeTab === 'risk' && <RiskDetection />}
                  {activeTab === 'alerts' && <Alerts />}
                  {activeTab === 'reports' && <Reports />}
                  {activeTab === 'chat' && <AIAssistant user={user} />}
                  {activeTab === 'upload' && <UploadData user={user} />}
                  {activeTab === 'exam' && <ExamTab user={user} />}
                  {activeTab === 'performance' && <StudentPerformance user={user} />}
                  {activeTab === 'assignments' && <Assignments user={user} />}
                </div>
              </AnimatePresence>
            </main>
          </div>
        )}
      </AnimatePresence>

      <div id="toast-container" className="fixed bottom-8 right-8 z-[100] flex flex-col gap-2" />
    </div>
  );
}
