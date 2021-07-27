// core
import React, { useState } from "react";

//Components
import ReadingCollageUnit from "../fragments/squares/reading-collage-unit";
import MultiViewSettings from "../fragments/popup-content/multi-view-settings";

// Styles
import readingCollageStyles from "../styles/layouts/ReadingCollage.module.css";

const ReadingCollage = () => {
   // ===============   FUNCTION 1 : open the settings popup for Multiview  =================///
   const [viewSettingsPopUpState, setViewSettingsPopUpState] = useState<JSX.Element | boolean>(
      false
   );
   const openMultiViewPopup = () => {
      setViewSettingsPopUpState(<MultiViewSettings />);
   };
   const closeMultiViewPopup = () => {
      setViewSettingsPopUpState(false);
   };
   return (
      <>
         {viewSettingsPopUpState}
         <div className={readingCollageStyles.mainWrapper}>
            {viewSettingsPopUpState === false && (
               <div
                  className={`${readingCollageStyles.multiView}`}
                  onClick={openMultiViewPopup}></div>
            )}
            {viewSettingsPopUpState && (
               <div
                  className={`${readingCollageStyles.multiView}`}
                  onClick={closeMultiViewPopup}></div>
            )}
            <ReadingCollageUnit />
         </div>
      </>
   );
};

export default ReadingCollage;
