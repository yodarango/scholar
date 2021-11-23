// core
import React, { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import Link from "next/link";

// graphql
import client from "../../apollo-client";
import { GET_PROFILE_INFO } from "../../graphql/users/profile";

// components
import Header from "../../layouts/header";
import Comments from "../../posts/comment";
import Thought from "../../posts/thought";
import QuoteProfile from "../../posts/quotes-profile";
import SermonsCarrousel from "../../layouts/library-individual-pages/sermons-carrousel";
import PopupWrapper from "../../layouts/popup-wrapper";
import NotificationsWrapper from "../../fragments/popup-content/notifications-wrapper";
import NavigationMenu from "../../layouts/navigation-menu";

// styles
import userStyles from "../../styles/pages/users/User.module.css";

// helpers
import { Tcommentary } from "../../posts/comment";
import { Tthought } from "../../posts/thought";
import { Tstory } from "../../posts/quotes-stroies";
import { TsermonPost } from "../../posts/sermon-notes-post";
//import { sermonProps } from "../../fragments/library-items/sermon";

export type TallPosts = {
   commentaries: Tcommentary[];
   thoughts: Tthought[];
   quotes: Tstory[];
   sermon_notes: TsermonPost[];
};

export type Tuser = {
   ID: string;
   MONGO_DB_ID: string;
   signature: string;
   first_name: string;
   last_name: string;
   birth_date: string;
   gender: string;
   email: string;
   password: string;
   date_registered: string;
   authority_level: string;
   approval_rating: number;
   avatar: string;
   my_church: string;
   my_favorite_color: string;
   my_job: string;
   my_true_color_personality_test: string;
   my_story: string;
   my_ministry: string;
   my_favorite_verse: string;
   all_posts: TallPosts;
};

export type userProps = {
   user: Tuser;
};

const User = ({ user }: userProps) => {
   const [coloredTabState, setColoredTabState] = useState<{
      comment?: string;
      thought?: string;
      quote?: string;
      sermon?: string;
   }>({
      comment: "#f2f2f2",
      thought: "",
      quote: "",
      sermon: ""
   });
   /*
   // ================  FUNCTION 1: request the commentaries by user   ================= //
   const [commentaryState, setCommentaryState] = useState<Tcommentary[]>([]);
   const requestCommentaries = async () => {
      const req = await fetch("https://scholar-be.herokuapp.com/commentaries");
      const comments = await req.json();
      setCommentaryState(comments);
      setColoredTabState({ comment: "#f2f2f2" });
      setQuoteState([]);
      setThoughtsState([]);
      setsermonState([]);
   };

   useEffect(() => {
      requestCommentaries();
   }, []);
   // ================  FUNCTION 2: request the thoughts by user   ================= //
   const [thoughtsState, setThoughtsState] = useState<Tthought[]>([]);
   const requestThoughts = async () => {
      const req = await fetch("https://scholar-be.herokuapp.com/thoughts");
      const thoughts = await req.json();
      setThoughtsState(thoughts);
      setColoredTabState({ thought: "#f2f2f2" });
      setCommentaryState([]);
      setQuoteState([]);
      setsermonState([]);
   };

   // ================  FUNCTION 3: request the quotes by user   ================= //
   const [quoteState, setQuoteState] = useState<TsingleStory[]>([]);
   const requestQuotes = async () => {
      const req = await fetch("https://scholar-be.herokuapp.com/story");
      const quotes = await req.json();
      setQuoteState(quotes);
      setColoredTabState({ quote: "#f2f2f2" });
      setThoughtsState([]);
      setCommentaryState([]);
      setsermonState([]);
   };

   // ================  FUNCTION 4: request the sermons by user   ================= //
   const [sermonState, setsermonState] = useState<sermonProps[]>([]);
   const requestSermons = async () => {
      const req = await fetch("https://scholar-be.herokuapp.com/library");
      const sermons = await req.json();
      setsermonState(sermons.sermons);
      setColoredTabState({ sermon: "#f2f2f2" });
      setThoughtsState([]);
      setCommentaryState([]);
      setQuoteState([]);
   };
   */

   // ================  FUNCTION 5: open the My stroy popup   ================= //
   // const handleMyStoryPopUp = () => {};

   // ================  FUNCTION 5: open the notifications popup   ================= //
   const [notificationsPopupState, setnotificationsPopupState] = useState(false);
   const openNotificationsPopup = () => {
      setnotificationsPopupState(true);
   };
   return (
      <>
         <div className={userStyles.mainWrapper}>
            {notificationsPopupState && (
               <PopupWrapper
                  closeModal={() => setnotificationsPopupState(false)}
                  content={<NotificationsWrapper />}
               />
            )}
            <div className={userStyles.userBioGrid}>
               <Header currPage={user.signature} />
               <Link href={`/users/settings/${user.ID}`}>
                  <a className={userStyles.settingsLinkIcon}></a>
               </Link>
               <div className={userStyles.notificationBell} onClick={openNotificationsPopup}></div>
               {user.approval_rating > 100 && (
                  <div className={userStyles.bellWnotificationWrapper}>
                     <div className={userStyles.notificationBellWNotification}></div>
                     <span className={userStyles.notificationSignifier}></span>
                  </div>
               )}

               <section className={userStyles.userBioWrapper}>
                  <div
                     className={userStyles.reputationWrapper}
                     style={{
                        backgroundImage: `linear-gradient(130deg, #ff9214ed, #ff0045)`
                     }}>
                     <div
                        className={userStyles.avatar}
                        style={{ backgroundImage: `url(${user.avatar})` }}></div>
                  </div>
                  {user.approval_rating >= 97 && (
                     <h2 className={userStyles.reliabilityA}>Approval Rating: A+</h2>
                  )}
                  {user.approval_rating >= 94 && user.approval_rating < 97 && (
                     <h2 className={userStyles.reliabilityA}>Approval Rating: A</h2>
                  )}
                  {user.approval_rating >= 90 && user.approval_rating < 94 && (
                     <h2 className={userStyles.reliabilityA}>Approval Rating: A-</h2>
                  )}
                  {user.approval_rating >= 87 && user.approval_rating < 90 && (
                     <h2 className={userStyles.reliabilityB}>Approval Rating: B+</h2>
                  )}
                  {user.approval_rating >= 84 && user.approval_rating < 87 && (
                     <h2 className={userStyles.reliabilityB}>Approval Rating: B</h2>
                  )}
                  {user.approval_rating >= 80 && user.approval_rating < 84 && (
                     <h2 className={userStyles.reliabilityB}>Approval Rating: B-</h2>
                  )}
                  {user.approval_rating >= 77 && user.approval_rating < 80 && (
                     <h2 className={userStyles.reliabilityC}>Approval Rating: C+</h2>
                  )}
                  {user.approval_rating >= 74 && user.approval_rating < 77 && (
                     <h2 className={userStyles.reliabilityC}>Approval Rating: C</h2>
                  )}
                  {user.approval_rating >= 70 && user.approval_rating < 74 && (
                     <h2 className={userStyles.reliabilityC}>Approval Rating: C-</h2>
                  )}
                  {user.approval_rating < 70 && (
                     <h2 className={userStyles.reliabilityF}>Reliability: F</h2>
                  )}
                  <p>Commentaries: {user.all_posts.commentaries[0].total_count}</p>
                  <p>Thoughts: {user.all_posts.thoughts[0].total_count}</p>
                  <p>Quotes: {user.all_posts.quotes[0].total_count}</p>
                  <p>Sermons {user.all_posts.sermon_notes[0].total_count}</p>
               </section>
               {/* <section className={userStyles.totalsWrapper}>
                  <p>Posts: {user.posts}</p>
                  <p>Agrees: {user.likes}</p>
                  <p>Disagrees: {user.dislikes}</p>
               </section> */}
               <section className={userStyles.aboutMeWrapper}>
                  <ul>
                     {user.first_name && user.gender === "male" && (
                        <li>
                           👨 Full name is {user.first_name} {user.last_name}
                        </li>
                     )}
                     {user.first_name && user.gender === "female" && (
                        <li>
                           👩 Full name is {user.first_name} {user.last_name}
                        </li>
                     )}
                     {user.my_church && <li>⛪ I attend {user.my_church}</li>}
                     {user.my_favorite_verse && (
                        <li>
                           📖 Favorite verse is{" "}
                           <span className={userStyles.favoriteVerseSpan}>
                              {user.my_favorite_verse}
                           </span>
                        </li>
                     )}
                     {user.my_ministry && <li>🧹 My ministry is {user.my_ministry}</li>}
                     {user.my_job && <li>👔 I am full time {user.my_job}</li>}
                     {user.my_true_color_personality_test &&
                        user.my_true_color_personality_test === "Green" && (
                           <li>🎨 True Color Personality is 🟩</li>
                        )}
                     {user.my_true_color_personality_test &&
                        user.my_true_color_personality_test === "Blue" && (
                           <li>🎨 True Color Personality is 🟦</li>
                        )}
                     {user.my_true_color_personality_test &&
                        user.my_true_color_personality_test === "Gold" && (
                           <li>🎨 True Color Personality is 🟨</li>
                        )}
                     {user.my_true_color_personality_test &&
                        user.my_true_color_personality_test === "Orange" && (
                           <li>🎨 True Color Personality is 🟧</li>
                        )}
                     {user.my_story && (
                        <li className={userStyles.myStory}>
                           <Link href={`/my-story/${user.ID}`}>
                              <a> This is my sotry </a>
                           </Link>
                        </li>
                     )}
                  </ul>
               </section>
            </div>
            <div className={userStyles.postsGrid}>
               {/* <section className={userStyles.myPostsWrapper}>
                  <nav className={userStyles.myPostsMenu}>
                     <span
                        className={userStyles.commentariesPosts}
                        onClick={requestCommentaries}
                        style={{ color: coloredTabState.comment }}>
                        Commentaries
                     </span>
                     <span
                        className={userStyles.thoughtsPosts}
                        onClick={requestThoughts}
                        style={{ color: coloredTabState.thought }}>
                        Thoughts
                     </span>
                     <span
                        className={userStyles.quotesPosts}
                        onClick={requestQuotes}
                        style={{ color: coloredTabState.quote }}>
                        Quotes
                     </span>
                     <span
                        className={userStyles.sermonsPosts}
                        onClick={requestSermons}
                        style={{ color: coloredTabState.sermon }}>
                        Sermons
                     </span>
                  </nav>
                  {commentaryState && (
                     <Comments
                        commentary={commentaryState}
                        deleteOption={true}
                        editOption={true}
                        reportOption={true}
                     />
                  )}
                  {thoughtsState && (
                     <Thought
                        thoughts={thoughtsState}
                        deleteOption={true}
                        editOption={true}
                        reportOption={true}
                     />
                  )}
                  <section className={userStyles.storiesWrapper}>
                     {quoteState &&
                        quoteState.map((quote: TsingleStory) => <QuoteProfile story={quote} />)}
                  </section>
                  {sermonState && (
                     <SermonsCarrousel
                        sermon={sermonState}
                        reportOption={true}
                        editOption={true}
                        deleteOption={true}
                     />
                  )}
               </section> */}
            </div>
         </div>
         <div className={`large-spacer`}> </div>
         <NavigationMenu />
      </>
   );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
   //let userId = context.params && context.params.userId ? context.params.userId[0] : 1;
   const { data } = await client.query({
      query: GET_PROFILE_INFO,
      variables: { ID: 1, totalCountOnly: true }
   });

   console.log(data.users[0].all_posts);
   return {
      props: {
         user: data.users[0]
      }
   };
};

export default User;
