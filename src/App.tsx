import { useState } from "react";
import "./App.css";
import {
  calculateDistance,
  isValidLatitude,
  isValidLongitude,
} from "./helpers/coordinates";
import { FormInput } from "./components";

interface IFormState {
  lat1: string;
  lon1: string;
  lat2: string;
  lon2: string;
}

function App() {
  const [inputs, setInputs] = useState<IFormState>({
    lat1: "",
    lon1: "",
    lat2: "",
    lon2: "",
  });

  const [errors, setErrors] = useState<IFormState>({
    lat1: "",
    lon1: "",
    lat2: "",
    lon2: "",
  });

  const [distance, setDistance] = useState<number>(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate inputs
    setErrors({ lat1: "", lon1: "", lat2: "", lon2: "" });
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
    setDistance(result);
  };

  return (
    <div className="bg-slate-700 flex flex-col items-center">
      <h1 className="text-white">
        Calculate the distance (in kilometers) between two geographic
        coordinates in a straight line.
      </h1>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <FormInput
          label="Latitute"
          errorMessage={errors?.lat1}
          value={inputs.lat1 || ""}
          id="lat1"
          type="text"
          placeholder="52.7579522"
          onChange={handleChange}
        />
        <FormInput
          errorMessage={errors?.lon1}
          label="Longitude"
          value={inputs.lon1 || ""}
          id="lon1"
          type="text"
          placeholder="13.2516223"
          onChange={handleChange}
        />
        <FormInput
          label="Latitude"
          errorMessage={errors?.lat2}
          value={inputs.lat2 || ""}
          id="lat2"
          type="text"
          placeholder="52.7612306"
          onChange={handleChange}
        />
        <FormInput
          errorMessage={errors?.lon2}
          label="Longitude"
          value={inputs.lon2 || ""}
          id="lon2"
          type="text"
          placeholder="13.2677626"
          onChange={handleChange}
        />

        <button type="submit" className="bg-sky-500 py-2 text-white">
          Calculate
        </button>
      </form>

      {distance > 0 ? (
        <div className="text-white">Distance: {distance}km</div>
      ) : null}
    </div>
  );
}

export default App;
