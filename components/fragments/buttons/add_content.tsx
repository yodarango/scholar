import Link from "next/link";
import { useState } from "react";
import Portal from "../../hoc/potal";
import { SelectCreateContentType } from "../../layouts/menus/select_create_content_type";

// comps
import { Icon } from "../chunks/icons";

// styles
import styles from "./add_content.module.css";
import { IconButton } from "./icon_button";

type TAddContentProps = {
   href?: string;
};

export const AddContent = ({ href }: TAddContentProps) => {
   const [showModal, setshowModal] = useState<boolean>(false);

   return (
      <div className={styles.mainWrapper}>
         {showModal && (
            <Portal>
               <SelectCreateContentType cta={{ handleCloseModal: () => setshowModal(false) }} />
            </Portal>
         )}
         {!href && (
            <IconButton
               backgroundColor='2'
               icon='add'
               cta={{ handleClick: () => setshowModal(true) }}
            />
         )}
         {href && <IconButton backgroundColor='2' icon='add' link={href} />}
      </div>
   );
};
