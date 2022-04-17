// styles
import userTotalPostsAndRatingsStyles from "../../../styles/fragments/chunks/users/UserTotalPostsAndRating.module.css";

// helpers / types
import { Tuser } from "../../../pages/users/[userId]";

type userTotalPostsAndRatingsProps = {
   user: Tuser;
};
const UserTotalPostsAndRatings = ({ user }: userTotalPostsAndRatingsProps) => {
   // check if the parent loading this comp is "User" or "Me"
   const allPosts = user.all_posts ? user.all_posts : user.all_posts_profile;

   return (
      <section className={userTotalPostsAndRatingsStyles.totalsWrapper}>
         {allPosts && (
            <p>
               Total Posts:
               {allPosts?.commentaries[0].total_count +
                  allPosts?.thoughts[0].total_count +
                  allPosts?.quotes[0].total_count +
                  allPosts?.sermon_notes[0].total_count}
            </p>
         )}
         {allPosts && (
            <p>
               Total Ratings:{" "}
               {allPosts?.thought_approval_total_count +
                  allPosts?.quote_approval_total_count +
                  allPosts?.commentaries_approval_total_count}
            </p>
         )}
      </section>
   );
};

export default UserTotalPostsAndRatings;
