// components
import { StatsCount } from "../../../fragments/chunks/stats_count";
import { UserAvatar } from "../../../fragments/chunks/user_avatar";
import { Parragraph } from "../../../fragments/Typography/parragraph";

//styles
import styles from "./user_stats.module.css";

// helpers
import { calculateApprovalLevel } from "../../../../helpers/math/calculate_approval_rating";
import { TuserSummary } from "../../../../types/user";

export type TUserStatsProps = {
   user_summary: TuserSummary;
};

export const UserStats = ({
   user_summary: { signature, avatar, authority_level, approval_rating, total_posts, total_ratings }
}: TUserStatsProps) => {
   return (
      <div className={styles.mainWrapper}>
         <div className={styles.avatar}>
            <UserAvatar src={avatar} userAuthority={authority_level} />
         </div>
         <div className={styles.rating}>
            <StatsCount
               alignment='left'
               title='rating'
               count={calculateApprovalLevel(approval_rating).grade}
               countColor={calculateApprovalLevel(approval_rating).color}
            />
         </div>
         <div className={styles.totalRatings}>
            <StatsCount title='ratings' count={total_ratings} alignment='left' />
         </div>
         <div className={styles.totalPosts}>
            <StatsCount title='posts' count={total_posts} alignment='left' />
         </div>
         <div className={styles.username}>
            <Parragraph text={signature} size='large' bold={true} lineHieght='.9em' />
         </div>
      </div>
   );
};
