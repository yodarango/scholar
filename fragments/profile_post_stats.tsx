import { Icon } from "./chunks/icons";
import styles from "./profile_post_stats.module.css";
import { Parragraph } from "./Typography/parragraph";

type TProfilePostStatsProps = {
   icon: string;
   iconColor: string;
   totalPosts: number;
   contentType: string;
};
export const ProfilePostStats = ({
   icon,
   iconColor,
   totalPosts,
   contentType
}: TProfilePostStatsProps) => {
   return (
      <div className={styles.mainWrapper}>
         <div className={styles.icon}>
            <Icon name={icon} color={iconColor} size='2rem' />
         </div>
         <div className={styles.text}>
            <Parragraph text={`${totalPosts} ${contentType}`} size='xsmall' quiet={true} />
         </div>
      </div>
   );
};
