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
  args: {
    handleSubmit: fn(),
    handleChange: fn(),
    isLoadingLocationA: false,
    isLoadingLocationB: false,
    handleUserLocationA: fn(),
    handleUserLocationB: fn(),
    handleSuggestionClick: fn(),
  },
} satisfies Meta<typeof CoordinatesForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    inputs: {
      lat1: { value: "" },
      lon1: { value: "" },
      lat2: { value: "" },
      lon2: { value: "" },
      searchPointA: { value: "" },
      searchPointB: { value: "" },
    },
  },
};

export const WithErrors: Story = {
  args: {
    inputs: {
      lat1: { value: "", error: "Invalid latitude" },
      lon1: { value: "", error: "Invalid longitude" },
      lat2: { value: "", error: "Invalid latitude" },
      lon2: { value: "", error: "Invalid longitude" },
      searchPointA: { value: "", error: "Invalid location" },
      searchPointB: { value: "", error: "Invalid location" },
    },
  },
};
