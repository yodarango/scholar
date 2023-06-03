// components
import { StatsCount } from "../../../fragments/chunks/stats_count";
import { UserAvatar } from "../../../fragments/chunks/user_avatar";
import { Parragraph } from "../../../fragments/Typography/parragraph";

//styles
import styles from "./user_stats.module.css";

// helpers
import { calculateApprovalLevel } from "../../../../helpers/math/calculate_approval_rating";
import { TUser } from "../../../../types/user";

export type TUserStatsProps = {
   user_summary: TUser;
};

export const UserStats = ({ user_summary }: TUserStatsProps) => {
   //console.log(user_summary);
   const {
      signature = "",
      avatar = "",
      authority_level = 0,
      approval_rating = 0,
      total_posts = 0,
      total_ratings = 0
   } = user_summary || {};

   return (
      <div className={styles.mainWrapper}>
         <div className={styles.avatar}>
            <UserAvatar src={avatar} userAuthority={authority_level || 1} />
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
