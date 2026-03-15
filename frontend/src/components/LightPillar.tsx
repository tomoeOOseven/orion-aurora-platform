import { motion } from 'framer-motion';

type LightPillarProps = {
  topColor: string;
  bottomColor: string;
  pillarCount?: number;
  pillarOpacity?: number;
};

export default function LightPillar({
  topColor,
  bottomColor,
  pillarCount = 5,
  pillarOpacity = 0.18,
}: LightPillarProps) {
  const pillars = Array.from({ length: pillarCount });

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(126,255,41,0.2),transparent_55%)]" />
      {pillars.map((_, i) => {
        const width = 12 + (i % 3) * 9;
        const left = 10 + i * (80 / Math.max(pillarCount - 1, 1));
        const duration = 6 + i * 0.8;

        return (
          <motion.div
            key={i}
            className="absolute bottom-0 rounded-full blur-2xl"
            style={{
              left: `${left}%`,
              width: `${width}rem`,
              height: '130%',
              transform: 'translateX(-50%)',
              background: `linear-gradient(to top, ${bottomColor}, ${topColor})`,
              opacity: pillarOpacity,
            }}
            animate={{
              y: [0, -22, 0],
              opacity: [pillarOpacity * 0.7, pillarOpacity, pillarOpacity * 0.7],
              scaleY: [1, 1.08, 1],
            }}
            transition={{ repeat: Infinity, duration, ease: 'easeInOut' }}
          />
        );
      })}
    </div>
  );
}
