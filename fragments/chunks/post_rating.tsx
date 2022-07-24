// styles
import styles from "./post_rating.module.css";

// comps
import { Parragraph } from "../Typography/parragraph";

export type Trating = {
   average_count: number;
   total_count: number;
};

type TuserRatingProps = {
   rating: Trating | null;
   cta: React.MouseEventHandler<HTMLDivElement>;
   customSize?: boolean;
};

export const PostRating = ({ rating, cta, customSize }: TuserRatingProps) => {
   return (
      <div className={`${styles.mainWrapper}`} onClick={cta}>
         {/* ----------- ratings count ---------- */}
         <Parragraph text={rating?.total_count ? rating?.total_count : ""} size='small' />

         {/* ----------- ratings average in grade ---------- */}
         <div
            onClick={cta}
            className={`${customSize ? styles.ratingIconCustomSize : styles.ratingIcon}`}>
            {rating && rating.total_count == 0 && (
               <div className={styles.noRatings}>
                  <Parragraph size='xsmall' text='R' align='center' />
               </div>
            )}
            {rating && rating.average_count >= 97 && (
               <div className={`${styles.ratingA}`}>
                  <Parragraph size='xsmall' text='A+' inline={false} align='center' />
               </div>
            )}
            {rating && rating.average_count >= 94 && rating.average_count < 97 && (
               <div className={`${styles.ratingA}`}>
                  <Parragraph size='xsmall' text='A' align='center' />
               </div>
            )}
            {rating && rating.average_count >= 90 && rating.average_count < 94 && (
               <div className={`${styles.ratingA}`}>
                  <Parragraph size='xsmall' text='A-' align='center' />
               </div>
            )}
            {rating && rating.average_count >= 87 && rating.average_count < 90 && (
               <div className={`${styles.ratingB}`}>
                  <Parragraph size='xsmall' text='B+' align='center' />
               </div>
            )}
            {rating && rating.average_count >= 83 && rating.average_count < 87 && (
               <div className={`${styles.ratingB}`}>
                  <Parragraph size='xsmall' text='B' align='center' />
               </div>
            )}
            {rating && rating.average_count >= 80 && rating.average_count < 83 && (
               <div className={`${styles.ratingB}`}>
                  <Parragraph size='xsmall' text='B-' align='center' />
               </div>
            )}
            {rating && rating.average_count >= 77 && rating.average_count < 80 && (
               <div className={`${styles.ratingC}`}>
                  <Parragraph size='xsmall' text='C+' align='center' />
               </div>
            )}
            {rating && rating.average_count >= 73 && rating.average_count < 77 && (
               <div className={`${styles.ratingC} `}>
                  <Parragraph size='xsmall' text='C' align='center' />
               </div>
            )}
            {rating && rating.average_count >= 70 && rating.average_count < 73 && (
               <div className={`${styles.ratingC}`}>
                  <Parragraph size='xsmall' text='C-' align='center' />
               </div>
            )}
            {rating && rating.average_count >= 67 && rating.average_count < 70 && (
               <div className={`${styles.ratingC}`}>
                  <Parragraph size='xsmall' text='D+' align='center' />
               </div>
            )}
            {rating && rating.average_count > 60 && rating.average_count < 67 && (
               <div className={`${styles.ratingC}`}>
                  <Parragraph size='xsmall' text='D' align='center' />
               </div>
            )}
            {rating && rating.average_count <= 60 && rating.average_count > 0 && (
               <div className={`${styles.ratingF}`}>
                  <Parragraph size='xsmall' text='F' align='center' />
               </div>
            )}
         </div>
      </div>
   );
};
