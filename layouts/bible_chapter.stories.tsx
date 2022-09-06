import { ComponentMeta, ComponentStory } from "@storybook/react";

import { BibleChapter } from "./bible_chapter";

export default {
   title: "layouts/Bible Chapter ",
   component: BibleChapter
} as ComponentMeta<typeof BibleChapter>;

export const ThoughtPost: ComponentStory<typeof BibleChapter> = () => (
   <BibleChapter chapterId='GEN.1' versionId='de4e12af7f28f599-02' />
);
