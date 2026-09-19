import { motion } from 'framer-motion';

// Spring reveal saat masuk viewport (pengganti CSS reveal).
// API sama seperti sebelumnya: <Reveal delay={100} className="...">
const Reveal = ({ children, delay = 0, className = '', y = 28 }) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ type: 'spring', stiffness: 80, damping: 20, delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
