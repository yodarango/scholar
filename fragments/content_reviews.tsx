import { useState } from "react";

// comps
import { ReviewStar } from "./chunks/svgs/review_star";
import { Parragraph } from "./Typography/parragraph";

// styles
import styles from "./content_reviews.module.css";
import { SelectStarRating } from "../layouts/menus/select_star_rating";

type TReviewContentProps = {
   stars: number;
   reviews: number;
   fontSize?: string;
   startSize?: string;
   contentType?: string;
   contentId?: string;
   quiet?: boolean;
   withBackground?: boolean;
   cta: {
      handleShowStartRatingMenu: React.MouseEventHandler<HTMLDivElement>;
   };
};

export const ContentReviews = ({
   stars,
   reviews,
   quiet,
   fontSize,
   startSize = "1.2rem",
   contentType,
   contentId,
   cta,
   withBackground
}: TReviewContentProps) => {
   // -------------- handle the reivew given by the
   // round the stars integer
   const totalStars = Math.round(stars);
   return (
      <>
         {!withBackground && (
            <div className={styles.mainWrapper} onClick={cta.handleShowStartRatingMenu}>
               <Parragraph
                  size={fontSize ? fontSize : "xsmall"}
                  quiet={quiet ? true : false}
                  text={reviews}
                  inline={true}
               />
               <div className={styles.starsWrapper}>
                  {[...Array(totalStars)].map((star, index) => (
                     <ReviewStar size={startSize} key={index} />
                  ))}
               </div>
            </div>
         )}
         {withBackground && (
            <div
               className={`${styles.mainWrapper} ${styles.button}`}
               onClick={cta.handleShowStartRatingMenu}>
               <Parragraph size={fontSize ? fontSize : "xsmall"} text={reviews} inline={true} />
               <div className={styles.starsWrapper}>
                  {[...Array(totalStars)].map((star, index) => (
                     <ReviewStar size={startSize} key={index} />
                  ))}
               </div>
            </div>
         )}
      </>
   );
};
