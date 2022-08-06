import { ComponentMeta, ComponentStory } from "@storybook/react";

import { PrimaryThoughtStack } from "../../../../layouts/stacks/templates/preview_thought_stack";

export default {
   title: "layouts/stacks/Primary Thought Stack",
   component: PrimaryThoughtStack
} as ComponentMeta<typeof PrimaryThoughtStack>;

export const Primary: ComponentStory<typeof PrimaryThoughtStack> = () => (
   <PrimaryThoughtStack
      image='/images/bible_books/1.png'
      content={<>Hello</>}
      cta={() => console.log("modal close")}
   />
);
