// core
import React, { useState } from "react";

// comps
import CommentaryContentDesktop from "./commentary-content-desktop";
import QuoteContentDesktop from "./quote-content-desktop";
import ThoughtContentDesktop from "./thought-content-desktop";
import SermonNotesContentDesktop from "./sermon-notes-content-desktop";

// styles
import allContentDesktopStyles from "../../../styles/layouts/home-page-content/AllContentDesktop.module.css";

// helpers
import { Tuser } from "../../../pages/users/[signature]";

type allContentDesktopProps = {
   user: Tuser | null | undefined;
};
const AllContentDesktop = ({ user }: allContentDesktopProps) => {
   const [coloredTabState, setColoredTabState] = useState<{
      commentary?: string;
      thought?: string;
      quote?: string;
      sermon?: string;
   }>({
      commentary: "#f2f2f2",
      thought: "",
      quote: "",
      sermon: ""
   });

   const [contentWrapper, setContentWrapper] = useState<boolean | JSX.Element>(
      <CommentaryContentDesktop user={user} />
   );

   // ================  FUNCTION 1: request the commentaries by user   ================= //
   const requestCommentaries = async (user: Tuser) => {
      setColoredTabState({ commentary: "#f2f2f2" });
      setContentWrapper(<CommentaryContentDesktop user={user} />);
   };

   // ================  FUNCTION 2: request the quotes by user   ================= //
   const requestQuotes = (user: Tuser) => {
      setColoredTabState({ quote: "#f2f2f2" });
      setContentWrapper(<QuoteContentDesktop user={user} />);
   };

   // ================  FUNCTION 3: request the thoughts by user   ================= //
   const requestThoughts = async (user: Tuser) => {
      setColoredTabState({ thought: "#f2f2f2" });
      setContentWrapper(<ThoughtContentDesktop user={user} />);
   };

   // ================  FUNCTION 4: request the sermons by user   ================= //
   const requestSermons = (user: Tuser) => {
      setColoredTabState({ sermon: "#f2f2f2" });
      setContentWrapper(<SermonNotesContentDesktop user={user} />);
   };

   return (
      <section className={allContentDesktopStyles.desktopPostsGrid}>
         {user && (
            <section className={allContentDesktopStyles.myPostsWrapper}>
               <nav className={allContentDesktopStyles.myPostsMenu}>
                  <span
                     className={allContentDesktopStyles.commentariesPosts}
                     onClick={() => requestCommentaries(user)}
                     style={{ color: coloredTabState.commentary }}>
                     Commentaries
                  </span>
                  <span
                     className={allContentDesktopStyles.thoughtsPosts}
                     onClick={() => requestThoughts(user)}
                     style={{ color: coloredTabState.thought }}>
                     Thoughts
                  </span>
                  <span
                     className={allContentDesktopStyles.quotesPosts}
                     onClick={() => requestQuotes(user)}
                     style={{ color: coloredTabState.quote }}>
                     Quotes
                  </span>
                  <span
                     className={allContentDesktopStyles.sermonsPosts}
                     onClick={() => requestSermons(user)}
                     style={{ color: coloredTabState.sermon }}>
                     Sermons
                  </span>
               </nav>
               {contentWrapper}
            </section>
         )}
      </section>
   );
};

export default AllContentDesktop;
