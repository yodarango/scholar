// core
import React, { useState } from "react";
import Link from "next/link";

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
   contentButtonIcon: string;
};
const libraryMenu = ({
   includeCategory,
   includeContent,
   includeSearch,
   contentButtonIcon
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
   const [currentContentIconState, setcurrentContentIconState] =
      useState<string>(contentButtonIcon);
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
                     <Link href={"/library"}>
                        <a className={`${libraryMenuStyles.contentSingleItem}`}>🔥</a>
                     </Link>
                     <Link href={"/library/sermon-notes"}>
                        <a className={`${libraryMenuStyles.contentSingleItem}`}>🗣️</a>
                     </Link>
                     <Link href='/library/articles'>
                        <a className={`${libraryMenuStyles.contentSingleItem}`}>📃</a>
                     </Link>
                     <Link href={"/library/podcast"}>
                        <a className={`${libraryMenuStyles.contentSingleItem}`}>🎧</a>
                     </Link>
                     <Link href={"/library/youtube"}>
                        <a className={`${libraryMenuStyles.contentSingleItem}`}>📺</a>
                     </Link>
                     <Link href={"/library/blogs"}>
                        <a className={`${libraryMenuStyles.contentSingleItem}`}>📑</a>
                     </Link>
                     <Link href={"/library/churches"}>
                        <a className={`${libraryMenuStyles.contentSingleItem}`}>⛪</a>
                     </Link>
                     <Link href={"/library/books"}>
                        <a className={`${libraryMenuStyles.contentSingleItem}`}>📚</a>
                     </Link>
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
