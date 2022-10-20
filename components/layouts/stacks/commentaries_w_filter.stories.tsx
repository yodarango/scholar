import { ComponentMeta, ComponentStory } from "@storybook/react";

import { CommentariesWFilter } from "./commentaries_w_filter";

export default {
   title: "layouts/stacks/Comentaries With Filter",
   component: CommentariesWFilter
} as ComponentMeta<typeof CommentariesWFilter>;

export const WithEditOption: ComponentStory<typeof CommentariesWFilter> = () => (
   <CommentariesWFilter cta={{ handleClose() {} }} />
);
