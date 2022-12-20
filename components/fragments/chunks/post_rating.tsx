// TODO: Replace the current calculation in JSX to determine ating by the helpers/math/caculate_approval_level helper

import { useState } from "react";

// comps
import { Parragraph } from "../Typography/parragraph";
import Portal from "../../hoc/potal";
import { SelectPostRatingMenu } from "../../layouts/menus/select_post_rating";

// styles
import styles from "./post_rating.module.css";

// helpers
import { calculateApprovalLevel } from "../../../helpers/math/calculate_approval_rating";

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
   const totalRatingCount = rating && rating.totalCount > 0 ? rating.totalCount : "0";

   // rating calculation
   const calculatedRating = calculateApprovalLevel(
      rating?.averageCount ? rating.averageCount : 101
   );

   return (
      <>
         <Portal>
            {showPostRating && (
               <SelectPostRatingMenu cta={{ handleCloseModal: () => setshowPostRating(false) }} />
            )}
         </Portal>
         <div className={`${styles.mainWrapper}`} onClick={() => setshowPostRating(true)}>
            {/*  ratings count  */}
            {!iconColor && <Parragraph text={totalRatingCount} size='small' />}
            {iconColor && <Parragraph text={totalRatingCount} size='small' color={iconColor} />}

            {/*  ratings average in grade  */}
            <div className={`${customSize ? styles.ratingIconCustomSize : styles.ratingIcon}`}>
               <div className={calculatedRating.styles}>
                  <Parragraph size='xsmall' text={calculatedRating.grade} align='center' />
               </div>
            </div>
         </div>
      </>
   );
};
