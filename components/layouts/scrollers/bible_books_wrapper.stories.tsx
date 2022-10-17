import { ComponentMeta, ComponentStory } from "@storybook/react";

import { BibleBooksWrapper } from "./bible_books_wrapper";

export default {
   title: "layouts/scrollers/Bible Book Wrapper",
   component: BibleBooksWrapper
} as ComponentMeta<typeof BibleBooksWrapper>;

export const Default: ComponentStory<typeof BibleBooksWrapper> = () => (
   <BibleBooksWrapper
      stopAtChapter={false}
      stopAtVerse={false}
      versionId='de4e12af7f28f599-02'
      cta={{ handleChoice: (content: any) => console.log("content", content) }}
   />
);
