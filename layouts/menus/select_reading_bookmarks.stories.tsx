import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SelectReadingBookmarks } from "./select_reading_bookmarks";

export default {
   title: "layouts/menus/Select Reading Bookmarks",
   component: SelectReadingBookmarks
} as ComponentMeta<typeof SelectReadingBookmarks>;

export const Default: ComponentStory<typeof SelectReadingBookmarks> = () => (
   <SelectReadingBookmarks
      bookMarks={["GEN.3.4", "1CO.2.3", "JHN.3.16"]}
      cta={{ handleCloseModal: () => console.log("modal should close") }}
   />
);
