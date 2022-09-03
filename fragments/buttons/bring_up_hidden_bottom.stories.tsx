import { ComponentMeta, ComponentStory } from "@storybook/react";

import { BringUpHiddenBottom } from "../../../fragments/buttons/bring_up_hidden_bottom";

export default {
   title: "fragments/buttons/Bring Up Hidden Bottom",
   component: BringUpHiddenBottom
} as ComponentMeta<typeof BringUpHiddenBottom>;

export const EnglishESV: ComponentStory<typeof BringUpHiddenBottom> = () => (
   <BringUpHiddenBottom
      cta={{
         handleClick() {
            console.log("bring it up");
         }
      }}
   />
);
