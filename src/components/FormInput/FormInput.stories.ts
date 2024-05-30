import { Meta, StoryObj } from "@storybook/react";
import { FormInput } from "./FormInput";
import { fn } from "@storybook/test";

const meta = {
  title: "Components/FormInput",
  component: FormInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    errorMessage: { control: "text" },
    label: { control: "text" },
  },
  args: { onChange: fn(), handleSuggestionClick: fn() },
} satisfies Meta<typeof FormInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    errorMessage: "",
    label: "Password",
    id: "default",
    name: "default",
  },
};

export const WithErrorMessage: Story = {
  args: {
    errorMessage: "Wrong password",
    label: "Password",
    id: "with-error",
    name: "with-error",
  },
};

export const WithSuggestionsAndError: Story = {
  args: {
    label: "Address",
    id: "suggestions-error",
    name: "suggestions-error",
    errorMessage: "Invalid address",
    suggestions: ["One", "Two", "Three"],
  },
};

export const WithLongSuggestions: Story = {
  args: {
    label: "Address",
    id: "long-suggestions",
    name: "long-suggestions",
    suggestions: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    ],
  },
};
