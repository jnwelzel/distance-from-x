import "./App.css";
import { CoordinatesForm } from "./components";

function App() {
  return (
    <div className="flex flex-col items-center">
      <h1>
        Calculate the distance (in kilometers) between two geographic
        coordinates in a straight line.
      </h1>
      <CoordinatesForm />
    </div>
  );
}

export default App;
