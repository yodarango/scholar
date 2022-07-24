import { ComponentMeta, ComponentStory } from "@storybook/react";

import { BibleBooksWrapper } from "../../../layouts/scrollers/bible_books_wrapper";

export default {
   title: "layouts/scrollers/Bible Book Wrapper",
   component: BibleBooksWrapper
} as ComponentMeta<typeof BibleBooksWrapper>;

export const Default: ComponentStory<typeof BibleBooksWrapper> = () => (
   <BibleBooksWrapper
      versionId='de4e12af7f28f599-02'
      cta={(content: any) => console.log("content", content)}
   />
);
