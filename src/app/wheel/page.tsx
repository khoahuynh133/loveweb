"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, CheckCircle2, Disc3 } from "lucide-react";
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
    <motion.div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-[#FFE4EC]/60 blur-[60px]" animate={{ x: [0, 40, 0], y: [0, 50, 0] }} transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }} />
    <motion.div className="absolute bottom-[-20%] right-[-10%] w-[80vw] h-[80vw] rounded-full bg-[#FFD6E7]/50 blur-[60px]" animate={{ x: [0, -40, 0], y: [0, -50, 0] }} transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }} />
    <motion.div className="absolute top-[30%] left-[30%] w-[50vw] h-[50vw] rounded-full bg-[#FF85B3]/20 blur-[50px]" animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} />

    {/* Sparkling Stars */}
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={`star-${i}`}
        className="absolute rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,1)]"
        style={{ width: Math.random() * 2 + 1 + "px", height: Math.random() * 2 + 1 + "px", top: Math.random() * 100 + "vh", left: Math.random() * 100 + "vw" }}
        animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
        transition={{ duration: Math.random() * 4 + 3, repeat: Infinity, delay: Math.random() * 5, ease: "easeInOut" }}
      />
    ))}

    {/* Floating Ambient Particles */}
    {[...Array(6)].map((_, i) => (
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

const MusicControl = ({ isPlaying, toggleAudio }: any) => (
  <motion.button
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    onClick={toggleAudio}
    className="fixed top-6 right-6 z-50 flex items-center gap-3 px-4 py-2 bg-black/5 backdrop-blur-md border border-[#FF4D8D]/20 rounded-full text-black hover:bg-black/10 transition-all cursor-pointer group shadow-sm"
  >
    <div className={`relative flex items-center justify-center w-8 h-8 rounded-full bg-white/80 shadow-sm ${isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''}`}>
      <Disc3 size={18} className="text-[#FF4D8D]" />
    </div>
    <span className="text-xs font-inter font-medium tracking-widest uppercase opacity-70 group-hover:opacity-100 transition-opacity hidden sm:block text-[#1F2937]">
      {isPlaying ? "Music On" : "Music Off"}
    </span>
  </motion.button>
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

const STICKERS_DATA = [
  { emoji: "🎀", top: "12%", left: "10%", delay: 0 },
  { emoji: "🧸", top: "8%", left: "45%", delay: 0.5 },
  { emoji: "💖", top: "15%", left: "85%", delay: 1 },
  { emoji: "✨", top: "45%", left: "8%", delay: 0.2 },
  { emoji: "🌸", top: "50%", left: "88%", delay: 0.8 },
  { emoji: "💌", top: "80%", left: "12%", delay: 1.2 },
  { emoji: "🐰", top: "85%", left: "85%", delay: 0.4 },
  { emoji: "🌷", top: "70%", left: "92%", delay: 0.7 },
  { emoji: "🦋", top: "28%", left: "5%", delay: 1.5 },
  { emoji: "🍓", top: "90%", left: "50%", delay: 0.3 },
];

const FloatingStickers = () => (
  <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
    {STICKERS_DATA.map((sticker, i) => {
      const duration = 3 + (i % 3);
      return (
        <motion.div
          key={`sticker-${i}`}
          className="absolute text-4xl sm:text-5xl drop-shadow-[0_10px_10px_rgba(255,77,141,0.2)] opacity-80"
          style={{ top: sticker.top, left: sticker.left }}
          animate={{
            y: [0, -20, 0],
            rotate: [-10, 15, -10],
            scale: [0.95, 1.05, 0.95],
          }}
          transition={{
            duration: duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: sticker.delay,
          }}
        >
          {sticker.emoji}
        </motion.div>
      );
    })}
  </div>
);

// ==========================================
// MAIN SCREEN
// ==========================================

export default function GiftScreen() {
  const [isAccepted, setIsAccepted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play().catch(e => console.log(e));
      setIsPlaying(!isPlaying);
    }
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
    // Trigger smaller confetti on initial load
    triggerConfetti(false);

    // Setup Audio
    audioRef.current = new Audio("/romantic-song2.mp3"); // Đổi tên file nhạc thành gift-song.mp3
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    // Thử auto-play khi vào trang
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        setIsPlaying(true);
      }).catch(error => {
        console.log("Trình duyệt chặn auto-play, người dùng cần click nút âm nhạc:", error);
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#FFF9FB] selection:bg-[#FF4D8D]/30 py-12 px-4 sm:px-6 font-sans">
      <CinematicBackground />
      <FloatingStickers />
      <MusicControl isPlaying={isPlaying} toggleAudio={toggleAudio} />

      <AnimatePresence mode="wait">
        <motion.div
          key="revealed"
          className="w-full max-w-4xl relative z-20 flex flex-col items-center"
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
      </AnimatePresence>
    </main>
  );
}
