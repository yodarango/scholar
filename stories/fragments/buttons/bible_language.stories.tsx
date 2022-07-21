import { ComponentMeta, ComponentStory } from "@storybook/react";

import { BibleLanguage } from "../../../fragments/buttons/bible_language";

export default {
   title: "fragments/buttons/Choose Bible Language",
   component: BibleLanguage
} as ComponentMeta<typeof BibleLanguage>;

export const Default: ComponentStory<typeof BibleLanguage> = () => (
   <BibleLanguage cta={(item) => console.log("language selected", item)} />
);
