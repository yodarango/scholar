import { ComponentMeta, ComponentStory } from "@storybook/react";

import { BibleChapterpicker } from "../../../fragments/cards/bible_chapter_picker";

export default {
   title: "fragments/cards/Bible Chapter Picker",
   component: BibleChapterpicker
} as ComponentMeta<typeof BibleChapterpicker>;

export const APlus: ComponentStory<typeof BibleChapterpicker> = () => (
   <BibleChapterpicker
      stopAtChapter={false}
      bookId='GEN'
      cta={{
         openVerseSelectionModal: (chapterId: number) =>
            console.log("verse modal should be opened", chapterId),
         handleChapterSelection: (content) => console.log(content)
      }}
      chapterCount={50}
   />
);
