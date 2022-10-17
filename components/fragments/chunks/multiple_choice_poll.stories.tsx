import { ComponentMeta, ComponentStory } from "@storybook/react";

import { MultipleChoicePoll } from "../../../fragments/chunks/multiple_choice_poll";

export default {
   title: "fragments/chunks/Multiple Choice Poll",
   component: MultipleChoicePoll
} as ComponentMeta<typeof MultipleChoicePoll>;

export const Default: ComponentStory<typeof MultipleChoicePoll> = () => (
   <MultipleChoicePoll options={[32, 34, 54, 67]} />
);
