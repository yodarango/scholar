import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ContentReviews } from "../../fragments/content_reviews";

export default {
   title: "fragments/Content Reviews",
   component: ContentReviews
} as ComponentMeta<typeof ContentReviews>;

export const Default: ComponentStory<typeof ContentReviews> = () => (
   <ContentReviews
      stars={4}
      reviews={80}
      quiet={true}
      cta={{ handleShowStartRatingMenu: () => console.log("...") }}
   />
);

export const WithBackground: ComponentStory<typeof ContentReviews> = () => (
   <ContentReviews
      stars={4}
      reviews={80}
      quiet={true}
      withBackground={true}
      cta={{ handleShowStartRatingMenu: () => console.log("...") }}
   />
);
