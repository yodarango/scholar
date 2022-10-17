import { ComponentMeta, ComponentStory } from "@storybook/react";

import { CommentaryOneLineCarrousel } from "./commentaries_one_line_carrousel";

export default {
   title: "layouts/scrollers/Commentary One Line Carrousel",
   component: CommentaryOneLineCarrousel
} as ComponentMeta<typeof CommentaryOneLineCarrousel>;

export const Default: ComponentStory<typeof CommentaryOneLineCarrousel> = () => (
   <CommentaryOneLineCarrousel
      commentaries={[
         {
            ID: "32",
            body: "this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body",
            category_tags: "#YLW",
            referenced_verses: "1CO.1.1 MATT.2.2",
            posted_on: "11/29/22 22:00",
            date: "11/29/22 22:00",
            VERSE_ID: "MAT.1.1",
            verse_citation: "Matthew 12:1",
            total_count: 10,
            postImage: "/images/bible_books/1.png",
            creator: {
               ID: "1",
               signature: "Username",
               authority_level: 1,
               approval_rating: 90,
               avatar: "/imges/user_avatars/default.png",
               first_name: "John",
               last_name: "Doe",
               my_church: "The Chruch of my Lord Jesus Christ"
            },
            comments: [
               {
                  total_count: 34
               }
            ],
            approvals: [
               {
                  average_count: 3,
                  total_count: 34
               }
            ]
         },
         {
            ID: "32",
            body: "this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body",
            category_tags: "#YLW",
            referenced_verses: "1CO.1.1 MATT.2.2",
            posted_on: "11/29/22 22:00",
            VERSE_ID: "MAT.1.1",
            verse_citation: "Matthew 12:1",
            date: "11/29/22 22:00",
            total_count: 10,
            postImage: "/images/bible_books/1.png",
            creator: {
               ID: "1",
               signature: "Username",
               authority_level: 1,
               approval_rating: 90,
               avatar: "/imges/user_avatars/default.png",
               first_name: "John",
               last_name: "Doe",
               my_church: "The Chruch of my Lord Jesus Christ"
            },
            comments: [
               {
                  total_count: 34
               }
            ],
            approvals: [
               {
                  average_count: 3,
                  total_count: 34
               }
            ]
         },
         {
            ID: "32",
            VERSE_ID: "MAT.1.1",
            verse_citation: "Matthew 12:1",
            body: "this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body",
            category_tags: "#YLW",
            referenced_verses: "1CO.1.1 MATT.2.2",
            posted_on: "11/29/22 22:00",
            date: "11/29/22 22:00",
            total_count: 10,
            postImage: "/images/bible_books/1.png",
            creator: {
               ID: "1",
               signature: "Username",
               authority_level: 1,
               approval_rating: 90,
               avatar: "/imges/user_avatars/default.png",
               first_name: "John",
               last_name: "Doe",
               my_church: "The Chruch of my Lord Jesus Christ"
            },
            comments: [
               {
                  total_count: 34
               }
            ],
            approvals: [
               {
                  average_count: 3,
                  total_count: 34
               }
            ]
         },
         {
            ID: "32",
            VERSE_ID: "MAT.1.1",
            verse_citation: "Matthew 12:1",
            body: "this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body",
            category_tags: "#YLW",
            referenced_verses: "1CO.1.1 MATT.2.2",
            posted_on: "11/29/22 22:00",
            date: "11/29/22 22:00",
            total_count: 10,
            postImage: "/images/bible_books/1.png",
            creator: {
               ID: "1",
               signature: "Username",
               authority_level: 1,
               approval_rating: 90,
               avatar: "/imges/user_avatars/default.png",
               first_name: "John",
               last_name: "Doe",
               my_church: "The Chruch of my Lord Jesus Christ"
            },
            comments: [
               {
                  total_count: 34
               }
            ],
            approvals: [
               {
                  average_count: 3,
                  total_count: 34
               }
            ]
         },
         {
            ID: "32",
            VERSE_ID: "MAT.1.1",
            verse_citation: "Matthew 12:1",
            body: "this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body",
            category_tags: "#YLW",
            referenced_verses: "1CO.1.1 MATT.2.2",
            posted_on: "11/29/22 22:00",
            date: "11/29/22 22:00",
            total_count: 10,
            postImage: "/images/bible_books/1.png",
            creator: {
               ID: "1",
               signature: "Username",
               authority_level: 1,
               approval_rating: 90,
               avatar: "/imges/user_avatars/default.png",
               first_name: "John",
               last_name: "Doe",
               my_church: "The Chruch of my Lord Jesus Christ"
            },
            comments: [
               {
                  total_count: 34
               }
            ],
            approvals: [
               {
                  average_count: 3,
                  total_count: 34
               }
            ]
         }
      ]}
   />
);
