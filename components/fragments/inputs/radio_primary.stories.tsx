import { ComponentMeta, ComponentStory } from "@storybook/react";

import { RadioPrimary } from "./radio_primary";

export default {
   title: "fragments/inputs/Radio",
   component: RadioPrimary
} as ComponentMeta<typeof RadioPrimary>;

export const Primary: ComponentStory<typeof RadioPrimary> = () => (
   <RadioPrimary
      displayV={false}
      icon={{ primary: "male", secondary: "female" }}
      text={{ primary: "male", secondary: "female" }}
      cta={{
         handleOptionSelection(selection: number) {
            console.log(selection);
         }
      }}
   />
);
