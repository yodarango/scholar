// comps
import { Parragraph } from "../Typography/parragraph";

// styles
import styles from "./thumbs_up_down_stats.module.css";

type TThumbsUpDownStatsProps = {
   votesUp: string;
   votesDown: string;
};
export const ThumbsUpDownStats = ({ votesUp, votesDown }: TThumbsUpDownStatsProps) => {
   const votesUpInt = parseInt(votesUp);
   const votesDownInt = parseInt(votesDown);
   const totalVotes = votesDownInt + votesUpInt;
   const upPercentage = Math.round((votesUpInt / totalVotes) * 100);
   const downPercentage = Math.round((votesDownInt / totalVotes) * 100);

   return (
      <div className={styles.mainWrapper}>
         {/* ---------------------- left side -------------- */}
         <div className={styles.thumbsUpWrapper}>
            <div className={styles.percentage}>
               <Parragraph size='xsmall' text={`${upPercentage}%`} />
            </div>
            <div
               className={`${styles.bar} ${styles.barDown}`}
               style={{ width: `${upPercentage}%` }}></div>
         </div>

         {/* ---------------------- middle side -------------- */}
         <div className={styles.middleIcon}></div>

         {/* ---------------------- right side -------------- */}
         <div className={styles.thumbsDownWrapper}>
            <div
               className={`${styles.bar} ${styles.barUp}`}
               style={{ width: `${downPercentage}%` }}></div>
            <div className={styles.percentage}>
               <Parragraph size='xsmall' text={`${downPercentage}%`} />
            </div>
         </div>
      </div>
   );
};
