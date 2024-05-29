import { FC } from "react";
import { Suggestions } from "./Suggestions/Suggestions";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  label?: string;
  containerClass?: string;
  suggestions?: string[];
  handleSuggestionClick?: (item: string) => void;
}

export const FormInput: FC<IInputProps> = (props) => {
  const { errorMessage, label, id, containerClass, suggestions, ...restProps } =
    props;

  return (
    <span className={`${containerClass} flex flex-col`}>
      {label ? (
        <label className="text-slate-800 py-1" htmlFor={id}>
          {label}
        </label>
      ) : null}
      <div className="relative w-full">
        <input
          {...restProps}
          className={`text-slate-800 shadow border-solid border rounded p-2 relative w-full ${
            errorMessage ? "border-red-600" : ""
          }`}
          id={id}
        />
        {suggestions ? <Suggestions items={suggestions} /> : null}
      </div>
      {errorMessage ? (
        <span className="text-red-600 py-1 italic text-sm">{errorMessage}</span>
      ) : null}
    </span>
  );
};
