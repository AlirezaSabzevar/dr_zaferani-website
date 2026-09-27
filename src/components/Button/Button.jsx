import "./Button.css";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  startIcon,
  endIcon,
  type = "button",
  disabled = false,
  onClick,

  // جدید
  as: Component = "button",
  className = "",

  ...props
}) => {
  return (
    <Component
      type={Component === "button" ? type : undefined}
      disabled={Component === "button" ? disabled : undefined}
      onClick={onClick}
      className={`
        btn
        btn--${variant}
        btn--${size}
        ${fullWidth ? "btn--full" : ""}
        ${className}
      `}
      {...props}
    >
      {startIcon && (
        <span className="btn__icon">
          {startIcon}
        </span>
      )}

      <span className="btn__text">
        {children}
      </span>

      {endIcon && (
        <span className="btn__icon">
          {endIcon}
        </span>
      )}
    </Component>
  );
};

export default Button;