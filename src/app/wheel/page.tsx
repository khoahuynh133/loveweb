"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";

// ==========================================
// CONFIGURATION
// ==========================================
// Bạn có thể thay link ảnh món quà thật vào đây (vd: link ảnh facebook, imgur, unsplash...)
const GIFT_IMAGE_URL = "photos/qua.webp"; 
const GIFT_NAME = "Túi xách Cow&Kitty "; 
const GIFT_MESSAGE = "Hy vọng món quà nhỏ này sẽ khiến em mỉm cười. Cảm ơn vì đã xuất hiện trong cuộc đời anh.";

// ==========================================
// COMPONENTS
// ==========================================

const CinematicBackground = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 bg-[#FFF9FB]">
    {/* Ambient Aurora Blooms */}
    <motion.div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-[#FFE4EC] mix-blend-multiply blur-[120px] opacity-60" animate={{ x: [0, 40, 0], y: [0, 50, 0] }} transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }} />
    <motion.div className="absolute bottom-[-20%] right-[-10%] w-[80vw] h-[80vw] rounded-full bg-[#FFD6E7] mix-blend-multiply blur-[140px] opacity-50" animate={{ x: [0, -40, 0], y: [0, -50, 0] }} transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }} />
    <motion.div className="absolute top-[30%] left-[30%] w-[50vw] h-[50vw] rounded-full bg-[#FF85B3]/20 mix-blend-multiply blur-[100px] opacity-40" animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} />
    
    {/* Sparkling Stars */}
    {[...Array(25)].map((_, i) => (
      <motion.div
        key={`star-${i}`}
        className="absolute rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,1)]"
        style={{ width: Math.random() * 2 + 1 + "px", height: Math.random() * 2 + 1 + "px", top: Math.random() * 100 + "vh", left: Math.random() * 100 + "vw" }}
        animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
        transition={{ duration: Math.random() * 4 + 3, repeat: Infinity, delay: Math.random() * 5, ease: "easeInOut" }}
      />
    ))}

    {/* Floating Ambient Particles */}
    {[...Array(15)].map((_, i) => (
      <motion.div
        key={`particle-${i}`}
        className="absolute bg-[#FF4D8D]/10 rounded-full blur-[2px]"
        style={{ width: Math.random() * 10 + 5 + "px", height: Math.random() * 10 + 5 + "px", top: "110vh", left: Math.random() * 100 + "vw" }}
        animate={{ y: "-20vh", x: `+=${Math.random() * 100 - 50}px` }}
        transition={{ duration: Math.random() * 20 + 25, repeat: Infinity, ease: "linear", delay: Math.random() * 15 }}
      />
    ))}
  </div>
);

const PremiumButton = ({ onClick, disabled, loading, children, icon: Icon }: any) => (
  <motion.button
    onClick={onClick}
    disabled={disabled || loading}
    whileHover={disabled ? {} : { scale: 1.02, y: -2 }}
    whileTap={disabled ? {} : { scale: 0.98 }}
    className="relative group px-10 py-5 rounded-full bg-white text-[#1F2937] font-bold font-inter text-lg sm:text-xl shadow-[0_15px_40px_-10px_rgba(255,77,141,0.3)] hover:shadow-[0_20px_50px_-10px_rgba(255,77,141,0.5)] transition-all overflow-hidden disabled:opacity-80 disabled:cursor-not-allowed border border-white"
  >
    {/* Animated Gradient Border Glow */}
    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FF4D8D] via-[#FF85B3] to-[#FF4D8D] opacity-10 group-hover:opacity-20 transition-opacity duration-500" />
    
    {/* Shine effect */}
    <div className="absolute inset-0 translate-x-[-150%] group-hover:translate-x-[150%] bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-[-20deg] transition-transform duration-[1200ms] ease-in-out" />
    
    <div className="relative flex items-center justify-center gap-3 z-10">
      {loading ? (
        <div className="w-6 h-6 border-4 border-[#FF4D8D]/30 border-t-[#FF4D8D] rounded-full animate-spin" />
      ) : (
        <>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF4D8D] to-[#FF85B3] tracking-wide">{children}</span>
          {Icon && <Icon className="text-[#FF4D8D] group-hover:animate-pulse" size={22} />}
        </>
      )}
    </div>
  </motion.button>
);

const GiftBoxReveal = ({ onOpen }: { onOpen: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    setTimeout(() => {
      onOpen();
    }, 2000);
  };

  return (
    <motion.div
      key="unopened"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 1.2, filter: "blur(20px)" }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center justify-center w-full max-w-lg z-10 relative"
    >
      <motion.div
        animate={isOpening ? { 
          scale: [1, 1.1, 0.9, 1.2, 0], 
          rotate: [0, -5, 5, -5, 10, 0], 
          filter: ["blur(0px)", "blur(0px)", "blur(0px)", "blur(10px)", "blur(20px)"],
          opacity: [1, 1, 1, 1, 0] 
        } : { y: [0, -10, 0] }}
        transition={isOpening ? { duration: 1.8, ease: "easeInOut" } : { repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="relative mb-14 cursor-pointer"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={isOpening ? undefined : handleOpen}
      >
        {/* Glow Behind Box */}
        <motion.div 
          animate={{ scale: isHovered ? 1.2 : 1, opacity: isHovered ? 0.8 : 0.4 }} 
          className="absolute inset-0 bg-gradient-to-tr from-[#FF4D8D] to-[#FFD6E7] rounded-full blur-[40px] transition-all duration-700" 
        />
        
        {/* Glass Box */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 bg-white/40 backdrop-blur-2xl border border-white/70 rounded-[2.5rem] shadow-[0_30px_60px_rgba(255,77,141,0.15),inset_0_2px_20px_rgba(255,255,255,1)] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-transparent" />
          <motion.div animate={isHovered ? { scale: 1.1 } : { scale: 1 }} transition={{ duration: 0.4 }}>
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_10px_20px_rgba(255,77,141,0.4)]">
              <path d="M20 12V22H4V12" stroke="url(#gift-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 7H2V12H22V7Z" stroke="url(#gift-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 22V7" stroke="url(#gift-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 7H7.5C6.11929 7 5 5.88071 5 4.5C5 3.11929 6.11929 2 7.5 2C10.5 2 12 7 12 7Z" stroke="url(#gift-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 7H16.5C17.8807 7 19 5.88071 19 4.5C19 3.11929 17.8807 2 16.5 2C13.5 2 12 7 12 7Z" stroke="url(#gift-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <defs>
                <linearGradient id="gift-grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FF4D8D"/>
                  <stop offset="1" stopColor="#FF85B3"/>
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </div>
      </motion.div>

      <div className="text-center px-6">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-[#FF85B3] font-inter font-bold tracking-[0.2em] text-sm sm:text-base uppercase mb-4">
          A Special Surprise
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8 }} className="text-4xl sm:text-5xl font-playfair font-bold text-[#1F2937] leading-tight mb-6">
          Anh đã chuẩn bị món quà<br />
          <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D8D] to-[#FF85B3]">dành cho em...</span>
        </motion.h1>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.8 }} className="mt-8">
        <PremiumButton onClick={handleOpen} loading={isOpening} icon={Sparkles}>
          Khám Phá Bí Mật
        </PremiumButton>
      </motion.div>
    </motion.div>
  );
}

// ==========================================
// MAIN SCREEN
// ==========================================

export default function GiftScreen() {
  const [isClaimed, setIsClaimed] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);

  const handleOpen = () => {
    setIsClaimed(true);
  };

  const handleAccept = () => {
    setIsAccepted(true);
    triggerConfetti(true);
  };

  const triggerConfetti = (isGrand = false) => {
    const duration = isGrand ? 4000 : 7000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: isGrand ? 40 : 25, spread: 360, ticks: 100, zIndex: 100, colors: ['#FF4D8D', '#FF85B3', '#FFD6E7', '#ffffff', '#FFD700'] };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      
      const particleCount = (isGrand ? 60 : 30) * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
  };

  useEffect(() => {
    if (isClaimed) {
      triggerConfetti(false);
    }
  }, [isClaimed]);

  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#FFF9FB] selection:bg-[#FF4D8D]/30 py-12 px-4 sm:px-6 font-sans">
      <CinematicBackground />

      <AnimatePresence mode="wait">
        {!isClaimed ? (
          <GiftBoxReveal key="box" onOpen={handleOpen} />
        ) : (
          <motion.div
            key="revealed"
            className="w-full max-w-4xl relative z-10 flex flex-col items-center"
          >
            {/* Intense Light Rays Background */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }} 
              animate={{ opacity: 0.4, scale: 1, rotate: 360 }} 
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] sm:w-[100vw] sm:h-[100vw] rounded-full bg-[conic-gradient(from_0deg,transparent,rgba(255,77,141,0.2)_10deg,transparent_20deg,rgba(255,133,179,0.2)_30deg,transparent_40deg,rgba(255,214,231,0.2)_50deg,transparent_60deg)] pointer-events-none -z-10"
            />

            {/* Content Container */}
            <div className="w-full flex flex-col items-center">
              
              {/* Image Reveal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50, filter: "blur(20px)" }}
                animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                className="relative w-full max-w-xs sm:max-w-md aspect-square sm:aspect-[4/3] rounded-[2rem] p-3 bg-white/40 backdrop-blur-xl border border-white shadow-[0_40px_80px_rgba(255,77,141,0.2)] mb-10 group"
              >
                {/* Image Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF4D8D] to-[#FFD6E7] rounded-[2rem] blur-[20px] opacity-30 group-hover:opacity-50 transition-opacity duration-700 -z-10" />
                
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-inner">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={GIFT_IMAGE_URL} 
                    alt="Gift Reveal" 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[2000ms] ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                </div>
              </motion.div>

              {/* Text Reveal */}
              <div className="text-center max-w-2xl px-4">
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                  className="text-4xl sm:text-5xl md:text-6xl font-playfair font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D8D] to-[#FF85B3] mb-6 drop-shadow-sm"
                >
                  {GIFT_NAME}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1.5 }}
                  className="text-lg sm:text-xl font-inter text-[#6B7280] leading-relaxed italic px-4"
                >
                  "{GIFT_MESSAGE}"
                </motion.p>
              </div>

              {/* Action Reveal */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2.2 }}
                className="mt-12"
              >
                {!isAccepted ? (
                  <PremiumButton onClick={handleAccept} icon={Heart}>
                    Chấp Nhận Quà Tặng
                  </PremiumButton>
                ) : (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    className="flex items-center gap-4 bg-white/80 backdrop-blur-2xl px-10 py-5 rounded-full border border-white shadow-[0_20px_50px_rgba(255,77,141,0.2)]"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FF4D8D] to-[#FF85B3] flex items-center justify-center shadow-inner">
                      <CheckCircle2 className="text-white" size={24} />
                    </div>
                    <span className="font-playfair font-bold text-xl sm:text-2xl text-[#1F2937] italic">
                      Đã Nhận Quà Thành Công
                    </span>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
