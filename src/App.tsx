import { useState } from "react";
import "./App.css";
import {
  calculateDistance,
  isValidLatitude,
  isValidLongitude,
} from "./helpers/coordinates";

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
        coordinates
      </h1>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <label className="flex flex-col text-white">
          <span>Latitude 1</span>
          <input
            className={`text-slate-800 ${
              errors?.lat1 ? "border-2 border-solid border-red-500" : ""
            }`}
            value={inputs.lat1 || ""}
            name="lat1"
            type="text"
            placeholder="52.7579522"
            onChange={handleChange}
          />
          {errors?.lat1 ? (
            <span className="text-red-500">{errors.lat1}</span>
          ) : null}
        </label>
        <label className="flex flex-col text-white">
          <span>Longitude 1</span>
          <input
            className={`text-slate-800 ${
              errors?.lon1 ? "border-2 border-solid border-red-500" : ""
            }`}
            value={inputs.lon1 || ""}
            name="lon1"
            type="text"
            placeholder="13.2516223"
            onChange={handleChange}
          />
          {errors?.lon1 ? (
            <span className="text-red-500">{errors.lon1}</span>
          ) : null}
        </label>

        <label className="flex flex-col text-white">
          <span>Latitude 2</span>
          <input
            className={`text-slate-800 ${
              errors?.lat2 ? "border-2 border-solid border-red-500" : ""
            }`}
            value={inputs.lat2 || ""}
            name="lat2"
            type="text"
            placeholder="52.7612306"
            onChange={handleChange}
          />
          {errors?.lat2 ? (
            <span className="text-red-500">{errors.lat2}</span>
          ) : null}
        </label>
        <label className="flex flex-col text-white">
          <span>Longitude 2</span>
          <input
            className={`text-slate-800 ${
              errors?.lon2 ? "border-2 border-solid border-red-500" : ""
            }`}
            value={inputs.lon2 || ""}
            name="lon2"
            type="text"
            placeholder="13.2677626"
            onChange={handleChange}
          />
          {errors?.lon2 ? (
            <span className="text-red-500">{errors.lon2}</span>
          ) : null}
        </label>

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
