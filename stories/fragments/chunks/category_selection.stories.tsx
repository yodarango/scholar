import { ComponentMeta, ComponentStory } from "@storybook/react";

import { CategorySelectionSelection } from "../../../fragments/chunks/category_selection";

export default {
   title: "fragments/chunks/Category Selection",
   component: CategorySelectionSelection
} as ComponentMeta<typeof CategorySelectionSelection>;

export const Default: ComponentStory<typeof CategorySelectionSelection> = () => (
   <CategorySelectionSelection
      categoryId='YLW'
      cta={{
         handleSelection(value) {
            console.log(value);
         }
      }}
   />
);
