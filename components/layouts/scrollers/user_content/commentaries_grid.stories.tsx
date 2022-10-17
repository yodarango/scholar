import { ComponentMeta, ComponentStory } from "@storybook/react";

import { CommentariesGrid } from "./commentaries_grid";

export default {
   title: "layouts/scrollers/Commentaries Grid",
   component: CommentariesGrid
} as ComponentMeta<typeof CommentariesGrid>;

export const Default: ComponentStory<typeof CommentariesGrid> = () => <CommentariesGrid />;
