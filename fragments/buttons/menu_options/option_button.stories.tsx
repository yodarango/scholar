import { ComponentMeta, ComponentStory } from "@storybook/react";

import { OptionButton } from "../../../fragments/buttons/option_button";

export default {
   title: "fragments/buttons/Option Button",
   component: OptionButton
} as ComponentMeta<typeof OptionButton>;

export const AOptionOne: ComponentStory<typeof OptionButton> = () => (
   <OptionButton cta={() => console.log("...")} option='A' backgroundColor='1' />
);

export const BOptionTwo: ComponentStory<typeof OptionButton> = () => (
    <OptionButton cta={() => console.log("...")} option='B' backgroundColor='2' />
 );