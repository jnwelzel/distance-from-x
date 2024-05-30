import { FC } from "react";
import { FormInput } from "../FormInput/FormInput";
import { Button } from "../Button/Button";
import { BUTTON_NAMES, type IButtons, type IFormState } from "./state";
import { MyLocationClickCallback, SuggestionClickCallback } from "../..";

interface ICoordinatesFormProps {
  handleSubmit: (e: React.FormEvent) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputs: IFormState;
  buttons: IButtons;
  handleUserLocation: MyLocationClickCallback;
  handleSuggestionClick: SuggestionClickCallback;
}

export const CoordinatesForm: FC<ICoordinatesFormProps> = (props) => {
  const {
    handleSubmit,
    handleChange,
    inputs,
    buttons,
    handleUserLocation,
    handleSuggestionClick,
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
        handleSuggestionClick={handleSuggestionClick}
      />

      <FormInput
        label="Latitute"
        errorMessage={inputs.lat1.error}
        value={inputs.lat1.value}
        id="lat1"
        name="lat1"
        type="text"
        placeholder="-23.5557714"
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
        placeholder="-46.6395571"
        onChange={handleChange}
        containerClass="col-span-12 md:col-span-1"
      />

      <Button variant="error" className="col-span-12 md:col-span-1">
        Cancel
      </Button>

      <Button
        variant="secondary"
        className="col-span-12 md:col-span-1"
        onClick={() => handleUserLocation(BUTTON_NAMES.myLocationA)}
        disabled={buttons.myLocationA.isLoading}
      >
        Use my location
      </Button>

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
        suggestions={inputs.searchPointB.suggestions}
        handleSuggestionClick={handleSuggestionClick}
      />

      <FormInput
        label="Latitude"
        errorMessage={inputs.lat2.error}
        value={inputs.lat2.value}
        id="lat2"
        name="lat2"
        type="text"
        placeholder="-24.7227436"
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
        placeholder="-53.7408209"
        onChange={handleChange}
        containerClass="col-span-12 md:col-span-1"
      />

      <Button variant="error" className="col-span-12 md:col-span-1">
        Cancel
      </Button>

      <Button
        variant="secondary"
        className="col-span-12 md:col-span-1"
        onClick={() => handleUserLocation(BUTTON_NAMES.myLocationB)}
        disabled={buttons.myLocationB.isLoading}
      >
        Use my location
      </Button>

      <Button type="submit" className="col-span-12 md:col-span-2">
        Calculate
      </Button>
    </form>
  );
};
