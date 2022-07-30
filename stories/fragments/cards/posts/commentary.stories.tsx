import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Commentary } from "../../../../fragments/cards/posts/commentary";

export default {
   title: "fragments/cards/posts/commentary",
   component: Commentary
} as ComponentMeta<typeof Commentary>;

export const ChapterCount: ComponentStory<typeof Commentary> = () => (
   <Commentary
      cta={{
         handleShowRatePost: () => console.log("handle show post"),
         handleShowPostComments: () => console.log("handle show post comments"),
         handleShowPostOptions: () => console.log("handle show post options")
      }}
      commentary={{
         ID: "1",
         VERSE_ID: "1",
         body: "This is my post",
         category_tags: "#CYN #BLK",
         referenced_verses: "!CO.1.2",
         posted_on: "12/24/2022",
         date: "07/07/2022 02:00",
         verse_citation: "1 Corinthians 1:2",
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
