import { Meta, StoryObj } from "@storybook/react";
import { CoordinatesForm } from "./CoordinatesForm";
import { fn } from "@storybook/test";

const meta = {
  title: "Components/CoordinatesForm",
  component: CoordinatesForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: { handleSubmit: fn(), handleChange: fn() },
} satisfies Meta<typeof CoordinatesForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    inputs: { lat1: "", lon1: "", lat2: "", lon2: "" },
    errors: { lat1: "", lon1: "", lat2: "", lon2: "" },
  },
};

export const WithErrors: Story = {
  args: {
    inputs: { lat1: "", lon1: "", lat2: "", lon2: "" },
    errors: {
      lat1: "Invalid latitude",
      lon1: "Invalid longitude",
      lat2: "Invalid latitude",
      lon2: "Invalid longitude",
    },
  },
};