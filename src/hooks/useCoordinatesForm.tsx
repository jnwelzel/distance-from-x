import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import {
  calculateDistance,
  fetchCoordinatesFromAddress,
  isValidLatitude,
  isValidLongitude,
} from "../helpers";
import type { IFormState } from "../components";

enum SEARCH_FIELD_NAMES {
  pointA = "searchPointA",
  pointB = "searchPointB",
}

export const useCoordinatesForm = () => {
  const [inputs, setInputs] = useState<IFormState>({
    lat1: "",
    lon1: "",
    lat2: "",
    lon2: "",
    [SEARCH_FIELD_NAMES.pointA]: "",
    [SEARCH_FIELD_NAMES.pointB]: "",
  });

  const [errors, setErrors] = useState<IFormState>({
    lat1: "",
    lon1: "",
    lat2: "",
    lon2: "",
    [SEARCH_FIELD_NAMES.pointA]: "",
    [SEARCH_FIELD_NAMES.pointB]: "",
  });

  const [isLoadingLocationA, setIsLoadingLocationA] = useState<boolean>(false);
  const [isLoadingLocationB, setIsLoadingLocationB] = useState<boolean>(false);

  const [kilometers, setKilometers] = useState<number>(0);

  const fetchCoordinates = useDebouncedCallback(
    async (searchValue: string, field: SEARCH_FIELD_NAMES) => {
      if (searchValue === "") {
        return;
      }

      // Fetch data from Google
      const res = await fetchCoordinatesFromAddress(searchValue);

      if (res.error) {
        setErrors((prevState) => ({ ...prevState, [field]: res.error }));
      } else {
        const inputLat = field === SEARCH_FIELD_NAMES.pointA ? "lat1" : "lat2";
        const inputLon = field === SEARCH_FIELD_NAMES.pointA ? "lon1" : "lon2";

        // Clear any existing error msgs
        setErrors((prevState) => ({ ...prevState, [field]: "" }));

        setInputs((prevState) => ({
          ...prevState,
          // [field]: res.formattedAddress, // TODO Use as autocomplete suggestion
          [inputLat]: res.lat,
          [inputLon]: res.lon,
        }));
      }
    },
    500
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    if (
      e.target.name === SEARCH_FIELD_NAMES.pointA ||
      e.target.name === SEARCH_FIELD_NAMES.pointB
    ) {
      const field =
        e.target.name === SEARCH_FIELD_NAMES.pointA
          ? SEARCH_FIELD_NAMES.pointA
          : SEARCH_FIELD_NAMES.pointB;
      setErrors((prevState) => ({ ...prevState, [field]: "" }));
      fetchCoordinates(e.target.value, field);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate inputs
    setErrors({
      lat1: "",
      lon1: "",
      lat2: "",
      lon2: "",
      searchPointA: "",
      searchPointB: "",
    });
    let hasError = false;
    if (!isValidLatitude(inputs?.lat1 ?? "")) {
      setErrors((prevState) => ({ ...prevState, lat1: "Invalid latitude" }));
      hasError = true;
    }
    if (!isValidLongitude(inputs?.lon1 ?? "")) {
      setErrors((prevState) => ({ ...prevState, lon1: "Invalid longitude" }));
      hasError = true;
    }
    if (!isValidLatitude(inputs?.lat2 ?? "")) {
      setErrors((prevState) => ({ ...prevState, lat2: "Invalid latitude" }));
      hasError = true;
    }
    if (!isValidLongitude(inputs?.lon2 ?? "")) {
      setErrors((prevState) => ({ ...prevState, lon2: "Invalid longitude" }));
      hasError = true;
    }

    // And bail if error(s)
    if (hasError) {
      return;
    }

    // Calculate distance
    const result = calculateDistance(
      parseFloat(inputs.lat1),
      parseFloat(inputs.lon1),
      parseFloat(inputs.lat2),
      parseFloat(inputs.lon2)
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
          lat1: position.coords.latitude.toFixed(7),
          lon1: position.coords.longitude.toFixed(7),
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
          lat2: position.coords.latitude.toFixed(7),
          lon2: position.coords.longitude.toFixed(7),
        }));
      },
      () => {
        setIsLoadingLocationB(false);
      }
    );
  };

  return {
    handleSubmit,
    errors,
    handleChange,
    inputs,
    isLoadingLocationA,
    isLoadingLocationB,
    handleUserLocationA,
    handleUserLocationB,
    kilometers,
  };
};
