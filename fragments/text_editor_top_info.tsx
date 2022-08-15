import { useState } from "react";
import Portal from "../hoc/potal";

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
   bkgImg?: string;
   cta: {
      handleCloseModal: () => void;
   };
};
export const TextEditorTopInfo = ({ cta, bkgImg = "" }: TTextEditorTopInfoProps) => {
   const [showUnsplahPicker, setshowUnsplahPicker] = useState<boolean>(false);

   return (
      <>
         <Portal></Portal>
         <div className={styles.mainWrapper}>
            <div className={styles.imgBkg} style={{ backgroundImage: `url(${bkgImg})` }}>
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
