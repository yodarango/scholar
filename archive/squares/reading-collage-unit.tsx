// core
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
const Cookie = require("js-cookie");

// components
import PopupWrapper from "../../layouts/popup-wrapper";
import GetNewBook from "../get-new-scriptures/get-new-book";
import GetNewChapter from "../get-new-scriptures/get-new-chapter";
import Chapter from "../../layouts/bible_chapter";
import GeneralDropdown from "../buttons/general-dropdown";
import ReadingColleageSettingsPopup from "../../fragments/popups/reading-colleage-settings-popup";

// styles
import readingCollageUnitStyles from "../../styles/fragments/squares/readingCollageUnit.module.css";
import GeneralDropdownStyles from "../../styles/buttons/GeneralDropDown.module.css";

//types
import { TdropdownObjectSingleOption } from "../../fragments/buttons/general-dropdown";

// helpers
///// bible translations supported
import { dropdownOptions as english } from "../../data/supported_bible_versions/english";
import { dropdownOptions as greek } from "../../data/supported_bible_versions/greek";
import { dropdownOptions as spanish } from "../../data/supported_bible_versions/spanish";
import { dropdownOptions as german } from "../../data/supported_bible_versions/german";
import { dropdownOptions as polish } from "../../data/supported_bible_versions/polish";
import { dropdownOptions as czech } from "../../data/supported_bible_versions/czech";
import { dropdownOptions as italian } from "../../data/supported_bible_versions/czech";
import { dropdownOptions as dutch } from "../../data/supported_bible_versions/dutch";
import { dropdownOptions as urdu } from "../../data/supported_bible_versions/urdu";
import { dropdownOptions as thai } from "../../data/supported_bible_versions/thai";

// ==================   1 FUNCTION: set the desire language    =========================
type ReadingCollageUnitProps = {
   multiViewClass: string;
   versionId: string;
};
const ReadingCollageUnit = ({ multiViewClass, versionId }: ReadingCollageUnitProps) => {
   const router = useRouter();
   //// handles the dropdown popup wrappin glist of bible translations
   type IlangListDropdown = {
      dropdown: JSX.Element | boolean;
      openCta: boolean;
   };
   const [langListDropdown, setLangListDropdown] = useState<IlangListDropdown>({
      dropdown: false,
      openCta: false
   });
   //// handles the current bible translatons and icon supported based on current selection
   type IcurrLangIcon = {
      icon: string;
      lang: any;
   };
   const [currLangIcon, setCurrLangIcon] = useState<IcurrLangIcon>({ icon: "🇺🇸", lang: english });

   // 2. handles the click on each individual option on the dropdown
   const selectLanguage = (selectedOption: any) => {
      setCurrLangIcon({ icon: selectedOption.textContent, lang: selectedOption.funcParams });
      setLangListDropdown({
         dropdown: false,
         openCta: false
      });
   };

   // 3. opens the "openLangOption" dropdown right after the language changes
   useEffect(() => {
      openVerChapPopup();
   }, [currLangIcon]);

   // 4. keep dropdown from rendering on initial load
   useEffect(() => {
      setOpenVersionState(false);
   }, []);
   // 1. opens the language dropdown
   const openLangOption = () => {
      const supportedLanguages: TdropdownObjectSingleOption[] = [
         { textContent: "🇺🇸", funcParams: english, id: 1 },
         { textContent: "🇬🇷", funcParams: greek, id: 2 },
         { textContent: "🇲🇽", funcParams: spanish, id: 3 },
         { textContent: "🇩🇪", funcParams: german, id: 4 },
         { textContent: "🇵🇱", funcParams: polish, id: 5 },
         { textContent: "🇨🇿", funcParams: czech, id: 6 },
         { textContent: "🇮🇹", funcParams: italian, id: 7 },
         { textContent: "🇳🇱", funcParams: dutch, id: 8 },
         { textContent: "🇵🇰", funcParams: urdu, id: 9 },
         { textContent: "🇹🇭", funcParams: thai, id: 10 }
      ];
      setLangListDropdown({
         dropdown: (
            <GeneralDropdown
               dropdownOptionsObject={supportedLanguages}
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
      id: versionId,
      initials: "KJV"
   });

   // 1. on "Version" button click call th elist of all available options availabe from the "dropdownOptions" file on the Popup Component
   const openVerChapPopup = () => {
      console.log(currLangIcon);
      setOpenVersionState(
         <PopupWrapper
            closeModal={() => setOpenVersionState(false)}
            content={
               <div className={GeneralDropdownStyles.mainWrapper}>
                  {currLangIcon.lang &&
                     currLangIcon.lang.map((option: any) => (
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
      currChapterLoaded: <Chapter versionId={`${versionId}`} chapterId='JHN.3' />,
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
      setOpenVersionState(false);
      setOpenBookState(false);
      setOpenChapterState(false);
   };

   // ============================  4 FUNCTION: handle settings popup   =============================
   const [settingsPopUp, setSettingsPopUp] = useState<JSX.Element | boolean>(false);
   // 1. open the settings popup
   const openSettingsPopup = () => {
      setSettingsPopUp(
         <ReadingColleageSettingsPopup
            closeModal={() => setSettingsPopUp(false)}
            handleColorChange={changeBkgColor}
            handleFontSize={changeFontSize}
            handleResetColor={handleColorReset}
         />
      );
   };

   type IreadingSettings = {
      color?: string;
      darkTheme?: string;
   };
   const [readingSettings, setReadingSettings] = useState<IreadingSettings | undefined>({
      color: undefined,
      darkTheme: undefined
   });

   useEffect(() => {
      if (router.isReady) {
         setReadingSettings({ color: Cookie.get("bkgColor"), darkTheme: Cookie.get("darkTheme") });
      }
   }, [router.isReady]);
   // 2. handle color change
   ///// The following list of useRefs is used instead in documentgetElementBy... to stay more within react protocol
   const collageUnitBkg = useRef<HTMLDivElement>(null);
   const collageUnitBorder0 = useRef<HTMLDivElement>(null);
   const collageUnitBorder1 = useRef<HTMLDivElement>(null);
   const collageUnitBorder2 = useRef<HTMLDivElement>(null);
   const collageUnitBorder3 = useRef<HTMLDivElement>(null);
   const changeBkgColor = (color: string) => {
      //////// handle the useState and update cookie on click
      setReadingSettings({
         color: color,
         darkTheme: readingCollageUnitStyles.versionDropDownWrapper__DarkTheme
      });
      Cookie.set("darkTheme", readingCollageUnitStyles.versionDropDownWrapper__DarkTheme, {
         expires: 7,
         path: "/read"
      });
      Cookie.set("bkgColor", color, { expires: 7, path: "/read" });
   };

   // 3. Handle font change
   ///// 3.1 No cookies are set for font change
   const chapterBody = useRef<HTMLDivElement>(null);
   const changeFontSize = (size: string) => {
      const verse = document.querySelectorAll(
         ".readingCollageUnit_currentChapterWrapper__R59Gr span"
      );
      verse.forEach((el: any) => (el.style.fontSize = `${size}`));
      console.log(size);
   };

   // 4. handle color reset
   const handleColorReset = () => {
      setReadingSettings({
         color: "#2a2438",
         darkTheme: ""
      });
      Cookie.remove("darkTheme", { path: "/read" });
      Cookie.remove("bkgColor", { path: "/read" });
   };

   return (
      <>
         {openVersionState}
         {openBookState}
         {openChapterState}
         {settingsPopUp}
         <div
            className={`${readingCollageUnitStyles.mainWrapper} ${multiViewClass}`}
            ref={collageUnitBkg}
            style={{ background: readingSettings?.color }}>
            <div className={readingCollageUnitStyles.header}>
               {langListDropdown.openCta === false && (
                  <div className={readingCollageUnitStyles.langugageButtonWrapper}>
                     <div
                        className={`${readingCollageUnitStyles.langugageButton} ${readingSettings?.darkTheme}`}
                        onClick={openLangOption}
                        ref={collageUnitBorder0}>
                        {currLangIcon.icon}
                     </div>
                     {langListDropdown.dropdown}
                  </div>
               )}
               {langListDropdown.openCta === true && (
                  <div
                     className={`${readingCollageUnitStyles.langugageButtonWrapper} ${readingSettings?.darkTheme}`}>
                     <div
                        className={readingCollageUnitStyles.langugageButton}
                        onClick={closeLangOption}>
                        {currLangIcon.icon}
                     </div>
                     {langListDropdown.dropdown}
                  </div>
               )}
               <div className={readingCollageUnitStyles.versionChapterDropDownWrapper}>
                  <div
                     className={`${readingCollageUnitStyles.versionDropDownWrapper} ${readingSettings?.darkTheme}`}
                     onClick={openVerChapPopup}
                     ref={collageUnitBorder1}>
                     <p className={`std-button_gradient-text`}>{currVersionState.initials}</p>
                  </div>
                  <div
                     data-currentversion='JHN'
                     className={`${readingCollageUnitStyles.chapterDropDownWrapper} ${readingSettings?.darkTheme}`}
                     onClick={openChapterPopup}
                     ref={collageUnitBorder2}>
                     <p className={`std-button_gradient-text`}>
                        {currentChapter.currentReferenceSelected}
                     </p>
                  </div>
               </div>
               <div
                  className={`${readingCollageUnitStyles.settingsButton} ${readingSettings?.darkTheme}`}
                  onClick={openSettingsPopup}
                  ref={collageUnitBorder3}>
                  ⚙️
               </div>
            </div>
            <div className={readingCollageUnitStyles.currentChapterWrapper} ref={chapterBody}>
               {currentChapter.currChapterLoaded}
            </div>
         </div>
      </>
   );
};

export default ReadingCollageUnit;
