import { FC } from "react";
import { Suggestions } from "./Suggestions/Suggestions";
import { SuggestionClickCallback } from "../..";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  label?: string;
  containerClass?: string;
  suggestions?: string[];
  handleSuggestionClick?: SuggestionClickCallback;
  name: string;
}

export const FormInput: FC<IInputProps> = (props) => {
  const {
    errorMessage,
    label,
    id,
    containerClass,
    suggestions = [],
    handleSuggestionClick,
    name,
    ...restProps
  } = props;

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
          name={name}
          id={id}
        />
        {suggestions?.length > 0 ? (
          <Suggestions
            items={suggestions}
            handleOnClick={handleSuggestionClick}
            inputName={name}
          />
        ) : null}
      </div>
      {errorMessage ? (
        <span className="text-red-600 py-1 italic text-sm">{errorMessage}</span>
      ) : null}
    </span>
  );
};
