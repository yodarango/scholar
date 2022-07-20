// core
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

// graphQL
import client from "../../apollo-client";
import { EDIT_ONE_QUOTE } from "../../graphql/posts/quotes";

// components
import NotificationPopup from "../../fragments/popups/notification";
import SmallLoader from "../../fragments/chunks/small-loader";

// styles
import quoteEditorStyles from "../../styles/fragments/post-editors/QuoteEditor.module.css";

// helpers
import { valuesCat } from "../../data/category_meta";
import { IvaluesCat } from "../../data/category_meta";
import { Tstory } from "../quotes-stroies";

type quoteEditorProps = {
   //handleCloseStories: any;
   story: Tstory;
};
const EditQuotePost = ({ story }: quoteEditorProps) => {
   // ================ FUNCTION 1:  Change the Background of the story on choice  ================ ///
   const [changeBkgState, setChangeBkgState] = useState<string>(story.background);

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
   }>({ tag: story.category_tags, color: story.category_tags.replace("#", "") });

   const showCurrentSelectedColor = (cat: IvaluesCat) => {
      setCurrentChosenTagState({ tag: cat.tag, color: cat.tag.replace("#", "") });
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
            try {
               const { data } = await client.mutate({
                  mutation: EDIT_ONE_QUOTE,
                  variables: {
                     ID: story.ID,
                     body: textArea.current.value,
                     category_tags: `${currentChosenTagState.tag}`,
                     author: authorInput.current?.value,
                     background: changeBkgState
                  }
               });
               if (data.edit_quote) {
                  router.replace(`/users/me`);
               } else {
                  setSmallLoaderState(
                     <p className='std-error-msg'>Sorry, something went wrong! 🙁</p>
                  );
               }
            } catch (error) {
               console.log(error);
               setSmallLoaderState(false);
               setSmallLoaderState(
                  <p className='std-error-msg'>Sorry, something went wrong! 🙁</p>
               );
            }
         } else if (textArea.current.value === "") {
            setSmallLoaderState(false);
            setNotificationpoUp(
               <NotificationPopup
                  title={"Quote Is Emtpy"}
                  contentString={"Empty quotes are not allowed"}
                  closeModal={() => setNotificationpoUp(false)}
                  newClass={`notification-wrapper--Red`}
               />
            );
         } else if (authorInput.current.value === "") {
            setSmallLoaderState(false);
            setNotificationpoUp(
               <NotificationPopup
                  title={"Auhtor Is Emtpy"}
                  contentString={"Please enter who the author is"}
                  closeModal={() => setNotificationpoUp(false)}
                  newClass={`notification-wrapper--Red`}
               />
            );
         } else if (currentChosenTagState.tag === "") {
            setSmallLoaderState(false);
            setNotificationpoUp(
               <NotificationPopup
                  title={"No Category Tag"}
                  contentString={"Please select a category tag"}
                  closeModal={() => setNotificationpoUp(false)}
                  newClass={`notification-wrapper--Red`}
               />
            );
         }
      }
   };

   return (
      <>
         <div className={quoteEditorStyles.mainWrapper} id={changeBkgState}>
            {notificationpoUp}
            {tagInfoPopupState}
            <Link href={`/users/me`}>
               <a className={`closeModal ${quoteEditorStyles.closeModal}`}>X</a>
            </Link>
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
                  maxLength={255}
                  ref={textArea}
                  defaultValue={story.body}></textarea>
               <input
                  className={quoteEditorStyles.storyByInput}
                  maxLength={200}
                  ref={authorInput}
                  defaultValue={story.author}
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
               id={`category-${currentChosenTagState.color}`}></div>
         </div>
      </>
   );
};

export default EditQuotePost;
