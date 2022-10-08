// components
import { StatsCount } from "../../../fragments/chunks/stats_count";
import { UserAvatar } from "../../../fragments/chunks/user_avatar";
import { Parragraph } from "../../../fragments/Typography/parragraph";

//styles
import styles from "./user_stats.module.css";

// helpers
import { calulateApprovalLevel } from "../../../helpers/math/calculateArppovalLevel";

type TUserStatsProps = {
   username: string;
   avatar: string;
   userAuthority: number;
   ratingCount: number;
   rating: number;
   postCount: number;
};

export const UserStats = ({
   username,
   avatar,
   userAuthority,
   ratingCount,
   rating,
   postCount
}: TUserStatsProps) => {
   return (
      <div className={styles.mainWrapper}>
         <div className={styles.avatar}>
            <UserAvatar src={avatar} userAuthority={userAuthority} />
         </div>
         <div className={styles.rating}>
            <StatsCount
               alignment='left'
               title='rating'
               count={calulateApprovalLevel(rating, ratingCount).grade}
               countColor={calulateApprovalLevel(rating, ratingCount).color}
            />
         </div>
         <div className={styles.totalRatings}>
            <StatsCount title='ratings' count={ratingCount} alignment='left' />
         </div>
         <div className={styles.totalPosts}>
            <StatsCount title='posts' count={postCount} alignment='left' />
         </div>
         <div className={styles.username}>
            <Parragraph text={username} size='large' bold={true} lineHieght='.9em' />
         </div>
      </div>
   );
};
