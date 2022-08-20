/************************************************/
/*** This componenet will onyl appear on ********/
/*** Sundays. For now the topic is Sermon *******/
/*** Sunday. ************************************/

// core
import { useState, useEffect } from "react";

// components
import Portal from "../../hoc/potal";
import { ResourceNotFoundError } from "../chunks/error_resource_not_found";
import { IconButton } from "../buttons/icon_button";
import { PrimaryStack } from "../../layouts/stacks/templates/primary_stack";
import { VideoModalContent } from "../chunks/video_modal_content";
import { RoundLoader } from "../chunks/round_loader";

// styles
import styles from "./video_thumbnail_primary.module.css";

// types
import { TVideoThumbnail } from "../../types/wigo_content";

export type TVideoThumbnailPrimaryProps = {
   content: TVideoThumbnail;
};

export const VideoThumbnailPrimary = ({ content }: TVideoThumbnailPrimaryProps) => {
   // states
   const [contentData, setcontentData] = useState<any>(false);
   const [loading, setloading] = useState<string>("loading");
   const [showVideoModal, setshowVideoModal] = useState<boolean | JSX.Element>(false);

   // fetch video data
   const getVideoData = async () => {
      try {
         const req = await fetch(`https://www.youtube.com/oembed?url=${content.url}&format=json`);
         const res = await req.json();

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
            {showVideoModal && (
               <PrimaryStack
                  title={content.title}
                  content={
                     <VideoModalContent
                        description={content.description}
                        videoHtml={contentData.html}
                     />
                  }
                  cta={{ handleClose: () => setshowVideoModal(false) }}
               />
            )}
         </Portal>
         {loading === "done" && (
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
         {loading === "loading" && (
            <div className={styles.loader}>
               <RoundLoader />
            </div>
         )}
         {loading === "error" && (
            <div className={styles.error}>
               <ResourceNotFoundError />
            </div>
         )}
      </>
   );
};
