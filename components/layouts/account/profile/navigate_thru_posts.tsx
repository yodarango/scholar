/*************************************************************************************************************************
-   There are two states in this file that control the views:
   1. postType: This state is only concerned with the display of the title, link, and inline scroller. It does not touch 
   the router
   2. currentView: Current view is concerned only with the display of the overlay that holds the posts. This is manipulated 
   through the useEffect that is updated on query.change. To hide the layers the query.view is set to = 0. The reason for 
   manipulating this through a query is so that if the user shares the link user/123/?view=1 they page will have the crrect 
   modal brought up
**************************************************************************************************************************/

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// components
import { PostsNavigation } from "../../navs/posts_navigation";
import { CommentaryOneLineCarrousel } from "../../scrollers/user_content/commentaries_one_line_carrousel";
import { QuoteOneLineCarrousel } from "../../scrollers/user_content/quote_one_line_carrousel";
import { SermonNoteOneLineCarrousel } from "../../scrollers/user_content/sermon_note_one_line_carrousel";
import { ThoughtsOneLineCarrousel } from "../../scrollers/user_content/thoughts_one_line_carrousel";
import { LinkWithArrow } from "../../../fragments/buttons/link_with_arrow";
import { Header } from "../../../fragments/Typography/header";

// styles
import styles from "./navigate_thru_posts.module.css";
import ProfilePosts from "../../../containers/profile_posts";

export const NavigateThruPosts = () => {
   // router
   const router = useRouter();

   console.log(router);

   // state
   const [postType, setpostType] = useState<number>(1); // concerned only with the OneLineScrollers
   const [currentView, setcurrentView] = useState<number>(0); // concerned only with the views

   const headerTitles = ["Commentaries", "Thoughts", "Quotes", "Sermon notes"];
   const headerLinks = ["1", "2", "3", "4"];

   // if there is a query.view that means that one of the models is open,
   // change the state that handles this
   useEffect(() => {
      if (router.query.view) {
         const query: any = router.query.view;
         const view = parseInt(query);
         setcurrentView(view);
      }
   }, [router.query, router.isReady]);

   // close posts layer
   const handleLayerClose = () => {
      router.push({
         pathname: router.pathname,
         query: { view: 0 }
      });
   };

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
            <div className={styles.top}>
               <div>
                  <Header type={3} text={headerTitles[postType - 1]} size='large' quiet={true} />
               </div>
               <div>
                  <LinkWithArrow
                     title='See all'
                     link={`${router.pathname}?view=${headerLinks[postType - 1]}`}
                  />
               </div>
            </div>
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
         <ProfilePosts type={currentView} cta={{ handleClose: handleLayerClose }} />
      </div>
   );
};
