export enum FORM_INPUT_NAMES {
  lat1 = "lat1",
  lon1 = "lon1",
  lat2 = "lat2",
  lon2 = "lon2",
  searchPointA = "searchPointA",
  searchPointB = "searchPointB",
}

export interface IFormInput {
  value: string;
  error?: string;
  suggestions?: string[];
}

export interface IFormState {
  [FORM_INPUT_NAMES.lat1]: IFormInput;
  [FORM_INPUT_NAMES.lon1]: IFormInput;
  [FORM_INPUT_NAMES.lat2]: IFormInput;
  [FORM_INPUT_NAMES.lon2]: IFormInput;
  [FORM_INPUT_NAMES.searchPointA]: IFormInput;
  [FORM_INPUT_NAMES.searchPointB]: IFormInput;
}

interface IButton {
  isLoading: boolean;
}
export interface IButtons {
  myLocationA: IButton;
  myLocationB: IButton;
}
