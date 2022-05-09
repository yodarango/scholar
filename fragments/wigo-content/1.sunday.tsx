/************************************************/
/*** This componenet will onyl appear on ********/
/*** Sundays. For now the topic is Sermon *******/
/*** Sunday. ************************************/

// core
import { useState, useEffect } from "react";
import Image from "next/image";

// components
import PopupWrapper from "../../layouts/popup-wrapper";
import CardsLazyLoading from "../../layouts/cards-lazy-loading";
import DummyPlaceholder from "./dummy-placeholder";

// styles
import sermonSundayStyles from "../../styles/fragments/wigo-content/1.Sunday.module.css";
import cardsLazyLoadingStyles from "../../styles/layouts/CardsLazyLoading.module.css";

export type sundayProps = {
   sundayContent: { videoLink?: string; sermonTitle?: string; preacher?: string };
};

const Sunday = ({ sundayContent }: sundayProps) => {
   //================ FUNCTION 1: fetch the video data
   const [fetchVodeoState, setFetchVodeoState] = useState<any>(false);
   const [loadingState, setloadingState] = useState("loading");

   const fetchVideoData = async () => {
      try {
         const request = await fetch(
            `https://www.youtube.com/oembed?url=${sundayContent.videoLink}&format=json`
         );
         const jsonData = await request.json();
         setFetchVodeoState(jsonData);
         setloadingState("done");
      } catch (error) {
         console.log(error);
         setloadingState("error");
      }
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
                  {fetchVodeoState && loadingState === "done" && (
                     <>
                        <h2 className={sermonSundayStyles.videoTitle}>{fetchVodeoState.title}</h2>
                        <div
                           dangerouslySetInnerHTML={{ __html: `${fetchVodeoState.html}` }}
                           className={`${sermonSundayStyles.iframe}`}></div>
                     </>
                  )}
                  {loadingState === "loading" && (
                     <>
                        <CardsLazyLoading
                           amount={2}
                           compClass={cardsLazyLoadingStyles.wigoSunday}
                        />
                     </>
                  )}
                  {loadingState == "error" && (
                     <div
                        className={`${cardsLazyLoadingStyles.errorImage} ${cardsLazyLoadingStyles.errorImageFP}`}>
                        <Image layout='fill' alt='resource not found' src={"/Parks10.png"} />
                     </div>
                  )}
               </>
            }
         />
      );
   };

   return (
      <>
         {sundayContent && (
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
         )}
         {!sundayContent && (
            <DummyPlaceholder
               button='share'
               context={
                  <p>
                     Are you enjoying the app? If you are, please don't forget to share it with
                     friends and family and write to <b>hey@biblescholar.app</b> to show the love
                     and share suggestions!
                  </p>
               }
               imgLink={`/images/wigo-placeholders/no_content_graphic_one.png`}
            />
         )}
      </>
   );
};

export default Sunday;
