import { FC } from "react";
import { FormInput } from "../FormInput/FormInput";
import { Button } from "../Button/Button";
import { IFormState } from "../../App";

interface ICoordinatesFormProps {
  handleSubmit: (e: React.FormEvent) => void;
  errors: IFormState;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputs: IFormState;
}

export const CoordinatesForm: FC<ICoordinatesFormProps> = (props) => {
  const { handleSubmit, handleChange, errors, inputs } = props;
  return (
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
  );
};
