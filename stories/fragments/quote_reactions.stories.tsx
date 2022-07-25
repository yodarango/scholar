import { ComponentMeta, ComponentStory } from "@storybook/react";

import { QuoteReactions } from "../../fragments/quote_reactions";

export default {
   title: "fragments/Quote Reactions",
   component: QuoteReactions
} as ComponentMeta<typeof QuoteReactions>;

export const Default: ComponentStory<typeof QuoteReactions> = () => <QuoteReactions />;
