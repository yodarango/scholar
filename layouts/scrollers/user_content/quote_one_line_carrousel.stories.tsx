import { ComponentMeta, ComponentStory } from "@storybook/react";

import { QuoteOneLineCarrousel } from "./quote_one_line_carrousel";

export default {
   title: "layouts/scrollers/Quote One Line Carrousel",
   component: QuoteOneLineCarrousel
} as ComponentMeta<typeof QuoteOneLineCarrousel>;

export const Default: ComponentStory<typeof QuoteOneLineCarrousel> = () => (
   <QuoteOneLineCarrousel
      quotes={[
         {
            ID: "23",
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
            ID: "23",
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
            ID: "23",
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
            ID: "23",
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
            ID: "23",
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
