import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ThoughtsAll } from "./thoughts_all";

export default {
   title: "templates/Thought Text Editor ",
   component: ThoughtsAll
} as ComponentMeta<typeof ThoughtsAll>;

export const ThoughtPost: ComponentStory<typeof ThoughtsAll> = () => <ThoughtsAll />;
