import { Meta, StoryObj } from "@storybook/react";
import { CoordinatesForm } from "./CoordinatesForm";

const meta = {
  title: "Components/CoordinatesForm",
  component: CoordinatesForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CoordinatesForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
