'use client';

import { motion } from 'framer-motion';

const glassPanelVariants = {
  hidden: (i: number) => ({
    opacity: 0,
    y: -100 * i,
    scale: 0.8,
    rotateX: 45,
  }),
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      delay: i * 0.3,
      duration: 1,
      type: 'spring',
      stiffness: 80,
    },
  }),
};

const glowPulsate = {
  animate: {
    scale: [1, 1.2, 1],
    boxShadow: [
      '0 0 30px rgba(255,0,255,0.2)',
      '0 0 60px rgba(0,255,255,0.5)',
      '0 0 30px rgba(255,0,255,0.2)',
    ],
  },
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};

export default function UltraMotionUI() {
  return (
    <div className="relative h-screen w-full bg-black flex items-center justify-center overflow-hidden">
      {/* Star background */}
      {[...Array(1000)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white rounded-full"
          style={{
            width: `${Math.random() * 3}px`,
            height: `${Math.random() * 3}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: 0.3 + Math.random() * 0.7,
          }}
          animate={{
            y: [0, 10, -10, 0],
            x: [0, 5, -5, 0],
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.1,
          }}
        />
      ))}

      {/* Glass Panels */}
      {[...Array(1)].map((_, i) => (
        <motion.div
          key={i}
          custom={i + 1}
          initial="hidden"
          animate="visible"
          variants={glassPanelVariants}
          className="relative z-10 w-[300px] h-[150px] mb-6 rounded-xl bg-white/10 border border-white/20 backdrop-blur-xl flex items-center justify-center text-white text-lg font-bold shadow-lg"
          whileHover={{
            scale: 1.05 *2  ,
            rotateZ: i % 2 === 0 ? -2 : 2,
            backgroundColor: 'rgba(255,255,255,0.05)',
            boxShadow: '0 0 40px rgba(0,255,255,0.2)',
          }}
          whileTap={{
            scale: 0.95,
            rotateZ: 0,
          }}
        >
          Hologram Panel {i + 1}
        </motion.div>
      ))}

      {/* Central Ring Animation */}
      <motion.svg
        viewBox="0 0 200 200"
        className="absolute w-[240px] h-[240px] z-20"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      >
        <motion.circle
          cx="100"
          cy="100"
          r="90"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="10 20"
          strokeLinecap="round"
        />
      </motion.svg>
    </div>
  );
}
