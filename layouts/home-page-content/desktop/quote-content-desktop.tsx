// core
import { useState, useEffect } from "react";

// graphQL
import client from "../../../apollo-client";
import { GET_PROFILE_QUOTES } from "../../../graphql/users/profile";

// styles
import homePageContentDesktopStyles from "../../../styles/layouts/home-page-content/HomePageContentDesktop.module.css";

// comps
import QuotesProfile from "../../../posts/quotes-profile";

// helpers
import { TsingleStory } from "../../../posts/quotes-profile";
import { Tuser } from "../../../pages/users/[...userId]";

type commentaryContentDesktopProps = {
   user: Tuser;
};

const QuoteContentDesktop = ({ user }: commentaryContentDesktopProps) => {
   // ================  FUNCTION 1: request the commentaries by user   ================= //
   const [quoteState, setQuoteState] = useState<TsingleStory[]>([]);
   const [quoteLastIdState, setQuoteLastIdState] = useState<string>("99999999999");
   const [hideLoadMoreBttnState, setHideLoadMoreBttnState] = useState<boolean>(false);

   useEffect(() => {
      const fetchMoreComments = async () => {
         const { data } = await client.query({
            query: GET_PROFILE_QUOTES,
            variables: { ID: user.ID, totalCountOnly: false, last_id: quoteLastIdState }
         });

         setQuoteState((quoteState) => [...quoteState, ...data.users[0].all_posts.quotes]);
         data.users[0].all_posts.quotes.length < 20 ? setHideLoadMoreBttnState(true) : null;
      };
      fetchMoreComments();
   }, [quoteLastIdState]);

   return (
      <div className={homePageContentDesktopStyles.contentWrapper}>
         {quoteState.map((quote: TsingleStory) => (
            <section>
               <QuotesProfile
                  story={{
                     ...quote,
                     creator: {
                        ID: user.ID,
                        avatar: user.avatar,
                        signature: user.signature,
                        authority_level: user.authority_level,
                        approval_rating: user.approval_rating
                     }
                  }}
                  deleteOption={true}
                  reportOption={true}
                  editOption={true}
               />
            </section>
         ))}
         {!hideLoadMoreBttnState && (
            <button
               className={`${homePageContentDesktopStyles.stdButton} std-button`}
               onClick={() => setQuoteLastIdState(quoteState[quoteState.length - 1].ID)}>
               <p className={"std-button_gradient-text"}>Load More</p>
            </button>
         )}
      </div>
   );
};

export default QuoteContentDesktop;
