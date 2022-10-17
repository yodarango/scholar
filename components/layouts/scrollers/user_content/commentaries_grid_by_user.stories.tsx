import { ComponentMeta, ComponentStory } from "@storybook/react";

import { CommentariesGridByUser } from "./commentaries_grid_by_user";

export default {
   title: "layouts/scrollers/Commentaries Grid",
   component: CommentariesGridByUser
} as ComponentMeta<typeof CommentariesGridByUser>;

export const Default: ComponentStory<typeof CommentariesGridByUser> = () => (
   <CommentariesGridByUser verseId='' />
);
