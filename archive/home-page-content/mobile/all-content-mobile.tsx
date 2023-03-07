// core
import { useState } from "react";
import Link from "next/link";

// comps
import ThoughtsContent from "./thoughts-content";
import SermonNotesContent from "./sermon-notes-content";
import QuotesContent from "./quotes-content";

// styles
import allContentMobileStyles from "../../../styles/layouts/home-page-content/AllContentMobile.module.css";

// helpers
import { Tuser } from "../../../pages/users/[signature]";

type allContentMobileProps = {
   user: Tuser | null | undefined;
};
const allContentMobile = ({ user }: allContentMobileProps) => {
   const [contentPopupState, setContentPopupState] = useState<{
      quotes?: JSX.Element | boolean;
      thoughts?: JSX.Element | boolean;
      sermonNotes?: JSX.Element | boolean;
   }>({ quotes: false, thoughts: false, sermonNotes: false });

   // ================  FUNCTION 2: request the quotes by user   ================= //
   const requestQuotes = (user: Tuser) => {
      setContentPopupState({
         quotes: (
            <QuotesContent
               handleCloseQuotes={() => setContentPopupState({ quotes: false })}
               user={user}
            />
         ),
         thoughts: false,
         sermonNotes: false
      });
   };

   // ================  FUNCTION 3: request the thoughts by user   ================= //
   const requestThoughts = async (user: Tuser) => {
      setContentPopupState({
         quotes: false,
         thoughts: (
            <ThoughtsContent
               user={user}
               handleCloseThoughts={() => setContentPopupState({ thoughts: false })}
            />
         ),
         sermonNotes: false
      });
   };

   // ================  FUNCTION 4: request the sermons by user   ================= //
   const requestSermons = (user: Tuser) => {
      setContentPopupState({
         quotes: false,
         thoughts: false,
         sermonNotes: (
            <SermonNotesContent
               user={user}
               handleCloseSermonNotes={() => setContentPopupState({ sermonNotes: false })}
            />
         )
      });
   };
   return (
      <>
         {user && (
            <section className={allContentMobileStyles.mobilePostsGrid}>
               <Link href={`/users/${user.ID}/commentaries/books`}>
                  <a className={`std-button ${allContentMobileStyles.commentaryLink}`}>
                     <h5 className={`${allContentMobileStyles.link}`}>Commentaries</h5>
                  </a>
               </Link>
               <div
                  className={`std-button ${allContentMobileStyles.quoteLink}`}
                  onClick={() => requestQuotes(user)}>
                  <h5 className={allContentMobileStyles.link}>Quotes</h5>
               </div>
               <div
                  className={`std-button ${allContentMobileStyles.thoughtLink}`}
                  onClick={() => requestThoughts(user)}>
                  <h5 className={allContentMobileStyles.link}>Thoughts</h5>
               </div>
               <div
                  className={`std-button ${allContentMobileStyles.sermonLink}`}
                  onClick={() => requestSermons(user)}>
                  <h5 className={allContentMobileStyles.link}>Sermons</h5>
               </div>
               {/* <div className={allContentMobileStyles.mobileAllLink}>All Posts</div> */}
            </section>
         )}

         {contentPopupState.quotes}
         {contentPopupState.thoughts}
         {contentPopupState.sermonNotes}
      </>
   );
};

export default allContentMobile;
