"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, KeyRound } from "lucide-react";

// ==========================================
// CONFIGURATION
// ==========================================
const SECRET_DATE = process.env.NEXT_PUBLIC_SECRET_DATE || "29/06/2023";

// ==========================================
// COMPONENTS
// ==========================================

const CinematicAuroraBackground = ({ isSuccess }: { isSuccess: boolean }) => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden bg-[#FAFAFA] -z-10 transition-colors duration-1000">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isSuccess ? 0 : 1 }}
      transition={{ duration: 2 }}
      className="absolute inset-0"
    >
      {/* Slow Moving Aurora Mesh */}
      <motion.div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-[#FFE4EC] mix-blend-multiply blur-[120px] opacity-60" animate={{ x: [0, 40, 0], y: [0, 50, 0] }} transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute bottom-[-20%] right-[-10%] w-[80vw] h-[80vw] rounded-full bg-[#FFD6E7] mix-blend-multiply blur-[140px] opacity-50" animate={{ x: [0, -40, 0], y: [0, -50, 0] }} transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute top-[30%] left-[30%] w-[50vw] h-[50vw] rounded-full bg-[#FF85B3]/20 mix-blend-multiply blur-[100px] opacity-40" animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} />
      
      {/* Subtle Noise Texture (CSS background) */}
      <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/stardust.png')" }} />
      
      {/* Tiny Slow Sparkles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,1)]"
          style={{ width: Math.random() * 2 + 1 + "px", height: Math.random() * 2 + 1 + "px", top: Math.random() * 100 + "vh", left: Math.random() * 100 + "vw" }}
          animate={{ opacity: [0, 0.8, 0], scale: [0, 1.5, 0] }}
          transition={{ duration: Math.random() * 4 + 4, repeat: Infinity, delay: Math.random() * 5, ease: "easeInOut" }}
        />
      ))}
    </motion.div>
  </div>
);

export default function LockScreen() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Timeline State
  const [showHeart, setShowHeart] = useState(false);
  const [showLine1, setShowLine1] = useState(false);
  const [showLine2, setShowLine2] = useState(false);
  const [showInput, setShowInput] = useState(false);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;
    
    // Nếu người dùng đang ấn nút xóa (Backspace) thì cứ cho xóa bình thường
    if (inputVal.length < password.length) {
      setPassword(inputVal);
      return;
    }

    // Lọc lấy toàn bộ chữ số
    const numbersOnly = inputVal.replace(/\D/g, "");
    
    // Tự động chèn dấu /
    let formattedDate = numbersOnly;
    if (numbersOnly.length > 2 && numbersOnly.length <= 4) {
      formattedDate = `${numbersOnly.slice(0, 2)}/${numbersOnly.slice(2)}`;
    } else if (numbersOnly.length > 4) {
      formattedDate = `${numbersOnly.slice(0, 2)}/${numbersOnly.slice(2, 4)}/${numbersOnly.slice(4, 8)}`;
    }

    setPassword(formattedDate);
  };

  useEffect(() => {
    setMounted(true);
    
    // Intro Timeline Orchestration
    const t1 = setTimeout(() => setShowHeart(true), 1200); // Wait 1.2s then heart
    const t2 = setTimeout(() => setShowLine1(true), 2800); // Show line 1
    const t3 = setTimeout(() => setShowLine2(true), 5500); // Show line 2
    const t4 = setTimeout(() => setShowInput(true), 8000); // Show Input

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === SECRET_DATE) {
      setIsSuccess(true);
      setError(false);
      
      // Navigate after cinematic success animation completes
      setTimeout(() => {
        router.push("/letter");
      }, 3500);
    } else {
      setError(true);
      // Soft reset of error state
      setTimeout(() => setError(false), 3000);
    }
  };

  if (!mounted) return null;

  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden font-sans">
      <CinematicAuroraBackground isSuccess={isSuccess} />

      {/* SUCCESS TRANSITION OVERLAY */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            key="success-overlay"
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            {/* White Fade Wipe */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, ease: "easeInOut", delay: 1.5 }}
              className="absolute inset-0 bg-white z-40"
            />
            
            {/* Cinematic Camera Zoom Out & Light Explosion */}
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: 20, opacity: 0 }}
              transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
              className="relative z-50 flex flex-col items-center justify-center"
            >
              <div className="absolute inset-0 bg-[#FF4D8D] rounded-full blur-[100px] opacity-50 animate-pulse" />
              <Heart size={120} className="text-[#FF4D8D] fill-[#FF4D8D] drop-shadow-[0_0_50px_rgba(255,77,141,1)]" />
              
              {/* Golden Sparkles Explosion */}
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={`gold-${i}`}
                  className="absolute w-2 h-2 bg-[#FFD700] rounded-full blur-[1px]"
                  initial={{ x: 0, y: 0, opacity: 1 }}
                  animate={{ 
                    x: (Math.random() - 0.5) * 800, 
                    y: (Math.random() - 0.5) * 800,
                    opacity: 0,
                    scale: Math.random() * 2 + 0.5
                  }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN INTRO SCENE */}
      <AnimatePresence>
        {!isSuccess && (
          <motion.div
            key="intro-scene"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="relative z-10 w-full max-w-lg px-6 flex flex-col items-center text-center"
          >
            {/* Glowing Heart */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
              animate={{ opacity: showHeart ? 1 : 0, scale: showHeart ? 1 : 0.5, filter: showHeart ? "blur(0px)" : "blur(10px)" }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="relative mb-12"
            >
              <div className="absolute inset-0 bg-[#FF4D8D] blur-[40px] opacity-30 rounded-full" />
              <Heart size={40} className="text-[#FF4D8D] fill-[#FF4D8D] opacity-80" />
            </motion.div>

            {/* Cinematic Sentences */}
            <div className="min-h-[140px] flex flex-col items-center justify-center w-full mb-10">
              <motion.p
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: showLine1 ? 1 : 0, y: showLine1 ? 0 : 20, filter: showLine1 ? "blur(0px)" : "blur(8px)" }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="font-playfair text-2xl sm:text-3xl text-[#1F2937] leading-relaxed mb-4"
              >
                Mọi câu chuyện tuyệt đẹp<br/>
                <span className="italic text-[#888888]">đều bắt đầu từ một ngày đặc biệt.</span>
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: showLine2 ? 1 : 0, y: showLine2 ? 0 : 20, filter: showLine2 ? "blur(0px)" : "blur(8px)" }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="font-inter font-light tracking-wide text-[#6B7280] text-sm sm:text-base"
              >
                Em còn nhớ ngày đó của chúng mình không?
              </motion.p>
            </div>

            {/* Password Input Area */}
            <motion.div
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: showInput ? 1 : 0, y: showInput ? 0 : 30, filter: showInput ? "blur(0px)" : "blur(10px)", pointerEvents: showInput ? "auto" : "none" }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="w-full"
            >
              <form onSubmit={handleSubmit} className="flex flex-col items-center w-full gap-8">
                
                {/* Glass Input Container */}
                <div className="relative w-full max-w-sm">
                  {/* Subtle Error Red Glow */}
                  <motion.div 
                    animate={{ opacity: error ? 1 : 0 }} 
                    transition={{ duration: 0.5 }}
                    className="absolute inset-[-10px] bg-red-400/20 rounded-full blur-[20px] pointer-events-none"
                  />
                  
                  {/* Gentle Vibration on Error */}
                  <motion.div
                    animate={error ? { x: [-3, 3, -2, 2, 0] } : {}}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="relative"
                  >
                    <input
                      type="text"
                      value={password}
                      onChange={handlePasswordChange}
                      maxLength={10}
                      placeholder="DD/MM/YYYY"
                      className={`w-full px-6 py-5 bg-white/40 backdrop-blur-2xl border transition-all duration-700 outline-none rounded-full font-inter text-center text-lg tracking-[0.2em] shadow-[inset_0_2px_10px_rgba(0,0,0,0.05),0_10px_30px_rgba(255,77,141,0.05)] placeholder:tracking-widest placeholder:font-light placeholder:text-[#9CA3AF] ${
                        error 
                          ? "border-red-300/50 text-red-500 focus:border-red-400/80 focus:bg-white/70" 
                          : "border-white/60 text-[#1F2937] focus:border-[#FF4D8D]/40 focus:bg-white/70 hover:bg-white/50"
                      }`}
                    />
                    
                    {/* Inner Glass Highlight */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/60 to-transparent pointer-events-none" />
                  </motion.div>
                </div>

                {/* Error Hint text */}
                <AnimatePresence mode="wait">
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.5 }}
                      className="text-[#FF85B3] font-inter text-sm italic tracking-wide h-6"
                    >
                      Thử nhớ lại ngày đầu tiên của chúng mình xem...
                    </motion.div>
                  )}
                  {!error && <div className="h-6" />}
                </AnimatePresence>

                {/* Premium Animated CTA */}
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="relative group px-10 py-4 rounded-full bg-transparent border border-[#E5E7EB] hover:border-[#FFD6E7] text-[#6B7280] hover:text-[#FF4D8D] font-inter text-sm font-medium tracking-[0.2em] uppercase transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-[#FFD6E7]/0 group-hover:bg-[#FFD6E7]/10 transition-colors duration-500" />
                  <div className="absolute inset-0 translate-x-[-150%] group-hover:translate-x-[150%] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] transition-transform duration-[1200ms] ease-in-out" />
                  <span className="relative flex items-center gap-3">
                    <KeyRound size={16} className="opacity-70 group-hover:opacity-100 transition-opacity" />
                    Mở Khóa Kỷ Niệm
                  </span>
                </motion.button>

              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
