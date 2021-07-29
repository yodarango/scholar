// core
import React, { useState } from "react";

//Components
import ReadingCollageUnit from "../fragments/squares/reading-collage-unit";
import MultiViewSettings from "../fragments/popup-content/multi-view-settings";

// Styles
import readingCollageStyles from "../styles/layouts/ReadingCollage.module.css";

const ReadingCollage = () => {
   // =====================   FUNCTION 1 : open the settings popup for Multiview  =================///
   const [viewSettingsPopUpState, setViewSettingsPopUpState] = useState<JSX.Element | boolean>(
      false
   );
   const openMultiViewPopup = () => {
      setViewSettingsPopUpState(<MultiViewSettings handleMultiverseView={handleMultiverseView} />);
   };
   const closeMultiViewPopup = () => {
      setViewSettingsPopUpState(false);
   };

   // ========================   FUNCTION 2 : set the multiviewer screen based on user selection   ============///
   // const [multiViewerOpenState, setMultiViewerOpenState] = useState<any>(
   //    <ReadingCollageUnit multiViewClass='' />
   // );
   // const handleMultiverseView = (numberOfWindows: string[]) => {
   //    setMultiViewerOpenState(
   //       numberOfWindows.map((window: string) => <ReadingCollageUnit multiViewClass={window} />)
   //    );
   // };

   type ImultiViewerOpenClassState = {
      screenOne: string;
      screenTwo: string;
      screenThree: string;
      screenFour: string;
   };

   const [multiViewerOpenClassState, setmultiViewerOpenClassState] = useState({
      screenOne: "",
      screenTwo: readingCollageStyles.hiddenScreenTwo,
      screenThree: readingCollageStyles.hiddenScreenThree,
      screenFour: readingCollageStyles.hiddenScreenFour
   });

   const handleMultiverseView = (numberOfWindows: string[]) => {
      setmultiViewerOpenClassState({
         screenOne: numberOfWindows[0],
         screenTwo: numberOfWindows[1],
         screenThree: numberOfWindows[2],
         screenFour: numberOfWindows[3]
      });
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
            {/* {multiViewerOpenState} */}
            <ReadingCollageUnit multiViewClass={multiViewerOpenClassState.screenOne} />
            <ReadingCollageUnit multiViewClass={multiViewerOpenClassState.screenTwo} />
            <ReadingCollageUnit multiViewClass={multiViewerOpenClassState.screenThree} />
            <ReadingCollageUnit multiViewClass={multiViewerOpenClassState.screenFour} />
         </div>
      </>
   );
};

export default ReadingCollage;
