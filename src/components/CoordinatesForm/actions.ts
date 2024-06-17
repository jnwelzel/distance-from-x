import { BUTTON_NAMES, FORM_INPUT_NAMES } from "./state";

export enum FormActionTypes {
  "clearPointForm",
  "setSuggestion",
  "updateLatAndLon",
  "setIsButtonLoading",
  "updateSearchValue",
  "setInputError",
  "clearErrors",
  "changeInputValue",
  "clearError",
  "clearSuggestions",
}

type ClearPointForm = {
  type: FormActionTypes.clearPointForm;
  searchInput: FORM_INPUT_NAMES.searchPointA | FORM_INPUT_NAMES.searchPointB;
  latInput: FORM_INPUT_NAMES.lat1 | FORM_INPUT_NAMES.lat2;
  lonInput: FORM_INPUT_NAMES.lon1 | FORM_INPUT_NAMES.lon2;
};

type SetSuggestion = {
  type: FormActionTypes.setSuggestion;
  value: string[];
  searchInputName:
    | FORM_INPUT_NAMES.searchPointA
    | FORM_INPUT_NAMES.searchPointB;
};

type UpdateLatAndLon = {
  type: FormActionTypes.updateLatAndLon;
  latInput: FORM_INPUT_NAMES.lat1 | FORM_INPUT_NAMES.lat2;
  lonInput: FORM_INPUT_NAMES.lon1 | FORM_INPUT_NAMES.lon2;
  lat: string;
  lon: string;
};

type SetIsButtonLoading = {
  type: FormActionTypes.setIsButtonLoading;
  button: BUTTON_NAMES.myLocationA | BUTTON_NAMES.myLocationB;
  value: boolean;
};

type UpdateSearchValue = {
  type: FormActionTypes.updateSearchValue;
  searchInputName:
    | FORM_INPUT_NAMES.searchPointA
    | FORM_INPUT_NAMES.searchPointB;
  value: string;
};

type SetInputError = {
  type: FormActionTypes.setInputError;
  inputName:
    | FORM_INPUT_NAMES.lat1
    | FORM_INPUT_NAMES.lat2
    | FORM_INPUT_NAMES.lon1
    | FORM_INPUT_NAMES.lon2
    | FORM_INPUT_NAMES.searchPointA
    | FORM_INPUT_NAMES.searchPointB;
  error: string;
};

type ClearErrors = {
  type: FormActionTypes.clearErrors;
};

type ChangeInputValue = {
  type: FormActionTypes.changeInputValue;
  inputName:
    | FORM_INPUT_NAMES.lat1
    | FORM_INPUT_NAMES.lat2
    | FORM_INPUT_NAMES.lon1
    | FORM_INPUT_NAMES.lon2
    | FORM_INPUT_NAMES.searchPointA
    | FORM_INPUT_NAMES.searchPointB;
  value: string;
};

type ClearError = {
  type: FormActionTypes.clearError;
  inputName:
    | FORM_INPUT_NAMES.lat1
    | FORM_INPUT_NAMES.lat2
    | FORM_INPUT_NAMES.lon1
    | FORM_INPUT_NAMES.lon2
    | FORM_INPUT_NAMES.searchPointA
    | FORM_INPUT_NAMES.searchPointB;
};

type ClearSuggestions = {
  type: FormActionTypes.clearSuggestions;
  inputName:
    | FORM_INPUT_NAMES.lat1
    | FORM_INPUT_NAMES.lat2
    | FORM_INPUT_NAMES.lon1
    | FORM_INPUT_NAMES.lon2
    | FORM_INPUT_NAMES.searchPointA
    | FORM_INPUT_NAMES.searchPointB;
};

export type FormActions =
  | ClearPointForm
  | SetSuggestion
  | UpdateLatAndLon
  | SetIsButtonLoading
  | UpdateSearchValue
  | SetInputError
  | ClearErrors
  | ChangeInputValue
  | ClearError
  | ClearSuggestions;
