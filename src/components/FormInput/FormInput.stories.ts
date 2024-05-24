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
  args: { onChange: fn() },
} satisfies Meta<typeof FormInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithErrorMessage: Story = {
  args: {
    errorMessage: "Wrong password",
    label: "Password",
  },
};
