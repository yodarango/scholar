import { ComponentMeta, ComponentStory } from "@storybook/react";

import { PostComment } from "../../fragments/chunks/post_comment";

export default {
   title: "fragments/chunks/Post Comment",
   component: PostComment
} as ComponentMeta<typeof PostComment>;

export const APlus: ComponentStory<typeof PostComment> = () => (
   <PostComment comments={23} cta={() => console.log("...")} />
);
