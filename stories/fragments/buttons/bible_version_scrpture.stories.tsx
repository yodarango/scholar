import { ComponentMeta, ComponentStory } from "@storybook/react";

import { BibleVersionScripture } from "../../../fragments/buttons/bible_version_scrpture";

export default {
   title: "fragments/buttons/Choose Bible Version Or Scripture",
   component: BibleVersionScripture
} as ComponentMeta<typeof BibleVersionScripture>;

export const EnglishESV: ComponentStory<typeof BibleVersionScripture> = () => (
   <BibleVersionScripture
      version='ESV'
      scriptureRef='1 Thessalonians 5:15'
      bibleLanguage='english'
   />
);

export const SpanishRV09: ComponentStory<typeof BibleVersionScripture> = () => (
   <BibleVersionScripture
      version='RV09'
      scriptureRef='1 Thessalonians 5:15'
      bibleLanguage='spanish'
   />
);
