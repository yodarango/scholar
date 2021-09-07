// core
import React, { useState } from "react";

// components
import NotificationPopup from "../notification-popup";

// styles
import quoteEditorStyles from "../../styles/fragments/post-editors/QuoteEditor.module.css";

// helpers
import { valuesCat } from "../../helpers/dropdown-values";
import { IvaluesCat } from "../../helpers/dropdown-values";

type quoteEditorProps = {
   handleCloseStories: any;
};
const QuoteEditor = ({ handleCloseStories }: quoteEditorProps) => {
   // ================ FUNCTION 1:  Change the Background of the story on choice  ================ ///
   const [changeBkgState, setChangeBkgState] = useState<string>("");
   const handleChangeBkgColor = (bkg: string) => {
      setChangeBkgState(bkg);
   };

   // ================ FUNCTION 2:  get information about the color tag clikced so the user knows what each stands for  ================ ///
   const [tagInfoPopupState, setTagInfoPopupState] = useState<boolean | JSX.Element>(false);
   const openInfoAboutTagColor = (cat: IvaluesCat) => {
      setTagInfoPopupState(
         <NotificationPopup
            title={cat.title}
            closeModal={() => setTagInfoPopupState(false)}
            contentArray={cat.subjects}
            newClass={`notification-wrapper--${cat.title}`}
         />
      );
      setCurrentChosenTagState(cat.color);
   };

   // ================ FUNCTION 3: display the current selected color by the user ================ ///
   const [currentChosenTagState, setCurrentChosenTagState] = useState<string>("");
   const showCurrentSelectedColor = (cat: IvaluesCat) => {
      setCurrentChosenTagState(cat.color);
   };
   return (
      <div className={quoteEditorStyles.mainWrapper} id={changeBkgState}>
         {tagInfoPopupState}
         <div className={`closeModal ${quoteEditorStyles.closeModal}`} onClick={handleCloseStories}>
            X
         </div>
         <div className={quoteEditorStyles.bkgsCarrousel}>
            <span
               className={quoteEditorStyles.bkgOne}
               id={quoteEditorStyles.BL}
               onClick={() => handleChangeBkgColor(quoteEditorStyles.BL)}></span>
            <span
               className={quoteEditorStyles.bkgTwo}
               id={quoteEditorStyles.YLW}
               onClick={() => handleChangeBkgColor(quoteEditorStyles.YLW)}></span>
            <span
               className={quoteEditorStyles.bkgThree}
               id={quoteEditorStyles.PPL}
               onClick={() => handleChangeBkgColor(quoteEditorStyles.PPL)}></span>
            <span
               className={quoteEditorStyles.bkgFour}
               id={quoteEditorStyles.RD}
               onClick={() => handleChangeBkgColor(quoteEditorStyles.RD)}></span>
            <span
               className={quoteEditorStyles.bkgFive}
               id={quoteEditorStyles.PNK}
               onClick={() => handleChangeBkgColor(quoteEditorStyles.PNK)}></span>
            <span
               className={quoteEditorStyles.bkgSix}
               id={quoteEditorStyles.GN}
               onClick={() => handleChangeBkgColor(quoteEditorStyles.GN)}></span>
            <span
               className={quoteEditorStyles.bkgSeven}
               id={quoteEditorStyles.BLK}
               onClick={() => handleChangeBkgColor(quoteEditorStyles.BLK)}></span>
            <span
               className={quoteEditorStyles.bkgEight}
               id={quoteEditorStyles.BR}
               onClick={() => handleChangeBkgColor(quoteEditorStyles.BR)}></span>
            <span
               className={quoteEditorStyles.bkgNine}
               id={quoteEditorStyles.DBD}
               onClick={() => handleChangeBkgColor(quoteEditorStyles.DBD)}></span>
            <span
               className={quoteEditorStyles.bkgTen}
               id={quoteEditorStyles.OT0}
               onClick={() => handleChangeBkgColor(quoteEditorStyles.OT0)}></span>
            <span
               className={quoteEditorStyles.bkgOne}
               id={quoteEditorStyles.OT1}
               onClick={() => handleChangeBkgColor(quoteEditorStyles.OT1)}></span>
            <span
               className={quoteEditorStyles.bkgTwo}
               id={quoteEditorStyles.OT2}
               onClick={() => handleChangeBkgColor(quoteEditorStyles.OT2)}></span>
            <span
               className={quoteEditorStyles.bkgThree}
               id={quoteEditorStyles.OT3}
               onClick={() => handleChangeBkgColor(quoteEditorStyles.OT3)}></span>
            <span
               className={quoteEditorStyles.bkgFour}
               id={quoteEditorStyles.OT4}
               onClick={() => handleChangeBkgColor(quoteEditorStyles.OT4)}></span>
            <span
               className={quoteEditorStyles.bkgSix}
               id={quoteEditorStyles.OT5}
               onClick={() => handleChangeBkgColor(quoteEditorStyles.OT5)}></span>
            <span
               className={quoteEditorStyles.bkgSeven}
               id={quoteEditorStyles.OT6}
               onClick={() => handleChangeBkgColor(quoteEditorStyles.OT6)}></span>
            <span
               className={quoteEditorStyles.bkgEight}
               id={quoteEditorStyles.OT7}
               onClick={() => handleChangeBkgColor(quoteEditorStyles.OT7)}></span>
            <span
               className={quoteEditorStyles.bkgNine}
               id={quoteEditorStyles.OT8}
               onClick={() => handleChangeBkgColor(quoteEditorStyles.OT8)}></span>
            <span
               className={quoteEditorStyles.bkgTen}
               id={quoteEditorStyles.OT9}
               onClick={() => handleChangeBkgColor(quoteEditorStyles.OT9)}></span>
         </div>
         <div
            className={`${quoteEditorStyles.contentUserWrapper}`}
            style={{ background: "transparent" }}>
            <textarea
               className={`${quoteEditorStyles.textarea}`}
               placeholder={`Enter Your Awesome Quote In This Space"`}></textarea>
            <input className={quoteEditorStyles.storyByInput} placeholder={`Who is the author?`} />
         </div>
         <section className={quoteEditorStyles.tagsWrapper}>
            <span className={quoteEditorStyles.categoryTitle}>Category:</span>
            <div className={quoteEditorStyles.categories}>
               {valuesCat.map((cat: IvaluesCat) => (
                  <span
                     key={cat.key}
                     style={{ backgroundColor: cat.color }}
                     className={quoteEditorStyles.category}
                     onClick={() => showCurrentSelectedColor(cat)}>
                     {cat.tag}
                     <span
                        className={quoteEditorStyles.info}
                        onClick={() => openInfoAboutTagColor(cat)}>
                        i
                     </span>
                  </span>
               ))}
            </div>
         </section>
         <button className={`std-button ${quoteEditorStyles.stdButton}`}>
            <p className={`std-button_gradient-text`}>POST</p>
         </button>
         <div
            className={quoteEditorStyles.selectedTagColor}
            style={{ backgroundColor: currentChosenTagState }}></div>
      </div>
   );
};

export default QuoteEditor;
