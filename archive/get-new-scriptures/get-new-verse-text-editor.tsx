// **************************  PURPOSE ******************************* //
// *** Thi component calls for a list of all bible verses ************ //
// *** based on the result obtained from the "get-new-chapter ******** //
// *** component call for the textEditor comp only ******************* //

// core
import { useEffect, useState } from "react";
import Image from "next/image";

//components
import CardsLazyLoading from "../../layouts/cards-lazy-loading";
import ResourceNotFoundError from "../chunks/error_resource_not_found";

// styles
import selectNewScriptureStyles from "../../styles/layouts/selectNewScriptureError.module.css";
import cardsLazyLoadingStyles from "../../styles/layouts/CardsLazyLoading.module.css";

// helpers
import { chosenKey } from "../../helpers/APIs/select-random-api-key";

// others

type getNewVerseProps = {
   closeModal: React.MouseEventHandler;
   goBackModal: React.MouseEventHandler;
   renderSelectedVerse: any;
   chapterId?: string;
   versionId: string;
};

export type TnewVerse = {
   id: string;
   orgId: string;
   bibleId: string;
   chapterId: string;
   reference: string;
};
const GetNewVerseTextEdito = ({
   chapterId,
   closeModal,
   goBackModal,
   renderSelectedVerse,
   versionId
}: getNewVerseProps) => {
   // loading state
   const [loadingState, setLoadingState] = useState<string>("loading");
   const [getNewVerse, setGetNewVerse] = useState<TnewVerse[] | null>(null);

   const getNewChapterFunct = async () => {
      try {
         const req = await fetch(
            `https://api.scripture.api.bible/v1/bibles/${versionId}/chapters/${chapterId}/verses`,
            {
               method: "GET",
               headers: {
                  "api-key": `${chosenKey}`
               }
            }
         );
         const res = await req.json();
         res.data ? (setGetNewVerse(res.data), setLoadingState("done")) : setLoadingState("error");
      } catch (error) {
         setLoadingState("error");
         setGetNewVerse(null);
         console.log(error);
      }
   };

   useEffect(() => {
      getNewChapterFunct();
   }, []);

   return (
      <>
         <div className={`full-cover-bkg ${selectNewScriptureStyles.majorWrapperVerse}`}>
            <p className={`std-text-block--small-title ${selectNewScriptureStyles.modalTitle}`}>
               VERSE 📃
            </p>
            <div className={selectNewScriptureStyles.wrapper}>
               <div className='closeModal' onClick={closeModal}>
                  X
               </div>
               <div className='goBack' onClick={goBackModal}></div>
               {getNewVerse &&
                  loadingState === "done" &&
                  getNewVerse.map((el) => (
                     <div onClick={(e: any) => (e.target.style.color = "#ff9214")}>
                        <div
                           key={el.id}
                           data-verse={`${el.id}`}
                           data-name={`${el.reference}`}
                           className={selectNewScriptureStyles.bibleBookRow}
                           onClick={() => renderSelectedVerse(el)}>
                           <p
                              className={`std-text-block ${selectNewScriptureStyles.stdTextNoMargin}`}>
                              {el.reference}
                           </p>
                        </div>{" "}
                     </div>
                  ))}
               {loadingState == "loading" && (
                  <CardsLazyLoading
                     amount={30}
                     compClass={cardsLazyLoadingStyles.selectScriptureVerseBook}
                  />
               )}

               {loadingState == "error" && <ResourceNotFoundError />}
            </div>
         </div>
      </>
   );
};

export default GetNewVerseTextEdito;
