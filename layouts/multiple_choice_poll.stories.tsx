import { ComponentMeta, ComponentStory } from "@storybook/react";

import { MultipleChicePoll } from "../../../layouts/content/multiple_choice_poll";

export default {
   title: "layouts/content/Multiple Choice Poll",
   component: MultipleChicePoll
} as ComponentMeta<typeof MultipleChicePoll>;

export const Default: ComponentStory<typeof MultipleChicePoll> = () => (
   <MultipleChicePoll
      content={{
         id: "",
         question: "Coffe or tea?",
         options: ["yes", "no", "maybe"],
         votes: [2, 4, 6],
         countTo: "08/22/22 22:00"
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
