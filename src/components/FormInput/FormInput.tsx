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
        <label className="text-slate-800 py-1" htmlFor={id}>
          {label}
        </label>
      ) : null}
      <input
        {...restProps}
        className={`text-slate-800 shadow border-solid border rounded p-2 ${
          errorMessage ? "border-red-600" : ""
        }`}
        id={id}
      />
      {errorMessage ? (
        <span className="text-red-600 py-1 italic text-sm">{errorMessage}</span>
      ) : null}
      <span></span>
    </span>
  );
};
