"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { Heart, Sparkles, Disc3 } from "lucide-react";

// ==========================================
// DATA
// ==========================================
const memories = [
  { id: 1, image: "photos/anh1.jpg", caption: "Valentine với cục dàng", date: "14.02.2025" },
  { id: 2, image: "photos/anh2.jpg", caption: "Xem Nhà Gia Tiên về ghé quán Gió Sông", date: "21.2.2025" },
  { id: 3, image: "photos/anh3.jpg", caption: "Tan ca 23h và mì cay muộn cùng em", date: "20.4.2025" },
  { id: 4, image: "photos/anh4.jpg", caption: "Valentine ở Kichi-Kichi", date: "14.02.2026" },
  { id: 5, image: "photos/anh5.jpg", caption: "Thưởng thức beefsteak lần đầu tiên cùng em iu", date: "20.2.2026" },
  { id: 6, image: "photos/anh6.jpg", caption: "Cạp nong - Cạp nia", date: "22.3.2026" },
  { id: 7, image: "photos/anh7.jpg", caption: "Đi ăn Chôn li be", date: "17.5.2026" },
  { id: 8, image: "photos/anh8.jpg", caption: "Ăn buffet nướng Suki house", date: "7.6.2026" },
];

const LETTER_SENTENCES = [
  "Cảm ơn em đã đến bên anh và làm thanh xuân này trở nên đặc biệt hơn.",
  "Mỗi nụ cười, mỗi ánh mắt...",
  "...và từng khoảnh khắc bên em đều là những kỷ niệm đẹp mà anh luôn trân trọng.",
  "Hãy cùng anh nhìn lại những kỉ niệm yêu thương của chúng mình nhé..."
];

// ==========================================
// COMPONENTS
// ==========================================

const CinematicBackground = ({ scene }: { scene: number }) => {
  // Cảnh 1-2: Sáng (Aurora). Cảnh 3-5: Tối, deep, ấm áp (Table/Cinematic mode).
  const isDarkScene = scene >= 3;

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden -z-10 transition-colors duration-[3000ms] ease-in-out ${isDarkScene ? 'bg-[#1A1A1A]' : 'bg-[#FAFAFA]'}`}>
      <motion.div
        animate={{ opacity: isDarkScene ? 0 : 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0"
      >
        <motion.div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#FFE4EC] mix-blend-multiply blur-[120px] opacity-70" animate={{ x: [0, 30, 0], y: [0, 40, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-[#FFD6E7] mix-blend-multiply blur-[140px] opacity-50" animate={{ x: [0, -30, 0], y: [0, -40, 0] }} transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }} />
      </motion.div>

      <motion.div
        animate={{ opacity: isDarkScene ? 1 : 0 }}
        transition={{ duration: 2 }}
        className="absolute inset-0"
      >
        {/* Dark Cinematic Lighting */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)]" />
        <motion.div className="absolute top-[20%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-[#FF4D8D]/10 blur-[120px] opacity-40" animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} />

        {/* Floating Ambient Light Orbs */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full bg-white/20 blur-[2px]"
            style={{ width: Math.random() * 4 + 2 + "px", height: Math.random() * 4 + 2 + "px", top: "110vh", left: Math.random() * 100 + "vw" }}
            animate={{ y: "-20vh", x: `+=${Math.random() * 60 - 30}px`, opacity: [0, 0.5, 0] }}
            transition={{ duration: Math.random() * 15 + 15, repeat: Infinity, ease: "linear", delay: Math.random() * 10 }}
          />
        ))}
      </motion.div>
    </div>
  );
};

const MusicControl = ({ isPlaying, toggleAudio, show }: any) => (
  <AnimatePresence>
    {show && (
      <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        onClick={toggleAudio}
        className="fixed top-6 right-6 z-50 flex items-center gap-3 px-4 py-2 bg-black/5 backdrop-blur-md border border-white/20 rounded-full text-black hover:bg-black/10 transition-all cursor-pointer group"
      >
        <div className={`relative flex items-center justify-center w-8 h-8 rounded-full bg-white/80 shadow-sm ${isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''}`}>
          <Disc3 size={18} className="text-[#FF4D8D]" />
        </div>
        <span className="text-xs font-inter font-medium tracking-widest uppercase opacity-70 group-hover:opacity-100 transition-opacity hidden sm:block">
          {isPlaying ? "Music On" : "Music Off"}
        </span>
      </motion.button>
    )}
  </AnimatePresence>
);

const PhotoCard = ({ card, index, removeCard, isFront }: any) => {
  const [exitX, setExitX] = useState(0);

  const handleDragEnd = (e: any, info: PanInfo) => {
    if (info.offset.y > 100 || info.offset.x > 100 || info.offset.x < -100) {
      setExitX(info.offset.x);
      // Giống như đặt ảnh xuống bàn
      removeCard(card.id, info.offset.x, info.offset.y);
    }
  };

  return (
    <motion.div
      className="absolute top-0 left-0 w-full aspect-[3/3.8] bg-[#FDFDFD] rounded-sm p-4 pb-6 sm:p-5 sm:pb-8 flex flex-col justify-between cursor-grab active:cursor-grabbing will-change-transform overflow-hidden"
      style={{
        boxShadow: "0 20px 40px -5px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.2)",
        backgroundImage: "url('https://www.transparenttextures.com/patterns/cream-paper.png')", // Realistic paper texture
      }}
      initial={{ scale: 0.95, y: 50, opacity: 0 }}
      animate={{
        scale: isFront ? 1 : Math.max(0.85, 1 - index * 0.04),
        y: isFront ? 0 : index * -15,
        rotateZ: isFront ? 0 : index % 2 === 0 ? 2 : -2,
        opacity: 1 - index * 0.15,
        zIndex: 10 - index
      }}
      exit={{
        x: exitX,
        y: 300, // Rơi xuống dưới như đặt xuống bàn
        opacity: 0,
        scale: 0.8,
        rotateZ: exitX > 0 ? 15 : -15,
        transition: { duration: 0.6, type: "spring", bounce: 0.2 }
      }}
      drag={isFront ? true : false}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.8}
      onDragEnd={handleDragEnd}
      whileHover={isFront ? { scale: 1.02 } : {}}
      whileTap={isFront ? { scale: 1.05, cursor: "grabbing" } : {}}
    >
      <div className="relative w-full aspect-square overflow-hidden bg-[#E5E5E5] shadow-[inset_0_2px_10px_rgba(0,0,0,0.1)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={card.image} alt="Memory" className="w-full h-full object-cover select-none brightness-95 contrast-105 filter sepia-[0.1]" draggable={false} />
        {/* Soft reflection */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
      </div>
      <div className="flex-1 flex flex-col items-center justify-end pt-4 sm:pt-6 pointer-events-none opacity-80">
        <p className="font-cormorant font-serif text-[#2C2C2C] font-semibold italic text-center text-xl sm:text-2xl px-2 leading-tight">
          {card.caption}
        </p>
        <span className="text-[#888888] font-inter text-[10px] sm:text-xs mt-2 uppercase tracking-[0.2em]">{card.date}</span>
      </div>
    </motion.div>
  );
};

export default function LetterScreen() {
  const router = useRouter();

  // Scenes: 
  // 1: Welcome
  // 2: Letter Typewriter
  // 3: Photos Table
  // 4: Grand Finale (Heart)
  // 5: Button appears
  // 6: Transition Light Fade
  const [scene, setScene] = useState(1);

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [activeSentence, setActiveSentence] = useState(-1);
  const [cards, setCards] = useState(memories);

  useEffect(() => {
    audioRef.current = new Audio("/romantic-song.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;
    return () => {
      if (audioRef.current) audioRef.current.pause();
    };
  }, []);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play().catch(e => console.log(e));
      setIsPlaying(!isPlaying);
    }
  };

  const startExperience = () => {
    if (!isPlaying) toggleAudio();
    setScene(2);
  };

  // Typewriter effect controller
  useEffect(() => {
    if (scene === 2) {
      let currentIdx = 0;
      const advanceSentence = () => {
        if (currentIdx < LETTER_SENTENCES.length) {
          setActiveSentence(currentIdx);
          currentIdx++;
          // Tính thời gian đọc dựa trên độ dài câu + độ trễ nghỉ (pause)
          const delay = LETTER_SENTENCES[currentIdx - 1].length * 60 + 1500;
          setTimeout(advanceSentence, delay);
        } else {
          // Xong lá thư, chờ 2s rồi qua Scene 3
          setTimeout(() => setScene(3), 2000);
        }
      };

      setTimeout(advanceSentence, 1000); // Bắt đầu sau 1s
    }
  }, [scene]);

  const handleRemoveCard = (id: number, x: number, y: number) => {
    setCards((prev) => {
      const newCards = prev.filter(c => c.id !== id);
      if (newCards.length === 0) {
        // Đã xem hết ảnh
        setTimeout(() => setScene(4), 1000);
      }
      return newCards;
    });
  };

  useEffect(() => {
    if (scene === 4) {
      setTimeout(() => setScene(5), 3000); // Hiện trái tim 3s rồi hiện nút
    }
  }, [scene]);

  const finishAndTransition = () => {
    setScene(6);
    setTimeout(() => {
      router.push("/wheel");
    }, 2000);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden font-sans">
      <CinematicBackground scene={scene} />
      <MusicControl isPlaying={isPlaying} toggleAudio={toggleAudio} show={scene > 1 && scene < 6} />

      <AnimatePresence mode="wait">

        {/* SCENE 1: WELCOME */}
        {scene === 1 && (
          <motion.div
            key="scene-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 1.5 }}
            className="flex flex-col items-center z-10"
          >
            <motion.button
              onClick={startExperience}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-[#6B7280] font-inter font-light tracking-[0.3em] uppercase text-sm sm:text-base cursor-pointer hover:text-[#FF4D8D] transition-colors duration-500"
            >
              Chạm Để Bắt Đầu
            </motion.button>
          </motion.div>
        )}

        {/* SCENE 2: LETTER */}
        {scene === 2 && (
          <motion.div
            key="scene-2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -50, filter: "blur(10px)" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="w-full max-w-2xl px-6 flex flex-col items-center justify-center text-center z-10 h-screen absolute"
          >
            <motion.div
              className="w-full"
              animate={{ scale: 1 + (activeSentence * 0.02) }} // Cinematic slow zoom-in as reading
              transition={{ duration: 5, ease: "linear" }}
            >
              {LETTER_SENTENCES.map((sentence, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                  animate={
                    index === activeSentence
                      ? { opacity: 1, y: 0, filter: "blur(0px)" } // Đang đọc
                      : index < activeSentence
                        ? { opacity: 0.3, y: -10, filter: "blur(2px)" } // Đã đọc qua
                        : { opacity: 0, y: 20, filter: "blur(10px)" } // Chưa đọc
                  }
                  transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                  className={`font-playfair text-xl sm:text-2xl md:text-3xl leading-relaxed mb-6 ${index === activeSentence ? "text-[#1F2937]" : "text-[#9CA3AF]"
                    }`}
                >
                  {sentence}
                </motion.p>
              ))}
            </motion.div>
          </motion.div>
        )}

        {/* SCENE 3: WOODEN TABLE & POLAROIDS */}
        {scene === 3 && (
          <motion.div
            key="scene-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 2 }}
            className="w-full flex flex-col items-center justify-center z-10 h-screen absolute"
          >
            <div className="relative w-full max-w-[300px] sm:max-w-[360px] aspect-[3/3.8]">
              <AnimatePresence>
                {cards.map((card, index) => (
                  <PhotoCard
                    key={card.id}
                    card={card}
                    index={index}
                    removeCard={handleRemoveCard}
                    isFront={index === 0}
                  />
                ))}
              </AnimatePresence>
            </div>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }}
              className="absolute bottom-20 text-white/40 font-inter text-xs tracking-[0.2em] uppercase font-light pointer-events-none"
            >
              Kéo ảnh xuống để tiếp tục
            </motion.div>
          </motion.div>
        )}

        {/* SCENE 4 & 5: GRAND FINALE */}
        {(scene === 4 || scene === 5) && (
          <motion.div
            key="scene-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center z-20 h-screen absolute"
          >
            {/* Glowing Heart */}
            <motion.div
              initial={{ scale: 0, opacity: 0, filter: "blur(20px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 3, ease: "easeOut" }}
              className="relative flex items-center justify-center mb-12"
            >
              <div className="absolute inset-0 bg-[#FF4D8D] blur-[80px] opacity-40 rounded-full animate-pulse" />
              <Heart size={80} className="text-[#FF4D8D] fill-[#FF4D8D] drop-shadow-[0_0_40px_rgba(255,77,141,0.8)]" />
            </motion.div>

            {/* Premium Button */}
            <AnimatePresence>
              {scene === 5 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative group cursor-pointer"
                  onClick={finishAndTransition}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FF4D8D] to-[#FF85B3] rounded-full blur-[20px] opacity-40 group-hover:opacity-70 transition-opacity duration-500" />
                  <div className="relative px-12 py-5 bg-white/10 backdrop-blur-xl border border-white/30 rounded-full overflow-hidden flex items-center gap-3">
                    <div className="absolute inset-0 translate-x-[-150%] group-hover:translate-x-[150%] bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg] transition-transform duration-[1200ms] ease-in-out" />
                    <Sparkles className="text-white" size={20} />
                    <span className="text-white font-inter font-light tracking-[0.2em] uppercase text-sm sm:text-base">
                      Khám Phá Món Quà
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SCENE 6: CINEMATIC LIGHT FADE (Overlay) */}
      <AnimatePresence>
        {scene === 6 && (
          <motion.div
            key="scene-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeIn" }}
            className="fixed inset-0 bg-white z-[100] flex items-center justify-center"
          >
            <div className="w-[200vw] h-[200vw] rounded-full bg-gradient-to-tr from-[#FF4D8D]/20 to-[#FF85B3]/20 blur-[100px] animate-spin" />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
