// core
import React, { useState, useEffect } from "react";

// graphQl
import client from "../../../apollo-client";
import { GET_PROFILE_QUOTES } from "../../../graphql/users/profile";

// comps
import QuotesProfile from "../../../posts/quotes-profile";

//styles
import homePageContentStyles from "../../../styles/layouts/home-page-content/HomePageContent.module.css";

// helpers / types
import { Tuser } from "../../../pages/users/[userId]";
import { TsingleStory } from "../../../posts/quotes-profile";

type quotesContentProps = {
   user: Tuser;
   handleCloseQuotes: any;
};

const QuotesContent = ({ user, handleCloseQuotes }: quotesContentProps) => {
   const [quoteState, setQuoteState] = useState<TsingleStory[]>([]);
   const [quoteLastIdState, setQuoteLastIdState] = useState<string>("99999999999");
   const [hideLoadMoreBttnState, setHideLoadMoreBttnState] = useState<boolean>(false);

   useEffect(() => {
      const requestQuotes = async () => {
         const { data } = await client.query({
            query: GET_PROFILE_QUOTES,
            variables: { ID: user.ID, totalCountOnly: false, last_id: quoteLastIdState }
         });
         setQuoteState((quoteState) => [...quoteState, ...data.users[0].all_posts.quotes]);
         data.users[0].all_posts.quotes.length < 20 ? setHideLoadMoreBttnState(true) : null;
      };
      requestQuotes();
   }, [quoteLastIdState]);

   return (
      <div className={"dark-bkg"}>
         <span className={"closeModal"} onClick={handleCloseQuotes}>
            X
         </span>
         <section className={homePageContentStyles.popUpContentWrapper}>
            <h1 className={homePageContentStyles.popUpContentWrapper_title}>
               Quotes by {user.signature}
            </h1>
            {quoteState.map((story: TsingleStory) => (
               <section>
                  <QuotesProfile
                     key={story.ID}
                     story={{
                        ...story,
                        creator: {
                           ID: user.ID,
                           avatar: user.avatar,
                           signature: user.signature,
                           approval_rating: user.approval_rating,
                           authority_level: user.authority_level
                        }
                     }}
                     deleteOption={true}
                     editOption={true}
                     reportOption={true}
                  />
               </section>
            ))}
            {!hideLoadMoreBttnState && (
               <button
                  className={"std-button"}
                  onClick={() => {
                     setQuoteLastIdState(quoteState[quoteState.length - 1].ID),
                        console.log(quoteState);
                  }}>
                  <p className='std-button_gradient-text'>Load More</p>
               </button>
            )}
         </section>
      </div>
   );
};

export default QuotesContent;
