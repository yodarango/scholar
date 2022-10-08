import { ComponentMeta, ComponentStory } from "@storybook/react";

import { QuotesAll } from "./quotes_all";

export default {
   title: "templates/Thought Text Editor ",
   component: QuotesAll
} as ComponentMeta<typeof QuotesAll>;

export const ThoughtPost: ComponentStory<typeof QuotesAll> = () => <QuotesAll />;
