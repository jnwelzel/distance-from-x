import { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { fn } from "@storybook/test";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    children: { control: "text" },
    disabled: { control: "boolean" },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary",
  },
};

export const Default: Story = {
  args: {
    variant: "default",
    children: "Default",
  },
};

export const PrimaryDisabled: Story = {
  args: {
    variant: "primary",
    children: "Primary",
    disabled: true,
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary",
  },
};
export const Error: Story = {
  args: {
    variant: "error",
    children: "Error",
  },
};
export const Warning: Story = {
  args: {
    variant: "warning",
    children: "Warning",
  },
};
