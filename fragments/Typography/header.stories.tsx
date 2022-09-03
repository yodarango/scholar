import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Header } from "../../../fragments/Typography/header";

export default {
   title: "fragments/typography/header",
   component: Header
} as ComponentMeta<typeof Header>;

export const Main: ComponentStory<typeof Header> = () => (
   <Header text='sample' size='large' type={1} />
);
