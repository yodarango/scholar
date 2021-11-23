// core
import React, { useEffect, useState } from "react";

//components
import QuoteStories from "./quotes-stroies";

//styles
import StoriesCarrouselStyles from "../styles/posts/StoriesCarrousel.module.css";

import { last24SingleQuote } from "./quotes-stroies";

type storiesCarrouselProps = {
   quotes_in_the_last24: last24SingleQuote[];
};

const StoriesCarrousel = ({ quotes_in_the_last24 }: storiesCarrouselProps) => {
   return (
      <div className={StoriesCarrouselStyles.mainWrapper}>
         {quotes_in_the_last24.map((story: last24SingleQuote) => (
            <QuoteStories
               key={story.ID}
               creator={story.creator}
               ID={story.ID} /*reportOption={true}*/
            />
         ))}
      </div>
   );
};

export default StoriesCarrousel;
