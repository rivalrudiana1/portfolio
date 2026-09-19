import { useRef } from 'react';
import { useMotionValue, useSpring, useTransform } from 'framer-motion';

// Tilt 3D mengikuti mouse untuk kartu (desktop + pointer halus saja).
// Mengembalikan { ref, tiltStyle } — pasang tiltStyle ke motion.div dalam .perspective-1000.
export function useTilt(maxDeg = 7) {
  const ref = useRef(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [maxDeg, -maxDeg]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-maxDeg, maxDeg]), { stiffness: 200, damping: 20 });

  const enabled =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(pointer: fine)').matches &&
    !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  const onMouseMove = (e) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  const onMouseLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return { ref, tiltStyle: enabled ? { rotateX, rotateY } : undefined, onMouseMove, onMouseLeave };
}
