import { ComponentMeta, ComponentStory } from "@storybook/react";

import { QuotesWFilter } from "./quotes_w_filter";

export default {
   title: "layouts/stacks/Quotes With Filter",
   component: QuotesWFilter
} as ComponentMeta<typeof QuotesWFilter>;

export const WithEditOption: ComponentStory<typeof QuotesWFilter> = () => (
   <QuotesWFilter cta={{ handleClose() {} }} />
);
