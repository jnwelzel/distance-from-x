import { FC } from "react";

enum ButtonVariant {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  ERROR = "error",
  WARNING = "warning",
}

type ButtonVariants = `${ButtonVariant}`;

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants;
  className?: string;
}

const colors = {
  primary: {
    background: "bg-sky-700",
    border: "border-sky-800",
    text: "text-white",
  },
  secondary: {
    background: "bg-white",
    border: "border-slate-800",
    text: "text-slate-800",
  },
  error: {
    background: "bg-red-700",
    border: "border-red-800",
    text: "text-white",
  },
  warning: {
    background: "bg-yellow-700",
    border: "border-yellow-800",
    text: "text-white",
  },
};

export const Button: FC<IButtonProps> = (props) => {
  const { variant = "primary", className, ...restProps } = props;

  return (
    <button
      {...restProps}
      className={`py-2 px-5 ${colors[variant].background} ${colors[variant].border} ${colors[variant].text} rounded border shadow ${className}`}
    />
  );
};
