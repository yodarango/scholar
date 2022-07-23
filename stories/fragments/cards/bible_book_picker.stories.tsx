import { ComponentMeta, ComponentStory } from "@storybook/react";

import { BilbleBookPicker } from "../../../fragments/cards/bible_book_picker";

export default {
   title: "fragments/cards/Bible Book Picker",
   component: BilbleBookPicker
} as ComponentMeta<typeof BilbleBookPicker>;

export const APlus: ComponentStory<typeof BilbleBookPicker> = () => (
   <BilbleBookPicker
      bookTitle='Genesis'
      showChapterSelectorMenu={false}
      cta={{
         handleOpenChaptermenu: (bookId) => console.log("menu should be open"),
         handleCloseChapterMenu: () => console.log("menu should be closed")
      }}
      chapterCount={50}
      imgSource='/images/commentaries_by_book/1.png'
   />
);
