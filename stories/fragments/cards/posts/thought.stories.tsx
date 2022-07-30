import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Thought } from "../../../../fragments/cards/posts/thought";

export default {
   title: "fragments/cards/posts/thought",
   component: Thought
} as ComponentMeta<typeof Thought>;

export const ChapterCount: ComponentStory<typeof Thought> = () => (
   <Thought
      cta={{
         handleShowCategoryMeta(categoryId) {
            console.log("show category id", categoryId);
         },
         handleShowRatePost() {
            console.log("handle show post");
         },
         handleShowPostComments() {
            console.log("handle show post comments");
         },
         handleShowPostOptions() {
            console.log("handle show post options");
         }
      }}
      thought={{
         ID: "1",
         title: "This is my title very long by the way",
         body: "This is my post very long by the way, This is my post very long by the way This is my post very long by the way This is my post very long by the way",
         category_tags: "#CYN #BLK",
         referenced_verses: "1CO.1.2",
         posted_on: "12/24/2022",
         date: "07/07/2022 02:00",
         total_count: 5,
         postImage: "/images/icons/logo.png",
         creator: {
            ID: "1",
            signature: "Myusername",
            authority_level: 1,
            approval_rating: 100,
            first_name: "Mario",
            last_name: "Pineda",
            my_church: "FAC",
            avatar: "/images/logo.png"
         },
         comments: [{ total_count: 20 }],
         approvals: [
            {
               total_count: 5,
               average_count: 5
            }
         ]
      }}
   />
);
