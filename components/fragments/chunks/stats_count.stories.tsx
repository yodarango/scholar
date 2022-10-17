import { ComponentMeta, ComponentStory } from "@storybook/react";

import { StatsCount } from "./stats_count";

export default {
   title: "fragments/chunks/Stats Count",
   component: StatsCount
} as ComponentMeta<typeof StatsCount>;

export const Default: ComponentStory<typeof StatsCount> = () => (
   <StatsCount title='sample' count={523} />
);
