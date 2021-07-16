import React from "react";
import ReadingCollageUnit from "../fragments/squares/reading-collage-unit";
import readingCollageStyles from "../styles/layouts/ReadingCollage.module.css";

const ReadingCollage = () => {
   return (
      <div className={readingCollageStyles.mainWrapper}>
         <ReadingCollageUnit  />
      </div>
   );
};

export default ReadingCollage;
