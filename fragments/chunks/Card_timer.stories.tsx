import { ComponentMeta, ComponentStory } from "@storybook/react";

import { CardTimer } from "../../../fragments/chunks/card_timer";

export default {
   title: "fragments/chunks/Card Timer",
   component: CardTimer
} as ComponentMeta<typeof CardTimer>;

export const Default: ComponentStory<typeof CardTimer> = () => (
   <CardTimer time={"07/20/22 21:00:00"} />
);
