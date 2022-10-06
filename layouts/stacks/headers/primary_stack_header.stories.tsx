import { ComponentMeta, ComponentStory } from "@storybook/react";

import { PrimaryStackHeader } from "./primary_stack_header";

export default {
   title: "layouts/stacks/Primary Stacks",
   component: PrimaryStackHeader
} as ComponentMeta<typeof PrimaryStackHeader>;

export const Primary: ComponentStory<typeof PrimaryStackHeader> = () => (
   <PrimaryStackHeader
      title='Primary background'
      cta={{ handleClose: () => console.log("modal close") }}
   />
);
