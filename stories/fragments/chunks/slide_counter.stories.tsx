import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SlideCounter } from "../../../fragments/chunks/slide_counter";

export default {
   title: "fragments/chunks/Slide Counter",
   component: SlideCounter
} as ComponentMeta<typeof SlideCounter>;

export const Default: ComponentStory<typeof SlideCounter> = () => (
   <SlideCounter currIndex={1} length={10} />
);
