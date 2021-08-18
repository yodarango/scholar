// core
import React from "react";

// components
import StarReviews from "../star-reviews";

// styles
import watchStyles from "../../styles/fragments/library-items/Watch.module.css";

export type watchProps = {
   id: string;
   thumbnail: string;
   title: string;
   by: string;
   userId?: string;
   reviews: string[];
   stars: number[];
   description?: string;
   url: string;
   newClass?: string;
};

const Watch = ({ thumbnail, title, by, reviews, stars, url, id, newClass }: watchProps) => {
   return (
      <div className={`${watchStyles.mainWrapper} ${newClass}`}>
         <a
            href={`${url}`}
            target='_blank'
            rel='noopener noreferrer'
            className={watchStyles.thumbnailWrapper}>
            <img src={thumbnail} alt='podcast thumbnail' className={watchStyles.thumbnail} />
         </a>
         <StarReviews contentId={id} reviews={reviews} stars={stars} />
         <h2 className={watchStyles.name}>{title}</h2>
         <h3 className={watchStyles.author}>{by}</h3>
      </div>
   );
};

export default Watch;
