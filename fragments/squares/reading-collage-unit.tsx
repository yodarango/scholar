// core
import React, { useState } from "react";

// components
import GeneralDropDown from "../buttons/general-dropdown";
import PopupWrapper from "../../layouts/popup-wrapper";
import GetNewBook from "../get-new-scriptures/get-new-book";
import GetNewChapter from "../get-new-scriptures/get-new-chapter";

// styles
import readingCollageUnitStyles from "../../styles/fragments/squares/readingCollageUnit.module.css";

const ReadingCollageUnit = () => {

   // ============== ARRAY: All bible Ids used from bible.api =========
   const dropdownOptions: JSX.Element[] = [
<div data-bibleid="685d1470fe4d5c3b-01" className={`std-text-block--widget ${readingCollageUnitStyles.optionUnit}`}>American Standard Version</div>,
<div data-bibleid="bba9f40183526463-01" className={`std-text-block--widget ${readingCollageUnitStyles.optionUnit}`}>Berean Study Bible</div>,
<div data-bibleid="6bab4d6c61b31b80-01" className={`std-text-block--widget ${readingCollageUnitStyles.optionUnit}`}>Brenton English Septuagint</div>,
<div data-bibleid="65bfdebd704a8324-01" className={`std-text-block--widget ${readingCollageUnitStyles.optionUnit}`}>Brenton English translation of the Septuagint</div>,
<div data-bibleid="55212e3cf5d04d49-01" className={`std-text-block--widget ${readingCollageUnitStyles.optionUnit}`}>Cambridge Paragraph Bible of the KJV</div>,
<div data-bibleid="179568874c45066f-01" className={`std-text-block--widget ${readingCollageUnitStyles.optionUnit}`}>Douay-Rheims American 1899</div>,
<div data-bibleid="55ec700d9e0d77ea-01" className={`std-text-block--widget ${readingCollageUnitStyles.optionUnit}`}>English Majority Text Version</div>,
<div data-bibleid="65eec8e0b60e656b-01" className={`std-text-block--widget ${readingCollageUnitStyles.optionUnit}`}>Free Bible Version -</div>,
<div data-bibleid="c315fa9f71d4af3a-01" className={`std-text-block--widget ${readingCollageUnitStyles.optionUnit}`}>Geneva Bible</div>,
<div data-bibleid="bf8f1c7f3f9045a5-01" className={`std-text-block--widget ${readingCollageUnitStyles.optionUnit}`}>JPS TaNaKH 1917</div>,
<div data-bibleid="de4e12af7f28f599-01" className={`std-text-block--widget ${readingCollageUnitStyles.optionUnit}`}>King James Version 1</div>,
<div data-bibleid="de4e12af7f28f599-02" className={`std-text-block--widget ${readingCollageUnitStyles.optionUnit}`}>King James Version 2</div>,
<div data-bibleid="01b29f4b342acc35-01" className={`std-text-block--widget ${readingCollageUnitStyles.optionUnit}`}>Literal Standard Version</div>,
<div data-bibleid="40072c4a5aba4022-01" className={`std-text-block--widget ${readingCollageUnitStyles.optionUnit}`}>Revised Version 1885</div>,
<div data-bibleid="ec290b5045ff54a5-01" className={`std-text-block--widget ${readingCollageUnitStyles.optionUnit}`}>Targum Onkelos Etheridge</div>,
<div data-bibleid="2f0fd81d7b85b923-01" className={`std-text-block--widget ${readingCollageUnitStyles.optionUnit}`}>The English New Testament According to Family 35</div>,
<div data-bibleid="06125adad2d5898a-01" className={`std-text-block--widget ${readingCollageUnitStyles.optionUnit}`}>The Holy Bible, American Standard Version</div>,
<div data-bibleid="66c22495370cdfc0-01" className={`std-text-block--widget ${readingCollageUnitStyles.optionUnit}`}>Translation for Translators</div>,
<div data-bibleid="9879dbb7cfe39e4d-01" className={`std-text-block--widget ${readingCollageUnitStyles.optionUnit}`}>World English Bible Version 1</div>,
<div data-bibleid="9879dbb7cfe39e4d-02" className={`std-text-block--widget ${readingCollageUnitStyles.optionUnit}`}>World English Bible Version 2</div>,
<div data-bibleid="9879dbb7cfe39e4d-03" className={`std-text-block--widget ${readingCollageUnitStyles.optionUnit}`}>World English Bible Version 3</div>,
<div data-bibleid="9879dbb7cfe39e4d-04" className={`std-text-block--widget ${readingCollageUnitStyles.optionUnit}`}>World English Bible Version 4</div>,
<div data-bibleid="7142879509583d59-01" className={`std-text-block--widget ${readingCollageUnitStyles.optionUnit}`}>World English Bible British Edition Version 1</div>,
<div data-bibleid="7142879509583d59-02" className={`std-text-block--widget ${readingCollageUnitStyles.optionUnit}`}>World English Bible British Edition Version 2</div>,
<div data-bibleid="7142879509583d59-03" className={`std-text-block--widget ${readingCollageUnitStyles.optionUnit}`}>World English Bible British Edition Version 3</div>,
<div data-bibleid="7142879509583d59-04" className={`std-text-block--widget ${readingCollageUnitStyles.optionUnit}`}>World English Bible British Edition Version 4</div>,
<div data-bibleid="f72b840c855f362c-04" className={`std-text-block--widget ${readingCollageUnitStyles.optionUnit}`}>World Messianic Bible</div>,
<div data-bibleid="04da588535d2f823-04" className={`std-text-block--widget ${readingCollageUnitStyles.optionUnit}`}>World Messianic Bible British Edition</div>
   ]

   // ============ FUNCTION: open popup to choose version or chapter
const [openVerChapPopupState, setOpenVerChapPopupState] = useState<JSX.Element | boolean>(false);


const openVerChapPopup:()=> void = ()=>{
   setOpenVerChapPopupState(<PopupWrapper closeModal={()=> setOpenVerChapPopupState(false)} content= {<GeneralDropDown dropdownOptions ={dropdownOptions} />}/>)
}

const openChapChapPopup:()=> void =() =>{
   setOpenVerChapPopupState(<GetNewBook openGetNewChapterFunc ={openGetNewChapterFunc} closeModal={()=>setOpenVerChapPopupState(false)}/>)
}

const openGetNewChapterFunc:()=> void =() =>{
   setOpenVerChapPopupState(<GetNewChapter goBackModal={()=>alert("go Back")} openGetNewVerse={()=> alert("hello")} closeModal={()=>setOpenVerChapPopupState(false)}/>)
}

   return (
      <>
      {openVerChapPopupState}
      <div className={readingCollageUnitStyles.mainWrapper}>
         <div className={readingCollageUnitStyles.header}>
            <div className={readingCollageUnitStyles.versionChapterDropDownWrapper}>
               <div className={readingCollageUnitStyles.versionDropDownWrapper} onClick={openVerChapPopup}>
               <p className="std-button_gradient-text">fbfdb</p>
               </div>
               <div className={readingCollageUnitStyles.chapterDropDownWrapper} onClick={openChapChapPopup}>
                  <p className={`std-button_gradient-text`}>{`1 Corinthians 10`}</p>
               </div>
            </div>
         </div>
      </div>
      </>
   );
};

export default ReadingCollageUnit;
