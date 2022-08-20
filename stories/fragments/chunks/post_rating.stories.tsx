import { ComponentMeta, ComponentStory } from "@storybook/react";

import { PostRating } from "../../../fragments/chunks/post_rating";

export default {
   title: "fragments/chunks/Post Rating",
   component: PostRating
} as ComponentMeta<typeof PostRating>;

export const APlus: ComponentStory<typeof PostRating> = () => (
   <PostRating rating={{ averageCount: 100, totalCount: 100 }} />
);
