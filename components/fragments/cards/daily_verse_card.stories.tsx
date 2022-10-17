import { ComponentMeta, ComponentStory } from "@storybook/react";

import { DailyVerseCard } from "./daily_verse_card";

export default {
   title: "fragments/cards/Daily Verse",
   component: DailyVerseCard
} as ComponentMeta<typeof DailyVerseCard>;

export const Default: ComponentStory<typeof DailyVerseCard> = () => <DailyVerseCard />;
