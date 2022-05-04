// core
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";

// graphQL
import client from "../../apollo-client";
import { CREATE_NEW_QUOTE } from "../../graphql/posts/quotes";

// components
import NotificationPopup from "../notification-popup";
import SmallLoader from "../chunks/small-loader";

// styles
import quoteEditorStyles from "../../styles/fragments/post-editors/QuoteEditor.module.css";

// helpers
import { IvaluesCat, valuesCat } from "../../helpers/dropdown-values";

type quoteEditorProps = {
   handleCloseStories: any;
};
const QuoteEditor = ({ handleCloseStories }: quoteEditorProps) => {
   // ================ FUNCTION 1:  Change the Background of the story on choice  ================ ///
   const [changeBkgState, setChangeBkgState] = useState<string>(quoteEditorStyles.DEFAULT_BKG);

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
      setCurrentChosenTagState({ color: cat.color, tag: cat.tag });
   };

   // ================ FUNCTION 3: display the current selected color by the user ================ ///
   const [currentChosenTagState, setCurrentChosenTagState] = useState<{
      tag: string;
      color: string;
   }>({ tag: "", color: "" });
   const showCurrentSelectedColor = (cat: IvaluesCat) => {
      setCurrentChosenTagState({ tag: cat.tag, color: cat.color });
   };

   // ================ FUNCTION 4: post the quote ==================== //
   const textArea = useRef<HTMLTextAreaElement>(null);
   const authorInput = useRef<HTMLInputElement>(null);
   const router = useRouter();
   const [notificationpoUp, setNotificationpoUp] = useState<JSX.Element | false>(false);
   const [smallLoaderState, setSmallLoaderState] = useState<JSX.Element | boolean>(false);
   const handlePostQuote = async () => {
      if (textArea.current && authorInput.current) {
         if (
            textArea.current.value !== "" &&
            textArea.current.value !== null &&
            authorInput.current.value !== "" &&
            authorInput.current.value !== null &&
            currentChosenTagState.tag !== ""
         ) {
            setSmallLoaderState(<SmallLoader />);
            const { data } = await client.mutate({
               mutation: CREATE_NEW_QUOTE,
               variables: {
                  body: textArea.current.value,
                  category_tags: `${currentChosenTagState.tag}`,
                  author: authorInput.current?.value,
                  background: changeBkgState
               }
            });

            console.log(data);
            if (data.quote.__typename === "Quote") {
               router.reload();
            } else if (data.quote.__typename === "ExceedsPostCount") {
               setSmallLoaderState(false);
               setNotificationpoUp(
                  <NotificationPopup
                     title={"This Is Sad 😔"}
                     contentString={data.quote.message}
                     closeModal={() => setNotificationpoUp(false)}
                     newClass={`notification-wrapper--Error`}
                  />
               );
            } else {
               setSmallLoaderState(
                  <p className='std-error-msg'>Sorry, something went wrong! 🙁</p>
               );
            }
         } else if (textArea.current.value === "") {
            setNotificationpoUp(
               <NotificationPopup
                  title={"Quote Is Emtpy"}
                  contentString={"Empty quotes are not allowed"}
                  closeModal={() => setNotificationpoUp(false)}
                  newClass={`notification-wrapper--Error`}
               />
            );
         } else if (authorInput.current.value === "") {
            setNotificationpoUp(
               <NotificationPopup
                  title={"Auhtor Is Emtpy"}
                  contentString={"Please enter who the author is"}
                  closeModal={() => setNotificationpoUp(false)}
                  newClass={`notification-wrapper--Error`}
               />
            );
         } else if (currentChosenTagState.tag === "") {
            setNotificationpoUp(
               <NotificationPopup
                  title={"No Category Tag"}
                  contentString={"Please select a category tag"}
                  closeModal={() => setNotificationpoUp(false)}
                  newClass={`notification-wrapper--Error`}
               />
            );
         }
      }
   };

   return (
      <div className={quoteEditorStyles.mainWrapper} id={changeBkgState}>
         {notificationpoUp}
         {tagInfoPopupState}
         <div className={`closeModal ${quoteEditorStyles.closeModal}`} onClick={handleCloseStories}>
            X
         </div>
         <div className={quoteEditorStyles.bkgsCarrousel}>
            <span
               className={quoteEditorStyles.bkgOne}
               id={quoteEditorStyles.BL}
               onClick={() => setChangeBkgState(quoteEditorStyles.BL)}></span>
            <span
               className={quoteEditorStyles.bkgTwo}
               id={quoteEditorStyles.YLW}
               onClick={() => setChangeBkgState(quoteEditorStyles.YLW)}></span>
            <span
               className={quoteEditorStyles.bkgThree}
               id={quoteEditorStyles.PPL}
               onClick={() => setChangeBkgState(quoteEditorStyles.PPL)}></span>
            <span
               className={quoteEditorStyles.bkgFour}
               id={quoteEditorStyles.RD}
               onClick={() => setChangeBkgState(quoteEditorStyles.RD)}></span>
            <span
               className={quoteEditorStyles.bkgFive}
               id={quoteEditorStyles.PNK}
               onClick={() => setChangeBkgState(quoteEditorStyles.PNK)}></span>
            <span
               className={quoteEditorStyles.bkgSix}
               id={quoteEditorStyles.GN}
               onClick={() => setChangeBkgState(quoteEditorStyles.GN)}></span>
            <span
               className={quoteEditorStyles.bkgSeven}
               id={quoteEditorStyles.BLK}
               onClick={() => setChangeBkgState(quoteEditorStyles.BLK)}></span>
            <span
               className={quoteEditorStyles.bkgEight}
               id={quoteEditorStyles.BR}
               onClick={() => setChangeBkgState(quoteEditorStyles.BR)}></span>
            <span
               className={quoteEditorStyles.bkgNine}
               id={quoteEditorStyles.DBD}
               onClick={() => setChangeBkgState(quoteEditorStyles.DBD)}></span>
            <span
               className={quoteEditorStyles.bkgTen}
               id={quoteEditorStyles.OT0}
               onClick={() => setChangeBkgState(quoteEditorStyles.OT0)}></span>
            <span
               className={quoteEditorStyles.bkgOne}
               id={quoteEditorStyles.OT1}
               onClick={() => setChangeBkgState(quoteEditorStyles.OT1)}></span>
            <span
               className={quoteEditorStyles.bkgTwo}
               id={quoteEditorStyles.OT2}
               onClick={() => setChangeBkgState(quoteEditorStyles.OT2)}></span>
            <span
               className={quoteEditorStyles.bkgThree}
               id={quoteEditorStyles.OT3}
               onClick={() => setChangeBkgState(quoteEditorStyles.OT3)}></span>
            <span
               className={quoteEditorStyles.bkgFour}
               id={quoteEditorStyles.OT4}
               onClick={() => setChangeBkgState(quoteEditorStyles.OT4)}></span>
            <span
               className={quoteEditorStyles.bkgSix}
               id={quoteEditorStyles.OT5}
               onClick={() => setChangeBkgState(quoteEditorStyles.OT5)}></span>
            <span
               className={quoteEditorStyles.bkgSeven}
               id={quoteEditorStyles.OT6}
               onClick={() => setChangeBkgState(quoteEditorStyles.OT6)}></span>
            <span
               className={quoteEditorStyles.bkgEight}
               id={quoteEditorStyles.OT7}
               onClick={() => setChangeBkgState(quoteEditorStyles.OT7)}></span>
            <span
               className={quoteEditorStyles.bkgNine}
               id={quoteEditorStyles.OT8}
               onClick={() => setChangeBkgState(quoteEditorStyles.OT8)}></span>
            <span
               className={quoteEditorStyles.bkgTen}
               id={quoteEditorStyles.OT9}
               onClick={() => setChangeBkgState(quoteEditorStyles.OT9)}></span>
         </div>
         <div
            className={`${quoteEditorStyles.contentUserWrapper}`}
            style={{ background: "transparent" }}>
            <textarea
               className={`${quoteEditorStyles.textarea}`}
               placeholder={`Enter Your Awesome Quote In This Space"`}
               maxLength={255}
               ref={textArea}></textarea>
            <input
               className={quoteEditorStyles.storyByInput}
               placeholder={`Who is the author?`}
               maxLength={200}
               ref={authorInput}
            />
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
         {!smallLoaderState && (
            <button className={`std-button ${quoteEditorStyles.stdButton}`}>
               <p className={`std-button_gradient-text`} onClick={handlePostQuote}>
                  POST
               </p>
            </button>
         )}
         {smallLoaderState}
         <div
            className={quoteEditorStyles.selectedTagColor}
            style={{ backgroundColor: currentChosenTagState.color }}></div>
      </div>
   );
};

export default QuoteEditor;
