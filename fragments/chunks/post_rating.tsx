import { useState } from "react";

// comps
import { Parragraph } from "../Typography/parragraph";
import Portal from "../../hoc/potal";
import { SelectPostRatingMenu } from "../../layouts/menus/select_post_rating";

// styles
import styles from "./post_rating.module.css";

export type Trating = {
   totalCount: number;
   averageCount: number;
};

type TPostRatingProps = {
   rating: Trating | null;
   customSize?: boolean;
   iconColor?: string;
};

export const PostRating = ({ rating, customSize, iconColor }: TPostRatingProps) => {
   // state
   const [showPostRating, setshowPostRating] = useState<boolean>(false);
   return (
      <>
         <Portal>
            {showPostRating && (
               <SelectPostRatingMenu cta={{ handleCloseModal: () => setshowPostRating(false) }} />
            )}
         </Portal>
         <div className={`${styles.mainWrapper}`} onClick={() => setshowPostRating(true)}>
            {/* ----------- ratings count ---------- */}
            {!iconColor && (
               <Parragraph text={rating?.totalCount ? rating?.totalCount : ""} size='small' />
            )}
            {iconColor && (
               <Parragraph
                  text={rating?.totalCount ? rating?.totalCount : ""}
                  size='small'
                  color={iconColor}
               />
            )}

            {/* ----------- ratings average in grade ---------- */}
            <div className={`${customSize ? styles.ratingIconCustomSize : styles.ratingIcon}`}>
               {rating && rating.totalCount == 0 && (
                  <div className={styles.noRatings}>
                     <Parragraph size='xsmall' text='R' align='center' />
                  </div>
               )}
               {rating && rating.averageCount >= 97 && (
                  <div className={`${styles.ratingA}`}>
                     <Parragraph size='xsmall' text='A+' inline={false} align='center' />
                  </div>
               )}
               {rating && rating.averageCount >= 94 && rating.averageCount < 97 && (
                  <div className={`${styles.ratingA}`}>
                     <Parragraph size='xsmall' text='A' align='center' />
                  </div>
               )}
               {rating && rating.averageCount >= 90 && rating.averageCount < 94 && (
                  <div className={`${styles.ratingA}`}>
                     <Parragraph size='xsmall' text='A-' align='center' />
                  </div>
               )}
               {rating && rating.averageCount >= 87 && rating.averageCount < 90 && (
                  <div className={`${styles.ratingB}`}>
                     <Parragraph size='xsmall' text='B+' align='center' />
                  </div>
               )}
               {rating && rating.averageCount >= 83 && rating.averageCount < 87 && (
                  <div className={`${styles.ratingB}`}>
                     <Parragraph size='xsmall' text='B' align='center' />
                  </div>
               )}
               {rating && rating.averageCount >= 80 && rating.averageCount < 83 && (
                  <div className={`${styles.ratingB}`}>
                     <Parragraph size='xsmall' text='B-' align='center' />
                  </div>
               )}
               {rating && rating.averageCount >= 77 && rating.averageCount < 80 && (
                  <div className={`${styles.ratingC}`}>
                     <Parragraph size='xsmall' text='C+' align='center' />
                  </div>
               )}
               {rating && rating.averageCount >= 73 && rating.averageCount < 77 && (
                  <div className={`${styles.ratingC} `}>
                     <Parragraph size='xsmall' text='C' align='center' />
                  </div>
               )}
               {rating && rating.averageCount >= 70 && rating.averageCount < 73 && (
                  <div className={`${styles.ratingC}`}>
                     <Parragraph size='xsmall' text='C-' align='center' />
                  </div>
               )}
               {rating && rating.averageCount >= 67 && rating.averageCount < 70 && (
                  <div className={`${styles.ratingC}`}>
                     <Parragraph size='xsmall' text='D+' align='center' />
                  </div>
               )}
               {rating && rating.averageCount > 60 && rating.averageCount < 67 && (
                  <div className={`${styles.ratingC}`}>
                     <Parragraph size='xsmall' text='D' align='center' />
                  </div>
               )}
               {rating && rating.averageCount <= 60 && rating.averageCount > 0 && (
                  <div className={`${styles.ratingF}`}>
                     <Parragraph size='xsmall' text='F' align='center' />
                  </div>
               )}
            </div>
         </div>
      </>
   );
};
