// core
import React, { useState } from "react";
import Link from "next/link";

//styles
import libraryMenuStyles from "../../styles/buttons/LibraryMenu.module.css";

// helpers
import { valuesCat } from "../../helpers/dropdown-values";

//types
import { IvaluesCat } from "../../helpers/dropdown-values";

type currentPageNewClass = {
   popular?: string;
   sermons?: string;
   articles?: string;
   podcasts?: string;
   youtubeChannel?: string;
   blogs?: string;
   books?: string;
   congregations?: string;
};

type libraryMenuProps = {
   includeSearch?: boolean;
   includeCategory?: boolean;
   includeContent?: boolean;
   contentButtonIcon: string;
   currentSlectedContentPage: currentPageNewClass;
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

   // ====================   FUNCTION 2: Open the Category DropDown    ===============//
   const [openCatDropdownState, setopenCatDropdownState] = useState<boolean>(false);
   const handleOpenCategoryDropDown = () => {
      setopenCatDropdownState(true);
   };

   const handleCloseCategoryDropDown = () => {
      setopenCatDropdownState(false);
   };

   // ====================   FUNCTION 2: Fetch Data and change the Category Choice button value  ===============//
   const [currentCategorySelectedState, setCurrentCategorySelectedState] = useState<{
      color: string;
      tag: string;
   }>({ color: "", tag: "#ALL" });
   const handleCategoryChoice = (color: string, tag: string) => {
      setCurrentCategorySelectedState({ color, tag });
      setopenCatDropdownState(false);
   };
   return (
      <>
         <div className={`${libraryMenuStyles.mainWrapperDesktop}`}>
            <div className={`${libraryMenuStyles.linksWrapperDesktop}`}>
               <Link href={"/library"}>
                  <a
                     style={{ color: currentSlectedContentPage.popular }}
                     className={`${libraryMenuStyles.contentSingleItemDesktop}`}>
                     🔥 Popular
                  </a>
               </Link>
               <Link href={"/library/sermon-notes"}>
                  <a
                     style={{ color: currentSlectedContentPage.sermons }}
                     className={`${libraryMenuStyles.contentSingleItemDesktop}`}>
                     🗣️ Sermons
                  </a>
               </Link>
               <Link href='/library/articles'>
                  <a
                     style={{ color: currentSlectedContentPage.articles }}
                     className={`${libraryMenuStyles.contentSingleItemDesktop}`}>
                     📃 Articles
                  </a>
               </Link>
               <Link href={"/library/podcast"}>
                  <a
                     style={{ color: currentSlectedContentPage.podcasts }}
                     className={`${libraryMenuStyles.contentSingleItemDesktop}`}>
                     🎧 Podcasts
                  </a>
               </Link>
               <Link href={"/library/youtube"}>
                  <a
                     style={{ color: currentSlectedContentPage.youtubeChannel }}
                     className={`${libraryMenuStyles.contentSingleItemDesktop}`}>
                     📺 Youtube Channels
                  </a>
               </Link>
               <Link href={"/library/blogs"}>
                  <a
                     style={{ color: currentSlectedContentPage.blogs }}
                     className={`${libraryMenuStyles.contentSingleItemDesktop}`}>
                     📑 Blogs
                  </a>
               </Link>
               <Link href={"/library/books"}>
                  <a
                     style={{ color: currentSlectedContentPage.books }}
                     className={`${libraryMenuStyles.contentSingleItemDesktop}`}>
                     📚 Books
                  </a>
               </Link>
               <Link href={"/library/congregations"}>
                  <a
                     style={{ color: currentSlectedContentPage.congregations }}
                     className={`${libraryMenuStyles.contentSingleItemDesktop}`}>
                     ⛪ Congregations
                  </a>
               </Link>
            </div>
            {includeCategory && (
               <>
                  {!openCatDropdownState && (
                     <div
                        style={{ backgroundColor: currentCategorySelectedState.color }}
                        className={`${libraryMenuStyles.categoryButtonDesktop}`}
                        onClick={handleOpenCategoryDropDown}>
                        {currentCategorySelectedState.tag}
                     </div>
                  )}
                  {openCatDropdownState && (
                     <div
                        style={{ backgroundColor: currentCategorySelectedState.color }}
                        className={`${libraryMenuStyles.categoryButtonDesktop}`}
                        onClick={handleCloseCategoryDropDown}>
                        {currentCategorySelectedState.tag}
                     </div>
                  )}
                  {openCatDropdownState && (
                     <section className={`${libraryMenuStyles.categoryDropDWrapperDesktop}`}>
                        {valuesCat.map((value: IvaluesCat) => (
                           <span
                              key={value.key}
                              className={`${libraryMenuStyles.contentSingleItem}`}
                              style={{ backgroundColor: value.color }}
                              onClick={() => handleCategoryChoice(value.color, value.tag)}>
                              {value.tag}
                           </span>
                        ))}
                     </section>
                  )}
               </>
            )}
         </div>

         {/* ======================== MOBILE MENU  ============= */}
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
                        <Link href={"/library/books"}>
                           <a className={`${libraryMenuStyles.contentSingleItem}`}>📚</a>
                        </Link>
                        <Link href={"/library/congregations"}>
                           <a className={`${libraryMenuStyles.contentSingleItem}`}>⛪</a>
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
                  {!openCatDropdownState && (
                     <div
                        style={{ backgroundColor: currentCategorySelectedState.color }}
                        className={`${libraryMenuStyles.categoryButton}`}
                        onClick={handleOpenCategoryDropDown}>
                        {currentCategorySelectedState.tag}
                     </div>
                  )}
                  {openCatDropdownState && (
                     <div
                        style={{ backgroundColor: currentCategorySelectedState.color }}
                        className={`${libraryMenuStyles.categoryButton}`}
                        onClick={handleCloseCategoryDropDown}>
                        {currentCategorySelectedState.tag}
                     </div>
                  )}
                  {openCatDropdownState && (
                     <section className={`${libraryMenuStyles.categoryDropDWrapper}`}>
                        {valuesCat.map((value: IvaluesCat) => (
                           <span
                              key={value.key}
                              className={`${libraryMenuStyles.contentSingleItem}`}
                              style={{ backgroundColor: value.color }}
                              onClick={() => handleCategoryChoice(value.color, value.tag)}>
                              {value.tag}
                           </span>
                        ))}
                     </section>
                  )}
               </>
            )}
         </div>
      </>
   );
};

export default libraryMenu;
