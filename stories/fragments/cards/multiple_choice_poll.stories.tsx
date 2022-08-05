import { ComponentMeta, ComponentStory } from "@storybook/react";

import { MultipleChoicePollCard } from "../../../fragments/cards/multiple_choice_poll";

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
         question: "Which is your favorite book?"
      }}
      countTo='08/05/22 21:00'
      cta={{
         handleVote(selection) {
            console.log("selection is", selection);
         }
      }}
   />
);
