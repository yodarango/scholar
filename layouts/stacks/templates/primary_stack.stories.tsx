import { ComponentMeta, ComponentStory } from "@storybook/react";

import { PrimaryStack } from "./primary_stack";

export default {
   title: "layouts/stacks/Primary Stacks",
   component: PrimaryStack
} as ComponentMeta<typeof PrimaryStack>;

export const Primary: ComponentStory<typeof PrimaryStack> = () => (
   <PrimaryStack
      title='Primary background'
      content={<>Hello</>}
      cta={{ handleClose: () => console.log("modal close") }}
   />
);

export const PrimaryWithIcon: ComponentStory<typeof PrimaryStack> = () => (
   <PrimaryStack
      title='Primary background'
      icon='star'
      content={<>Hello</>}
      cta={{ handleClose: () => console.log("modal close") }}
   />
);
