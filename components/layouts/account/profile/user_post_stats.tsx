import { ProfileStatsGraph } from "../../../fragments/chunks/profile_stats_graph";
import { ProfilePostStats } from "../../../fragments/profile_post_stats";
import styles from "./user_post_stats.module.css";

type TUserPostStatsProps = {
   commentaries: number;
   thoughts: number;
   quotes: number;
   sermonNotes: number;
};
export const UserPostStats = ({
   commentaries,
   thoughts,
   quotes,
   sermonNotes
}: TUserPostStatsProps) => {
   const contentStats = [
      {
         icon: "comment",
         iconColor: "#B293FE",
         totalPosts: commentaries,
         contentType: "commentaries"
      },
      {
         icon: "think",
         iconColor: "#533CA3",
         totalPosts: thoughts,
         contentType: "thoughts"
      },
      {
         icon: "quote",
         iconColor: "#F1EAFF",
         totalPosts: quotes,
         contentType: "quote"
      },
      {
         icon: "folder",
         iconColor: "#7350EC",
         totalPosts: sermonNotes,
         contentType: "sermon notes"
      }
   ];

   return (
      <div className={styles.mainWrapper}>
         <div className={styles.graph}>
            <ProfileStatsGraph content={{ commentaries, thoughts, quotes, sermonNotes }} />
         </div>
         <div className={styles.stats}>
            {contentStats.map((item, index) => (
               <div className={styles.stat} key={index}>
                  <ProfilePostStats
                     contentType={item.contentType}
                     icon={item.icon}
                     iconColor={item.iconColor}
                     totalPosts={item.totalPosts}
                  />
               </div>
            ))}
         </div>
      </div>
   );
};
