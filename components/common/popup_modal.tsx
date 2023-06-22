import React, { Children, useEffect, useRef, useState } from "react";
import PortalSecondary from "../hoc/portal_secondary";
import styles from "./popup_modal.module.css";
import { Header } from "../fragments/Typography/header";
import { Third } from "../fragments/buttons/third";
import { useRouter } from "next/router";

type TPopupModalProps = {
   includeFirstButton?: boolean;
   includeSecondOption?: boolean;
   minHeight?: number;
   maxWidth?: number;
   open: boolean;
   onClose: () => void;
   title: string;
   children?: React.ReactNode | React.ReactNode[] | JSX.Element | JSX.Element[] | string | number;
};
export const PopupModal = ({
   open,
   onClose,
   title,
   children,
   includeFirstButton = true,
   includeSecondOption = true,
   minHeight = 25,
   maxWidth = 50
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
               <div
                  style={{ maxWidth: `${maxWidth}rem`, minHeight: `${minHeight}rem` }}
                  className={styles.mainWrapper}>
                  <div style={{ minHeight: `${minHeight - 0.5}rem` }} className={styles.container}>
                     <Header
                        text={title}
                        type={3}
                        size='main'
                        className={styles.title}
                        align='center'
                     />
                     {children}
                     <div className={styles.buttonWrapper}>
                        {includeFirstButton && (
                           <Third icon='' title='Cancel' type='2' cta={{ handleClick: onClose }} />
                        )}
                        {includeSecondOption && (
                           <Third
                              icon=''
                              title='Login'
                              type='1'
                              cta={{ handleClick: () => router.push("/login") }}
                           />
                        )}
                     </div>
                  </div>
               </div>
               <div className={styles.backDrop} onClick={onClose}></div>
            </>
         )}
      </PortalSecondary>
   );
};
