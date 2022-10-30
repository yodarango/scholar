// comps
import { Parragraph } from "../Typography/parragraph";

// styles
import styles from "./thumbs_up_down_stats.module.css";

import { TThumbsUpDownPollVote } from "../../../types/interactive";

type TThumbsUpDownStatsProps = {
   votes: TThumbsUpDownPollVote;
};
export const ThumbsUpDownStats = ({ votes }: TThumbsUpDownStatsProps) => {
   const totalVotes = votes.votesDown + votes.votesUp;
   const upPercentage = Math.round((votes.votesUp / totalVotes) * 100);
   const downPercentage = Math.round((votes.votesDown / totalVotes) * 100);

   return (
      <div className={styles.mainWrapper}>
         {/* ---------------------- left side -------------- */}
         <div className={styles.thumbsUpWrapper}>
            <div className={styles.percentage}>
               <Parragraph size='xsmall' text={`${votes.votesUp ? upPercentage : 0}%`} />
            </div>
            <div
               className={`${styles.bar} ${styles.barDown}`}
               style={{
                  width: `${votes.votesUp > 0 || votes.votesDown > 0 ? upPercentage : 100}%`
               }}></div>
         </div>

         {/* ---------------------- middle side -------------- */}
         <div className={styles.middleIcon}></div>

         {/* ---------------------- right side -------------- */}
         <div className={styles.thumbsDownWrapper}>
            <div
               className={`${styles.bar} ${styles.barUp}`}
               style={{
                  width: `${votes.votesDown > 0 || votes.votesUp > 0 ? downPercentage : 100}%`
               }}></div>
            <div className={styles.percentage}>
               <Parragraph size='xsmall' text={`${votes.votesDown > 0 ? downPercentage : 0}%`} />
            </div>
         </div>
      </div>
   );
};
