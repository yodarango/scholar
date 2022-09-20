import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Third } from "./third";

export default {
   title: "fragments/buttons/Third",
   component: Third
} as ComponentMeta<typeof Third>;

export const ThirdTypeOne: ComponentStory<typeof Third> = () => (
   <Third cta={{ handleClick: () => console.log("...") }} title='Button' type='1' icon='👍' />
);

export const ThirdTypeTwo: ComponentStory<typeof Third> = () => (
   <Third cta={{ handleClick: () => console.log("...") }} title='Button' type='2' icon='👍' />
);
