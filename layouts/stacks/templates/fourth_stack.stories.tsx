import { ComponentMeta, ComponentStory } from "@storybook/react";

import { FourthStack } from "./fourth_stack";

export default {
   title: "layouts/stacks/Primary Stacks",
   component: FourthStack
} as ComponentMeta<typeof FourthStack>;

export const Primary: ComponentStory<typeof FourthStack> = () => (
   <FourthStack
      actionName='Back'
      title='Primary background'
      cta={{ handleClose: () => console.log("modal close") }}>
      Hello
   </FourthStack>
);
