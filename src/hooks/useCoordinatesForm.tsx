import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import {
  calculateDistance,
  fetchCoordinatesFromAddress,
  isValidLatitude,
  isValidLongitude,
} from "../helpers";
import { FORM_INPUT_NAMES, IButtons, type IFormState } from "../components";

export const useCoordinatesForm = () => {
  const [inputs, setInputs] = useState<IFormState>({
    [FORM_INPUT_NAMES.lat1]: { value: "", error: "", suggestions: [] },
    [FORM_INPUT_NAMES.lon1]: { value: "", error: "", suggestions: [] },
    [FORM_INPUT_NAMES.lat2]: { value: "", error: "", suggestions: [] },
    [FORM_INPUT_NAMES.lon2]: { value: "", error: "", suggestions: [] },
    [FORM_INPUT_NAMES.searchPointA]: { value: "", error: "", suggestions: [] },
    [FORM_INPUT_NAMES.searchPointB]: { value: "", error: "", suggestions: [] },
  });

  const [buttons, setButtons] = useState<IButtons>({
    myLocationA: { isLoading: false },
    myLocationB: { isLoading: false },
  });

  const [kilometers, setKilometers] = useState<number>(0);

  const fetchCoordinates = useDebouncedCallback(
    async (searchValue: string, field: FORM_INPUT_NAMES) => {
      // Fetch data from Google
      const res = await fetchCoordinatesFromAddress(searchValue);

      if (res.error) {
        setInputs((prevState) => ({
          ...prevState,
          [field]: { ...prevState[field], error: res.error, suggestions: [] },
        }));
      } else {
        // Clear any existing error msgs
        setInputs((prevState) => ({
          ...prevState,
          [field]: { ...prevState[field], error: "" },
        }));

        setInputs((prevState) => ({
          ...prevState,
          [field]: {
            ...prevState[field],
            suggestions: res.formattedAddress ? [res.formattedAddress] : [],
          },
        }));
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
        setInputs((prevState) => ({
          ...prevState,
          [input]: { ...prevState[input], value: e.target.value },
        }));
      }
    });

    // Call Geocode API
    if (isSearchInput(e.target.name)) {
      const field =
        e.target.name === FORM_INPUT_NAMES.searchPointA
          ? FORM_INPUT_NAMES.searchPointA
          : FORM_INPUT_NAMES.searchPointB;

      // Clear any existing error message
      setInputs((prevState) => ({
        ...prevState,
        [field]: { ...prevState[field], error: "" },
      }));

      // If input is empty hide the suggestions and exit
      if (e.target.value === "") {
        setInputs((prevState) => ({
          ...prevState,
          [field]: { ...prevState[field], suggestions: [] },
        }));
        return;
      }

      fetchCoordinates(e.target.value, field);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate inputs
    // Clear all errors
    setInputs((prevState) => ({
      ...prevState,
      lat1: { ...prevState.lat1, error: "" },
      lon1: { ...prevState.lon1, error: "" },
      lat2: { ...prevState.lat2, error: "" },
      lon2: { ...prevState.lon2, error: "" },
    }));
    let hasError = false;
    if (!isValidLatitude(inputs.lat1.value ?? "")) {
      setInputs((prevState) => ({
        ...prevState,
        lat1: { ...prevState.lat1, error: "Invalid latitude" },
      }));
      hasError = true;
    }
    if (!isValidLongitude(inputs.lon1.value ?? "")) {
      setInputs((prevState) => ({
        ...prevState,
        lon1: { ...prevState.lon1, error: "Invalid longitude" },
      }));
      hasError = true;
    }
    if (!isValidLatitude(inputs.lat2.value ?? "")) {
      setInputs((prevState) => ({
        ...prevState,
        lat2: { ...prevState.lat2, error: "Invalid latitude" },
      }));
      hasError = true;
    }
    if (!isValidLongitude(inputs.lon2.value ?? "")) {
      setInputs((prevState) => ({
        ...prevState,
        lon2: { ...prevState.lon2, error: "Invalid longitude" },
      }));
      hasError = true;
    }

    // And bail if error(s)
    if (hasError) {
      return;
    }

    // Calculate distance
    const result = calculateDistance(
      parseFloat(inputs.lat1.value),
      parseFloat(inputs.lon1.value),
      parseFloat(inputs.lat2.value),
      parseFloat(inputs.lon2.value)
    );
    setKilometers(result);
  };

  // TODO Extract this into more generic function
  const handleUserLocationA = () => {
    setButtons((prevState) => ({
      ...prevState,
      myLocationA: { ...prevState.myLocationA, isLoading: true },
    }));
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        setButtons((prevState) => ({
          ...prevState,
          myLocationA: { ...prevState.myLocationA, isLoading: false },
        }));
        setInputs((prevState) => ({
          ...prevState,
          lat1: {
            ...prevState.lat1,
            value: position.coords.latitude.toFixed(7),
          },
          lon1: {
            ...prevState.lon1,
            value: position.coords.longitude.toFixed(7),
          },
        }));
      },
      () => {
        setButtons((prevState) => ({
          ...prevState,
          myLocationA: { ...prevState.myLocationA, isLoading: false },
        }));
      }
    );
  };

  // TODO Extract this into more generic function
  const handleUserLocationB = () => {
    setButtons((prevState) => ({
      ...prevState,
      myLocationB: { ...prevState.myLocationB, isLoading: true },
    }));
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        setButtons((prevState) => ({
          ...prevState,
          myLocationB: { ...prevState.myLocationB, isLoading: false },
        }));
        setInputs((prevState) => ({
          ...prevState,
          lat2: {
            ...prevState.lat2,
            value: position.coords.latitude.toFixed(7),
          },
          lon2: {
            ...prevState.lon2,
            value: position.coords.longitude.toFixed(7),
          },
        }));
      },
      () => {
        setButtons((prevState) => ({
          ...prevState,
          myLocationB: { ...prevState.myLocationB, isLoading: false },
        }));
      }
    );
  };

  const handleSuggestionClick = async (
    suggestion: string,
    inputName: string
  ) => {
    // Figure out which search field
    const searchInputName =
      inputName === FORM_INPUT_NAMES.searchPointA
        ? FORM_INPUT_NAMES.searchPointA
        : FORM_INPUT_NAMES.searchPointB;

    // Set the formatted address as the input value and clear suggestions
    setInputs((prevState) => ({
      ...prevState,
      [searchInputName]: {
        ...prevState[searchInputName],
        value: suggestion,
        suggestions: [],
      },
    }));

    // Set lat and lon values in corresponding inputs
    const res = await fetchCoordinatesFromAddress(suggestion);
    if (!res.error) {
      const latField =
        inputName === FORM_INPUT_NAMES.searchPointA
          ? FORM_INPUT_NAMES.lat1
          : FORM_INPUT_NAMES.lat2;
      const lonField =
        inputName === FORM_INPUT_NAMES.searchPointA
          ? FORM_INPUT_NAMES.lon1
          : FORM_INPUT_NAMES.lon2;
      setInputs((prevState) => ({
        ...prevState,
        [latField]: { ...prevState[latField], value: res.lat },
        [lonField]: { ...prevState[lonField], value: res.lon },
      }));
    }
  };

  return {
    handleSubmit,
    handleChange,
    inputs,
    buttons,
    handleUserLocationA,
    handleUserLocationB,
    kilometers,
    handleSuggestionClick,
  };
};
