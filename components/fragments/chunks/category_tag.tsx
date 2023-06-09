/*********************************************************************************************************************** 
 - simple small button that onClick can either show the metadata of the category clicked or it can
   bring the categories menu to select a new category. This is dependable on which "informativeOnly" value is passed on
   to it. 
-  InformativeOnly = displays the popup with the tag metadata
-  initialValue is basically the same as id. The reason why this is being passed is because the onClick function depends
   on the id being or not being present. This needs to be investigated further and get rid of one of these redundant 
   props
***********************************************************************************************************************/

import { useState, useEffect } from "react";

// comps
import { Notification } from "../popups/notification";
import { SelectCategoryTag } from "../../layouts/menus/select_category_tag";

// styles
import styles from "./category_tag.module.css";

// data
import { categoryMeta, TcategoryMeta } from "../../../data/category_meta";

// helpers
import Portal from "../../hoc/potal";

type TCategoryTagprops = {
   id?: string;
   initiaValue?: string;
   customSize?: boolean;
   customBorderRadius?: string;
   informativeOnly: boolean;
   cta?: {
      handleSelection: (id: string) => void;
   };
};

export const CategoryTag = ({
   id,
   initiaValue,
   customSize,
   informativeOnly,
   customBorderRadius = ".9em",
   cta
}: TCategoryTagprops) => {
   // state
   const [isPopupOpen, setisPopupOpen] = useState<boolean | JSX.Element>(false);
   const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState<boolean | JSX.Element>(false);
   const [currentCategory, setcurrentCategory] = useState<string | undefined>(undefined);

   //  open the category popup
   const handleShowCategoryMeta = () => {
      const category = categoryMeta.filter((item: TcategoryMeta) => item.tag === `#${id}`);

      const cardTitle = category[0]?.title;
      const cardBody = category[0]?.subjects.toString().split(",").join(", ");
      const cardColor = category[0]?.color;
      const textColor = category[0]?.textColor;

      setisPopupOpen(
         <Notification
            title={cardTitle}
            body={cardBody}
            cta={{ handleClose: () => setisPopupOpen(false) }}
            type='custom'
            textColor={textColor}
            customColor={{ light: cardColor, dark: cardColor }}
         />
      );
   };

   // update category state and initiate callback to send selection date to the parent
   const handleSelection = (id: string) => {
      setIsCategoryMenuOpen(false);
      id === "*" ? setcurrentCategory(undefined) : setcurrentCategory(id);
      cta?.handleSelection(id);
   };

   useEffect(() => {
      setcurrentCategory(id ? id : initiaValue);
   }, [id]);

   return (
      <>
         <Portal>
            {isPopupOpen}
            {isCategoryMenuOpen && (
               <SelectCategoryTag
                  cta={{
                     handleCloseModal: () => setIsCategoryMenuOpen(false),
                     handleSelection
                  }}
               />
            )}
         </Portal>
         <div
            onClick={
               informativeOnly ? () => handleShowCategoryMeta() : () => setIsCategoryMenuOpen(true)
            }
            className={customSize ? styles.mainWrapperCustomSize : styles.mainWrapper}>
            {!currentCategory && (
               <div
                  className={`${styles.tagWrapper} ${customSize && styles.tagWrapperCustomSize} ${
                     styles.none
                  }`}
                  style={{ borderRadius: customBorderRadius }}>
                  <span className={`${styles.tag}`}></span>
               </div>
            )}

            {currentCategory === "BLK" && (
               <div
                  className={`${styles.tagWrapper} ${customSize && styles.tagWrapperCustomSize} ${
                     styles.blk
                  }`}
                  style={{ borderRadius: customBorderRadius }}>
                  <span className={`${styles.tag}`}></span>
               </div>
            )}
            {currentCategory === "BL" && (
               <div
                  className={`${styles.tagWrapper} ${customSize && styles.tagWrapperCustomSize} ${
                     styles.bl
                  }`}
                  style={{ borderRadius: customBorderRadius }}>
                  <span className={`${styles.tag}`}></span>
               </div>
            )}
            {currentCategory === "BR" && (
               <div
                  className={`${styles.tagWrapper} ${customSize && styles.tagWrapperCustomSize} ${
                     styles.br
                  }`}
                  style={{ borderRadius: customBorderRadius }}>
                  <span className={`${styles.tag}`}></span>
               </div>
            )}
            {currentCategory === "CYN" && (
               <div
                  className={`${styles.tagWrapper} ${customSize && styles.tagWrapperCustomSize} ${
                     styles.cyn
                  }`}
                  style={{ borderRadius: customBorderRadius }}>
                  <span className={`${styles.tag}`}></span>
               </div>
            )}
            {currentCategory === "GRN" && (
               <div
                  className={`${styles.tagWrapper} ${customSize && styles.tagWrapperCustomSize} ${
                     styles.grn
                  }`}
                  style={{ borderRadius: customBorderRadius }}>
                  <span className={`${styles.tag}`}></span>
               </div>
            )}
            {currentCategory === "OR" && (
               <div
                  className={`${styles.tagWrapper} ${customSize && styles.tagWrapperCustomSize} ${
                     styles.or
                  }`}
                  style={{ borderRadius: customBorderRadius }}>
                  <span className={`${styles.tag}`}></span>
               </div>
            )}
            {currentCategory === "PNK" && (
               <div
                  className={`${styles.tagWrapper} ${customSize && styles.tagWrapperCustomSize} ${
                     styles.pnk
                  }`}
                  style={{ borderRadius: customBorderRadius }}>
                  <span className={`${styles.tag}`}></span>
               </div>
            )}
            {currentCategory === "PPL" && (
               <div
                  className={`${styles.tagWrapper} ${customSize && styles.tagWrapperCustomSize} ${
                     styles.ppl
                  }`}
                  style={{ borderRadius: customBorderRadius }}>
                  <span className={`${styles.tag}`}></span>
               </div>
            )}
            {currentCategory === "RD" && (
               <div
                  className={`${styles.tagWrapper} ${customSize && styles.tagWrapperCustomSize} ${
                     styles.rd
                  }`}
                  style={{ borderRadius: customBorderRadius }}>
                  <span className={`${styles.tag}`}></span>
               </div>
            )}
            {currentCategory === "YLW" && (
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
