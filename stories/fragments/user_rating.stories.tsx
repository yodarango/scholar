import { ComponentMeta, ComponentStory } from "@storybook/react";

import { UserRating } from "../../fragments/chunks/user_rating";

export default {
   title: "fragments/chunks/User Rating",
   component: UserRating
} as ComponentMeta<typeof UserRating>;

export const APlus: ComponentStory<typeof UserRating> = () => (
   <UserRating rating={{ average_count: 100, total_count: 100 }} cta={() => console.log("...")} />
);
