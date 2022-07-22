import { ComponentMeta, ComponentStory } from "@storybook/react";

import { BilbleBookPicker } from "../../../fragments/cards/bible_book_picker";

export default {
   title: "fragments/cards/Bible Book Picker",
   component: BilbleBookPicker
} as ComponentMeta<typeof BilbleBookPicker>;

export const APlus: ComponentStory<typeof BilbleBookPicker> = () => (
   <BilbleBookPicker
      bookTitle='Genesis'
      bookId='GEN'
      cta={(bookId) => console.log("chapter", bookId)}
      chapterCount={50}
      imgSource='/images/commentaries_by_book/1.png'
   />
);
