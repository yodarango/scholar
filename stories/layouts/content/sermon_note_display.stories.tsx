import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SermonNoteDisplay } from "../../../layouts/content/sermon_note_display";

export default {
   title: "layouts/content/Sermon Note Display",
   component: SermonNoteDisplay
} as ComponentMeta<typeof SermonNoteDisplay>;

export const Default: ComponentStory<typeof SermonNoteDisplay> = () => (
   <SermonNoteDisplay
      sermonNotes={[
         {
            ID: "2",
            content: "This is a title",
            DROPBOX_ID:
               "this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body",
            category_tags: "#YLW",
            posted_on: "07/29/22 22:00",
            date: "07/29/22 22:00",
            title: "title",
            file_url: "#",
            creator: {
               ID: "1",
               signature: "Username",
               authority_level: 1,
               approval_rating: 90,
               avatar: "/imges/user_avatars/default.png",
               first_name: "John",
               last_name: "Doe",
               my_church: "The Chruch of my Lord Jesus Christ"
            }
         },
         {
            ID: "112",
            content: "This is a title",
            DROPBOX_ID:
               "this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body",
            category_tags: "#YLW",
            posted_on: "07/29/22 22:00",
            date: "07/29/22 22:00",
            title: "title",
            file_url: "#",
            creator: {
               ID: "1",
               signature: "Username",
               authority_level: 1,
               approval_rating: 90,
               avatar: "/imges/user_avatars/default.png",
               first_name: "John",
               last_name: "Doe",
               my_church: "The Chruch of my Lord Jesus Christ"
            }
         },
         {
            ID: "34",
            content: "This is a title",
            DROPBOX_ID:
               "this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body",
            category_tags: "#YLW",
            posted_on: "07/29/22 22:00",
            date: "07/29/22 22:00",
            title: "title",
            file_url: "#",
            creator: {
               ID: "1",
               signature: "Username",
               authority_level: 1,
               approval_rating: 90,
               avatar: "/imges/user_avatars/default.png",
               first_name: "John",
               last_name: "Doe",
               my_church: "The Chruch of my Lord Jesus Christ"
            }
         },
         {
            ID: "5",
            content: "This is a title",
            DROPBOX_ID:
               "this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body",
            category_tags: "#YLW",
            posted_on: "07/29/22 22:00",
            date: "07/29/22 22:00",
            title: "title",
            file_url: "#",
            creator: {
               ID: "1",
               signature: "Username",
               authority_level: 1,
               approval_rating: 90,
               avatar: "/imges/user_avatars/default.png",
               first_name: "John",
               last_name: "Doe",
               my_church: "The Chruch of my Lord Jesus Christ"
            }
         },
         {
            ID: "55",
            content: "This is a title",
            DROPBOX_ID:
               "this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body",
            category_tags: "#YLW",
            posted_on: "07/29/22 22:00",
            date: "07/29/22 22:00",
            title: "title",
            file_url: "#",
            creator: {
               ID: "1",
               signature: "Username",
               authority_level: 1,
               approval_rating: 90,
               avatar: "/imges/user_avatars/default.png",
               first_name: "John",
               last_name: "Doe",
               my_church: "The Chruch of my Lord Jesus Christ"
            }
         }
      ]}
   />
);
