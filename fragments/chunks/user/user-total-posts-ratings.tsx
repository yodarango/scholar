// styles
import userTotalPostsAndRatingsStyles from "../../../styles/fragments/chunks/users/UserTotalPostsAndRating.module.css";

// helpers / types
import { Tuser } from "../../../pages/users/[...userId]";

type userTotalPostsAndRatingsProps = {
   user: Tuser;
};
const UserTotalPostsAndRatings = ({ user }: userTotalPostsAndRatingsProps) => {
   return (
      <section className={userTotalPostsAndRatingsStyles.totalsWrapper}>
         <p>
            Total Posts:
            {user.all_posts.commentaries[0].total_count +
               user.all_posts.thoughts[0].total_count +
               user.all_posts.quotes[0].total_count +
               user.all_posts.sermon_notes[0].total_count}
         </p>
         <p>
            Total Ratings:{" "}
            {user.all_posts.thought_approval_total_count +
               user.all_posts.quote_approval_total_count +
               user.all_posts.commentaries_approval_total_count}
         </p>
      </section>
   );
};

export default UserTotalPostsAndRatings;
