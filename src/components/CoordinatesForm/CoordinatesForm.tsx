import { FC } from "react";
import { FormInput } from "../FormInput/FormInput";
import { Button } from "../Button/Button";
import type { IFormState } from "./state";

interface ICoordinatesFormProps {
  handleSubmit: (e: React.FormEvent) => void;
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
        value={inputs.searchPointA.value}
        onChange={handleChange}
        errorMessage={inputs.searchPointA.error}
        suggestions={inputs.searchPointA.suggestions}
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
        errorMessage={inputs.lat1.error}
        value={inputs.lat1.value}
        id="lat1"
        name="lat1"
        type="text"
        placeholder="52.7579522"
        onChange={handleChange}
        containerClass="col-span-12 md:col-span-1"
      />
      <FormInput
        errorMessage={inputs.lon1.error}
        label="Longitude"
        value={inputs.lon1.value}
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
        value={inputs.searchPointB.value}
        onChange={handleChange}
        errorMessage={inputs.searchPointB.error}
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
        errorMessage={inputs.lat2.error}
        value={inputs.lat2.value}
        id="lat2"
        name="lat2"
        type="text"
        placeholder="52.7612306"
        onChange={handleChange}
        containerClass="col-span-12 md:col-span-1"
      />
      <FormInput
        errorMessage={inputs.lon2.error}
        label="Longitude"
        value={inputs.lon2.value}
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
