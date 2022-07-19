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
         <Parragraph
            text={rating?.total_count ? rating?.total_count : ""}
            size='small'
            inline={true}
         />

         {/* ----------- ratings average in grade ---------- */}
         <div
            onClick={cta}
            className={`${customSize ? styles.ratingIconCustomSize : styles.ratingIcon}`}>
            {rating && rating.total_count == 0 && (
               <p className={styles.noRatings}>
                  <Parragraph size='xsmall' text='R' inline={true} align='center' />
               </p>
            )}
            {rating && rating.average_count >= 97 && (
               <p className={`${styles.ratingA}`}>
                  <Parragraph size='xsmall' text='A+' inline={true} align='center' />
               </p>
            )}
            {rating && rating.average_count >= 94 && rating.average_count < 97 && (
               <p className={`${styles.ratingA}`}>
                  <Parragraph size='xsmall' text='A' inline={true} align='center' />
               </p>
            )}
            {rating && rating.average_count >= 90 && rating.average_count < 94 && (
               <p className={`${styles.ratingA}`}>
                  <Parragraph size='xsmall' text='A-' inline={true} align='center' />
               </p>
            )}
            {rating && rating.average_count >= 87 && rating.average_count < 90 && (
               <p className={`${styles.ratingB}`}>
                  <Parragraph size='xsmall' text='B+' inline={true} align='center' />
               </p>
            )}
            {rating && rating.average_count >= 83 && rating.average_count < 87 && (
               <p className={`${styles.ratingB}`}>
                  <Parragraph size='xsmall' text='B' inline={true} align='center' />
               </p>
            )}
            {rating && rating.average_count >= 80 && rating.average_count < 83 && (
               <p className={`${styles.ratingB}`}>
                  <Parragraph size='xsmall' text='B-' inline={true} align='center' />
               </p>
            )}
            {rating && rating.average_count >= 77 && rating.average_count < 80 && (
               <p className={`${styles.ratingC}`}>
                  <Parragraph size='xsmall' text='C+' inline={true} align='center' />
               </p>
            )}
            {rating && rating.average_count >= 73 && rating.average_count < 77 && (
               <p className={`${styles.ratingC} `}>
                  <Parragraph size='xsmall' text='C' inline={true} align='center' />
               </p>
            )}
            {rating && rating.average_count >= 70 && rating.average_count < 73 && (
               <p className={`${styles.ratingC}`}>
                  <Parragraph size='xsmall' text='C-' inline={true} align='center' />
               </p>
            )}
            {rating && rating.average_count >= 67 && rating.average_count < 70 && (
               <p className={`${styles.ratingC}`}>
                  <Parragraph size='xsmall' text='D+' inline={true} align='center' />
               </p>
            )}
            {rating && rating.average_count > 60 && rating.average_count < 67 && (
               <p className={`${styles.ratingC}`}>
                  <Parragraph size='xsmall' text='D' inline={true} align='center' />
               </p>
            )}
            {rating && rating.average_count <= 60 && rating.average_count > 0 && (
               <p className={`${styles.ratingF}`}>
                  <Parragraph size='xsmall' text='F' inline={true} align='center' />
               </p>
            )}
         </div>
      </div>
   );
};
