import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SecondaryStack } from "./secondary_stack";

export default {
   title: "layouts/stacks/Secondary Stacks",
   component: SecondaryStack
} as ComponentMeta<typeof SecondaryStack>;

export const Default: ComponentStory<typeof SecondaryStack> = () => (
   <SecondaryStack title='Primary background' children={<>Hello</>} menuType={1} />
);
