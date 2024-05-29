import { FC } from "react";

interface ISuggestionsProps {
  items: string[];
}

export const Suggestions: FC<ISuggestionsProps> = (props) => {
  const { items } = props;

  return (
    <ul className="absolute bg-white shadow mt-1 border rounded w-full grid z-10">
      {items.map((item) => (
        <li className="text-sm hover:bg-slate-100 line-clamp-1 leading-loose px-2 py-1 cursor-pointer">
          {item}
        </li>
      ))}
    </ul>
  );
};
