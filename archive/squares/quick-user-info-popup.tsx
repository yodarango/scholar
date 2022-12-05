import Link from "next/link";

// styles
import quickUserInfoStyles from "../../styles/fragments/squares/QuickAccessUserInfoPopUp.module.css";

// types
import { Tuser } from "../../pages/users/[userId]";

// helpers
import calulateApprovalLevel from "../../helpers/math/calculate_approval_rating";

type quickUserInfoPopupProps = {
   user: Tuser;
   additionalStyles?: {};
   closeModal: any;
};
const QuickUserInfoPopup = ({ user, closeModal, additionalStyles }: quickUserInfoPopupProps) => {
   // figure it out what class to apply based in the authority level
   const authorityLevel =
      calulateApprovalLevel(user.approval_rating)?.styles == "A"
         ? quickUserInfoStyles.reliabilityA
         : calulateApprovalLevel(user.approval_rating)?.styles == "B"
         ? quickUserInfoStyles.reliabilityB
         : calulateApprovalLevel(user.approval_rating)?.styles == "C"
         ? quickUserInfoStyles.reliabilityC
         : calulateApprovalLevel(user.approval_rating)?.styles == "D"
         ? quickUserInfoStyles.reliabilityD
         : quickUserInfoStyles.reliabilityF;
   return (
      <div className={quickUserInfoStyles.mainWrapper} style={additionalStyles}>
         <span className={`closeModal ${quickUserInfoStyles.closeModal}`} onClick={closeModal}>
            x
         </span>
         <Link href={`/users/${user.ID}`}>
            <a
               onClick={() => (document.body.style.overflow = "scroll")}
               className={quickUserInfoStyles.signature}>
               {user.signature}
            </a>
         </Link>
         <p className={quickUserInfoStyles.name}>
            <span>🔖 Name:</span> {user.first_name} {user.last_name}
         </p>
         <p className={quickUserInfoStyles.approval}>
            <span>📊 Approval Level:</span>{" "}
            <span className={`${quickUserInfoStyles.gradeSpan} ${authorityLevel}`}>
               {calulateApprovalLevel(user.approval_rating)?.grade}
            </span>
         </p>
         <p className={quickUserInfoStyles.authority}>
            <span>⭐️ Authority Level:</span>{" "}
            {user.authority_level == 2 ? (
               <span className={quickUserInfoStyles.trustedSpan}>{user.authority_level}🎖</span>
            ) : (
               user.authority_level
            )}
         </p>
         <p className={quickUserInfoStyles.church}>
            <span>⛪️ Home Church:</span> {user.my_church}
         </p>
      </div>
   );
};

export default QuickUserInfoPopup;
