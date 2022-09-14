import { ComponentMeta, ComponentStory } from "@storybook/react";

import { BibleVersionScripture } from "./bible_version_scripture";

export default {
   title: "fragments/buttons/Choose Bible Version Or Scripture",
   component: BibleVersionScripture
} as ComponentMeta<typeof BibleVersionScripture>;

export const EnglishESV: ComponentStory<typeof BibleVersionScripture> = () => (
   <BibleVersionScripture
      cta={{ handleSelection: (content) => console.log(content) }}
      BiblePreferences={{
         versionName: "ESV",
         versionId: "de4e12af7f28f599-02",
         scriptureRef: "1 Thessalonians 5:15",
         bibleLanguage: "english"
      }}
   />
);

export const SpanishRV09: ComponentStory<typeof BibleVersionScripture> = () => (
   <BibleVersionScripture
      cta={{ handleSelection: (content) => console.log(content) }}
      BiblePreferences={{
         versionName: "RV09",
         versionId: "592420522e16049f-01",
         scriptureRef: "1 Thessalonians 5:15",
         bibleLanguage: "spanish"
      }}
   />
);
