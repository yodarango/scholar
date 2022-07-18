import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Parragraph } from "../../fragments/Typography/parragraph";

export default {
   title: "fragments/typography/parragraph",
   component: Parragraph
} as ComponentMeta<typeof Parragraph>;

export const Main: ComponentStory<typeof Parragraph> = () => (
   <Parragraph text='sample' size='main' />
);
