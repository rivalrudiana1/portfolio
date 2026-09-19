const Badge = ({ children, variant = 'default' }) => {
  const baseClasses = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors";
  
  const variants = {
    default: "border-transparent bg-ulbi-blue text-white dark:bg-ulbi-orange",
    outline: "text-ulbi-blue border-ulbi-blue/30 bg-ulbi-blue/5 dark:text-zinc-300 dark:border-white/15 dark:bg-white/5",
    primary: "border-ulbi-orange/30 bg-ulbi-orange/10 text-ulbi-orange"
  };

  return (
    <span className={`${baseClasses} ${variants[variant] ?? variants.default}`}>
      {children}
    </span>
  );
};

export default Badge;
