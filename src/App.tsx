import { useEffect, useState } from "react";
import "./App.css";
import { CoordinatesForm } from "./components";
import { useCoordinatesForm } from "./hooks";

function App() {
  const {
    handleSubmit,
    handleChange,
    inputs,
    buttons,
    handleUserLocation,
    kilometers,
    handleSuggestionClick,
    handleCancelClick,
  } = useCoordinatesForm();
  const [miles, setMiles] = useState<number>(0);

  useEffect(() => {
    setMiles(Number((kilometers * 0.621371).toFixed(2)));
  }, [kilometers]);

  const locale = navigator.language;

  return (
    <>
      <h1 className="text-white drop-shadow shadow bg-gradient-to-r from-cyan-500 to-blue-500 text-center p-6 text-2xl md:p-20 md:text-6xl">
        Calculate the distance between two geographic coordinates in a straight
        line
      </h1>
      <div className="md:max-w-3xl md:mx-auto p-4">
        <div className="grid grid-flow-row gap-4">
          <CoordinatesForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            inputs={inputs}
            buttons={buttons}
            handleUserLocation={handleUserLocation}
            handleSuggestionClick={handleSuggestionClick}
            handleCancelClick={handleCancelClick}
          />
          <p className="text-xl">
            <b className="underline">Distance:</b>{" "}
            {kilometers.toLocaleString(locale)}km (
            {miles.toLocaleString(locale)}mi)
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
