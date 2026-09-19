import { motion } from 'framer-motion';

// Tombol glow ala Portofolio_V5: blur gradient di belakang + shine sweep + ikon ikut geser.
const styles = {
  primary: {
    glow: 'bg-gradient-to-r from-ulbi-orange to-[#c94520]',
    inner: 'bg-ulbi-orange text-white hover:bg-[#c94520] shadow-lg shadow-ulbi-orange/25',
  },
  outline: {
    glow: 'bg-gradient-to-r from-ulbi-blue to-ulbi-orange',
    inner:
      'bg-transparent border-2 border-ulbi-blue text-ulbi-blue hover:bg-ulbi-blue hover:text-white dark:border-white/30 dark:text-white dark:hover:bg-white dark:hover:text-zinc-950',
  },
  blue: {
    glow: 'bg-gradient-to-r from-ulbi-blue to-[#001b59]',
    inner: 'bg-ulbi-blue text-white hover:bg-[#001b59] shadow-md dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200',
  },
};

const GlowButton = ({
  href,
  onClick,
  type = 'button',
  variant = 'primary',
  icon,
  children,
  className = '',
  disabled = false,
  download = false,
  target,
  rel,
}) => {
  const s = styles[variant] ?? styles.primary;
  const cls = `group relative inline-flex w-full sm:w-auto ${className}`;

  const inner = (
    <>
      <span
        className={`absolute -inset-1 rounded-full ${s.glow} blur-md opacity-30 group-hover:opacity-70 transition-opacity duration-500`}
        aria-hidden="true"
      />
      <span
        className={`btn-shine relative inline-flex w-full sm:w-auto items-center justify-center gap-2 px-8 py-3.5 rounded-full font-semibold transition-all duration-300 ${s.inner}`}
      >
        {children}
        {icon && (
          <span className="inline-flex transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
            {icon}
          </span>
        )}
      </span>
    </>
  );

  if (href) {
    // download diabaikan browser saat cross-origin / _blank — jangan gabungkan keduanya.
    const isDownload = Boolean(download);
    const effectiveTarget = isDownload ? undefined : target;
    const effectiveRel =
      effectiveTarget === '_blank'
        ? ['noopener', 'noreferrer', rel].filter(Boolean).join(' ').replace(/(noopener|noreferrer)( \1)+/g, '$1')
        : rel;
    return (
      <motion.a
        href={href}
        onClick={onClick}
        download={isDownload || undefined}
        target={effectiveTarget}
        rel={effectiveRel}
        className={cls}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${cls} disabled:opacity-60 disabled:cursor-not-allowed`}
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
    >
      {inner}
    </motion.button>
  );
};

export default GlowButton;
