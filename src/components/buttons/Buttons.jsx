
const Button = ({
  children,
  size = "medium",             // 'small' | 'medium' | 'large' | 'fixed'
  color = "primary",           // 'primary' | 'secondary' | 'danger' | 'gray'
  className = "",
  type = "button",            
  ...props
}) => {
  // Base styles applied to all buttons
  const base = "rounded font-bold disabled:opacity-50 transition-all focus:outline-none";

  //  Size variations
  const sizeClasses = {
    small: "text-xs px-2 py-1",
    medium: "text-sm px-4 py-1",
    large: "text-sm w-1/2 py-1",
    fixed: "text-sm w-32 py-1",
  };

  const colorClasses = {
    primary: "bg-secondary text-white hover:bg-secondary/90",       
    secondary: "bg-tabBg text-primaryFont hover:bg-tabBg/80",       
    danger: "bg-red-600 text-white hover:bg-red-700",               
    gray: "bg-border text-darkGray border border-border cursor-not-allowed", 
  };

  return (
    <button
      type={type}
      className={`${base} ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
