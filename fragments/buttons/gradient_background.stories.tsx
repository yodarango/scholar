import { ComponentMeta, ComponentStory } from "@storybook/react";

import { GradientBackground } from "../../../fragments/buttons/gradient_background";

export default {
   title: "fragments/buttons/Gradient Background",
   component: GradientBackground
} as ComponentMeta<typeof GradientBackground>;

export const MenuOptionWithBackgroundId: ComponentStory<typeof GradientBackground> = () => (
   <GradientBackground
      background='quote-bkg--2'
      cta={{
         handleClick(value: string | { light: string; dark: string }) {
            console.log(value);
         }
      }}
   />
);

export const MenuOptionWithBackgroundCustom: ComponentStory<typeof GradientBackground> = () => (
   <GradientBackground
      backgroundCustom={{ light: "#000000", dark: "#ffffff" }}
      cta={{
         handleClick(value: string | { light: string; dark: string }) {
            console.log(value);
         }
      }}
   />
);
