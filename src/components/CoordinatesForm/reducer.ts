import { FormActionTypes, FormActions } from "./actions";
import { IFormState } from "./state";

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
