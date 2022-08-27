import { ComponentMeta, ComponentStory } from "@storybook/react";

import { InputPrimary } from "../../../fragments/inputs/input_primary";

export default {
   title: "fragments/inputs/Primary Input",
   component: InputPrimary
} as ComponentMeta<typeof InputPrimary>;

export const Background: ComponentStory<typeof InputPrimary> = () => (
   <InputPrimary
      type='text'
      placeholder='Username'
      maxL={25}
      cta={{ handleValue: (e) => console.log(e) }}
   />
);

export const Transparent: ComponentStory<typeof InputPrimary> = () => (
   <InputPrimary
      type='text'
      placeholder='Username'
      transparent={true}
      maxL={25}
      cta={{ handleValue: (e) => console.log(e) }}
   />
);
