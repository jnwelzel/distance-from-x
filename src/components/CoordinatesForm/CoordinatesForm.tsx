import { FC, useState } from "react";
import { FormInput } from "../FormInput/FormInput";
import { Button } from "../Button/Button";
import {
  calculateDistance,
  isValidLatitude,
  isValidLongitude,
} from "../../helpers";

interface IFormState {
  lat1: string;
  lon1: string;
  lat2: string;
  lon2: string;
}

export const CoordinatesForm: FC = () => {
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
    setDistance(result);
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">
        <p className="self-center place-self-end">Point A</p>
        <FormInput
          label="Latitute"
          errorMessage={errors?.lat1}
          value={inputs.lat1}
          id="lat1"
          name="lat1"
          type="text"
          placeholder="52.7579522"
          onChange={handleChange}
        />
        <FormInput
          errorMessage={errors?.lon1}
          label="Longitude"
          value={inputs.lon1}
          id="lon1"
          name="lon1"
          type="text"
          placeholder="13.2516223"
          onChange={handleChange}
        />
        <p className="self-center place-self-end">Point B</p>
        <FormInput
          label="Latitude"
          errorMessage={errors?.lat2}
          value={inputs.lat2}
          id="lat2"
          name="lat2"
          type="text"
          placeholder="52.7612306"
          onChange={handleChange}
        />
        <FormInput
          errorMessage={errors?.lon2}
          label="Longitude"
          value={inputs.lon2}
          id="lon2"
          name="lon2"
          type="text"
          placeholder="13.2677626"
          onChange={handleChange}
        />

        <Button type="submit" className="col-span-3 place-self-center">
          Calculate
        </Button>
      </form>
      {distance > 0 ? <div>Distance: {distance}km</div> : null}
    </>
  );
};
