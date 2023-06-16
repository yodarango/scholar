import Link from "next/link";
import { useState } from "react";
import Portal from "../../hoc/potal";
import { SelectCreateContentType } from "../../layouts/menus/select_create_content_type";

// comps
import { Icon } from "../chunks/icons";

// styles
import styles from "./add_content.module.css";
import { IconButton } from "./icon_button";
import { PopupModal } from "../../common/popup_modal";
import { Parragraph } from "../Typography/parragraph";
import { loggedInUser } from "../../../helpers/auth/get-loggedin-user";

type TAddContentProps = {
   href?: string;
};

export const AddContent = ({ href }: TAddContentProps) => {
   const [showModal, setshowModal] = useState<boolean>(false);
   const [openModal, setOpenModal] = useState(false);

   const handleClick = () => {
      const user = loggedInUser();
      if (!user) setOpenModal(true);
      else setshowModal(true);
   };

   return (
      <div className={styles.mainWrapper}>
         <PopupModal title='You are not login' open={openModal} onClose={() => setOpenModal(false)}>
            <img
               src='/images/bible_books/1.png'
               alt='Shroody, the mascot of the app is letting the user know that is not authenticated.'
               className={styles.image}
            />
            <Parragraph
               size='main'
               text='Please login before you can bookmark a chapter.'
               align='center'
            />
         </PopupModal>
         {showModal && (
            <Portal>
               <SelectCreateContentType cta={{ handleCloseModal: () => setshowModal(false) }} />
            </Portal>
         )}
         {!href && <IconButton backgroundColor='2' icon='add' cta={{ handleClick }} />}
         {href && <IconButton backgroundColor='2' icon='add' link={href} />}
      </div>
   );
};
