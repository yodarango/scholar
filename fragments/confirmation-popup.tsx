// core
import React from "react";

// style
import confirmationPopupStyle from "../styles/fragments/ConfirmationPopup.module.css";

export type confirmationPopupProps = {
   title: string;
   cancel: React.MouseEventHandler;
};
const ConfirmationPopup = ({ title, cancel }: confirmationPopupProps) => {
   return (
      <div className={confirmationPopupStyle.mainWrapper}>
         <h2 className={confirmationPopupStyle.title}>{title}</h2>
         <div className={confirmationPopupStyle.buttonsWrapper}>
            <button className={confirmationPopupStyle.cancel} onClick={cancel}>
               Cancel
            </button>
            <button className={confirmationPopupStyle.confirm}>Confirm</button>
         </div>
      </div>
   );
};

export default ConfirmationPopup;
