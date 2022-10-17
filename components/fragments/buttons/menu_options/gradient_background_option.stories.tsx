import { ComponentMeta, ComponentStory } from "@storybook/react";

import { GradientBackgroundOption } from "./gradient_background_option";

export default {
   title: "fragments/buttons/menu options/ Gradient Background Option",
   component: GradientBackgroundOption
} as ComponentMeta<typeof GradientBackgroundOption>;

export const WithBkgID: ComponentStory<typeof GradientBackgroundOption> = () => (
   <GradientBackgroundOption
      text='Option one'
      background='quote-bkg--2'
      cta={{ handleClick: (value) => console.log(value) }}
   />
);
