import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'motion/react';
import { auth, db } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { UserRole } from '../types';
import { cn } from '../lib/utils';

interface LoginProps {
  onLogin: (user: any) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const symbolsContainerRef = useRef<HTMLDivElement>(null);
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<UserRole>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const symbols = ["+", "−", "×", "÷", "π", "√", "∑", "=", "≠", "∫", "∞", "∂", "∇", "∈", "∉", "∩", "∪", "⊂", "⊃", "⊆", "⊇", "∧", "∨", "¬", "∀", "∃", "∈", "∉", "∋", "∌", "∏", "∐", "∑", "−", "∓", "∔", "∕", "∖", "∗", "∘", "∙", "√", "∛", "∜", "∝", "∞", "∟", "∠", "∡", "∢", "∣", "∤", "∥", "∦", "∧", "∨", "∩", "∪", "∫", "∬", "∭", "∮", "∯", "∰", "∱", "∲", "∳", "∴", "∵", "∶", "∷", "∸", "∹", "∺", "∻", "∼", "∽", "∾", "∿", "≀", "≁", "≂", "≃", "≄", "≅", "≆", "≇", "≈", "≉", "≊", "≋", "≌", "≍", "≎", "≏", "≐", "≑", "≒", "≓", "≔", "≕", "≖", "≗", "≘", "≙", "≚", "≛", "≜", "≝", "≞", "≟", "≠", "≡", "≢", "≣", "≤", "≥", "≦", "≧", "≨", "≩", "≪", "≫", "≬", "≭", "≮", "≯", "≰", "≱", "≲", "≳", "≴", "≵", "≶", "≷", "≸", "≹", "≺", "≻", "≼", "≽", "≾", "≿", "⊀", "⊁", "⊂", "⊃", "⊄", "⊅", "⊆", "⊇", "⊈", "⊉", "⊊", "⊋", "⊌", "⊍", "⊎", "⊏", "⊐", "⊑", "⊒", "⊓", "⊔", "⊕", "⊖", "⊗", "⊘", "⊙", "⊚", "⊛", "⊜", "⊝", "⊞", "⊟", "⊠", "⊡", "⊢", "⊣", "⊤", "⊥", "⊦", "⊧", "⊨", "⊩", "⊪", "⊫", "⊬", "⊭", "⊮", "⊯", "⊰", "⊱", "⊲", "⊳", "⊴", "⊵", "⊶", "⊷", "⊸", "⊹", "⊺", "⊻", "⊼", "⊽", "⊾", "⊿", "⋀", "⋁", "⋂", "⋃", "⋄", "⋅", "⋆", "⋇", "⋈", "⋉", "⋊", "⋋", "⋌", "⋍", "⋎", "⋏", "⋐", "⋑", "⋒", "⋓", "⋔", "⋕", "⋖", "⋗", "⋘", "⋙", "⋚", "⋛", "⋜", "⋝", "⋞", "⋟","@", "#", "$", "%", "&", "*", "!", "?", "~", "^", "_", "`", "|", ":", ";", "\"", "'", "<", ">", "/", "\\", "(", ")", "[", "]", "{", "}", "-", "+", "=", "±", "×", "÷", "∑", "∏", "∐", "∫", "∬", "∭", "∮", "∯", "∰", "∱", "∲", "∳", "∴", "∵", "∶", "∷", "∸", "∹", "∺", "∻", "∼", "∽", "∾", "∿", "≀", "≁", "≂", "≃", "≄", "≅", "≆", "≇", "≈", "≉", "≊", "≋", "≌", "≍", "≎", "≏", "≐", "≑", "≒", "≓", "≔", "≕", "≖", "≗", "≘", "≙", "≚", "≛", "≜", "≝", "≞", "≟", "≠", "≡", "≢", "≣", "≤", "≥", "≦", "≧", "≨", "≩", "≪", "≫", "≬", "≭", "≮", "≯", "≰", "≱", "≲", "≳", "≴", "≵", "≶", "≷", "≸", "≹", "≺", "≻", "≼", "≽", "≾", "≿"];

    const createSymbol = () => {
      if (!symbolsContainerRef.current) return;
      const symbol = document.createElement("div");
      symbol.classList.add("symbol");
      symbol.innerText = symbols[Math.floor(Math.random() * symbols.length)];
      symbol.style.left = Math.random() * 100 + "vw";
      symbol.style.fontSize = (20 + Math.random() * 30) + "px";
      symbol.style.animationDuration = (4 + Math.random() * 4) + "s";
      symbolsContainerRef.current.appendChild(symbol);
      setTimeout(() => {
        symbol.remove();
      }, 17000);
    };

    const interval = setInterval(createSymbol, 350);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 8;

    const shapes: any[] = [];
    const colors = [0x38bdf8, 0x818cf8, 0x34d399];
    const geometries = [
      new THREE.IcosahedronGeometry(1.4, 0),
      new THREE.OctahedronGeometry(1.1, 0),
      new THREE.TetrahedronGeometry(1.0, 0),
      new THREE.TorusGeometry(0.9, 0.32, 12, 40),
    ];

    for (let i = 0; i < 15; i++) {
      const g = geometries[i % geometries.length];
      const c = colors[i % colors.length];
      const mat = new THREE.MeshPhongMaterial({ color: c, transparent: true, opacity: 0.12 });
      const wire = new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 0.2, wireframe: true });
      const m = new THREE.Mesh(g, mat);
      const w = new THREE.Mesh(g, wire);
      
      const x = (Math.random() - 0.5) * 14;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 4 - 2;
      
      m.position.set(x, y, z);
      w.position.set(x, y, z);
      scene.add(m);
      scene.add(w);
      
      shapes.push({
        m, w,
        rx: (Math.random() - 0.5) * 0.01,
        ry: (Math.random() - 0.5) * 0.008
      });
    }

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const pt = new THREE.PointLight(0x38bdf8, 1.5, 20);
    pt.position.set(0, 3, 5);
    scene.add(pt);

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    const animate = () => {
      requestAnimationFrame(animate);
      shapes.forEach(s => {
        s.m.rotation.x += s.rx;
        s.m.rotation.y += s.ry;
        s.w.rotation.copy(s.m.rotation);
      });
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    if (isLogin) {
      if (newRole === 'admin') {
        setEmail('admin@edulens.com');
        setPassword('admin123');
      } else if (newRole === 'teacher') {
        setEmail('teacher@edulens.com');
        setPassword('teach123');
      } else {
        setEmail('student@edulens.com');
        setPassword('student123');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        // Sign In
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
        
        if (userDoc.exists()) {
          onLogin({ ...userDoc.data(), uid: userCredential.user.uid });
        } else {
          // Fallback if doc doesn't exist (e.g. legacy users)
          onLogin({ 
            email: userCredential.user.email, 
            role: role, 
            displayName: userCredential.user.displayName || (role.charAt(0).toUpperCase() + role.slice(1) + ' User'), 
            uid: userCredential.user.uid 
          });
        }
      } else {
        // Sign Up
        if (!displayName.trim()) {
          setError('Please enter your name.');
          setLoading(false);
          return;
        }

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName });

        const userData = {
          uid: userCredential.user.uid,
          email,
          displayName,
          role,
          createdAt: serverTimestamp()
        };

        await setDoc(doc(db, 'users', userCredential.user.uid), userData);
        onLogin(userData);
      }
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        setError('This email is already registered.');
      } else if (err.code === 'auth/invalid-credential') {
        setError('Invalid email or password.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters.');
      } else {
        setError('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-bg">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
      <div ref={symbolsContainerRef} className="symbols-container" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-[360px] p-6"
      >
        <div className="rounded-[22px] border border-blue-brand/15 bg-[#0a1a2e]/97 p-8 shadow-2xl backdrop-blur-xl">
          <div className="mb-6 text-center">
            <h2 className="syne text-3xl font-extrabold text-white">
              Edu<span className="text-mint">Lens</span>
            </h2>
            <p className="mono mt-1 text-[10px] tracking-widest text-muted-brand uppercase">
              SELECT ROLE & SIGN IN
            </p>
          </div>

          <div className="mb-5 flex gap-2">
            {(['teacher', 'student', 'admin'] as UserRole[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => handleRoleChange(r)}
                className={cn(
                  "flex-1 rounded-xl border py-2 font-syne text-[11px] font-bold tracking-wider uppercase transition-all",
                  role === r 
                    ? r === 'teacher' ? "border-blue-brand/50 bg-blue-brand/10 text-blue-brand" :
                      r === 'student' ? "border-mint/50 bg-mint/10 text-mint" :
                      "border-purple-brand/50 bg-purple-brand/10 text-purple-brand"
                    : "border-white/10 text-muted-brand hover:text-white"
                )}
              >
                {r}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  key="name-field"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="inp"
                    placeholder="Full Name"
                    required={!isLogin}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="inp"
              placeholder="Email address"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="inp"
              placeholder="Password"
              required
            />

            {error && <p className="text-center text-[11px] text-red-brand">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full py-3 font-syne text-[13px] font-extrabold uppercase tracking-wider"
            >
              {loading ? 'Processing...' : isLogin ? 'Sign In to EduLens →' : 'Create Account →'}
            </button>
          </form>

          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              className="text-[11px] text-blue-brand hover:underline"
            >
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
            </button>
          </div>

          {isLogin && (
            <div className="mt-4 text-center text-[10px] leading-relaxed text-muted-brand">
              {role === 'admin' ? (
                <>Admin: <span className="text-blue-brand">admin@edulens.com</span> / <span className="text-blue-brand">admin123</span></>
              ) : role === 'teacher' ? (
                <>Teacher: <span className="text-blue-brand">teacher@edulens.com</span> / <span className="text-blue-brand">teach123</span></>
              ) : (
                <>Student: <span className="text-blue-brand">student@edulens.com</span> / <span className="text-blue-brand">student123</span></>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
