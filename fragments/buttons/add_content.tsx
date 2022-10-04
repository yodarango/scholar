import Link from "next/link";
import { useState } from "react";
import Portal from "../../hoc/potal";
import { SelectCreateContentType } from "../../layouts/menus/select_create_content_type";

// comps
import { Icon } from "../chunks/icons";

// styles
import styles from "./add_content.module.css";

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
            <button className={styles.button} onClick={() => setshowModal(true)}>
               <Icon name='add' color='#F1EAFF' size='2rem' strokeWidth='64' />
            </button>
         )}
         {href && (
            <Link href={href}>
               <a className={styles.button}>
                  <Icon name='add' color='#F1EAFF' size='2rem' strokeWidth='64' />
               </a>
            </Link>
         )}
      </div>
   );
};
