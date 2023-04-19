import { FONT_COLOR } from "../../../../constants/tokens";
import { GRADIENT_1__DARK, GRADIENT_1__LIGHT } from "../../../../constants/tokens";
import { CloseContent } from "../../../fragments/buttons/close_content";
import { IconButton } from "../../../fragments/buttons/icon_button";
import { Header } from "../../../fragments/Typography/header";
import styles from "./header_with_img_bkg.module.css";
import React from "react";

type THeaderWithImgBkgProps = {
   withOptions?: boolean;
   title: string;
   image?: string;
   icon?: string;
   closeHref?: string;
   children: JSX.Element | JSX.Element[];
   cta?: {
      handleClose?: () => void;
   };
};

export const HeaderWithImgBkg = ({
   withOptions = true,
   closeHref,
   cta,
   image,
   title,
   children,
   icon
}: THeaderWithImgBkgProps) => {
   return (
      <div className={styles.mainWrapper}>
         {/* header */}
         <div
            className={styles.imgBkg}
            style={{
               backgroundImage: image
                  ? `url(${image})`
                  : `linear-gradient(-10deg, ${GRADIENT_1__LIGHT}, ${GRADIENT_1__DARK})`
            }}>
            <div className={styles.close}>
               {cta?.handleClose && !closeHref && (
                  <CloseContent cta={{ handleClick: cta.handleClose }} />
               )}
               {closeHref && !cta?.handleClose && <CloseContent href={closeHref} />}
            </div>

            {withOptions && (
               <div className={styles.menu}>
                  <IconButton
                     shadowColor={GRADIENT_1__DARK}
                     icon='menu'
                     cta={{ handleClick: () => {} }}
                  />
               </div>
            )}

            {/*  post info */}
            <div className={styles.info}>
               <Header text={""} type={2} size='main' />
            </div>
         </div>

         {/* sub wrapper where content is held */}
         <div className={styles.subWrapper}>{children}</div>
      </div>
   );
};
