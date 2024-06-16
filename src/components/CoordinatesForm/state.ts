import { IButton, IFormInput } from "../..";

export enum FORM_INPUT_NAMES {
  lat1 = "lat1",
  lon1 = "lon1",
  lat2 = "lat2",
  lon2 = "lon2",
  searchPointA = "searchPointA",
  searchPointB = "searchPointB",
}

export interface IFormState {
  [FORM_INPUT_NAMES.lat1]: IFormInput;
  [FORM_INPUT_NAMES.lon1]: IFormInput;
  [FORM_INPUT_NAMES.lat2]: IFormInput;
  [FORM_INPUT_NAMES.lon2]: IFormInput;
  [FORM_INPUT_NAMES.searchPointA]: IFormInput;
  [FORM_INPUT_NAMES.searchPointB]: IFormInput;
  [BUTTON_NAMES.myLocationA]: IButton;
  [BUTTON_NAMES.myLocationB]: IButton;
  [BUTTON_NAMES.cancelA]: IButton;
  [BUTTON_NAMES.cancelB]: IButton;
}

export enum BUTTON_NAMES {
  myLocationA = "myLocationA",
  myLocationB = "myLocationB",
  cancelA = "cancelA",
  cancelB = "cancelB",
}

export interface IButtons {
  [BUTTON_NAMES.myLocationA]: IButton;
  [BUTTON_NAMES.myLocationB]: IButton;
  [BUTTON_NAMES.cancelA]: IButton;
  [BUTTON_NAMES.cancelB]: IButton;
}

export const initialState = {
  [FORM_INPUT_NAMES.lat1]: { value: "", error: "", suggestions: [] },
  [FORM_INPUT_NAMES.lon1]: { value: "", error: "", suggestions: [] },
  [FORM_INPUT_NAMES.lat2]: { value: "", error: "", suggestions: [] },
  [FORM_INPUT_NAMES.lon2]: { value: "", error: "", suggestions: [] },
  [FORM_INPUT_NAMES.searchPointA]: { value: "", error: "", suggestions: [] },
  [FORM_INPUT_NAMES.searchPointB]: { value: "", error: "", suggestions: [] },
  [BUTTON_NAMES.myLocationA]: { isLoading: false },
  [BUTTON_NAMES.myLocationB]: { isLoading: false },
  [BUTTON_NAMES.cancelA]: { isLoading: false },
  [BUTTON_NAMES.cancelB]: { isLoading: false },
};
