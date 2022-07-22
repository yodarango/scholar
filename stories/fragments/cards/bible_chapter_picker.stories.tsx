import { ComponentMeta, ComponentStory } from "@storybook/react";

import { BibleChapterpicker } from "../../../fragments/cards/bible_chapter_picker";

export default {
   title: "fragments/cards/Bible Chapter Picker",
   component: BibleChapterpicker
} as ComponentMeta<typeof BibleChapterpicker>;

export const APlus: ComponentStory<typeof BibleChapterpicker> = () => (
   <BibleChapterpicker
      bookId='GEN'
      cta={(chapterId) => console.log("chapter", chapterId)}
      chapterCount={50}
   />
);
