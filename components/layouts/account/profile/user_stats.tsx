// components
import { StatsCount } from "../../../fragments/chunks/stats_count";
import { UserAvatar } from "../../../fragments/chunks/user_avatar";
import { Parragraph } from "../../../fragments/Typography/parragraph";

//styles
import styles from "./user_stats.module.css";

// helpers
import { calulateApprovalLevel } from "../../../../helpers/math/calculateArppovalLevel";
import { TuserSummary } from "../../../../types/user";

export type TUserStatsProps = {
   user_summary: TuserSummary;
};

export const UserStats = ({
   user_summary: { username, avatar, authority_level, approval_rating, total_posts }
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
               count={calulateApprovalLevel(approval_rating, 4).grade}
               countColor={calulateApprovalLevel(approval_rating, 5).color}
            />
         </div>
         <div className={styles.totalRatings}>
            <StatsCount title='ratings' count={43} alignment='left' />
         </div>
         <div className={styles.totalPosts}>
            <StatsCount title='posts' count={total_posts} alignment='left' />
         </div>
         <div className={styles.username}>
            <Parragraph text={username} size='large' bold={true} lineHieght='.9em' />
         </div>
      </div>
   );
};
