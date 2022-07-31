import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Quote } from "../../../../fragments/cards/posts/quote";

export default {
   title: "fragments/cards/posts/quote",
   component: Quote
} as ComponentMeta<typeof Quote>;

export const ChapterCount: ComponentStory<typeof Quote> = () => (
   <Quote
      cta={{
         handleShowRatePost: () => console.log("handle show post"),
         handleShowPostComments: () => console.log("handle show post comments"),
         handleShowPostOptions: () => console.log("handle show post options")
      }}
      quote={{
         ID: "1",
         body: "This is my post",
         category_tags: "#CYN #BLK",
         author: "myusername",
         background: "quote-bkg--5",
         posted_on: "12/24/2022",
         date: "07/07/2022 02:00",
         total_count: 5,
         creator: {
            ID: "1",
            signature: "Myusername",
            authority_level: 1,
            approval_rating: 100,
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
