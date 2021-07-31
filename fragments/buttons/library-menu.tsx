// core
import React, { useState } from "react";

//styles
import libraryMenuStyles from "../../styles/buttons/LibraryMenu.module.css";

// helpers
import { valuesCat } from "../../helpers/dropdown-values";

//types
import { IvaluesCat } from "../../helpers/dropdown-values";

type libraryMenuProps = {
   includeSearch?: boolean;
   includeCategory?: boolean;
   includeContent?: boolean;
   contentCta: Function;
};
const libraryMenu = ({
   includeCategory,
   includeContent,
   includeSearch,
   contentCta
}: libraryMenuProps) => {
   // ====================   FUNCTION 1: Open the Content Dorpdown   ================//
   const [openContentDropDState, setOpenContentDropDState] = useState<boolean>(false);
   const handleOpenContent = () => {
      setOpenContentDropDState(true);
   };

   const handleCloseContent = () => {
      setOpenContentDropDState(false);
   };

   // ====================   FUNCTION 2: set current Icon based onCLick  ================//
   const [currentContentIconState, setcurrentContentIconState] = useState<string>("🔥");
   const handleContentItemClick = (value: string) => {
      setcurrentContentIconState(value);
   };
   return (
      <div className={`${libraryMenuStyles.mainWrapper}`}>
         {includeContent && (
            <>
               {!openContentDropDState && (
                  <div
                     className={`${libraryMenuStyles.contentDropDownButton}`}
                     onClick={handleOpenContent}>
                     {currentContentIconState}
                  </div>
               )}
               {openContentDropDState && (
                  <div
                     className={`${libraryMenuStyles.contentDropDownButton}`}
                     onClick={handleCloseContent}>
                     {currentContentIconState}
                  </div>
               )}
               {openContentDropDState && (
                  <section className={`${libraryMenuStyles.contentDropDWrapper}`}>
                     <span
                        className={`${libraryMenuStyles.contentSingleItem}`}
                        onClick={() => {
                           contentCta("popular"), handleContentItemClick("🔥");
                        }}>
                        🔥
                     </span>
                     <span
                        className={`${libraryMenuStyles.contentSingleItem}`}
                        onClick={() => {
                           contentCta("sermons"), handleContentItemClick("🗣️");
                        }}>
                        🗣️
                     </span>
                     <span
                        className={`${libraryMenuStyles.contentSingleItem}`}
                        onClick={() => {
                           contentCta("articles"), handleContentItemClick("📃");
                        }}>
                        📃
                     </span>
                     <span
                        className={`${libraryMenuStyles.contentSingleItem}`}
                        onClick={() => {
                           contentCta("podcast"), handleContentItemClick("🎧");
                        }}>
                        🎧
                     </span>
                     <span
                        className={`${libraryMenuStyles.contentSingleItem}`}
                        onClick={() => {
                           contentCta("youtube"), handleContentItemClick("📺");
                        }}>
                        📺
                     </span>
                     <span
                        className={`${libraryMenuStyles.contentSingleItem}`}
                        onClick={() => {
                           contentCta("blogs"), handleContentItemClick("📑");
                        }}>
                        📑
                     </span>
                     <span
                        className={`${libraryMenuStyles.contentSingleItem}`}
                        onClick={() => {
                           contentCta("congregations"), handleContentItemClick("⛪");
                        }}>
                        ⛪
                     </span>
                     <span
                        className={`${libraryMenuStyles.contentSingleItem}`}
                        onClick={() => {
                           contentCta("congregations"), handleContentItemClick("📚");
                        }}>
                        📚
                     </span>
                  </section>
               )}
            </>
         )}
         {includeSearch && (
            <div className={`${libraryMenuStyles.searchWapper}`}>
               <input
                  type='text'
                  maxLength={50}
                  className={`${libraryMenuStyles.search} std-input`}
                  placeholder='🔎Name or Signature'
               />
            </div>
         )}
         {includeCategory && (
            <>
               <div className={`${libraryMenuStyles.categoryButton}`}>#FR</div>
               <section className={`${libraryMenuStyles.categoryDropDWrapper}`}>
                  {valuesCat.map((value: IvaluesCat) => (
                     <span
                        key={value.key}
                        className={`${libraryMenuStyles.contentSingleItem} ${value.key}`}
                        style={{ backgroundColor: value.color }}>
                        {value.tag}
                     </span>
                  ))}
               </section>
            </>
         )}
      </div>
   );
};

export default libraryMenu;
