import { ComponentMeta, ComponentStory } from "@storybook/react";

import { DailyVerseCard } from "../../../fragments/cards/daily_verse_card";

export default {
   title: "fragments/cards/Daily Verse",
   component: DailyVerseCard
} as ComponentMeta<typeof DailyVerseCard>;

export const Default: ComponentStory<typeof DailyVerseCard> = () => (
   <DailyVerseCard versionId='de4e12af7f28f599-02' />
);
