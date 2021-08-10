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
   currentSlectedContentPage: string;
};
const libraryMenu = ({
   includeCategory,
   includeContent,
   includeSearch,
   contentButtonIcon,
   currentSlectedContentPage
}: libraryMenuProps) => {
   // ====================   FUNCTION 1: Open the Content Dorpdown   ================//
   const [openContentDropDState, setOpenContentDropDState] = useState<boolean>(false);
   const handleOpenContent = () => {
      setOpenContentDropDState(true);
   };

   const handleCloseContent = () => {
      setOpenContentDropDState(false);
   };

   return (
      <>
         <div className={`${libraryMenuStyles.mainWrapperDesktop}`}>
            <div className={`${libraryMenuStyles.linksWrapperDesktop}`}>
               <Link href={"/library"}>
                  <a
                     className={`${libraryMenuStyles.contentSingleItemDesktop} ${currentSlectedContentPage}`}>
                     🔥 Popular
                  </a>
               </Link>
               <Link href={"/library/sermon-notes"}>
                  <a className={`${libraryMenuStyles.contentSingleItemDesktop}`}>🗣️ Sermons</a>
               </Link>
               <Link href='/library/articles'>
                  <a className={`${libraryMenuStyles.contentSingleItemDesktop}`}>📃 Articles</a>
               </Link>
               <Link href={"/library/podcast"}>
                  <a className={`${libraryMenuStyles.contentSingleItemDesktop}`}>🎧 Podcasts</a>
               </Link>
               <Link href={"/library/youtube"}>
                  <a className={`${libraryMenuStyles.contentSingleItemDesktop}`}>
                     📺 Youtube Channels
                  </a>
               </Link>
               <Link href={"/library/blogs"}>
                  <a className={`${libraryMenuStyles.contentSingleItemDesktop}`}>📑 Blogs</a>
               </Link>
               <Link href={"/library/churches"}>
                  <a className={`${libraryMenuStyles.contentSingleItemDesktop}`}>
                     ⛪ Congregations
                  </a>
               </Link>
               <Link href={"/library/books"}>
                  <a className={`${libraryMenuStyles.contentSingleItemDesktop}`}>📚 Books</a>
               </Link>
            </div>
         </div>
         <div className={`${libraryMenuStyles.mainWrapper}`}>
            {includeContent && (
               <>
                  {!openContentDropDState && (
                     <div
                        className={`${libraryMenuStyles.contentDropDownButton}`}
                        onClick={handleOpenContent}>
                        {contentButtonIcon}
                     </div>
                  )}
                  {openContentDropDState && (
                     <div
                        className={`${libraryMenuStyles.contentDropDownButton}`}
                        onClick={handleCloseContent}>
                        {contentButtonIcon}
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
      </>
   );
};

export default libraryMenu;
