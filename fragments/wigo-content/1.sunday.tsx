/************************************************/
/*** This componenet will onyl appear on ********/
/*** Sundays. For now the topic is Sermon *******/
/*** Sunday. ************************************/

// core
import React, { useState, useEffect } from "react";

// components
import PopupWrapper from "../../layouts/popup-wrapper";

// styles
import sermonSundayStyles from "../../styles/fragments/wigo-content/1.Sunday.module.css";

export type sundayProps = {
   sundayContent: { videoLink?: string; sermonTitle?: string; preacher?: string };
};

const Sunday = ({ sundayContent }: sundayProps) => {
   //================ FUNCTION 1: fetch the video data
   const [fetchVodeoState, setFetchVodeoState] = useState<any>(false);
   const fetchVideoData = async () => {
      const request = await fetch(
         `https://www.youtube.com/oembed?url=${sundayContent.videoLink}&format=json`
      );
      const jsonData = await request.json();
      setFetchVodeoState(jsonData);
   };

   useEffect(() => {
      fetchVideoData();
   }, []);

   //================ FUNCTION 2: open the video on a popup
   const [videoPopupState, setvideoPopupState] = useState<boolean | JSX.Element>(false);
   const openPopupVideoView = () => {
      setvideoPopupState(
         <PopupWrapper
            closeModal={() => setvideoPopupState(false)}
            content={
               <>
                  <h2 className={sermonSundayStyles.videoTitle}>{fetchVodeoState.title}</h2>
                  <div
                     dangerouslySetInnerHTML={{ __html: `${fetchVodeoState.html}` }}
                     className={`${sermonSundayStyles.iframe}`}></div>
               </>
            }
         />
      );
   };

   return (
      <div className={`${sermonSundayStyles.mainWrapper}`}>
         {videoPopupState}
         <h2 className={`${sermonSundayStyles.title}`}>Today's Featured Sermon</h2>
         <p className={`std-text-block ${sermonSundayStyles.parragraph}`}>
            This week the fatured sermon is <b>{sundayContent.sermonTitle}</b> by{" "}
            <b>{sundayContent.preacher}</b>. We hope it is a blessing to your sunday! 🙇‍♂️ 🙏
         </p>
         <div
            className={sermonSundayStyles.videoThumbnail}
            style={{ backgroundImage: `url(${fetchVodeoState.thumbnail_url})` }}>
            <span
               className={`${sermonSundayStyles.playVideoButton} std-button`}
               onClick={openPopupVideoView}>
               <span></span>
            </span>
         </div>
      </div>
   );
};

export default Sunday;
