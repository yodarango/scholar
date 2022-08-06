import { useState } from "react";

// comps
import { Notification } from "../popups/notification";

// styles
import styles from "./category_tag.module.css";

// data
import { categoryMeta, TcategoryMeta } from "../../data/category_meta";

// helpers
import Portal from "../../hoc/potal";

type TCategoryTagprops = {
   id: string;
   customSize?: boolean;
   customBorderRadius?: string;
   cta?: {
      handleShowCategoryMeta: (id: string) => void;
   };
};

export const CategoryTag = ({
   id,
   customSize,
   cta,
   customBorderRadius = ".9em"
}: TCategoryTagprops) => {
   const [isPopupOpen, setisPopupOpen] = useState<boolean | JSX.Element>(false);

   // ---------------- open the category popup -----------------
   const handleOpenNotificationPopup = () => {
      const category = categoryMeta.filter((item: TcategoryMeta) => item.tag === `#${id}`);

      const cardTitle = category[0].title;
      const cardBody = category[0].subjects.toString().split(",").join(", ");
      const cardColor = category[0].color;

      setisPopupOpen(
         <Notification
            title={cardTitle}
            body={cardBody}
            cta={() => setisPopupOpen(false)}
            type='custom'
            customColor={{ light: cardColor, dark: cardColor }}
         />
      );
   };

   return (
      <>
         <Portal>{isPopupOpen}</Portal>

         <div
            onClick={
               cta ? () => cta.handleShowCategoryMeta(id) : () => handleOpenNotificationPopup()
            }
            className={customSize ? styles.mainWrapperCustomSize : styles.mainWrapper}>
            {id === "BLK" && (
               <div
                  className={`${styles.tagWrapper} ${customSize && styles.tagWrapperCustomSize} ${
                     styles.blk
                  }`}
                  style={{ borderRadius: customBorderRadius }}>
                  <span className={`${styles.tag}`}></span>
               </div>
            )}
            {id === "BL" && (
               <div
                  className={`${styles.tagWrapper} ${customSize && styles.tagWrapperCustomSize} ${
                     styles.bl
                  }`}
                  style={{ borderRadius: customBorderRadius }}>
                  <span className={`${styles.tag}`}></span>
               </div>
            )}
            {id === "BR" && (
               <div
                  className={`${styles.tagWrapper} ${customSize && styles.tagWrapperCustomSize} ${
                     styles.br
                  }`}
                  style={{ borderRadius: customBorderRadius }}>
                  <span className={`${styles.tag}`}></span>
               </div>
            )}
            {id === "CYN" && (
               <div
                  className={`${styles.tagWrapper} ${customSize && styles.tagWrapperCustomSize} ${
                     styles.cyn
                  }`}
                  style={{ borderRadius: customBorderRadius }}>
                  <span className={`${styles.tag}`}></span>
               </div>
            )}
            {id === "GRN" && (
               <div
                  className={`${styles.tagWrapper} ${customSize && styles.tagWrapperCustomSize} ${
                     styles.grn
                  }`}
                  style={{ borderRadius: customBorderRadius }}>
                  <span className={`${styles.tag}`}></span>
               </div>
            )}
            {id === "OR" && (
               <div
                  className={`${styles.tagWrapper} ${customSize && styles.tagWrapperCustomSize} ${
                     styles.or
                  }`}
                  style={{ borderRadius: customBorderRadius }}>
                  <span className={`${styles.tag}`}></span>
               </div>
            )}
            {id === "PNK" && (
               <div
                  className={`${styles.tagWrapper} ${customSize && styles.tagWrapperCustomSize} ${
                     styles.pnk
                  }`}
                  style={{ borderRadius: customBorderRadius }}>
                  <span className={`${styles.tag}`}></span>
               </div>
            )}
            {id === "PPL" && (
               <div
                  className={`${styles.tagWrapper} ${customSize && styles.tagWrapperCustomSize} ${
                     styles.ppl
                  }`}
                  style={{ borderRadius: customBorderRadius }}>
                  <span className={`${styles.tag}`}></span>
               </div>
            )}
            {id === "RD" && (
               <div
                  className={`${styles.tagWrapper} ${customSize && styles.tagWrapperCustomSize} ${
                     styles.rd
                  }`}
                  style={{ borderRadius: customBorderRadius }}>
                  <span className={`${styles.tag}`}></span>
               </div>
            )}
            {id === "YLW" && (
               <div
                  className={`${styles.tagWrapper} ${customSize && styles.tagWrapperCustomSize} ${
                     styles.ylw
                  }`}
                  style={{ borderRadius: customBorderRadius }}>
                  <span className={`${styles.tag}`}></span>
               </div>
            )}
         </div>
      </>
   );
};
