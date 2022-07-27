import { ComponentMeta, ComponentStory } from "@storybook/react";

import { DailyVerseCard } from "../../../fragments/cards/daily_verse_card";

export default {
   title: "fragments/cards/Daily Verse",
   component: DailyVerseCard
} as ComponentMeta<typeof DailyVerseCard>;

export const Default: ComponentStory<typeof DailyVerseCard> = () => (
   <DailyVerseCard
      versionId='de4e12af7f28f599-02'
      verseContent={{
         id: "1PE.1.8",
         orgId: "",
         chapterId: "",
         bookId: "",
         bibleId: "",
         verseCount: 0,
         copyright: "",
         reference: "1 Peter 1:8",
         next: { id: "1PE.1.9", number: "" },
         previous: {
            id: "1PE.1.7",
            number: ""
         },
         content:
            "Whom having not seen, ye love; in whom, though now ye see him not, yet believing, ye rejoice with joy unspeakable and full of glory"
      }}
   />
);
