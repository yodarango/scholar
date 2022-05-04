// core
import { useState, useRef } from "react";

// third parties
import ReactMarkdown from "react-markdown";

//comps
import NotificationPopup from "../notification-popup";

// styles
import textEditorStyles from "../../styles/layouts/textEditor.module.css";

// helpters
import { chosenKey } from "../../helpers/APIs/select-random-api-key";

/*==================  FUNCTION: Preview ReactMarkdown  ===========*/
type previewProps = {
   tagsAssigned: JSX.Element;
   referencedVerses: any;
   content: string;
};

const TextEditorPreview = ({ tagsAssigned, referencedVerses, content }: previewProps) => {
   // ===============  FUNCTION: Open Referenced Verse Tags  =================
   const [openReferencePopUpState, setOpenReferencePopUp] = useState<JSX.Element | boolean>(false);
   const openReferencedVerse = async (verseId: string) => {
      try {
         const req = await fetch(
            `https://api.scripture.api.bible/v1/bibles/c315fa9f71d4af3a-01/verses/${verseId}?content-type=text&include-verse-numbers=false`,
            {
               method: "GET",
               headers: {
                  "api-key": `${chosenKey}`
               }
            }
         );
         const json = await req.json();
         setOpenReferencePopUp(
            <NotificationPopup
               title={json.data.reference}
               contentString={json.data.content}
               closeModal={() => {
                  setOpenReferencePopUp(false);
               }}
            />
         );
      } catch (error) {
         console.log(error);
         setOpenReferencePopUp(
            <NotificationPopup
               title='Sorry 🙁'
               contentString='Something went wrong while fetching the source 👎'
               closeModal={() => {
                  setOpenReferencePopUp(false);
               }}
            />
         );
      }
   };
   //referencedVerses.map((verse: string) => verse);
   //const hiddenTextArea = useRef(null);
   return (
      <>
         {openReferencePopUpState}
         <h1 className='std-text-block--small-title'>Preview</h1>
         <div
            className={`std-text-area ${textEditorStyles.textArea} ${textEditorStyles.textAreaPreview}`}
            /*ref={hiddenTextArea}*/
         >
            <>
               <ReactMarkdown skipHtml={true}>{content}</ReactMarkdown>
               {tagsAssigned}
               <div className={`${textEditorStyles.textEditorTags}`}>
                  References:
                  {referencedVerses.map((el: any) => (
                     <div
                        className={textEditorStyles.textEditorVerse}
                        onClick={() => {
                           openReferencedVerse(el.id);
                        }}>
                        {el.name}
                     </div>
                  ))}
               </div>
            </>
         </div>
      </>
   );
};

export default TextEditorPreview;
