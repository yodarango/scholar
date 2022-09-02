import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ThumbsUpDownPoll } from "../../../fragments/cards/thumbs_up_down_poll";

export default {
   title: "fragments/cards/Thumbs Up Down",
   component: ThumbsUpDownPoll
} as ComponentMeta<typeof ThumbsUpDownPoll>;

export const WithoutCloseOption: ComponentStory<typeof ThumbsUpDownPoll> = () => (
   <ThumbsUpDownPoll
      content={{
         countdownLimit: "08/03/2022 21:00:00",
         id: "1",
         poll: "The earth is 6,000 years old",
         votes: { votesDown: 1, votesUp: 3 }
      }}
      cta={{
         handleVote(up, down, id, myvote) {
            console.log(up, down, id, myvote);
         }
      }}
   />
);
