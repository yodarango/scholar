import { FONT_COLOR, PRIMARY_COLOR } from "../../../../constants/tokens";
import { GRADIENT_1__DARK, GRADIENT_1__LIGHT } from "../../../../constants/tokens";
import { ScrollableHeader } from "../../../common/scrollable_header";
import { CloseContent } from "../../../fragments/buttons/close_content";
import { IconButton } from "../../../fragments/buttons/icon_button";
import { Header } from "../../../fragments/Typography/header";
import { Parragraph } from "../../../fragments/Typography/parragraph";
import styles from "./header_with_img_bkg.module.css";
import React, { useState } from "react";

type THeaderWithImgBkgProps = {
   withOptions?: boolean;
   title: string | JSX.Element | JSX.Element[] | React.ReactNode;
   image?: string;
   icon?: string;
   closeHref?: string;
   options?: JSX.Element | JSX.Element[] | React.ReactNode;
   description?: string;
   children: JSX.Element | JSX.Element[];
   cta?: {
      handleClose?: () => void;
      handleOpenOptions?: () => void;
   };
};

export const HeaderWithImgBkg = ({
   withOptions = true,
   options,
   closeHref,
   cta,
   description,
   image,
   title,
   children,
   icon
}: THeaderWithImgBkgProps) => {
   const [headerIsVisible, setHeaderIsVisible] = useState<boolean>();

   const imageStyles = image
      ? { backgroundImage: `url(${image})`, opacity: 0.5 }
      : { backgroundImage: `linear-gradient(-10deg, ${GRADIENT_1__LIGHT}, ${GRADIENT_1__DARK})` };
   return (
      <div className={styles.mainWrapper}>
         {/* header */}
         <ScrollableHeader height={400} cta={{ handleChangeDir: (dir) => setHeaderIsVisible(dir) }}>
            <div className={styles.imgBkgWrapper}>
               <div className={styles.imgBkg} style={imageStyles}></div>

               <div className={styles.headerInfo}>
                  {/*  post info */}
                  <div className={styles.headerText}>
                     <div className={styles.title}>{title}</div>
                  </div>
                  {withOptions && (
                     <div className={styles.options}>
                        <div className={styles.menu}>
                           <IconButton
                              shadowColor={GRADIENT_1__DARK}
                              backgroundColor='1'
                              icon='menu'
                              cta={{
                                 handleClick: cta?.handleOpenOptions
                                    ? cta.handleOpenOptions
                                    : () => {}
                              }}
                           />
                        </div>
                        {options}
                     </div>
                  )}
               </div>
            </div>
            <div className={styles.bottomTrim}></div>
         </ScrollableHeader>

         {/* sub wrapper where content is held */}
         <div className={`${styles.subWrapper} ${!headerIsVisible ? styles.moveUp : ""}`}>
            {children}
         </div>
      </div>
   );
};
