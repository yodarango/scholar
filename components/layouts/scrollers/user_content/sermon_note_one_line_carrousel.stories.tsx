import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SermonNoteOneLineCarrousel } from "./sermon_note_one_line_carrousel";

export default {
   title: "layouts/content/Sermon One Line Carrousel",
   component: SermonNoteOneLineCarrousel
} as ComponentMeta<typeof SermonNoteOneLineCarrousel>;

export const Default: ComponentStory<typeof SermonNoteOneLineCarrousel> = () => (
   <SermonNoteOneLineCarrousel
      sermonNotes={[
         {
            ID: "32",
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
            ID: "32",
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
            ID: "32",
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
            ID: "32",
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
            ID: "32",
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
