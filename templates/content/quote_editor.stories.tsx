import { ComponentMeta, ComponentStory } from "@storybook/react";

import { QuoteEditor } from "./quote_editor";

export default {
   title: "templates/Quote Editor ",
   component: QuoteEditor
} as ComponentMeta<typeof QuoteEditor>;

export const ThoughtPost: ComponentStory<typeof QuoteEditor> = () => (
   <QuoteEditor renderClose categoryId='YLW' background='quote-bkg--20' quote='yes' author='yes' />
);
