import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SelectReadingBookmarks } from "./select_reading_bookmarks";

export default {
   title: "layouts/menus/Select Reading Bookmarks",
   component: SelectReadingBookmarks
} as ComponentMeta<typeof SelectReadingBookmarks>;

export const Bookmark: ComponentStory<typeof SelectReadingBookmarks> = () => (
   <SelectReadingBookmarks
      chapterId='1CO.1'
      isChapterBookmarked={true}
      bookMarks={["GEN.3.4", "1CO.2.3", "JHN.3.16"]}
      cta={{
         handleCloseModal: () => console.log("modal should close"),
         handleBookMark: (value: boolean) => console.log(value)
      }}
   />
);

export const RemoveBookmark: ComponentStory<typeof SelectReadingBookmarks> = () => (
   <SelectReadingBookmarks
      chapterId='1CO.1'
      isChapterBookmarked={false}
      bookMarks={["GEN.3.4", "1CO.2.3", "JHN.3.16"]}
      cta={{
         handleCloseModal: () => console.log("modal should close"),
         handleBookMark: (value: boolean) => console.log(value)
      }}
   />
);
