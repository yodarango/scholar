import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SelectTrueColorPersonality } from "./select_true_color_personality";

export default {
   title: "fragments/inputs/Select True Color Personality",
   component: SelectTrueColorPersonality
} as ComponentMeta<typeof SelectTrueColorPersonality>;

export const Default: ComponentStory<typeof SelectTrueColorPersonality> = () => (
   <SelectTrueColorPersonality
      label='My true color personality'
      cta={{
         handleSelection(color: string) {
            console.log(color);
         }
      }}
   />
);
