import { FC } from "react";

enum ButtonVariant {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  ERROR = "error",
  WARNING = "warning",
  DEFAULT = "default",
}

type ButtonVariants = `${ButtonVariant}`;

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants;
  className?: string;
}

const colors = {
  default: {
    background: "bg-neutral-200",
    border: "border-neutral-300",
    text: "text-neutral-800",
    hover: "enabled:hover:bg-neutral-300",
  },
  primary: {
    background: "bg-sky-700",
    border: "border-sky-800",
    text: "text-white",
    hover: "enabled:hover:bg-sky-800",
  },
  secondary: {
    background: "bg-white",
    border: "border-slate-800",
    text: "text-slate-800",
    hover: "enabled:hover:bg-neutral-100",
  },
  error: {
    background: "bg-red-700",
    border: "border-red-800",
    text: "text-white",
    hover: "enabled:hover:bg-red-800",
  },
  warning: {
    background: "bg-yellow-700",
    border: "border-yellow-800",
    text: "text-white",
    hover: "enabled:hover:bg-yellow-800",
  },
};

export const Button: FC<IButtonProps> = (props) => {
  const { variant = "primary", className, ...restProps } = props;

  return (
    <button
      {...restProps}
      className={`py-2 px-5 ${colors[variant].background} ${colors[variant].hover} ${colors[variant].border} ${colors[variant].text} rounded border shadow disabled:opacity-65 disabled:cursor-not-allowed ${className}`}
    />
  );
};
