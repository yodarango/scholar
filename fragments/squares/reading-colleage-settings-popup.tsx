import React from "react";
import readingColleageSettingsPopupStyles from "../../styles/fragments/squares/ReadingCollegeSettingsPopup.module.css";

type ReadingColleageSettingsPopupProps = {
   closeModal: React.MouseEventHandler;
   handleColorChange: any;
   handleFontSize: any;
};
const ReadingColleageSettingsPopup = ({
   closeModal,
   handleColorChange,
   handleFontSize
}: ReadingColleageSettingsPopupProps) => {
   return (
      <div className={readingColleageSettingsPopupStyles.mainWrapper}>
         <div className='closeModal' onClick={closeModal}>
            X
         </div>
         <div className={readingColleageSettingsPopupStyles.themeColorWrapper}>
            <div
               className={readingColleageSettingsPopupStyles.firstTheme}
               onClick={() => handleColorChange("#edf6f9")}></div>
            <div
               className={readingColleageSettingsPopupStyles.secondTheme}
               onClick={() => handleColorChange("#f7ede2")}></div>
            <div
               className={readingColleageSettingsPopupStyles.thirdTheme}
               onClick={() => handleColorChange("#b1a7a6")}></div>
            <div
               className={readingColleageSettingsPopupStyles.fourthTheme}
               onClick={() => handleColorChange("#433b55")}></div>
            <div
               className={readingColleageSettingsPopupStyles.fifthTheme}
               onClick={() => handleColorChange("#495057")}></div>
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
