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
import DummyPlaceholder from "../wigo-content/dummy-placeholder";
import ResourceNotFoundError from "../chunks/error_resource_not_found";

// styles
import styles from "./video_thumbnail_primary.module.css";
import { IconButton } from "../buttons/icon_button";
import Portal from "../../hoc/potal";
import { PrimaryStack } from "../../layouts/stacks/templates/primary_stack";
import { VideoModalContent } from "../chunks/video_modal_content";

export type TVideoThumbnailPrimaryProps = {
   content: { url?: string; title?: string; description: string };
};

const VideoThumbnailPrimary = ({ content }: TVideoThumbnailPrimaryProps) => {
   // states
   const [contentData, setcontentData] = useState<any>(false);
   const [loading, setloading] = useState<string>("loading");
   const [showVideoModal, setshowVideoModal] = useState<boolean | JSX.Element>(false);

   // fetch video data
   const getVideoData = async () => {
      try {
         // call pollo to get video info

         if (res) {
            setcontentData(res);
            setloading("done");
         } else {
            setcontentData(false);
            setloading("error");
         }
      } catch (error) {
         console.log(error);
         setloading("error");
      }
   };

   useEffect(() => {
      getVideoData();
   }, []);

   return (
      <>
         <Portal>
            <PrimaryStack
               title={contentData.title}
               content={<VideoModalContent />}
               cta={{ handleClose: () => setcontentData(false) }}
            />
         </Portal>
         {content && (
            <div className={styles.mainWrapper}>
               <div
                  className={styles.videoThumbnail}
                  style={{ backgroundImage: `url(${contentData.thumbnail_url})` }}>
                  <IconButton
                     icon='play'
                     backgroundColor='1'
                     cta={{ handleClick: () => setshowVideoModal(true) }}
                  />
               </div>
            </div>
         )}
         {!content && (
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

export default VideoThumbnailPrimary;
