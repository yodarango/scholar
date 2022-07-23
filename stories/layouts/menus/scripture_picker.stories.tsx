import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ScripturePicker } from "../../../layouts/menus/scripture_picker";

export default {
   title: "layouts/menus/Select Scripture",
   component: ScripturePicker
} as ComponentMeta<typeof ScripturePicker>;

export const StopAtChapter: ComponentStory<typeof ScripturePicker> = () => (
   <ScripturePicker
      versionId='de4e12af7f28f599-02'
      imgSource='/images/commentaries_by_book/1.png'
      bookTitle='Genesis'
      cta={(content) => console.log(content)}
      bookId='GEN'
      chapterCount={50}
      stopAtChapter={true}
      verseCount={[27]}
   />
);

export const StopAtVerse: ComponentStory<typeof ScripturePicker> = () => (
   <ScripturePicker
      versionId='de4e12af7f28f599-02'
      imgSource='/images/commentaries_by_book/1.png'
      bookTitle='Genesis'
      cta={(content) => console.log(content)}
      bookId='GEN'
      chapterCount={50}
      stopAtChapter={false}
      verseCount={[27]}
   />
);
