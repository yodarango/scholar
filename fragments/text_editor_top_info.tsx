import { useState } from "react";

// components
import { CloseContent } from "./buttons/close_content";
import { IconButton } from "./buttons/icon_button";
import { SeePostInfo } from "./chunks/see_post_info";

// syles
import styles from "./text_editor_top_info.module.css";

export type TTextEditorTopInfoProps = {
   bkgImg?: string;
   cta: {
      handleCloseModal: () => void;
   };
};
export const TextEditorTopInfo = ({ cta, bkgImg = "" }: TTextEditorTopInfoProps) => {
   const [showUnsplahPicker, setshowUnsplahPicker] = useState<boolean>(false);
   return (
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
            <div className={styles.close}>
               <CloseContent cta={{ handleClick: cta.handleCloseModal }} />
            </div>
            <div className={styles.close}>
               <IconButton icon='edit' cta={} />
            </div>
         </div>
      </div>
   );
};
