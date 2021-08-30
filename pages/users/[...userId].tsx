// core
import React, { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import Link from "next/link";

// components
import Header from "../../layouts/header";
import Comments from "../../posts/comment";
import Thought from "../../posts/thought";
import QuoteProfile from "../../posts/quotes-profile";

// styles
import userStyles from "../../styles/pages/users/User.module.css";

// helpers
import { Tcommentary } from "../../posts/comment";
import { Tthought } from "../../posts/thought";
import { TsingleStory } from "../../posts/quotes-profile";
import Sermon, { sermonProps } from "../../fragments/library-items/sermon";
import SermonsCarrousel from "../../layouts/library-individual-pages/sermons-carrousel";

export type Tuser = {
   id: string;
   name: string;
   lastName: string;
   signature: string;
   avatar: string;
   trusted: true;
   likes: number;
   dislikes: number;
   posts: number;
   commentaries: number;
   quotes: number;
   thoughts: number;
   sermons: number;
   reliability: number;
   gender: string;
   church: string;
   job: string;
   favoriteVerse: string;
   ministry: string;
   tcp: string;
   story: string;
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

   // ================  FUNCTION 5: open the My stroy popup   ================= //
   const handleMyStoryPopUp = () => {};
   return (
      <div className={userStyles.mainWrapper}>
         <Header currPage={user.signature} />
         <div className={userStyles.notificationBell}></div>
         {user.reliability > 100 && (
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
            {user.reliability >= 97 && <h2 className={userStyles.reliabilityA}>Reliability: A+</h2>}
            {user.reliability >= 94 && user.reliability < 97 && (
               <h2 className={userStyles.reliabilityA}>Reliability: A</h2>
            )}
            {user.reliability >= 90 && user.reliability < 94 && (
               <h2 className={userStyles.reliabilityA}>Reliability: A-</h2>
            )}
            {user.reliability >= 87 && user.reliability < 90 && (
               <h2 className={userStyles.reliabilityB}>Reliability: B+</h2>
            )}
            {user.reliability >= 84 && user.reliability < 87 && (
               <h2 className={userStyles.reliabilityB}>Reliability: B</h2>
            )}
            {user.reliability >= 80 && user.reliability < 84 && (
               <h2 className={userStyles.reliabilityB}>Reliability: B-</h2>
            )}
            {user.reliability >= 77 && user.reliability < 80 && (
               <h2 className={userStyles.reliabilityC}>Reliability: C+</h2>
            )}
            {user.reliability >= 74 && user.reliability < 77 && (
               <h2 className={userStyles.reliabilityC}>Reliability: C</h2>
            )}
            {user.reliability >= 70 && user.reliability < 74 && (
               <h2 className={userStyles.reliabilityC}>Reliability: C-</h2>
            )}
            {user.reliability < 70 && <h2 className={userStyles.reliabilityF}>Reliability: F</h2>}
            <p>Commentaries: {user.commentaries}</p>
            <p>Thoughts: {user.thoughts}</p>
            <p>Quotes: {user.quotes}</p>
            <p>Sermons {user.sermons}</p>
         </section>
         <section className={userStyles.totalsWrapper}>
            <p>Posts: {user.posts}</p>
            <p>Agrees: {user.likes}</p>
            <p>Diagrees: {user.dislikes}</p>
         </section>
         <section className={userStyles.aboutMeWrapper}>
            <ul>
               {user.name && user.gender === "male" && (
                  <li>
                     👨 Full name is {user.name} {user.lastName}
                  </li>
               )}
               {user.name && user.gender === "female" && (
                  <li>
                     👩 Full name is {user.name} {user.lastName}
                  </li>
               )}
               {user.church && <li>⛪ I attend {user.church}</li>}
               {user.favoriteVerse && (
                  <li>
                     📖 Favorite verse is{" "}
                     <span className={userStyles.favoriteVerseSpan}>{user.favoriteVerse}</span>
                  </li>
               )}
               {user.ministry && <li>🧹 My ministry is {user.ministry}</li>}
               {user.job && <li>👔 I am full time {user.job}</li>}
               {user.tcp && user.tcp === "green" && <li>🎨 True Color Personality is 🟩</li>}
               {user.tcp && user.tcp === "blue" && <li>🎨 True Color Personality is 🟦</li>}
               {user.tcp && user.tcp === "gold" && <li>🎨 True Color Personality is 🟨</li>}
               {user.tcp && user.tcp === "orange" && <li>🎨 True Color Personality is 🟧</li>}
               {user.story && (
                  <li className={userStyles.myStory}>
                     <Link href={`/my-story/${user.id}`}>
                        <a> This is my sotry </a>
                     </Link>
                  </li>
               )}
            </ul>
         </section>
         <section className={userStyles.myPostsWrapper}>
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
            {commentaryState && <Comments commentaries={commentaryState} />}
            {thoughtsState && <Thought thoughts={thoughtsState} />}
            <section className={userStyles.storiesWrapper}>
               {quoteState &&
                  quoteState.map((quote: TsingleStory) => <QuoteProfile story={quote} />)}
            </section>
            {sermonState && <SermonsCarrousel sermon={sermonState} />}
         </section>
      </div>
   );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
   const { userId } = context.query;
   const req = await fetch(`http://scholar-be.herokuapp.com/users/123`);
   const user = await req.json();

   return {
      props: {
         user
      }
   };
};

export default User;
