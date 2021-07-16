// core
import React from "react";

// components
import GeneralDropDown from "../buttons/general-dropdown";

// styles
import readingCollageUnitStyles from "../../styles/fragments/squares/RandomDailyVerse.module.css";

const ReadingCollageUnit = () => {
   return (
      <div className={readingCollageUnitStyles.mainWrapper}>
         <div className={readingCollageUnitStyles.header}>
            <GeneralDropDown />
         </div>
      </div>
   );
};

export default ReadingCollageUnit;
