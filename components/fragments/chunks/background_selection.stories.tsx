import { ComponentMeta, ComponentStory } from "@storybook/react";

import { BackgroundSelection } from "./background_selection";

export default {
   title: "fragments/chunks/Background Selection",
   component: BackgroundSelection
} as ComponentMeta<typeof BackgroundSelection>;

export const Default: ComponentStory<typeof BackgroundSelection> = () => (
   <BackgroundSelection
      background='quote-bkg--6'
      cta={{
         handleSelection(value) {
            console.log(value);
         }
      }}
   />
);
