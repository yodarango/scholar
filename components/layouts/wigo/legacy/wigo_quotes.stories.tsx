import { ComponentMeta, ComponentStory } from "@storybook/react";

import { WigoQuotes } from "./wigo_quotes";

export default {
   title: "Layouts/Wigo/Quotes Carrousel",
   component: WigoQuotes
} as ComponentMeta<typeof WigoQuotes>;

export const ThoughtPost: ComponentStory<typeof WigoQuotes> = () => (
   <WigoQuotes
      quotes={[
         {
            ID: "0",
            body: "This is  a body",
            category_tags: "#BR",
            author: "Matt",
            background: "quote-bkg--14",
            posted_on: "07/05/22 21:00",
            date: "07/05/22 21:00",
            total_count: 23,
            creator: {
               ID: "23",
               signature: "Username",
               authority_level: 1,
               approval_rating: 87,
               avatar: ""
            },
            comments: [
               {
                  total_count: 34
               }
            ],
            approvals: [{ average_count: 23, total_count: 23 }]
         },
         {
            ID: "11",
            body: "This is  a body",
            category_tags: "#BR",
            author: "Matt",
            background: "quote-bkg--14",
            posted_on: "07/05/22 21:00",
            date: "07/05/22 21:00",
            total_count: 23,
            creator: {
               ID: "23",
               signature: "Username",
               authority_level: 1,
               approval_rating: 87,
               avatar: ""
            },
            comments: [
               {
                  total_count: 34
               }
            ],
            approvals: [{ average_count: 23, total_count: 23 }]
         },
         {
            ID: "76",
            body: "This is  a body",
            category_tags: "#BR",
            author: "Matt",
            background: "quote-bkg--14",
            posted_on: "07/05/22 21:00",
            date: "07/05/22 21:00",
            total_count: 23,
            creator: {
               ID: "23",
               signature: "Username",
               authority_level: 1,
               approval_rating: 87,
               avatar: ""
            },
            comments: [
               {
                  total_count: 34
               }
            ],
            approvals: [{ average_count: 23, total_count: 23 }]
         },
         {
            ID: "2",
            body: "This is  a body",
            category_tags: "#BR",
            author: "Matt",
            background: "quote-bkg--14",
            posted_on: "07/05/22 21:00",
            date: "07/05/22 21:00",
            total_count: 23,
            creator: {
               ID: "23",
               signature: "Username",
               authority_level: 1,
               approval_rating: 87,
               avatar: ""
            },
            comments: [
               {
                  total_count: 34
               }
            ],
            approvals: [{ average_count: 23, total_count: 23 }]
         },
         {
            ID: "233",
            body: "This is  a body",
            category_tags: "#BR",
            author: "Matt",
            background: "quote-bkg--14",
            posted_on: "07/05/22 21:00",
            date: "07/05/22 21:00",
            total_count: 23,
            creator: {
               ID: "23",
               signature: "Username",
               authority_level: 1,
               approval_rating: 87,
               avatar: ""
            },
            comments: [
               {
                  total_count: 34
               }
            ],
            approvals: [{ average_count: 23, total_count: 23 }]
         }
      ]}
   />
);
