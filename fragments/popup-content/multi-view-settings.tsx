import React from "react";
import MultiViewSettingsStyles from "../../styles/fragments/popup-content/MultiViewSettings.module.css";

const multiViewSettings = () => {
   return (
      <div className={`${MultiViewSettingsStyles.mainWrapper}`}>
         <div className={`${MultiViewSettingsStyles.viewsWrapper}`}>
            <div className={`${MultiViewSettingsStyles.oneView}`}></div>
            <div className={`${MultiViewSettingsStyles.twoView}`}></div>
            <div className={`${MultiViewSettingsStyles.threeView}`}></div>
            <div className={`${MultiViewSettingsStyles.fourView}`}></div>
         </div>
      </div>
   );
};

export default multiViewSettings;
