import { FC } from "react";

interface ISuggestionsProps {
  items: string[];
  handleOnClick?: SuggestionClickCallback;
  inputName: string;
}

export const Suggestions: FC<ISuggestionsProps> = (props) => {
  const { items, handleOnClick, inputName } = props;

  return (
    <ul className="absolute bg-white shadow mt-1 border rounded w-full grid z-10">
      {items.map((item, i) => (
        <li
          key={`suggestion-${i}`}
          className="text-sm hover:bg-slate-100 line-clamp-1 leading-loose px-2 py-1 cursor-pointer"
          onClick={() => {
            if (handleOnClick) {
              handleOnClick(item, inputName);
            }
          }}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};
