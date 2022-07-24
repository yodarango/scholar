import { ComponentMeta, ComponentStory } from "@storybook/react";

import { PrimaryStack } from "../../../layouts/stacks/primary_stack";

export default {
   title: "layouts/stacks/Primary Stacks",
   component: PrimaryStack
} as ComponentMeta<typeof PrimaryStack>;

export const Primary: ComponentStory<typeof PrimaryStack> = () => (
   <PrimaryStack
      title='Primary background'
      content={<>Hello</>}
      cta={() => console.log("modal close")}
   />
);

export const PrimaryWithIcon: ComponentStory<typeof PrimaryStack> = () => (
   <PrimaryStack
      title='Primary background'
      icon='star'
      content={<>Hello</>}
      cta={() => console.log("modal close")}
   />
);
