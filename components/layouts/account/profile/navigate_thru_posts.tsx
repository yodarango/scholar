/**************************************************************************************** 
-   Toggles which type of posts to show on the user's profile (e.g. commentary, thought, quote, sermon_note)
****************************************************************************************/
import { useState } from "react";

// components
import { PostsNavigation } from "../../navs/posts_navigation";
import { CommentaryOneLineCarrousel } from "../../scrollers/user_content/commentaries_one_line_carrousel";
import { QuoteOneLineCarrousel } from "../../scrollers/user_content/quote_one_line_carrousel";
import { SermonNoteOneLineCarrousel } from "../../scrollers/user_content/sermon_note_one_line_carrousel";
import { ThoughtsOneLineCarrousel } from "../../scrollers/user_content/thoughts_one_line_carrousel";

// styles
import styles from "./navigate_thru_posts.module.css";

export const NavigateThruPosts = () => {
   const [postType, setpostType] = useState<number>(1);
   return (
      <div className={styles.mainWrapper}>
         <div className={styles.nav}>
            <PostsNavigation
               cta={{
                  handleClick: (value: number) => setpostType(value)
               }}
            />
         </div>
         <div className={styles.posts}>
            {postType === 1 && (
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
                     }
                  ]}
               />
            )}
            {postType === 2 && (
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
                     }
                  ]}
               />
            )}
            {postType === 3 && (
               <ThoughtsOneLineCarrousel
                  thoughts={[
                     {
                        ID: "32",
                        title: "This is a title",
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
            )}
            {postType === 4 && (
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
                     }
                  ]}
               />
            )}
         </div>
      </div>
   );
};
