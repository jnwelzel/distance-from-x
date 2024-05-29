import { FC } from "react";
import { FormInput } from "../FormInput/FormInput";
import { Button } from "../Button/Button";
import type { IFormState } from "./state";

interface ICoordinatesFormProps {
  handleSubmit: (e: React.FormEvent) => void;
  errors: IFormState;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputs: IFormState;
  isLoadingLocationA: boolean;
  isLoadingLocationB: boolean;
  handleUserLocationA: () => void;
  handleUserLocationB: () => void;
}

export const CoordinatesForm: FC<ICoordinatesFormProps> = (props) => {
  const {
    handleSubmit,
    handleChange,
    errors,
    inputs,
    isLoadingLocationA,
    isLoadingLocationB,
    handleUserLocationA,
    handleUserLocationB,
  } = props;
  return (
    <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4 w-full">
      <p className="col-span-12 md:col-span-full font-bold">Point A</p>
      <FormInput
        label="Search"
        containerClass="col-span-12 md:col-span-2"
        id="search-point-a"
        name="searchPointA"
        placeholder="Find a place"
        type="search"
        value={inputs.searchPointA}
        onChange={handleChange}
        errorMessage={errors.searchPointA}
      />
      <Button
        variant="secondary"
        className="col-span-12 md:col-span-2"
        onClick={handleUserLocationA}
        disabled={isLoadingLocationA}
      >
        Use my location
      </Button>
      <FormInput
        label="Latitute"
        errorMessage={errors?.lat1}
        value={inputs.lat1}
        id="lat1"
        name="lat1"
        type="text"
        placeholder="52.7579522"
        onChange={handleChange}
        containerClass="col-span-12 md:col-span-1"
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
        containerClass="col-span-12 md:col-span-1"
      />
      <p className="col-span-12 md:col-span-full font-bold">Point B</p>
      <FormInput
        label="Search"
        containerClass="col-span-12 md:col-span-2"
        id="search-point-b"
        name="searchPointB"
        placeholder="Find a place"
        type="search"
        value={inputs.searchPointB}
        onChange={handleChange}
        errorMessage={errors.searchPointB}
      />
      <Button
        variant="secondary"
        className="col-span-12 md:col-span-2"
        onClick={handleUserLocationB}
        disabled={isLoadingLocationB}
      >
        Use my location
      </Button>
      <FormInput
        label="Latitude"
        errorMessage={errors?.lat2}
        value={inputs.lat2}
        id="lat2"
        name="lat2"
        type="text"
        placeholder="52.7612306"
        onChange={handleChange}
        containerClass="col-span-12 md:col-span-1"
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
        containerClass="col-span-12 md:col-span-1"
      />

      <Button
        type="submit"
        className="col-span-12 md:col-span-2 md:place-self-center"
      >
        Calculate
      </Button>
    </form>
  );
};
