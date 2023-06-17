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
import { YouNeedToLoginModal } from "../../common/modals/you_need_to_login_modal";

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
         <YouNeedToLoginModal open={openModal} onClose={() => setOpenModal(false)} />
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
