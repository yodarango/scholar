/*********************************************************************************************************************** 
 - simple small button that onClick can either show the metadata of the category clicked or it can
   bring the categories menu to select a new category. This is dependable on which "informativeOnly" value is passed on
   to it. 
-  InforamtiveOnly = displays the popup witht the tag metadata
***********************************************************************************************************************/

import { useState } from "react";

// comps
import { Notification } from "../popups/notification";

// styles
import styles from "./category_tag.module.css";

// data
import { categoryMeta, TcategoryMeta } from "../../data/category_meta";

// helpers
import Portal from "../../hoc/potal";
import { SelectCategoryTag } from "../../layouts/menus/select_category_tag";

type TCategoryTagprops = {
   id: string;
   customSize?: boolean;
   customBorderRadius?: string;
   informativeOnly: boolean;
   cta?: {
      handleSelection: (id: string) => void;
   };
};

export const CategoryTag = ({
   id,
   customSize,
   informativeOnly,
   customBorderRadius = ".9em",
   cta
}: TCategoryTagprops) => {
   // state
   const [isPopupOpen, setisPopupOpen] = useState<boolean | JSX.Element>(false);
   const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState<boolean | JSX.Element>(false);

   //  open the category popup
   const handleShowCategoryMeta = () => {
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
         <Portal>
            {isPopupOpen}
            {isCategoryMenuOpen && (
               <SelectCategoryTag
                  cta={{
                     handleCloseModal: () => setIsCategoryMenuOpen(false),
                     handleSelection: (id) => cta?.handleSelection(id)
                  }}
               />
            )}
         </Portal>

         <div
            onClick={
               informativeOnly ? () => handleShowCategoryMeta() : () => setIsCategoryMenuOpen(true)
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
