import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ScripturePicker } from "../../../layouts/menus/scripture_picker";

export default {
   title: "layouts/menus/Select Scripture",
   component: ScripturePicker
} as ComponentMeta<typeof ScripturePicker>;

export const StopAtChapter: ComponentStory<typeof ScripturePicker> = () => (
   <ScripturePicker
      versionId='de4e12af7f28f599-02'
      bible={{
         verses: [27],
         chapters: 50,
         bookId: "GEN",
         bookTitle: "Genesis",
         image: "/images/commentaries_by_book/1.png"
      }}
      cta={(content) => console.log(content)}
      stopAtChapter={true}
   />
);

export const StopAtVerse: ComponentStory<typeof ScripturePicker> = () => (
   <ScripturePicker
      versionId='de4e12af7f28f599-02'
      bible={{
         verses: [27],
         chapters: 50,
         bookId: "GEN",
         bookTitle: "Genesis",
         image: "/images/commentaries_by_book/1.png"
      }}
      cta={(content) => console.log(content)}
      stopAtChapter={false}
   />
);
