import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ThumbsUpPoll } from "./thumb_up_polls";

export default {
   title: "layouts/content/Thumbs Up Poll",
   component: ThumbsUpPoll
} as ComponentMeta<typeof ThumbsUpPoll>;

export const Default: ComponentStory<typeof ThumbsUpPoll> = () => (
   <ThumbsUpPoll
      content={{
         id: "1",
         votes: {
            votesUp: 1,
            votesDown: 3
         },
         countdownLimit: "08/20/22 22:00",
         poll: "Do you like coffee?"
      }}
   />
);

Default.parameters = {
   nextRouter: {
      path: "/read",
      asPath: "/read",
      query: { id: "none" }
   }
};
