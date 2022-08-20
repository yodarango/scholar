import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ContentGraphicsPost } from "../../../fragments/cards/content_graphics_post";

export default {
   title: "fragments/cards/Content Graphics Post",
   component: ContentGraphicsPost
} as ComponentMeta<typeof ContentGraphicsPost>;

export const APlus: ComponentStory<typeof ContentGraphicsPost> = () => (
   <ContentGraphicsPost
      images={[
         "/bible_books/1.png",
         "/bible_books/2.png",
         "/bible_books/3.png",
         "/bible_books/4.png",
         "/bible_books/5.png"
      ]}
   />
);
