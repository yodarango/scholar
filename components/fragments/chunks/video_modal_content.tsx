// components
import { Parragraph } from "../Typography/parragraph";
// import { ResourceNotFound } from "./error_resource_not_found";
// import { RoundLoader } from "./round_loader";

//styles
import styles from "./video_modal_content.module.css";

type TVideoModalContentProps = {
   // loading: string;
   description: string;
   videoHtml: string;
};
export const VideoModalContent = ({ description, videoHtml }: TVideoModalContentProps) => {
   return (
      <div className={styles.mainWrapper}>
         <div className={styles.description}>
            <Parragraph text={description} size='main' />
         </div>
         <div dangerouslySetInnerHTML={{ __html: `${videoHtml}` }} className={styles.iframe}></div>
      </div>
   );

   {
      /* since fetchng the data in the parent this is not needed */
   }
   {
      /* {loading === "loading" && (
            <div className={styles.loader}>
               <RoundLoader />
            </div>
         )}
         {loading == "error" && (
            <div className={styles.error}>
               <ResourceNotFound />
            </div>
         )} */
   }
};
