import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Commentary } from "../../fragments/cards/posts/commentary";

import { GridPrimary } from "./grid_primary";

export default {
   title: "layouts/scrollers/Uneven Grid",
   component: GridPrimary
} as ComponentMeta<typeof GridPrimary>;

export const WithoutCloseOption: ComponentStory<typeof GridPrimary> = () => (
   <GridPrimary
      children={[...Array(20)].map((_, index) => (
         <Commentary
            cta={{
               handleDelete: () => {}
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
      ))}
   />
);
