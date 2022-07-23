// core
import { useState } from "react";

// style
import confirmationPopupStyle from "../styles/fragments/ConfirmationPopup.module.css";
import SmallLoader from "./chunks/small_loader";

export type confirmationPopupProps = {
   title: string;
   cancel: React.MouseEventHandler;
   confirm?: any;
};
const ConfirmationPopup = ({ title, cancel, confirm }: confirmationPopupProps) => {
   const [smallLoaderState, setsmallLoaderState] = useState<boolean>(false);
   return (
      <div className={confirmationPopupStyle.mainWrapper}>
         <h2 className={confirmationPopupStyle.title}>{title}</h2>
         <div className={confirmationPopupStyle.buttonsWrapper}>
            <button className={confirmationPopupStyle.cancel} onClick={cancel}>
               Cancel
            </button>
            {!smallLoaderState && (
               <button
                  className={confirmationPopupStyle.confirm}
                  onClick={() => {
                     confirm(), setsmallLoaderState(true);
                  }}>
                  Confirm
               </button>
            )}

            {smallLoaderState && (
               <div className={confirmationPopupStyle.smallLoaderHolder}>
                  <SmallLoader />
               </div>
            )}
         </div>
      </div>
   );
};

export default ConfirmationPopup;
