import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SermonNote } from "../../../../fragments/cards/posts/sermon_note";

export default {
   title: "fragments/cards/posts/sermon note",
   component: SermonNote
} as ComponentMeta<typeof SermonNote>;

export const ChapterCount: ComponentStory<typeof SermonNote> = () => (
   <SermonNote
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
      sermonNote={{
         ID: "1",
         title: "This is my title very long by the way",
         content:
            "This is my post very long by the way, This is my post very long by the way This is my post very long by the way This is my post very long by the way",
         category_tags: "#CYN #BLK",
         file_url: "dropbox.com",
         posted_on: "12/24/2022",
         date: "07/07/2022 02:00",
         DROPBOX_ID: "123",
         creator: {
            ID: "1",
            signature: "Myusername",
            authority_level: 1,
            approval_rating: 100,
            first_name: "Mario",
            last_name: "Pineda",
            my_church: "FAC",
            avatar: "/images/logo.png"
         }
      }}
   />
);

export type TSermonNote = {
   ID: string;
   content: string;
   USER_ID: string;
   DROPBOX_ID: string;
   title: string;
   category_tags: string;
   posted_on: string;
   total_count: number;
   file_url: string;
   creator: {
      ID: string;
      signature: string;
      avatar: string;
      authority_level: number;
      approval_rating: string | number;
      first_name?: string;
      last_name?: string;
      my_church: string;
   };
};
