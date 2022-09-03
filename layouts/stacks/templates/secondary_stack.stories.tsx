import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SecondaryStack } from "./secondary_stack";

export default {
   title: "layouts/stacks/Primary Stacks",
   component: SecondaryStack
} as ComponentMeta<typeof SecondaryStack>;

export const Primary: ComponentStory<typeof SecondaryStack> = () => (
   <SecondaryStack
      title='Primary background'
      content={<>Hello</>}
      cta={{ handleClose: () => console.log("modal close") }}
   />
);
