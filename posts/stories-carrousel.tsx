// core
import React, { useEffect, useState } from "react";

//components
import QuoteStories from "./quotes-stroies";

//styles
import StoriesCarrouselStyles from "../styles/posts/StoriesCarrousel.module.css";

// helpers: types
import { Tstory } from "./quotes-stroies";

const StoriesCarrousel = () => {
   // ============== FUNCTION 1: Fetch the stories and put them on a state ============== //
   const [storiesState, setStoriesState] = useState<Tstory[]>([]);
   const getStories = async () => {
      const requ = await fetch("https://scholar-be.herokuapp.com/stories");
      const jsonData = await requ.json();
      console.log(jsonData);
      setStoriesState(jsonData);
   };

   useEffect(() => {
      getStories();
   }, []);

   return (
      <div className={StoriesCarrouselStyles.mainWrapper}>
         {storiesState.map((story: Tstory) => (
            <QuoteStories key={story.id} stories={story} />
         ))}
      </div>
   );
};

export default StoriesCarrousel;
