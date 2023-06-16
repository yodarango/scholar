import React, { useEffect, useRef, useState } from "react";
import PortalSecondary from "../hoc/portal_secondary";
import styles from "./popup_modal.module.css";
import { Header } from "../fragments/Typography/header";
import { Parragraph } from "../fragments/Typography/parragraph";
import { Third } from "../fragments/buttons/third";
import { useRouter } from "next/router";

type TPopupModalProps = {
   open: boolean;
   onClose: () => void;
   title: string;
   image: string;
   imageAlt: string;
   description?: string;
};
export const PopupModal = ({
   open,
   onClose,
   title,
   image,
   imageAlt,
   description = ""
}: TPopupModalProps) => {
   const router = useRouter();
   const [isOpen, setIsOpen] = useState(open);

   useEffect(() => {
      setIsOpen(open);
   }, [open]);

   return (
      <PortalSecondary>
         {isOpen && (
            <>
               <div className={styles.mainWrapper}>
                  <div className={styles.container}>
                     <Header
                        text={title}
                        type={3}
                        size='main'
                        className={styles.title}
                        align='center'
                     />
                     <img src={image} alt={imageAlt} className={styles.image} />
                     <Parragraph size='main' text={description} align='center' />
                     <div className={styles.buttonWrapper}>
                        <Third icon='' title='Cancel' type='1' cta={{ handleClick: onClose }} />
                        <Third
                           icon=''
                           title='Login'
                           type='2'
                           cta={{ handleClick: () => router.push("/login") }}
                        />
                     </div>
                  </div>
               </div>
               <div className={styles.backDrop} onClick={onClose}></div>
            </>
         )}
      </PortalSecondary>
   );
};
