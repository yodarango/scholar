import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Primary } from "../../../fragments/buttons/primary";

export default {
   title: "fragments/buttons/Primary",
   component: Primary
} as ComponentMeta<typeof Primary>;

export const PrimaryTypeOne: ComponentStory<typeof Primary> = () => (
   <Primary cta={{ handleClick: () => console.log("...") }} title='Button' type='1' />
);

export const PrimaryTypeTwo: ComponentStory<typeof Primary> = () => (
   <Primary cta={{ handleClick: () => console.log("...") }} title='Button' type='2' />
);
