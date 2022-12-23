import { useEffect, useState } from "react";

// comps
import { Parragraph } from "../Typography/parragraph";
import Portal from "../../hoc/potal";
import { SelectPostRatingMenu } from "../../layouts/menus/select_post_rating";

// styles
import styles from "./post_rating.module.css";

// helpers
import { calculateApprovalLevel } from "../../../helpers/math/calculate_approval_rating";

// constants
import { QUERY_WAS_INSERT } from "../../../constants/defaults";

export type Trating = {
   totalCount: number;
   averageCount: number;
};

type TPostRatingProps = {
   userId: string | number;
   postId: string | number;
   rating: Trating | null;
   customSize?: boolean;
   iconColor?: string;
};

export const PostRating = ({ rating, customSize, iconColor, postId, userId }: TPostRatingProps) => {
   // state
   const [showPostRating, setshowPostRating] = useState<boolean>(false);
   const [totalRatingCount, setTotalRatingCount] = useState<any>(
      rating && rating.totalCount > 0 ? rating.totalCount : "0"
   );
   const update = calculateApprovalLevel(rating?.averageCount ? rating.averageCount : 101);
   const [ratingGrade, setRatingGrade] = useState<any>(update);

   // handle the rating after coming from <SelectPostRatingMenu. Update the count and the grade
   const handleRating = (value: number, status: number) => {
      const newCount = rating ? rating?.totalCount + 1 : 0;
      console.log(value);
      // update the count only if it was an insertion and not and an update in the DB
      if (status === QUERY_WAS_INSERT) {
         setTotalRatingCount(newCount);
         setRatingGrade(calculateApprovalLevel(value));
      } else {
         console.log(totalRatingCount);
         if (totalRatingCount > 1) {
            let update = rating ? (rating?.averageCount + value) / 2 : 101;
            setRatingGrade(calculateApprovalLevel(update));
         } else {
            setRatingGrade(calculateApprovalLevel(value));
         }
      }
   };

   useEffect(() => {}, [ratingGrade]);

   return (
      <>
         <Portal>
            {showPostRating && (
               <SelectPostRatingMenu
                  postId={postId}
                  userId={userId}
                  cta={{ handleCloseModal: () => setshowPostRating(false), handleRating }}
               />
            )}
         </Portal>
         <div className={`${styles.mainWrapper}`} onClick={() => setshowPostRating(true)}>
            {/*  ratings count  */}
            {!iconColor && <Parragraph text={totalRatingCount} size='small' />}
            {iconColor && <Parragraph text={totalRatingCount} size='small' color={iconColor} />}

            {/*  ratings average in grade  */}
            <div className={`${customSize ? styles.ratingIconCustomSize : styles.ratingIcon}`}>
               <div className={ratingGrade.styles}>
                  <Parragraph size='xsmall' text={ratingGrade.grade} align='center' />
               </div>
            </div>
         </div>
      </>
   );
};
