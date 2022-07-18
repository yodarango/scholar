import styles from "./user_rating.module.css";

export type Trating = {
   average_count: number;
   total_count: number;
};

type TuserRatingProps = {
   rating: Trating | null;
   cta: React.MouseEventHandler<HTMLDivElement>;
   customSize?: boolean;
};

export const UserRating = ({ rating, cta, customSize }: TuserRatingProps) => {
   return (
      <div className={customSize ? styles.mainWrapper : styles.mainWrapperCustomSize} onClick={cta}>
         <div onClick={cta} className={styles.ratingIcon}>
            {rating && rating.total_count == 0 && <span className={styles.noRatings}>R</span>}
            {rating && rating.average_count >= 97 && (
               <span className={`${styles.ratingA}`}>A+</span>
            )}
            {rating && rating.average_count >= 94 && rating.average_count < 97 && (
               <span className={`${styles.ratingA}`}>A</span>
            )}
            {rating && rating.average_count >= 90 && rating.average_count < 94 && (
               <span className={`${styles.ratingA}`}>A-</span>
            )}
            {rating && rating.average_count >= 87 && rating.average_count < 90 && (
               <span className={`${styles.ratingB}`}>B+</span>
            )}
            {rating && rating.average_count >= 83 && rating.average_count < 87 && (
               <span className={`${styles.ratingB}`}>B</span>
            )}
            {rating && rating.average_count >= 80 && rating.average_count < 83 && (
               <span className={`${styles.ratingB}`}>B-</span>
            )}
            {rating && rating.average_count >= 77 && rating.average_count < 80 && (
               <span className={`${styles.ratingC}`}>C+</span>
            )}
            {rating && rating.average_count >= 73 && rating.average_count < 77 && (
               <span className={`${styles.ratingC} `}>C</span>
            )}
            {rating && rating.average_count >= 70 && rating.average_count < 73 && (
               <span className={`${styles.ratingC}`}>C-</span>
            )}
            {rating && rating.average_count >= 67 && rating.average_count < 70 && (
               <span className={`${styles.ratingC}`}>D+</span>
            )}
            {rating && rating.average_count > 60 && rating.average_count < 67 && (
               <span className={`${styles.ratingC}`}>D</span>
            )}
            {rating && rating.average_count <= 60 && rating.average_count > 0 && (
               <span className={`${styles.ratingF}`}>F</span>
            )}
         </div>
      </div>
   );
};
