import { useReducer, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import {
  calculateDistance,
  fetchAddressFromCoordinates,
  fetchCoordinatesFromAddress,
  isValidLatitude,
  isValidLongitude,
} from "../helpers";
import {
  BUTTON_NAMES,
  FORM_INPUT_NAMES,
  FormActionTypes,
  coordinatesFormReducer,
  initialState,
} from "../components";

export const useCoordinatesForm = () => {
  const [state, dispatch] = useReducer(coordinatesFormReducer, initialState);
  const [kilometers, setKilometers] = useState<number>(0);

  const fetchCoordinates = useDebouncedCallback(
    async (
      searchValue: string,
      field: FORM_INPUT_NAMES.searchPointA | FORM_INPUT_NAMES.searchPointB
    ) => {
      // Fetch data from Google
      const res = await fetchCoordinatesFromAddress(searchValue);

      if (res.error) {
        dispatch({ type: FormActionTypes.clearSuggestions, inputName: field });
        dispatch({
          type: FormActionTypes.setInputError,
          inputName: field,
          error: res.error,
        });
      } else {
        // Clear any existing error msgs and set values
        dispatch({ type: FormActionTypes.clearError, inputName: field });
        dispatch({
          type: FormActionTypes.setSuggestion,
          searchInputName: field,
          value: res.formattedAddress ? [res.formattedAddress] : [],
        });
      }
    },
    500
  );

  const isSearchInput = (fieldName: string): boolean =>
    fieldName === FORM_INPUT_NAMES.searchPointA ||
    fieldName === FORM_INPUT_NAMES.searchPointB;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Set the value for the right input
    Object.values(FORM_INPUT_NAMES).forEach((input) => {
      if (input === e.target.name) {
        dispatch({
          type: FormActionTypes.changeInputValue,
          inputName: input,
          value: e.target.value,
        });
      }
    });

    // Call Geocode API
    if (isSearchInput(e.target.name)) {
      const field =
        e.target.name === FORM_INPUT_NAMES.searchPointA
          ? FORM_INPUT_NAMES.searchPointA
          : FORM_INPUT_NAMES.searchPointB;

      // Clear any existing error message
      dispatch({ type: FormActionTypes.clearError, inputName: field });

      // If input is empty hide the suggestions and exit
      if (e.target.value === "") {
        dispatch({ type: FormActionTypes.clearSuggestions, inputName: field });
        return;
      }

      fetchCoordinates(e.target.value, field);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate inputs
    // Clear all errors
    dispatch({ type: FormActionTypes.clearErrors });
    let hasError = false;
    if (!isValidLatitude(state.lat1.value ?? "")) {
      dispatch({
        type: FormActionTypes.setInputError,
        error: "Invalid latitude",
        inputName: FORM_INPUT_NAMES.lat1,
      });
      hasError = true;
    }
    if (!isValidLongitude(state.lon1.value ?? "")) {
      dispatch({
        type: FormActionTypes.setInputError,
        error: "Invalid longitude",
        inputName: FORM_INPUT_NAMES.lon1,
      });
      hasError = true;
    }
    if (!isValidLatitude(state.lat2.value ?? "")) {
      dispatch({
        type: FormActionTypes.setInputError,
        error: "Invalid latitude",
        inputName: FORM_INPUT_NAMES.lat2,
      });
      hasError = true;
    }
    if (!isValidLongitude(state.lon2.value ?? "")) {
      dispatch({
        type: FormActionTypes.setInputError,
        error: "Invalid longitude",
        inputName: FORM_INPUT_NAMES.lon2,
      });
      hasError = true;
    }

    // And bail if error(s)
    if (hasError) {
      return;
    }

    // Calculate distance
    const result = calculateDistance(
      parseFloat(state.lat1.value),
      parseFloat(state.lon1.value),
      parseFloat(state.lat2.value),
      parseFloat(state.lon2.value)
    );
    setKilometers(result);
  };

  const handleUserLocation = (
    button: BUTTON_NAMES.myLocationA | BUTTON_NAMES.myLocationB
  ) => {
    dispatch({ type: FormActionTypes.setIsButtonLoading, button, value: true });

    navigator.geolocation.getCurrentPosition(
      async (position: GeolocationPosition) => {
        const { latitude, longitude } = position.coords;
        const latField =
          button === BUTTON_NAMES.myLocationA
            ? FORM_INPUT_NAMES.lat1
            : FORM_INPUT_NAMES.lat2;
        const lonField =
          button === BUTTON_NAMES.myLocationA
            ? FORM_INPUT_NAMES.lon1
            : FORM_INPUT_NAMES.lon2;

        dispatch({
          type: FormActionTypes.setIsButtonLoading,
          button,
          value: false,
        });

        dispatch({
          type: FormActionTypes.updateLatAndLon,
          latInput: latField,
          lonInput: lonField,
          lat: latitude.toFixed(7),
          lon: longitude.toFixed(7),
        });

        // Fetch Geocode data for browser coordinates
        const geocodeData = await fetchAddressFromCoordinates(
          latitude,
          longitude
        );
        // Show formatted address in search input
        const searchField =
          button === BUTTON_NAMES.myLocationA
            ? FORM_INPUT_NAMES.searchPointA
            : FORM_INPUT_NAMES.searchPointB;
        if (!geocodeData.error) {
          dispatch({
            type: FormActionTypes.updateSearchValue,
            searchInputName: searchField,
            value: geocodeData.formattedAddress,
          });
        }
      },
      () => {
        dispatch({
          type: FormActionTypes.setIsButtonLoading,
          button,
          value: false,
        });
      }
    );
  };

  const handleSuggestionClick = async (
    suggestion: string,
    inputName: string
  ) => {
    // Figure out which search field and set suggestion as input value
    const searchInputName =
      inputName === FORM_INPUT_NAMES.searchPointA
        ? FORM_INPUT_NAMES.searchPointA
        : FORM_INPUT_NAMES.searchPointB;

    dispatch({
      type: FormActionTypes.updateSearchValue,
      searchInputName,
      value: suggestion,
    });
    dispatch({
      type: FormActionTypes.clearSuggestions,
      inputName: searchInputName,
    });

    const res = await fetchCoordinatesFromAddress(suggestion);
    if (!res.error) {
      // Set lat and lon values in corresponding inputs
      const latInput =
        inputName === FORM_INPUT_NAMES.searchPointA
          ? FORM_INPUT_NAMES.lat1
          : FORM_INPUT_NAMES.lat2;
      const lonInput =
        inputName === FORM_INPUT_NAMES.searchPointA
          ? FORM_INPUT_NAMES.lon1
          : FORM_INPUT_NAMES.lon2;
      dispatch({
        type: FormActionTypes.updateLatAndLon,
        latInput,
        lonInput,
        lat: res?.lat,
        lon: res.lon,
      });
    }
  };

  const handleCancelClick = (button: BUTTON_NAMES) => {
    const searchInput =
      button === BUTTON_NAMES.cancelA
        ? FORM_INPUT_NAMES.searchPointA
        : FORM_INPUT_NAMES.searchPointB;
    const latInput =
      button === BUTTON_NAMES.cancelA
        ? FORM_INPUT_NAMES.lat1
        : FORM_INPUT_NAMES.lat2;
    const lonInput =
      button === BUTTON_NAMES.cancelA
        ? FORM_INPUT_NAMES.lon1
        : FORM_INPUT_NAMES.lon2;

    dispatch({
      type: FormActionTypes.clearPointForm,
      searchInput,
      latInput,
      lonInput,
    });
  };

  return {
    handleSubmit,
    handleChange,
    state,
    handleUserLocation,
    kilometers,
    handleSuggestionClick,
    handleCancelClick,
  };
};
