import { useState } from "react";
import "./App.css";

interface IFormState {
  lat1?: string;
  lon1?: string;
  lat2?: string;
  lon2?: string;
}

function App() {
  const [inputs, setInputs] = useState<IFormState>({
    lat1: "",
    lon1: "",
    lat2: "",
    lon2: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("AYYYY");
  };

  return (
    <div className="bg-slate-700 flex flex-col items-center">
      <form onSubmit={handleSubmit} className="grid gap-4">
        <label className="flex flex-col text-white">
          <span>Latitude 1</span>
          <input
            className="text-slate-800"
            value={inputs.lat1 || ""}
            name="lat1"
            type="text"
            placeholder="52.7579522"
            onChange={handleChange}
          />
        </label>
        <label className="flex flex-col text-white">
          <span>Longitude 1</span>
          <input
            className="text-slate-800"
            value={inputs.lon1 || ""}
            name="lon1"
            type="text"
            placeholder="13.2516223"
            onChange={handleChange}
          />
        </label>

        <label className="flex flex-col text-white">
          <span>Latitude 2</span>
          <input
            className="text-slate-800"
            value={inputs.lat2 || ""}
            name="lat2"
            type="text"
            placeholder="52.7612306"
            onChange={handleChange}
          />
        </label>
        <label className="flex flex-col text-white">
          <span>Longitude 2</span>
          <input
            className="text-slate-800"
            value={inputs.lon2 || ""}
            name="lon2"
            type="text"
            placeholder="13.2677626"
            onChange={handleChange}
          />
        </label>

        <button type="submit" className="bg-sky-500 py-2">
          Calculate
        </button>
      </form>
    </div>
  );
}

export default App;
