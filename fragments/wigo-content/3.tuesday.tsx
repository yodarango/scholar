// core
import React, { useState } from "react";

// style
import tuesdayStyles from "../../styles/fragments/wigo-content/3.Tuesday.module.css";

type tuesdayProps = {
   tuesdayContent: {
      imageUrl: String;
      text: String;
      title: String;
   };
};

const Tuesday = ({ tuesdayContent }: tuesdayProps) => {
   const [seeMoreState, setseeMoreState] = useState<string>(`${tuesdayStyles.text}`);
   const handleSeeMore = () => {
      setseeMoreState(`${tuesdayStyles.textExtended}`);
   };

   return (
      <div className={tuesdayStyles.mainWrapper}>
         <div
            className={tuesdayStyles.image}
            style={{
               backgroundImage: `url(${
                  "https://drive.google.com/uc?id=" + tuesdayContent.imageUrl
               })`
            }}></div>
         <h1 className={tuesdayStyles.title}>{tuesdayContent.title}</h1>
         <p className={seeMoreState}>{tuesdayContent.text}</p>
         {seeMoreState === tuesdayStyles.text && (
            <div className={`${tuesdayStyles.seeMore}`} onClick={handleSeeMore}></div>
         )}
         {seeMoreState === tuesdayStyles.textExtended && (
            <div
               className={`${tuesdayStyles.seeMore}`}
               onClick={() => setseeMoreState(tuesdayStyles.text)}></div>
         )}
      </div>
   );
};

export default Tuesday;
