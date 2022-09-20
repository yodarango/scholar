import { ComponentMeta, ComponentStory } from "@storybook/react";

import { CommentaryFilter } from "./commentary_filter";

export default {
   title: "Fragments/CommentaryFilter",
   component: CommentaryFilter
} as ComponentMeta<typeof CommentaryFilter>;

export const MenuOptionWithBackgroundId: ComponentStory<typeof CommentaryFilter> = () => (
   <CommentaryFilter />
);
