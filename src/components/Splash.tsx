import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface SplashProps {
  onComplete: () => void;
}

export default function Splash({ onComplete }: SplashProps) {
  const [visible, setVisible] = useState(true);
  const symbolsContainerRef = useRef<HTMLDivElement>(null);

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

    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 800);
    }, 2500);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-bg"
        >
          <div ref={symbolsContainerRef} className="symbols-container" />
          
          <div className="relative flex h-[110px] w-[110px] items-center justify-center rounded-full border-[1.5px] border-mint/25 animate-[pulse_2s_ease_infinite]">
            <div className="absolute inset-[-10px] rounded-full border border-mint/10 animate-[pulse_2s_ease_infinite_0.3s]" />
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-mint/30 bg-mint/5">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <path d="M7 26L18 8L29 26" stroke="#02c39a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11 20L25 20" stroke="#02c39a" strokeWidth="1.8" strokeLinecap="round"/>
                <circle cx="18" cy="30" r="3" fill="#02c39a"/>
              </svg>
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="syne mt-5 text-3xl font-extrabold text-white"
          >
            Edu<span className="text-mint">Lens</span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="mono mt-1.5 text-[10px] tracking-[0.15em] text-muted-brand uppercase"
          >
            AI Student Analytics Platform
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-7 h-0.5 w-[150px] overflow-hidden rounded-full bg-white/5"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="h-full bg-mint"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
