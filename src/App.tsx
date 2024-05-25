import { useEffect, useState } from "react";
import "./App.css";
import { CoordinatesForm } from "./components";
import {
  calculateDistance,
  isValidLatitude,
  isValidLongitude,
} from "./helpers";

export interface IFormState {
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

  const [kilometers, setKilometers] = useState<number>(0);
  const [miles, setMiles] = useState<number>(0);

  useEffect(() => {
    setMiles(Number((kilometers * 0.621371).toFixed(2)));
  }, [kilometers]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
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
    setKilometers(result);
  };
  return (
    <body>
      <h1 className="text-white drop-shadow shadow bg-gradient-to-r from-cyan-500 to-blue-500 text-center p-6 text-2xl md:p-20 md:text-6xl">
        Calculate the distance between two geographic coordinates in a straight
        line
      </h1>
      <div className="grid grid-flow-row gap-4 p-4 md:max-w-3xl md:mx-auto">
        <CoordinatesForm
          handleSubmit={handleSubmit}
          errors={errors}
          handleChange={handleChange}
          inputs={inputs}
        />
        <p className="text-xl">
          <b>Distance:</b> {kilometers}km ({miles}mi)
        </p>
      </div>
    </body>
  );
}

export default App;
