import { FC } from "react";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  label?: string;
}

export const FormInput: FC<IInputProps> = (props) => {
  const { errorMessage, label, id, ...restProps } = props;

  return (
    <span className="flex flex-col">
      {label ? (
        <label className="text-white" htmlFor={id}>
          {label}
        </label>
      ) : null}
      <input
        {...restProps}
        className={`text-slate-800 ${
          errorMessage ? "border-2 border-solid border-red-500" : ""
        }`}
        id={id}
      />
      {errorMessage ? (
        <span className="text-red-500">{errorMessage}</span>
      ) : null}
      <span></span>
    </span>
  );
};
