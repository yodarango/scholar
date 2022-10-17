import { ComponentMeta, ComponentStory } from "@storybook/react";

import { TeritaryStack } from "./teritary_stack";

export default {
   title: "layouts/stacks/Teritary Stacks",
   component: TeritaryStack
} as ComponentMeta<typeof TeritaryStack>;

export const Primary: ComponentStory<typeof TeritaryStack> = () => (
   <TeritaryStack title='Primary background'>
      <h1>HEllo</h1>
   </TeritaryStack>
);
