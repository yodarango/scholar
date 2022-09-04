import { ComponentMeta, ComponentStory } from "@storybook/react";

import { QuoteEditor } from "../../layouts/quote_editor";

export default {
   title: "layouts/Quote Editor Actions",
   component: QuoteEditor
} as ComponentMeta<typeof QuoteEditor>;

export const Primary: ComponentStory<typeof QuoteEditor> = () => (
   <QuoteEditor quote='My wonderful quote' author='I am the author' />
);
