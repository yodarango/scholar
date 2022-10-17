import { ComponentMeta, ComponentStory } from "@storybook/react";

import { CommentariesAll } from "./commentaries_all";

export default {
   title: "templates/Thought Text Editor ",
   component: CommentariesAll
} as ComponentMeta<typeof CommentariesAll>;

export const ThoughtPost: ComponentStory<typeof CommentariesAll> = () => (
   <CommentariesAll commentaries={[]} />
);
