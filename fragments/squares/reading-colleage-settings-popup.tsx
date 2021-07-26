import React from "react";
import readingColleageSettingsPopupStyles from "../../styles/fragments/squares/ReadingCollegeSettingsPopup.module.css";

type ReadingColleageSettingsPopupProps = {
   closeModal: React.MouseEventHandler;
   handleColorChange: any;
   handleFontSize: any;
   handleResetColor: React.MouseEventHandler;
};
const ReadingColleageSettingsPopup = ({
   closeModal,
   handleColorChange,
   handleFontSize,
   handleResetColor
}: ReadingColleageSettingsPopupProps) => {
   return (
      <div className={readingColleageSettingsPopupStyles.mainWrapper}>
         <div className='closeModal' onClick={closeModal}>
            X
         </div>
         <div className={readingColleageSettingsPopupStyles.themeColorWrapper}>
            <div
               className={readingColleageSettingsPopupStyles.firstTheme}
               onClick={handleResetColor}></div>
            <div
               className={readingColleageSettingsPopupStyles.secondTheme}
               onClick={() => handleColorChange("#363062")}></div>
            <div
               className={readingColleageSettingsPopupStyles.thirdTheme}
               onClick={() => handleColorChange("#1d2d50")}></div>
            <div
               className={readingColleageSettingsPopupStyles.fourthTheme}
               onClick={() => handleColorChange("#433b55")}></div>
            <div
               className={readingColleageSettingsPopupStyles.fifthTheme}
               onClick={() => handleColorChange("#393e46")}></div>
            <div
               className={readingColleageSettingsPopupStyles.sixthTheme}
               onClick={() => handleColorChange("#242424")}></div>
         </div>
         <div className={readingColleageSettingsPopupStyles.fontSizeWrapper}>
            <div
               className={readingColleageSettingsPopupStyles.firstSize}
               onClick={() => handleFontSize("1.2rem")}>
               default
            </div>
            <div
               className={readingColleageSettingsPopupStyles.secondSize}
               onClick={() => handleFontSize("1.4rem")}>
               big
            </div>
            <div
               className={readingColleageSettingsPopupStyles.thirdSize}
               onClick={() => handleFontSize("1.6rem")}>
               bigger
            </div>
         </div>
      </div>
   );
};

export default ReadingColleageSettingsPopup;
