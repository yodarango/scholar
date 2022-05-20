// core
import { useState, useEffect } from "react";
import Image from "next/image";

// graphQl
import client from "../../../apollo-client";
import { GET_PROFILE_QUOTES } from "../../../graphql/users/profile";

// comps
import QuotesProfile from "../../../posts/quotes-profile";
import CardsLazyLoading from "../../cards-lazy-loading";
import SmallLoader from "../../../fragments/chunks/small-loader";
import ResourceNotFoundError from "../../resource-not-found-error";

//styles
import homePageContentStyles from "../../../styles/layouts/home-page-content/HomePageContent.module.css";
import cardsLazyLoadingStyles from "../../../styles/layouts/CardsLazyLoading.module.css";

// helpers / types
import { Tuser } from "../../../pages/users/[userId]";
import { TsingleStory } from "../../../posts/quotes-profile";

type quotesContentProps = {
   user: Tuser;
   handleCloseQuotes: any;
};

const QuotesContent = ({ user, handleCloseQuotes }: quotesContentProps) => {
   const [loadingState, setLoadingState] = useState<string>("loading");
   const [smallLoadingState, setSmallLoadingState] = useState<boolean>(false);
   const [quoteState, setQuoteState] = useState<TsingleStory[]>([]);
   const [quoteLastIdState, setQuoteLastIdState] = useState<string>("99999999999");
   const [hideLoadMoreBttnState, setHideLoadMoreBttnState] = useState<boolean>(false);

   const requestQuotes = async () => {
      setSmallLoadingState(true);
      try {
         const { data } = await client.query({
            query: GET_PROFILE_QUOTES,
            variables: { ID: user.ID, totalCountOnly: false, last_id: quoteLastIdState }
         });
         setQuoteState((quoteState) => [...quoteState, ...data.users[0].all_posts.quotes]);
         data.users[0].all_posts.quotes.length < 20 ? setHideLoadMoreBttnState(true) : null;

         setLoadingState("done");
         setSmallLoadingState(false);
      } catch (error) {
         console.log(error);
         setLoadingState("error");
         setSmallLoadingState(false);
      }
   };

   useEffect(() => {
      requestQuotes();
   }, [quoteLastIdState]);

   return (
      <div className={"dark-bkg"}>
         <span className={"closeModal"} onClick={handleCloseQuotes}>
            X
         </span>
         <section className={homePageContentStyles.popUpContentWrapper}>
            {user.signature && (
               <h1 className={homePageContentStyles.popUpContentWrapper_title}>
                  Quotes by {user.signature}
               </h1>
            )}
            {quoteState &&
               loadingState === "done" &&
               quoteState.map((story: TsingleStory) => (
                  <section key={story.ID}>
                     <QuotesProfile
                        user_authority_level={user.authority_level}
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
                     />
                  </section>
               ))}
            {quoteState?.length === 0 && loadingState === "done" && (
               <h2 className={homePageContentStyles.noNotifications}>
                  No quotes have been made yet
               </h2>
            )}
            {loadingState === "loading" && (
               <CardsLazyLoading amount={25} compClass={cardsLazyLoadingStyles.postCardQuote} />
            )}
            {loadingState == "error" && <ResourceNotFoundError />}
         </section>

         {!hideLoadMoreBttnState && !smallLoadingState && (
            <button
               className={"std-button"}
               onClick={() => setQuoteLastIdState(quoteState[quoteState.length - 1].ID)}>
               <p className='std-button_gradient-text'>Load More</p>
            </button>
         )}
         {smallLoadingState && !hideLoadMoreBttnState && <SmallLoader />}
      </div>
   );
};

export default QuotesContent;
