// core
import { useEffect, useState } from "react";
import Image from "next/image";

// graphql
import client from "../apollo-client";
import { QUOTE_STORIES_IN_LAST_24 } from "../graphql/posts/quotes";

//components
import QuoteStories from "./quotes-stroies";
import ResourceNotFoundError from "../fragments/chunks/error_resource_not_found";

//styles
import storiesCarrouselStyles from "../styles/posts/StoriesCarrousel.module.css";
import cardsLazyLoadingStyles from "../styles/layouts/CardsLazyLoading.module.css";

import { last24SingleQuote } from "./quotes-stroies";

type storiesCarrouselProps = {
   quotes_in_the_last24: last24SingleQuote[] | null;
};

const StoriesCarrousel = ({ quotes_in_the_last24 }: storiesCarrouselProps) => {
   // set the initial set of stories
   const [storiesArrayState, setStoriesArrayState] =
      useState<last24SingleQuote[] | null>(quotes_in_the_last24);

   const showMoreStories = async (last_id: string) => {
      try {
         const { data } = await client.query({
            query: QUOTE_STORIES_IN_LAST_24,
            variables: { ID: null, last_id: last_id, category_tags: null }
         });

         const newStoriesArray = data.quote_stories;
         setStoriesArrayState((storiesArrayState) =>
            storiesArrayState ? [...storiesArrayState, ...newStoriesArray] : []
         );
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <>
         {storiesArrayState && (
            <div className={storiesCarrouselStyles.mainWrapper}>
               {storiesArrayState.map((story: last24SingleQuote) => (
                  <QuoteStories
                     key={story.ID}
                     creator={story.creator}
                     ID={story.ID}
                     approvals={story.approvals}
                  />
               ))}
               {storiesArrayState.length === 0 && (
                  <h2 className={storiesCarrouselStyles.noContrastTitle}>ready, set, quote</h2>
               )}
               {storiesArrayState.length > 49 && (
                  <button
                     className={`std-button ${storiesCarrouselStyles.loadMoreButton}`}
                     onClick={() =>
                        showMoreStories(storiesArrayState[storiesArrayState.length - 1].ID)
                     }>
                     <p className='std-button_gradient-text'>More</p>
                  </button>
               )}
            </div>
         )}
         {!storiesArrayState && <ResourceNotFoundError />}
      </>
   );
};

export default StoriesCarrousel;
