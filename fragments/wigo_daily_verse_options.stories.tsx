import { ComponentMeta, ComponentStory } from "@storybook/react";

import { WigoDailyVerseOptions } from "../../fragments/wigo_daily_verse_options";

export default {
   title: "fragments/WIGO Daily Verse Options",
   component: WigoDailyVerseOptions
} as ComponentMeta<typeof WigoDailyVerseOptions>;

export const Google: ComponentStory<typeof WigoDailyVerseOptions> = () => <WigoDailyVerseOptions />;
