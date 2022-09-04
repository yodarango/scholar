import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ProfileStatsGraph } from "./profile_stats_graph";

export default {
   title: "fragments/chunks/Post Rating Graph",
   component: ProfileStatsGraph
} as ComponentMeta<typeof ProfileStatsGraph>;

export const APlus: ComponentStory<typeof ProfileStatsGraph> = () => (
   <ProfileStatsGraph
      content={{
         commentaries: 43,
         thoughts: 11,
         quotes: 56,
         sermonNotes: 77
      }}
   />
);
