import { ComponentMeta, ComponentStory } from "@storybook/react";

import { QuotesGrid } from "./quotes_grid";

export default {
   title: "layouts/scrollers/Quotes Grid",
   component: QuotesGrid
} as ComponentMeta<typeof QuotesGrid>;

export const Default: ComponentStory<typeof QuotesGrid> = () => <QuotesGrid />;
