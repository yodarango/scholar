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

const Sunday = () => {
   //================ FUNCTION 1: fetch the video data
   const [fetchVodeoState, setFetchVodeoState] = useState<any>(false);
   const fetchVideoData = async () => {
      const request = await fetch(
         `https://www.youtube.com/oembed?url=https://youtu.be/6YrOGKmGTCY&format=json`
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
         <h2 className={`${sermonSundayStyles.title}`}>Today's Fatured Sermon</h2>
         <p className={`std-text-block ${sermonSundayStyles.parragraph}`}>
            This week the fatured sermon is <b>{`Sermon Title`}</b> by <b>{`Preacher`}</b>. We hope
            it is a blessing to your sunday! 😊
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
         {/* <iframe
            className={`${sermonSundayStyles.iframe}`}
            id='ytplayer'
            typeof={"text/html"}
            src='https://www.youtube.com/embed/6wA5tfK48io?autoplay=1&loop=1&modestbranding=1&playsinline=1'
            frameBorder='0'
            allowFullScreen></iframe> */}
      </div>
   );
};

export default Sunday;
