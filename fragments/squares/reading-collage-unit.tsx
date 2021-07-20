// core
import React, { useEffect, useState } from "react";

// components
import PopupWrapper from "../../layouts/popup-wrapper";
import GetNewBook from "../get-new-scriptures/get-new-book";
import GetNewChapter from "../get-new-scriptures/get-new-chapter";
import Chapter from "../../helpers/fetch-bible-chapter";
import GeneralDropdown from "../buttons/general-dropdown";

// styles
import readingCollageUnitStyles from "../../styles/fragments/squares/readingCollageUnit.module.css";
import GeneralDropdownStyles from "../../styles/buttons/GeneralDropDown.module.css";

// others
import { dropdownOptions as engilshVersions } from "../../helpers/english-bible-versions";
import { dropdownOptions as spanishVersions } from "../../helpers/spanish-bible-versoins";

const ReadingCollageUnit = () => {
   // ==================   1 FUNCTION: set the desire language    =========================
   type IlangListDropdown = {
      dropdown: JSX.Element | boolean;
      openCta: boolean;
   };
   const [langListDropdown, setLangListDropdown] = useState<IlangListDropdown>({
      dropdown: false,
      openCta: false
   });
   const [currLangIcon, setCurrLangIcon] = useState<string>("🇺🇸");
   const selectLanguage = (e: any) => {
      const newIcon = e.target.textContent;
      setCurrLangIcon(newIcon);
      setLangListDropdown({
         dropdown: false,
         openCta: false
      });
   };
   const openLangOption = () => {
      const supportedLanguages: JSX.Element[] = [
         <span data-language='english'>🇺🇸</span>,
         <span data-language='greek'>🇬🇷</span>,
         <span data-language='spanish'>🇲🇽</span>,
         <span data-language='german'>🇩🇪</span>,
         <span data-language='poland'>🇵🇱</span>,
         <span data-language='czech'>🇨🇿</span>,
         <span data-language='italian'>🇮🇹</span>,
         <span data-language='dutch'>🇳🇱</span>,
         <span data-language='urdu'>🇵🇰</span>,
         <span data-language='thai'>🇹🇭</span>
      ];
      setLangListDropdown({
         dropdown: (
            <GeneralDropdown
               dropdownOptions={supportedLanguages}
               mainNewClass={readingCollageUnitStyles.laguageDropdown}
               optionNewClass={readingCollageUnitStyles.languageDropdownOption}
               cta={selectLanguage}
            />
         ),
         openCta: true
      });
   };
   const closeLangOption = () => {
      setLangListDropdown({
         dropdown: false,
         openCta: false
      });
   };

   // ============================  2 FUNCTION: open popup to choose version or chapter   =============================
   const [openVersionState, setOpenVersionState] = useState<JSX.Element | boolean>(false);
   type IOpenVersionState = {
      id: string;
      initials: string;
   };
   // this is the state for the version on initial load which can be updated- Eventually I would like  to pass this value from the db for each user
   const [currVersionState, setCurrVersionState] = useState<IOpenVersionState>({
      id: "de4e12af7f28f599-02",
      initials: "KJV"
   });

   // 1. on "Version" button click call th elist of all available options availabe from the "dropdownOptions" file on the Popup Component
   const openVerChapPopup = (e: any) => {
      console.log(currLangIcon);
      setOpenVersionState(
         <PopupWrapper
            closeModal={() => setOpenVersionState(false)}
            content={
               <div className={GeneralDropdownStyles.mainWrapper}>
                  {dropdownOptions &&
                     dropdownOptions.map((option) => (
                        /* as='read'*/
                        <div
                           key={option.id}
                           // pass the acronym and the bible version id
                           onClick={() =>
                              selectVersion({ id: option.id, initials: option.abbreviation })
                           }
                           className={`std-text-block--widget ${readingCollageUnitStyles.optionUnit}`}>
                           {option.name}
                        </div>
                     ))}
               </div>
            }
         />
      );
   };

   //  2. handle the click on the specified version by changing the state above by passing the bible version id and the acronym of the bible version
   const selectVersion = (version: IOpenVersionState) => {
      setCurrVersionState({ id: version.id, initials: version.initials });
      setOpenVersionState(false);

      setCurrentChapter({
         currChapterLoaded: (
            <Chapter chapterId={currentChapter.currentChapterId} versionId={currVersionState.id} />
         ),
         currentReferenceSelected: currentChapter.currentReferenceSelected,
         currentChapterId: currentChapter.currentChapterId
      });
   };

   // ============================  3 FUNCTION: open popup to choose a newChapter   =============================
   //// this is the book popup state
   const [openBookState, setOpenBookState] = useState<JSX.Element | boolean>(false);
   //// this is the chapter popup state
   const [openChapterState, setOpenChapterState] = useState<JSX.Element | boolean>(false);
   // this is the state for the chapter on initial load which can be updated by clicking in the "chapter" button
   type IcurrentChapter = {
      currChapterLoaded: JSX.Element | boolean;
      currentReferenceSelected: string | boolean;
      currentChapterId: string | boolean;
   };
   const [currentChapter, setCurrentChapter] = useState<IcurrentChapter>({
      currChapterLoaded: <Chapter versionId={`de4e12af7f28f599-02`} chapterId='JHN.3' />,
      currentReferenceSelected: "John 3",
      currentChapterId: "JHN.3"
   });

   // 1. Initial popoup which will call the "GetNewChapter" component with the current Version id in the state
   const openChapterPopup = () => {
      //// 1.1 Clear out previous state
      setCurrentChapter({
         currChapterLoaded: false,
         currentReferenceSelected: false,
         currentChapterId: false
      });

      //// 1.2 set the new state
      setOpenBookState(
         <GetNewBook
            openGetNewChapterFunc={openGetNewChapterFunc}
            closeModal={() => setOpenBookState(false)}
            versionId={currVersionState.id}
         />
      );
   };
   // 2. This is the chapter list popup called by the openChapterPopup and will call the "GetNewVerse" component
   const openGetNewChapterFunc = (bookId: string) => {
      setOpenChapterState(
         <GetNewChapter
            goBackModal={() => setOpenChapterState(false)}
            openGetNewVerse={showSelectedBook}
            closeModal={() => {
               setOpenBookState(false), setOpenChapterState(false);
            }}
            bookId={bookId}
            versionId={currVersionState.id}
         />
      );
   };

   // 3. This will be in charge of renering the new selected verse to the screen which will be calle by the "openGetNewChapterFunc" above
   const showSelectedBook = (chapData: any) => {
      setCurrentChapter({
         currChapterLoaded: <Chapter chapterId={chapData.id} versionId={currVersionState.id} />,
         currentReferenceSelected: chapData.reference,
         currentChapterId: chapData.chapterId
      });
      console.log("this is the chapData " + chapData);
      setOpenVersionState(false);
      setOpenBookState(false);
      setOpenChapterState(false);
   };
   return (
      <>
         {openVersionState}
         {openBookState}
         {openChapterState}
         <div className={readingCollageUnitStyles.mainWrapper}>
            <div className={readingCollageUnitStyles.header}>
               {langListDropdown.openCta === false && (
                  <div className={readingCollageUnitStyles.langugageButtonWrapper}>
                     <div
                        className={readingCollageUnitStyles.langugageButton}
                        onClick={openLangOption}>
                        {currLangIcon}
                     </div>
                     {langListDropdown.dropdown}
                  </div>
               )}
               {langListDropdown.openCta === true && (
                  <div className={readingCollageUnitStyles.langugageButtonWrapper}>
                     <div
                        className={readingCollageUnitStyles.langugageButton}
                        onClick={closeLangOption}>
                        {currLangIcon}
                     </div>
                     {langListDropdown.dropdown}
                  </div>
               )}
               <div className={readingCollageUnitStyles.versionChapterDropDownWrapper}>
                  <div
                     className={readingCollageUnitStyles.versionDropDownWrapper}
                     onClick={openVerChapPopup}>
                     <p className='std-button_gradient-text'>{currVersionState.initials}</p>
                  </div>
                  <div
                     data-currentversion='JHN'
                     className={readingCollageUnitStyles.chapterDropDownWrapper}
                     onClick={openChapterPopup}>
                     <p className={`std-button_gradient-text`}>
                        {currentChapter.currentReferenceSelected}
                     </p>
                  </div>
               </div>
               <div className={readingCollageUnitStyles.settingsButton}>⚙️</div>
            </div>
            <div className={readingCollageUnitStyles.currentChapterWrapper}>
               {currentChapter.currChapterLoaded}
            </div>
         </div>
      </>
   );
};

export default ReadingCollageUnit;
