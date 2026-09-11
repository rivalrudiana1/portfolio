const Badge = ({ children, variant = 'default' }) => {
  const baseClasses = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors";
  
  const variants = {
    default: "border-transparent bg-ulbi-blue text-white",
    outline: "text-ulbi-blue border-ulbi-blue/30 bg-ulbi-blue/5",
    primary: "border-ulbi-orange/30 bg-ulbi-orange/10 text-ulbi-orange"
  };

  return (
    <div className={`${baseClasses} ${variants[variant]}`}>
      {children}
    </div>
  );
};

export default Badge;
