// core
import React from "react";

// styles
import MultiViewSettingsStyles from "../../styles/fragments/popup-content/MultiViewSettings.module.css";
import collegeUnitSettingsStyles from "../../styles/fragments/squares/readingCollageUnit.module.css";
import ReadingCollageStyles from "../../styles/layouts/ReadingCollage.module.css";

type multiViewSettingsProps = {
   handleMultiverseView: any;
   closeMultiView: React.MouseEventHandler;
};
const multiViewSettings = ({ handleMultiverseView, closeMultiView }: multiViewSettingsProps) => {
   // This list of items is, once clicked, will pass an array from classes as a parameter from collegeUnitSettingsStyles
   // then a map() funtcion will render it to the CollageUnit componenet.
   // those classes are in charge of paiting an organized grid to the screen
   return (
      <div className={`${MultiViewSettingsStyles.mainWrapper}`}>
         <div className={`${MultiViewSettingsStyles.viewsWrapper}`}>
            <div className={`${MultiViewSettingsStyles.oneView}`} onClick={closeMultiView}></div>
            <div
               className={`${MultiViewSettingsStyles.twoView}`}
               onClick={() =>
                  handleMultiverseView([
                     ReadingCollageStyles.hiddenScreenTwo,
                     ReadingCollageStyles.hiddenScreenThree,
                     collegeUnitSettingsStyles.twoViewerClass,
                     collegeUnitSettingsStyles.twoViewerClass
                  ])
               }></div>
            <div
               className={`${MultiViewSettingsStyles.threeView}`}
               onClick={() =>
                  handleMultiverseView([
                     ReadingCollageStyles.hiddenScreenTwo,
                     collegeUnitSettingsStyles.threeViewerClass,
                     collegeUnitSettingsStyles.threeViewerClass,
                     collegeUnitSettingsStyles.threeViewerClass
                  ])
               }></div>
            <div
               className={`${MultiViewSettingsStyles.fourView}`}
               onClick={() =>
                  handleMultiverseView([
                     collegeUnitSettingsStyles.fourViewerClass,
                     collegeUnitSettingsStyles.fourViewerClass,
                     collegeUnitSettingsStyles.fourViewerClass,
                     collegeUnitSettingsStyles.fourViewerClass
                  ])
               }></div>
         </div>
      </div>
   );
};

export default multiViewSettings;
