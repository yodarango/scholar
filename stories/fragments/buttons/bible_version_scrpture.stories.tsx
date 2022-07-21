import { ComponentMeta, ComponentStory } from "@storybook/react";

import { BibleVersionScripture } from "../../../fragments/buttons/bible_version_scrpture";

export default {
   title: "fragments/buttons/Choose Bible Version Or Scripture",
   component: BibleVersionScripture
} as ComponentMeta<typeof BibleVersionScripture>;

export const Default: ComponentStory<typeof BibleVersionScripture> = () => (
   <BibleVersionScripture version='ESV' scriptureRef='1 Thessalonians 5:15' />
);
