import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ReadBookmark } from "./read_bookmark";

export default {
   title: "fragments/chunks/Read Bookmark",
   component: ReadBookmark
} as ComponentMeta<typeof ReadBookmark>;

export const Default: ComponentStory<typeof ReadBookmark> = () => (
   <ReadBookmark chapterId='GEN.1' bookMarks={["1CO.2", "JHN.3", "MAT.1"]} isBookMarked={true} />
);
