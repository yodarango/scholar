import { ComponentMeta, ComponentStory } from "@storybook/react";

import { BibleVersionLanguage } from "../../../fragments/buttons/bible_language";

export default {
   title: "fragments/buttons/Choose Bible Language",
   component: BibleVersionLanguage
} as ComponentMeta<typeof BibleVersionLanguage>;

export const APlus: ComponentStory<typeof BibleVersionLanguage> = () => (
   <BibleVersionLanguage cta={(item) => console.log("language selected", item)} />
);
