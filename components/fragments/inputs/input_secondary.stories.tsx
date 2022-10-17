import { ComponentMeta, ComponentStory } from "@storybook/react";

import { InputSecondary } from "./input_secondary";

export default {
   title: "fragments/inputs/Radio",
   component: InputSecondary
} as ComponentMeta<typeof InputSecondary>;

export const Default: ComponentStory<typeof InputSecondary> = () => (
   <InputSecondary
      label='My church'
      cta={{
         handleValue(value: string) {
            console.log(value);
         }
      }}
   />
);

export const Quiet: ComponentStory<typeof InputSecondary> = () => (
   <InputSecondary
      label='My church'
      cta={{
         handleValue(value: string) {
            console.log(value);
         }
      }}
   />
);
