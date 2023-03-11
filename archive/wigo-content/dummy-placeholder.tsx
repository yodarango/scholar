// core
import { useRef, useState } from "react";

//styles
import interactStyles from "../../styles/pages/Interact.module.css";
import NotificationPopup from "../popups/notification";

type dummyPlaceholderProps = {
   imgLink: string;
   button: string;
   context: JSX.Element;
};
const DummyPlaceholder = ({ imgLink, button, context }: dummyPlaceholderProps) => {
   const [notificationPopUpState, setnotificationPopUpState] =
      useState<boolean | JSX.Element>(false);

   const copyCitation = () => {
      navigator.clipboard.writeText("http://my.shrood.app");

      setnotificationPopUpState(
         <NotificationPopup
            title='Success! ✅'
            newClass='notification-wrapper--Success'
            contentString='Link copied to clipboard'
            closeModal={() => setnotificationPopUpState(false)}
         />
      );
   };

   return (
      <div className={`${interactStyles.wrapperNoCont}`}>
         {notificationPopUpState}
         <div className={interactStyles.noContentImgWrapper}>
            <img src={imgLink} />
         </div>
         {context}
         {button === "share" && (
            <button className='std-button' onClick={copyCitation}>
               <p className='std-button_gradient-text'>Share App</p>
            </button>
         )}
      </div>
   );
};

export default DummyPlaceholder;
