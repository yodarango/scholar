import { ComponentMeta, ComponentStory } from "@storybook/react";

import { QuoteEditorActions } from "./quote_editor_actions";

export default {
   title: "layouts/Quote Editor Actions",
   component: QuoteEditorActions
} as ComponentMeta<typeof QuoteEditorActions>;

export const Primary: ComponentStory<typeof QuoteEditorActions> = () => (
   <QuoteEditorActions
      categoryId='GRN'
      background='quote--bkg17'
      cta={{ handleCategory() {}, handleBkg() {}, handlePost() {} }}
   />
);
