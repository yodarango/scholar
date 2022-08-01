import { ComponentMeta, ComponentStory } from "@storybook/react";

import { AboutMeItem } from "../../../fragments/cards/about_me_item";

export default {
   title: "fragments/cards/About Me item",
   component: AboutMeItem
} as ComponentMeta<typeof AboutMeItem>;

export const APlus: ComponentStory<typeof AboutMeItem> = () => (
   <AboutMeItem emoji='⛪️' value='First Apostolic Church of Maryville' />
);
