// styles
import userBioWrapperStyles from "../../../styles/fragments/chunks/users/UserBioWrapper.module.css";

// helpers / types
import calulateApprovalLevel from "../../../helpers/math/calculateArppovalLevel";
import { Tuser } from "../../../pages/users/[userId]";

type userBioWrapperProps = {
   user: Tuser;
};
const UserBioWrapper = ({ user }: userBioWrapperProps) => {
   return (
      <section className={userBioWrapperStyles.userBioWrapper}>
         <div className={userBioWrapperStyles.avatarReputationWrapper}>
            <div
               className={`${userBioWrapperStyles.reputationWrapper} ${
                  user.authority_level == "trusted"
                     ? userBioWrapperStyles.reputationWrapperTrusted
                     : ""
               }`}>
               <div
                  className={userBioWrapperStyles.avatar}
                  style={{ backgroundImage: `url(${user.avatar})` }}></div>
            </div>
            {user.authority_level == "trusted" && (
               <span className={userBioWrapperStyles.trustedPointer}></span>
            )}
         </div>
         {user.approval_rating >= 97 && (
            <h2 className={userBioWrapperStyles.reliabilityA}>Approval Rating: A+</h2>
         )}
         {user.approval_rating >= 94 && user.approval_rating < 97 && (
            <h2 className={userBioWrapperStyles.reliabilityA}>Approval Rating: A</h2>
         )}
         {user.approval_rating >= 90 && user.approval_rating < 94 && (
            <h2 className={userBioWrapperStyles.reliabilityA}>Approval Rating: A-</h2>
         )}
         {user.approval_rating >= 87 && user.approval_rating < 90 && (
            <h2 className={userBioWrapperStyles.reliabilityB}>Approval Rating: B+</h2>
         )}
         {user.approval_rating >= 83 && user.approval_rating < 87 && (
            <h2 className={userBioWrapperStyles.reliabilityB}>Approval Rating: B</h2>
         )}
         {user.approval_rating >= 80 && user.approval_rating < 83 && (
            <h2 className={userBioWrapperStyles.reliabilityB}>Approval Rating: B-</h2>
         )}
         {user.approval_rating >= 77 && user.approval_rating < 80 && (
            <h2 className={userBioWrapperStyles.reliabilityC}>Approval Rating: C+</h2>
         )}
         {user.approval_rating >= 73 && user.approval_rating < 77 && (
            <h2 className={userBioWrapperStyles.reliabilityC}>Approval Rating: C</h2>
         )}
         {user.approval_rating >= 70 && user.approval_rating < 73 && (
            <h2 className={userBioWrapperStyles.reliabilityC}>Approval Rating: C-</h2>
         )}
         {user.approval_rating >= 67 && user.approval_rating < 70 && (
            <h2 className={userBioWrapperStyles.reliabilityC}>Approval Rating: D+</h2>
         )}
         {user.approval_rating > 60 && user.approval_rating < 67 && (
            <h2 className={userBioWrapperStyles.reliabilityC}>Approval Rating: D</h2>
         )}
         {user.approval_rating <= 60 && (
            <h2 className={userBioWrapperStyles.reliabilityF}>Reliability: F</h2>
         )}
         <p>Commentaries: {user.all_posts.commentaries[0].total_count}</p>
         <p>Thoughts: {user.all_posts.thoughts[0].total_count}</p>
         <p>Quotes: {user.all_posts.quotes[0].total_count}</p>
         <p>Sermons {user.all_posts.sermon_notes[0].total_count}</p>
      </section>
   );
};

export default UserBioWrapper;
