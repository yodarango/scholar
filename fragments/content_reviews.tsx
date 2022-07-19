import styles from "./content_reviews.module.css";

import { ReviewStar } from "./chunks/svgs/review_star";
import { Parragraph } from "./Typography/parragraph";

type TReviewContentProps = {
   stars: number;
   reviews: number;
   cta: React.MouseEventHandler<HTMLDivElement>;
   fontSize?: string;
   startSize: string;
   contentType?: string;
   contentId?: string;
   quiet?: boolean;
};

export const ContentReviews = ({
   stars,
   reviews,
   quiet,
   cta,
   fontSize,
   startSize,
   contentType,
   contentId
}: TReviewContentProps) => {
   // round the stars integer
   const totalStars = Math.round(stars);
   return (
      <div className={styles.mainWrapper} onClick={cta}>
         <Parragraph
            size={fontSize ? fontSize : "xxsmall"}
            quiet={quiet ? true : false}
            text={reviews}
            inline={true}
         />
         <div className={styles.starsWrapper}>
            {[...Array(totalStars)].map((star, index) => (
               <ReviewStar size={startSize ? startSize : "1.2rem"} key={index} />
            ))}
         </div>
      </div>
   );
};
