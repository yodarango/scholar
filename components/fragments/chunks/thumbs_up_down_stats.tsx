// comps
import { Parragraph } from "../Typography/parragraph";

// styles
import styles from "./thumbs_up_down_stats.module.css";

type TThumbsUpDownStatsProps = {
   votesUp: number;
   votesDown: number;
};
export const ThumbsUpDownStats = ({ votesUp, votesDown }: TThumbsUpDownStatsProps) => {
   const totalVotes = votesDown + votesUp;
   const upPercentage = Math.round((votesUp / totalVotes) * 100);
   const downPercentage = Math.round((votesDown / totalVotes) * 100);

   return (
      <div className={styles.mainWrapper}>
         {/* ---------------------- left side -------------- */}
         <div className={styles.thumbsUpWrapper}>
            <div className={styles.percentage}>
               <Parragraph size='xsmall' text={`${votesUp ? upPercentage : 0}%`} />
            </div>
            <div
               className={`${styles.bar} ${styles.barDown}`}
               style={{ width: `${votesUp ? upPercentage : 100}%` }}></div>
         </div>

         {/* ---------------------- middle side -------------- */}
         <div className={styles.middleIcon}></div>

         {/* ---------------------- right side -------------- */}
         <div className={styles.thumbsDownWrapper}>
            <div
               className={`${styles.bar} ${styles.barUp}`}
               style={{ width: `${votesDown ? downPercentage : 100}%` }}></div>
            <div className={styles.percentage}>
               <Parragraph size='xsmall' text={`${votesDown ? downPercentage : 0}%`} />
            </div>
         </div>
      </div>
   );
};
