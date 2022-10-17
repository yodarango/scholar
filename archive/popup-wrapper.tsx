// core
import React from "react";

// styles

type popupWrapperProps = {
   content: any;
   closeModal: React.MouseEventHandler;
   outterContent?: JSX.Element;
};

const PopupWrapper = ({ content, closeModal, outterContent }: popupWrapperProps) => {
   return (
      <div className='dark-bkg'>
         <div className='closeModal' onClick={closeModal}>
            X
         </div>
         <div className={`dark-bkg_content-holder `}>{content}</div>
         <div className={`dark-bkg_content-holder-outer`}>{outterContent}</div>
      </div>
   );
};

export default PopupWrapper;
