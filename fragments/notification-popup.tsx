import React from "react";

type notificatrionPopupProps = {
   title: string;
   contentArray?: [];
   contentString?: string;
   newClass?: string;
   closeModal: React.MouseEventHandler;
};
const NotificationPopup = ({
   title,
   contentArray,
   closeModal,
   newClass,
   contentString
}: notificatrionPopupProps) => {
   return (
      <div className={`notification-wrapper ${newClass}`}>
         <div className='closeModal' onClick={closeModal}>
            X
         </div>
         <h1 className='notification-wrapper_title'>{title}</h1>
         {contentArray &&
            contentArray.map((el) => <span className='notification-wrapper_content'>{el}, </span>)}
         {contentString && <p className={`notification-wrapper_content`}>{contentString}</p>}
      </div>
   );
};

export default NotificationPopup;
