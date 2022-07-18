import { ComponentMeta, ComponentStory } from "@storybook/react";

import { PostRating } from "../../fragments/chunks/post_rating";

export default {
   title: "fragments/chunks/User Rating",
   component: PostRating
} as ComponentMeta<typeof PostRating>;

export const APlus: ComponentStory<typeof PostRating> = () => (
   <PostRating rating={{ average_count: 100, total_count: 100 }} cta={() => console.log("...")} />
);
