// core
import React, { useEffect, useState } from "react";

// components
import PopupWrapper from "../../layouts/popup-wrapper";
import GetNewBook from "../get-new-scriptures/get-new-book";
import GetNewChapter from "../get-new-scriptures/get-new-chapter";
import Chapter from "../../helpers/fetch-bible-chapter";

// styles
import readingCollageUnitStyles from "../../styles/fragments/squares/readingCollageUnit.module.css";
import GeneralDropdownStyles from "../../styles/buttons/GeneralDropDown.module.css";

// others
import { dropdownOptions } from "../../helpers/english-bible-versions";

const ReadingCollageUnit = () => {
   // ============================  1 FUNCTION: open popup to choose version or chapter   =============================
   const [openVersionState, setOpenVersionState] = useState<JSX.Element | boolean>(false);
   type IOpenVersionState = {
      id: string;
      initials: string;
   };
   // this is the state for the version on initial load which can be updated- Eventually I would like  to pass this value from the db for each user
   const [currVersionState, setCurrVersionState] = useState<IOpenVersionState>({
      id: "c315fa9f71d4af3a-01",
      initials: "KJV"
   });

   // 1. on "Version" button click call th elist of all available options availabe from the "dropdownOptions" file on the Popup Component
   const openVerChapPopup = (e: any) => {
      setOpenVersionState(
         <PopupWrapper
            closeModal={() => setOpenVersionState(false)}
            content={
               <div className={GeneralDropdownStyles.mainWrapper}>
                  {dropdownOptions &&
                     dropdownOptions.map((option) => (
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

   // ============================  2 FUNCTION: open popup to choose a newChapter   =============================
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
      setCurrentChapter({
         currChapterLoaded: false,
         currentReferenceSelected: false,
         currentChapterId: false
      });
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

   // 4. Diasplay a the chapter according to the selected bible versin on bible versin change
   // useEffect(() => {
   //    showSelectedBook({
   //       id: currVersionState.id,
   //       reference: currentChapter.currentReferenceSelected,
   //       chapterId: currentChapter.currentChapterId
   //    });
   // }, [currVersionState]);
   return (
      <>
         {openVersionState}
         {openBookState}
         {openChapterState}
         <div className={readingCollageUnitStyles.mainWrapper}>
            <div className={readingCollageUnitStyles.header}>
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
            </div>
            <div className={readingCollageUnitStyles.currentChapterWrapper}>
               {currentChapter.currChapterLoaded}
            </div>
         </div>
      </>
   );
};

export default ReadingCollageUnit;
