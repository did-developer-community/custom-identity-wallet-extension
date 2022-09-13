import { Meta, Story } from "@storybook/react/types-6-0";

import { ReceiveRequestTemplate as Component } from "./ReceiveRequest";

export default {
  title: "Templates/ReceiveRequest",
  component: Component,
} as Meta;

const Template: Story = () => <Component />;

export const ReceiveRequest = Template.bind({});
ReceiveRequest.args = {};
