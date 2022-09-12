import { ComponentMeta, ComponentStory } from "@storybook/react";

import { DailyVerseImage } from "./daily_verse_image";

export default {
   title: "fragments/cards/Daily Verse Image",
   component: DailyVerseImage
} as ComponentMeta<typeof DailyVerseImage>;

export const Default: ComponentStory<typeof DailyVerseImage> = () => (
   <DailyVerseImage versionId='de4e12af7f28f599-02' />
);
