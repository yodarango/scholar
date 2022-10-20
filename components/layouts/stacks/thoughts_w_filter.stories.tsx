import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ThoughtsWFilter } from "./thoughts_w_filter";

export default {
   title: "layouts/stacks/Thoughts With Filter",
   component: ThoughtsWFilter
} as ComponentMeta<typeof ThoughtsWFilter>;

export const WithEditOption: ComponentStory<typeof ThoughtsWFilter> = () => (
   <ThoughtsWFilter cta={{ handleClose() {} }} />
);
