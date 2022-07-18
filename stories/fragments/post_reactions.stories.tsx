import { ComponentMeta, ComponentStory } from "@storybook/react";

import { PostReactions } from "../../fragments/post_reactions";

export default {
   title: "fragments/chunks/Post Comment",
   component: PostReactions
} as ComponentMeta<typeof PostReactions>;

export const APlus: ComponentStory<typeof PostReactions> = () => <PostReactions />;
