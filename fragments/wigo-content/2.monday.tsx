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

const Monday = () => {
   const imageArray: string[] = [
      // =============== IMAGE CONTENT FUNCTION =============== //
      /*`https://drive.google.com/uc?id=1h6AvJIaJOWFsqBFEikNbDA8oiorZENHs`,
      `https://drive.google.com/uc?id=1MhQ4eqIPWE9FGlG88vXaoI0B5OdvXU4E`,
      `https://drive.google.com/uc?id=1isy6ZBgssoqQyvHtIKxqinc0vtpdeGml`*/
   ];
   const [switchPhotoState, setswitchPhotoState] = useState<any>(0);

   // =============== VIDEO CONTENT FUNCTION =============== //
   const video = ""; //`https://drive.google.com/uc?id=17z-R8l2Ttd28AWTZy8Jj0T1qqZugqnxY`;

   // =============== HTML CONTENT FUNCTION =============== //
   let html = ""; //`<h1 style="color: pink;">title</h2>`;

   return (
      <div className={mondayStyles.mainWrapper}>
         <h2 className={mondayStyles.title}> Motivation For Today</h2>
         {/************** IMAGE Type of content  **************/}
         {imageArray.length > 0 && (
            <div>
               <img src={imageArray[switchPhotoState]} alt='image' className={mondayStyles.image} />
               {imageArray.length > 1 && (
                  <div className={mondayStyles.buttonWrapper}>
                     {switchPhotoState > 0 ? (
                        <div onClick={() => setswitchPhotoState(switchPhotoState - 1)}></div>
                     ) : (
                        <div id={`${mondayStyles.emptyButton}`}></div>
                     )}
                     {switchPhotoState < imageArray.length - 1 ? (
                        <div onClick={() => setswitchPhotoState(switchPhotoState + 1)}></div>
                     ) : (
                        <div id={`${mondayStyles.emptyButton}`}></div>
                     )}
                  </div>
               )}
            </div>
         )}
         {/************** VIDEO Type of content  **************/}
         {video && (
            <div className={mondayStyles.videoContentWrapper}>
               <video src={video} controls></video>
               <p>
                  in this video so and so explains to us how to have an intimate relationship with
                  the Lord
               </p>
            </div>
         )}
         {/************** OTHER Type of content  **************/}
         {html && (
            <div
               dangerouslySetInnerHTML={{ __html: html }}
               className={mondayStyles.contentHtml}></div>
         )}

         {/************** IF NO CONTENT IS AVAILABLE Type of content  **************/}
         {!html && !video && imageArray.length === 0 && (
            <div className={mondayStyles.noContentWrapper}>
               <span></span>
               <p>
                  How are you enjoying the App? <br /> Let others know!
               </p>
            </div>
         )}
      </div>
   );
};

export default Monday;
