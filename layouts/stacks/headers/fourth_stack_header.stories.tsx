import { ComponentMeta, ComponentStory } from "@storybook/react";

import { FourthStackHeader } from "./fourth_stack_header";

export default {
   title: "layouts/stacks/Fourth Stack Header",
   component: FourthStackHeader
} as ComponentMeta<typeof FourthStackHeader>;

export const Primary: ComponentStory<typeof FourthStackHeader> = () => (
   <FourthStackHeader
      actionName='Back'
      title='Primary background'
      cta={{ handleClose: () => console.log("modal close") }}
   />
);
