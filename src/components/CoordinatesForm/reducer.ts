import { BUTTON_NAMES, FORM_INPUT_NAMES, IFormState } from "./state";

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

type FormActions =
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

export const coordinatesFormReducer = (
  state: IFormState,
  action: FormActions
): IFormState => {
  switch (action.type) {
    case FormActionTypes.clearPointForm:
      return {
        ...state,
        [action.searchInput]: {
          ...state[action.searchInput],
          value: "",
          error: "",
          suggestions: [],
        },
        [action.latInput]: {
          ...state[action.latInput],
          value: "",
          error: "",
        },
        [action.lonInput]: {
          ...state[action.lonInput],
          value: "",
          error: "",
        },
      };

    case FormActionTypes.setSuggestion:
      return {
        ...state,
        [action.searchInputName]: {
          ...state[action.searchInputName],
          suggestions: action.value,
        },
      };

    case FormActionTypes.updateLatAndLon:
      return {
        ...state,
        [action.latInput]: { ...state[action.latInput], value: action.lat },
        [action.lonInput]: { ...state[action.lonInput], value: action.lon },
      };

    case FormActionTypes.setIsButtonLoading:
      return {
        ...state,
        [action.button]: {
          ...state[action.button],
          isLoading: action.value,
        },
      };

    case FormActionTypes.updateSearchValue:
      return {
        ...state,
        [action.searchInputName]: {
          ...state[action.searchInputName],
          value: action.value,
        },
      };

    case FormActionTypes.setInputError:
      return {
        ...state,
        [action.inputName]: { ...state[action.inputName], error: action.error },
      };

    case FormActionTypes.clearErrors:
      return {
        ...state,
        lat1: { ...state.lat1, error: "" },
        lon1: { ...state.lon1, error: "" },
        lat2: { ...state.lat2, error: "" },
        lon2: { ...state.lon2, error: "" },
      };

    case FormActionTypes.changeInputValue:
      return {
        ...state,
        [action.inputName]: { ...state[action.inputName], value: action.value },
      };

    case FormActionTypes.clearError:
      return {
        ...state,
        [action.inputName]: { ...state[action.inputName], error: "" },
      };

    case FormActionTypes.clearSuggestions:
      return {
        ...state,
        [action.inputName]: { ...state[action.inputName], suggestions: [] },
      };

    default:
      throw Error(`Unknown action: ${action}`);
  }
};
