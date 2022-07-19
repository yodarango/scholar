import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ContentReviews } from "../../fragments/content_reviews";

export default {
   title: "fragments/Content Reviews",
   component: ContentReviews
} as ComponentMeta<typeof ContentReviews>;

export const Default: ComponentStory<typeof ContentReviews> = () => (
   <ContentReviews stars={4} reviews={80} quiet={true} cta={() => console.log("...")} />
);
