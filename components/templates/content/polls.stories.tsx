import { ComponentMeta, ComponentStory } from "@storybook/react";

import { PollsTemplate } from "./polls";

export default {
   title: "Templates/Poll",
   component: PollsTemplate
} as ComponentMeta<typeof PollsTemplate>;

export const Polls: ComponentStory<typeof PollsTemplate> = () => <PollsTemplate />;
