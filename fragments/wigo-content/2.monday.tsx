/************************************************/
/*** This componenet will onyl appear on ********/
/*** Mondays. For now the topic is Motivation ***/
/*** Monday. This can range from video, *********/
/*** graphics, text, photos, etc, therefore *****/
/*** The content can be raw html, array of ******/
/*** Images, a video, or raw HTML ***************/

// core
import React, { useState, useEffect } from "react";

// styles
import mondayStyles from "../../styles/fragments/wigo-content/2.Monday.module.css";

type mondayProps = {
   mondayContent: {
      imageArray: string[];
      video: { videoLink: string; text: string };
      rawHtml: string;
   };
};
const Monday = ({ mondayContent }: mondayProps) => {
   const [switchPhotoState, setswitchPhotoState] = useState<any>(0);
   console.log(mondayContent);
   return (
      <div className={mondayStyles.mainWrapper}>
         <h2 className={mondayStyles.title}> Motivation For Today</h2>
         {/************** IF NO CONTENT IS AVAILABLE Type of content  **************/}
         {!mondayContent && (
            <div className={mondayStyles.noContentWrapper}>
               <span></span>
               <p>
                  How are you enjoying the App? <br /> Let others know!
               </p>
            </div>
         )}
         {mondayContent &&
            !mondayContent.rawHtml &&
            !mondayContent.video.videoLink &&
            !mondayContent.imageArray && (
               <div className={mondayStyles.noContentWrapper}>
                  <span></span>
                  <p>
                     How are you enjoying the App? <br /> Let others know!
                  </p>
               </div>
            )}
         {/************** IMAGE Type of content  **************/}
         {mondayContent && mondayContent.imageArray.length > 0 && (
            <div>
               <img
                  src={mondayContent.imageArray[switchPhotoState]}
                  alt='image'
                  className={mondayStyles.image}
               />
               {mondayContent && mondayContent.imageArray.length > 1 && (
                  <div className={mondayStyles.buttonWrapper}>
                     {switchPhotoState > 0 ? (
                        <div onClick={() => setswitchPhotoState(switchPhotoState - 1)}></div>
                     ) : (
                        <div id={`${mondayStyles.emptyButton}`}></div>
                     )}
                     {switchPhotoState < mondayContent.imageArray.length - 1 ? (
                        <div onClick={() => setswitchPhotoState(switchPhotoState + 1)}></div>
                     ) : (
                        <div id={`${mondayStyles.emptyButton}`}></div>
                     )}
                  </div>
               )}
            </div>
         )}
         {/************** VIDEO Type of content  **************/}
         {mondayContent && mondayContent.video.videoLink && (
            <div className={mondayStyles.videoContentWrapper}>
               <video src={mondayContent.video.videoLink} controls></video>
               <p>{mondayContent.video.text}</p>
            </div>
         )}
         {/************** OTHER Type of content  **************/}
         {mondayContent && mondayContent.rawHtml && (
            <div
               dangerouslySetInnerHTML={{ __html: mondayContent.rawHtml }}
               className={mondayStyles.contentHtml}></div>
         )}
      </div>
   );
};

export default Monday;
