import { ComponentMeta, ComponentStory } from "@storybook/react";

import { BibleVersePicker } from "../../../fragments/cards/bible_verse_picker";

export default {
   title: "fragments/cards/Bible Verse Picker",
   component: BibleVersePicker
} as ComponentMeta<typeof BibleVersePicker>;

export const APlus: ComponentStory<typeof BibleVersePicker> = () => (
   <BibleVersePicker
      chapterId='GEN.1'
      versionId='de4e12af7f28f599-02'
      verseCount={27}
      cta={{
         handleCloseModal: () => console.log("should close modal"),
         handleVerseSelection: () => console.log("makes call to the API")
      }}
   />
);
