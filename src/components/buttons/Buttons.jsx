const Button = ({ children, size = "medium", color = "primary", className = "", ...props }) => {
  const base = "rounded font-bold disabled:opacity-50 transition-all";

  const sizeClasses = {
    small: "text-xs px-2 py-1",
    medium: "text-sm px-4 py-1",
    large: "text-sm w-1/2 py-1",
    fixed: "text-sm w-32 py-1",
  };

  const colorClasses = {
    primary: "bg-secondary text-white",
    secondary: "bg-secondary text-white",
    danger: "bg-red-700 text-white",
    gray: "bg-gray-400 text-white border border-gray-400 cursor-not-allowed", // ✅ Added
  };

  return (
    <button
      className={`${base} ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
