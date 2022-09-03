import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ThumbsUpDownStats } from "../../../fragments/chunks/thumbs_up_down_stats";

export default {
   title: "fragments/chunks/Votes Up Down Stats",
   component: ThumbsUpDownStats
} as ComponentMeta<typeof ThumbsUpDownStats>;

export const Default: ComponentStory<typeof ThumbsUpDownStats> = () => (
   <ThumbsUpDownStats votesUp='45' votesDown='83' />
);
