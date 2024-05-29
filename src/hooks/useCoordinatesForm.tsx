import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import {
  calculateDistance,
  fetchCoordinatesFromAddress,
  isValidLatitude,
  isValidLongitude,
} from "../helpers";
import { FORM_INPUT_NAMES, type IFormState } from "../components";

export const useCoordinatesForm = () => {
  const [inputs, setInputs] = useState<IFormState>({
    [FORM_INPUT_NAMES.lat1]: { value: "", error: "", suggestions: [] },
    [FORM_INPUT_NAMES.lon1]: { value: "", error: "", suggestions: [] },
    [FORM_INPUT_NAMES.lat2]: { value: "", error: "", suggestions: [] },
    [FORM_INPUT_NAMES.lon2]: { value: "", error: "", suggestions: [] },
    [FORM_INPUT_NAMES.searchPointA]: { value: "", error: "", suggestions: [] },
    [FORM_INPUT_NAMES.searchPointB]: { value: "", error: "", suggestions: [] },
  });

  const [isLoadingLocationA, setIsLoadingLocationA] = useState<boolean>(false);
  const [isLoadingLocationB, setIsLoadingLocationB] = useState<boolean>(false);

  const [kilometers, setKilometers] = useState<number>(0);

  const fetchCoordinates = useDebouncedCallback(
    async (searchValue: string, field: FORM_INPUT_NAMES) => {
      if (searchValue === "") {
        return;
      }

      // Fetch data from Google
      const res = await fetchCoordinatesFromAddress(searchValue);

      if (res.error) {
        setInputs((prevState) => ({
          ...prevState,
          [field]: { ...prevState[field], error: res.error },
        }));
      } else {
        const inputLat =
          field === FORM_INPUT_NAMES.searchPointA ? "lat1" : "lat2";
        const inputLon =
          field === FORM_INPUT_NAMES.searchPointA ? "lon1" : "lon2";

        // Clear any existing error msgs
        setInputs((prevState) => ({
          ...prevState,
          [field]: { ...prevState[field], error: "" },
        }));

        setInputs((prevState) => ({
          ...prevState,
          [field]: { ...prevState[field], suggestions: [res.formattedAddress] },
          [inputLat]: { ...prevState[inputLat], value: res.lat },
          [inputLon]: { ...prevState[inputLon], value: res.lon },
        }));
      }
    },
    500
  );

  const isSearchInput = (fieldName: string): boolean =>
    fieldName === FORM_INPUT_NAMES.searchPointA ||
    fieldName === FORM_INPUT_NAMES.searchPointB;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    Object.values(FORM_INPUT_NAMES).forEach((input) => {
      if (input === e.target.name) {
        setInputs((prevState) => ({
          ...prevState,
          [input]: { ...prevState[input], value: e.target.value },
        }));
      }
    });

    if (isSearchInput(e.target.name)) {
      const field =
        e.target.name === FORM_INPUT_NAMES.searchPointA
          ? FORM_INPUT_NAMES.searchPointA
          : FORM_INPUT_NAMES.searchPointB;
      setInputs((prevState) => ({
        ...prevState,
        [field]: { ...prevState[field], error: "" },
      }));
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
    setIsLoadingLocationA(true);
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        setIsLoadingLocationA(false);
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
        setIsLoadingLocationA(false);
      }
    );
  };

  // TODO Extract this into more generic function
  const handleUserLocationB = () => {
    setIsLoadingLocationB(true);
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        setIsLoadingLocationB(false);
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
        setIsLoadingLocationB(false);
      }
    );
  };

  return {
    handleSubmit,
    handleChange,
    inputs,
    isLoadingLocationA,
    isLoadingLocationB,
    handleUserLocationA,
    handleUserLocationB,
    kilometers,
  };
};
