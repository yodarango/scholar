// core
import { useState, useRef } from "react";

// graphQl
import client from "../../apollo-client";
import { RECOMMNED_NEW_LIB_CONTENT } from "../../graphql/emails/content";

// components
import PopupWrapper from "../../layouts/popup-wrapper";
import NotificationPopup from "../notification-popup";
import SmallLoader from "../../fragments/chunks/small-loader";

//styles
import libraryRecommendContennt from "../../styles/buttons/LibraryRecommnedContent.module.css";

const LibraryRecommendContennt = () => {
   // small loader state
   const [smallLoaderState, setSmallLoaderState] = useState<boolean>(false);
   // ================  FUNCTION 1: allow users to submit a source recommendation =================//

   /// ========  FUNCTION 1.1 submission form  Component=======
   const ContnentForm = () => {
      type IopenDropDownState = {
         mainWrapper: string;
         placeHolder: string;
         newPlaceHolderId: string;
      };
      const [openDropDownState, setopenDropDownState] = useState<IopenDropDownState>({
         mainWrapper: "none",
         placeHolder: "Content Type",
         newPlaceHolderId: ""
      });
      //// ============ FUNCTION 1.1.1 open the dropdown containing the content option ========= //
      const handleOpenDropDown = () => {
         setopenDropDownState({
            mainWrapper: "block",
            placeHolder: "Content Type",
            newPlaceHolderId: ""
         });
      };
      //// ============ FUNCTION 1.1.2 set the new info according to the selected choice ========= //
      const handleContentChoice = (choice: string) => {
         setopenDropDownState({
            mainWrapper: "none",
            placeHolder: choice,
            newPlaceHolderId: "#f2f2f2"
         });
      };
      // =========== select each of the fileds in the form to check for field emptyness ========= //
      const contentType = useRef<HTMLDivElement>(null);
      const sourceName = useRef<HTMLInputElement>(null);
      const sourceUrl = useRef<HTMLInputElement>(null);
      const submitterName = useRef<HTMLInputElement>(null);
      const submitterEmail = useRef<HTMLInputElement>(null);
      const message = useRef<HTMLTextAreaElement>(null);

      const [emptyFieldPopUpState, setEmptyFieldPopUpState] = useState<boolean | JSX.Element>(
         false
      );

      // ============ FUNCTION 1.1.3 send the form using fetch ========= //
      const handleDataSubmission = async () => {
         // ============ Check that all fileds exist========= //
         if (
            contentType.current &&
            sourceName.current &&
            sourceUrl.current &&
            submitterName.current &&
            submitterEmail.current &&
            message.current
         ) {
            //  ============ Check for an empty filed and set the popup error notification ========= //
            if (
               contentType.current.textContent === "Content Type" ||
               sourceName.current.value === "" ||
               sourceUrl.current.value === "" ||
               submitterName.current.value === "" ||
               submitterEmail.current.value === "" ||
               message.current.value === ""
            ) {
               setEmptyFieldPopUpState(
                  <NotificationPopup
                     title='Oops!'
                     closeModal={() => setEmptyFieldPopUpState(false)}
                     newClass='notification-wrapper--Red'
                     contentString='One or more fields are empty! 🤔'
                  />
               );
            }
            // ============ Check that all fileds are filled out and if so go ahead and send the request========= //
            if (
               contentType.current.textContent !== "Content Type" &&
               sourceName.current.value !== "" &&
               sourceUrl.current.value !== "" &&
               submitterName.current.value !== "" &&
               submitterEmail.current.value !== "" &&
               message.current.value !== ""
            ) {
               setSmallLoaderState(true);
               const { data } = await client.mutate({
                  mutation: RECOMMNED_NEW_LIB_CONTENT,
                  variables: {
                     content_type: contentType.current.textContent,
                     source_name: sourceName.current.value,
                     source_url: sourceUrl.current.value,
                     submitter_name: submitterName.current.value,
                     submitter_email: submitterEmail.current.value,
                     message: message.current.value
                  }
               });

               if (data.recomend_new_library_content === true) {
                  setSmallLoaderState(false);
                  setOpenpopUpFormState(false);
                  setNotificationPopupState(
                     <NotificationPopup
                        title='Thank you!'
                        closeModal={() => setNotificationPopupState(false)}
                        newClass='notification-wrapper--Success'
                        contentString='Your recommendation has been submitted and will be reviewed soon! 😀'
                     />
                  );
               } else {
                  setOpenpopUpFormState(false);
                  setSmallLoaderState(false);
                  setNotificationPopupState(
                     <NotificationPopup
                        closeModal={() => setNotificationPopupState(false)}
                        title={`Something went wrong!`}
                        contentString='Something has gone south ⬇️ and we are performing surgery on the issue 👨‍⚕️. Please try again later!'
                        newClass='notification-wrapper--Error'
                     />
                  );
               }
            }
         }
      };
      ///// Pop Up compnonent Contnent
      return (
         <>
            {emptyFieldPopUpState}
            <div className={libraryRecommendContennt.formWrapper}>
               <span
                  className={`${libraryRecommendContennt.formDropDownButton}`}
                  style={{ color: openDropDownState.newPlaceHolderId }}
                  onClick={handleOpenDropDown}
                  ref={contentType}>
                  {openDropDownState.placeHolder}
                  <span className={libraryRecommendContennt.dropdownArrow}></span>
               </span>

               <div
                  className={`${libraryRecommendContennt.dropDownWrapper}`}
                  style={{ display: openDropDownState.mainWrapper }}>
                  <span
                     className={`${libraryRecommendContennt.dropDownItem}`}
                     onClick={() => handleContentChoice("Podcast")}>
                     Podcast
                  </span>
                  <span
                     className={`${libraryRecommendContennt.dropDownItem}`}
                     onClick={() => handleContentChoice("Youtube Channel")}>
                     Youtube Channel
                  </span>
                  <span
                     className={`${libraryRecommendContennt.dropDownItem}`}
                     onClick={() => handleContentChoice("Blog")}>
                     Blog
                  </span>
                  <span
                     className={`${libraryRecommendContennt.dropDownItem}`}
                     onClick={() => handleContentChoice("Book")}>
                     Book
                  </span>
                  <span
                     className={`${libraryRecommendContennt.dropDownItem}`}
                     onClick={() => handleContentChoice("Commentaries")}>
                     Commentaries
                  </span>
               </div>

               <input
                  ref={sourceName}
                  type='text'
                  maxLength={50}
                  placeholder='Resource Name'
                  className={` std-input ${libraryRecommendContennt.stdInput}`}
               />
               <input
                  ref={sourceUrl}
                  type='url'
                  maxLength={50}
                  placeholder='Url (https://example.com)'
                  className={` std-input ${libraryRecommendContennt.stdInput}`}
               />

               <input
                  ref={submitterName}
                  type='text'
                  maxLength={50}
                  placeholder='Your Name'
                  className={`std-input ${libraryRecommendContennt.stdInput}`}
               />
               <input
                  ref={submitterEmail}
                  type='email'
                  maxLength={80}
                  placeholder='Your Email'
                  className={`std-input ${libraryRecommendContennt.stdInput}`}
               />

               <textarea
                  ref={message}
                  name='reason'
                  placeholder='Please explain why do you think we should include this resource'
                  maxLength={500}
                  className={`std-text-area ${libraryRecommendContennt.stdTextArea}`}></textarea>

               {!smallLoaderState && (
                  <button
                     className={`std-button ${libraryRecommendContennt.stdButton}`}
                     onClick={handleDataSubmission}>
                     <p
                        className={`std-button_gradient-text ${libraryRecommendContennt.stdButtonGradientText}`}>
                        Submit
                     </p>
                  </button>
               )}
               {smallLoaderState && <SmallLoader />}
            </div>
         </>
      );
   };

   const [openpopUpFormState, setOpenpopUpFormState] = useState<boolean | JSX.Element>(false);
   const [notificationPopupState, setNotificationPopupState] = useState<boolean | JSX.Element>(
      false
   );

   // Will trigger "Function 1" above
   const handleOpenSubmitForm = () => {
      setOpenpopUpFormState(
         <PopupWrapper content={<ContnentForm />} closeModal={() => setOpenpopUpFormState(false)} />
      );
   };
   return (
      <>
         {openpopUpFormState}
         {notificationPopupState}
         <div className={`${libraryRecommendContennt.mainWrapper}`}>
            <p>
               Do you author, own, host, or like a particular content source that you would like to
               be added? Submit a recommendation form.
            </p>
            <button
               className={`std-button ${libraryRecommendContennt.button}`}
               onClick={handleOpenSubmitForm}>
               <p
                  className={`std-button_gradient-text ${libraryRecommendContennt.stdButtonGradientText}`}>
                  Recommned A Resource
               </p>
            </button>
         </div>
      </>
   );
};

export default LibraryRecommendContennt;
