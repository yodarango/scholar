import Link from "next/link";

// styles
import quickUserInfoStyles from "../../styles/fragments/squares/QuickAccessUserInfoPopUp.module.css";

// types
import { Tuser } from "../../pages/users/[userId]";

// helpers
import calulateApprovalLevel from "../../helpers/math/calculateArppovalLevel";

type quickUserInfoPopupProps = {
   user: Tuser;
   closeModal: any;
};
const QuickUserInfoPopup = ({ user, closeModal }: quickUserInfoPopupProps) => {
   return (
      <div className={quickUserInfoStyles.mainWrapper}>
         <span className={`closeModal ${quickUserInfoStyles.closeModal}`} onClick={closeModal}>
            x
         </span>
         <Link href={`/users/${user.ID}`}>
            <a className={quickUserInfoStyles.signature}>{user.signature}</a>
         </Link>
         <p className={quickUserInfoStyles.name}>
            <span>Name:</span> {user.first_name} {user.last_name}
         </p>
         <p className={quickUserInfoStyles.approval}>
            <span>Approval Level:</span> {calulateApprovalLevel(user.approval_rating)}
         </p>
         <p className={quickUserInfoStyles.authority}>
            <span>Authority Level:</span> {user.authority_level}
         </p>
         <p className={quickUserInfoStyles.church}>
            <span>Home Church:</span> {user.my_church}
         </p>
      </div>
   );
};

export default QuickUserInfoPopup;
