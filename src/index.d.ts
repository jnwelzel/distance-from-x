import { BUTTON_NAMES } from "./components";

type SuggestionClickCallback = (value: string, inputName: string) => void;
type MyLocationClickCallback = (
  myLocationButton: BUTTON_NAMES.myLocationA | BUTTON_NAMES.myLocationB
) => void;

interface IFormInput {
  value: string;
  error?: string;
  suggestions?: string[];
}

interface IButton {
  isLoading: boolean;
}
