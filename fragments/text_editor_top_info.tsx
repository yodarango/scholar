import { useState } from "react";
import Portal from "../hoc/potal";
import { UnsplasImgPicker } from "../layouts/scrollers/unsplash_img_picker";

// components
import { CloseContent } from "./buttons/close_content";
import { IconButton } from "./buttons/icon_button";
import { SeePostInfo } from "./chunks/see_post_info";

// syles
import styles from "./text_editor_top_info.module.css";

export type TTextEditorTopInfoProps = {
   userAuthority: number;
   userId: string;
   username: string;
   avatar: string;
   postPostedOnDate: string;
   postCreatedDate: string;
   postCategory: string;
   postImgBkg?: string;
   cta: {
      handleCloseModal: () => void;
      handleImageBkgSelection: (url: string) => void;
   };
};
export const TextEditorTopInfo = ({ cta, postImgBkg = "" }: TTextEditorTopInfoProps) => {
   const [showUnsplahPicker, setshowUnsplahPicker] = useState<boolean>(false);
   const [imgBkg, setImgBkg] = useState(postImgBkg);

   // update state and send callback to parent with the chosen url
   const handleImgSelection = (url: string) => {
      cta.handleImageBkgSelection(url);
      setImgBkg(url);
   };
   return (
      <>
         <Portal>
            {showUnsplahPicker && (
               <div className={styles.unsplashPicker}>
                  <UnsplasImgPicker
                     cta={{
                        handleImgSelection,
                        handleCloseModal: () => setshowUnsplahPicker(false)
                     }}
                  />
               </div>
            )}
         </Portal>
         <div className={styles.mainWrapper}>
            <div className={styles.imgBkg} style={{ backgroundImage: `url(${imgBkg})` }}>
               <div className={styles.seePostInfo}>
                  <SeePostInfo
                     userAuthority={1}
                     userId='1'
                     username='username'
                     avatar='/images/user_avatars/default.png'
                     postPostedOnDate='07/08/2022 11:00'
                     postCreatedDate='07/08/2022 11:00'
                     postCategory='PNK'
                  />
               </div>
               <div className={styles.closeEditButtons}>
                  <div className={styles.close}>
                     <CloseContent cta={{ handleClick: cta.handleCloseModal }} />
                  </div>
                  <div className={styles.edit}>
                     <IconButton
                        icon='edit'
                        cta={{ handleClick: () => setshowUnsplahPicker(true) }}
                        backgroundColor='1'
                        iconColor='#F1EAFF'
                     />
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};
