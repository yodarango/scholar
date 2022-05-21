// styles
import userBioWrapperStyles from "../../../styles/fragments/chunks/users/UserBioWrapper.module.css";

// helpers / types
import calulateApprovalLevel from "../../../helpers/math/calculateArppovalLevel";
import { Tuser } from "../../../pages/users/[userId]";

type userBioWrapperProps = {
   user: Tuser;
};
const UserBioWrapper = ({ user }: userBioWrapperProps) => {
   // check if the parent loading this comp is "User" or "Me"
   const allPosts = user.all_posts ? user.all_posts : user.all_posts_profile;

   return (
      <section className={userBioWrapperStyles.userBioWrapper}>
         <div className={userBioWrapperStyles.avatarReputationWrapper}>
            <div
               className={`${userBioWrapperStyles.reputationWrapper} ${
                  user.authority_level == 2 ? userBioWrapperStyles.reputationWrapperTrusted : ""
               }`}>
               <div
                  className={userBioWrapperStyles.avatar}
                  style={{ backgroundImage: `url(${user.avatar})` }}></div>
            </div>
            {user.authority_level == 2 && (
               <span className={userBioWrapperStyles.trustedPointer}></span>
            )}
         </div>
         {user.approval_rating >= 97 && user.approval_rating < 101 && (
            <h2 className={userBioWrapperStyles.reliabilityA}>Rating: A+</h2>
         )}
         {user.approval_rating >= 94 && user.approval_rating < 97 && (
            <h2 className={userBioWrapperStyles.reliabilityA}>Rating: A</h2>
         )}
         {user.approval_rating >= 90 && user.approval_rating < 94 && (
            <h2 className={userBioWrapperStyles.reliabilityA}>Rating: A-</h2>
         )}
         {user.approval_rating >= 87 && user.approval_rating < 90 && (
            <h2 className={userBioWrapperStyles.reliabilityB}>Rating: B+</h2>
         )}
         {user.approval_rating >= 83 && user.approval_rating < 87 && (
            <h2 className={userBioWrapperStyles.reliabilityB}>Rating: B</h2>
         )}
         {user.approval_rating >= 80 && user.approval_rating < 83 && (
            <h2 className={userBioWrapperStyles.reliabilityB}>Rating: B-</h2>
         )}
         {user.approval_rating >= 77 && user.approval_rating < 80 && (
            <h2 className={userBioWrapperStyles.reliabilityC}>Rating: C+</h2>
         )}
         {user.approval_rating >= 73 && user.approval_rating < 77 && (
            <h2 className={userBioWrapperStyles.reliabilityC}>Rating: C</h2>
         )}
         {user.approval_rating >= 70 && user.approval_rating < 73 && (
            <h2 className={userBioWrapperStyles.reliabilityC}>Rating: C-</h2>
         )}
         {user.approval_rating >= 67 && user.approval_rating < 70 && (
            <h2 className={userBioWrapperStyles.reliabilityC}>Rating: D+</h2>
         )}
         {user.approval_rating > 60 && user.approval_rating < 67 && (
            <h2 className={userBioWrapperStyles.reliabilityC}>Rating: D</h2>
         )}
         {user.approval_rating > 0 && user.approval_rating <= 60 && (
            <h2 className={userBioWrapperStyles.reliabilityF}>Rating: F</h2>
         )}
         {user.approval_rating == 101 && (
            <h2 className={userBioWrapperStyles.reliabilityNR}>Rating: NR</h2>
         )}
         <p>Commentaries: {allPosts?.commentaries[0].total_count}</p>
         <p>Thoughts: {allPosts?.thoughts[0].total_count}</p>
         <p>Quotes: {allPosts?.quotes[0].total_count}</p>
         <p>Sermons {allPosts?.sermon_notes[0].total_count}</p>
      </section>
   );
};

export default UserBioWrapper;
