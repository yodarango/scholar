import { ComponentMeta, ComponentStory } from "@storybook/react";

import { DailyVerseCard } from "../fragments/cards/daily_verse_card";

export default {
   title: "layouts/Multiple Choice Poll",
   component: DailyVerseCard
} as ComponentMeta<typeof DailyVerseCard>;

export const Default: ComponentStory<typeof DailyVerseCard> = () => <DailyVerseCard />;
