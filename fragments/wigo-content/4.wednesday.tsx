/************************************************/
/*** This componenet will onyl appear on ********/
/*** Wednesday. For now the topic is Sermon *****/
/*** SunWednesdayday. ***************************/

// core
import React from "react";

//styles
import wednesdayStyles from "../../styles/fragments/wigo-content/4.Wednesday.module.css";

type wednesdaysProps = {
   wednesdayContent: {
      songLink: string;
   };
};
const Wednesday = ({ wednesdayContent }: wednesdaysProps) => {
   return (
      <div className={wednesdayStyles.mainWrapper}>
         {wednesdayContent && wednesdayContent.songLink && (
            <>
               <h1 className={wednesdayStyles.title}>Recommended On-Repeat 🎹 🎸</h1>
               <iframe
                  className={wednesdayStyles.contentHtml}
                  src={`${wednesdayContent.songLink}`}
                  frameBorder='0'
                  allowFullScreen={true}
                  allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'></iframe>
            </>
         )}
         {!wednesdayContent && (
            <div className={wednesdayStyles.noContentWrapper}>No content today! :(</div>
         )}
      </div>
   );
};

export default Wednesday;
