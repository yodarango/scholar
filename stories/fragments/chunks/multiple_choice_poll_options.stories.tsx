import { ComponentMeta, ComponentStory } from "@storybook/react";

import { MultipleChoicePollOptions } from "../../../fragments/chunks/multiple_choice_poll_options";

export default {
   title: "fragments/chunks/Multiple Choice Poll Options",
   component: MultipleChoicePollOptions
} as ComponentMeta<typeof MultipleChoicePollOptions>;

export const Default: ComponentStory<typeof MultipleChoicePollOptions> = () => (
   <MultipleChoicePollOptions
      options={["hot", "cold", "warm"]}
      cta={{
         handleVote(vote) {
            console.log(vote);
         }
      }}
   />
);
