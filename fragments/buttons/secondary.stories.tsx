import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Secondary } from "../../../fragments/buttons/secondary";

export default {
   title: "fragments/buttons/Secondary",
   component: Secondary
} as ComponentMeta<typeof Secondary>;

export const SecondaryTypeOne: ComponentStory<typeof Secondary> = () => (
   <Secondary cta={{ handleClick: () => console.log("...") }} title='Button' type='1' />
);

export const SecondaryTypeTwoWithIcon: ComponentStory<typeof Secondary> = () => (
   <Secondary icon='👍' cta={{ handleClick: () => console.log("...") }} title='Button' type='2' />
);
