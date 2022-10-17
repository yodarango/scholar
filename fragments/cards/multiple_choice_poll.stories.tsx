import { ComponentMeta, ComponentStory } from "@storybook/react";

import { MultipleChoicePollCard } from "./multiple_choice_poll";

export default {
   title: "fragments/cards/Multiple Choice Poll Card",
   component: MultipleChoicePollCard
} as ComponentMeta<typeof MultipleChoicePollCard>;

export const Default: ComponentStory<typeof MultipleChoicePollCard> = () => (
   <MultipleChoicePollCard
      content={{
         options: ["Genesis", "Exoduds", "Leviticus"],
         votes: [23, 5, 78],
         id: "2",
         question: "Which is your favorite book?",
         type: 2,
         countTo: "12/12/22"
      }}
   />
);
