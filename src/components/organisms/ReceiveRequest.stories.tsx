import { Meta, Story } from "@storybook/react/types-6-0";

import { ReceiveRequest as Component } from "./ReceiveRequest";

export default {
  title: "Organisms/ReceiveRequest",
  component: Component,
} as Meta;

const Template: Story = (args) => <Component {...args} />;

export const ReceiveRequest = Template.bind({});
ReceiveRequest.args = {};
