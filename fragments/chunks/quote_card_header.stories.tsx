import { ComponentMeta, ComponentStory } from "@storybook/react";

import { QuoteCardHeader } from "../../../fragments/chunks/quote_card_header";

export default {
   title: "fragments/chunks/Quote Card Header",
   component: QuoteCardHeader
} as ComponentMeta<typeof QuoteCardHeader>;

export const Default: ComponentStory<typeof QuoteCardHeader> = () => (
   <QuoteCardHeader userAuthority={1} avatar='/images/icon.png' />
);
