// **************************  PURPOSE ******************************* //
// *** Thi component calls for a list of all bible chapters ********** //
// *** based on the result obtained from the "get-new-book" ********** //
// *** component call ************************************************ //

// core
import { useEffect, useState } from "react";
import Image from "next/image";

// components
import CardsLazyLoading from "../../layouts/cards-lazy-loading";

// styles
import selectNewScriptureStyles from "../../styles/layouts/SelectNewScripture.module.css";
import cardsLazyLoadingStyles from "../../styles/layouts/CardsLazyLoading.module.css";

//helpers
import { chosenKey } from "../../helpers/APIs/select-random-api-key";

// others
//import { bibleApi } from "../../env";

type getNewChapterProps = {
   closeModal: React.MouseEventHandler;
   goBackModal: React.MouseEventHandler;
   openGetNewVerse: any;
   bookId?: string;
   versionId: string;
};

export type TnewChapter = {
   id: string;
   bibleId: string;
   bookId: string;
   number: string;
   reference: string;
};
const GetNewChapter = ({
   closeModal,
   bookId,
   goBackModal,
   openGetNewVerse,
   versionId
}: getNewChapterProps) => {
   const [getNewVerse, setGetNewVerse] = useState<TnewChapter[]>([]);

   const [loadingState, setLoadingState] = useState<string>("loading");

   const getNewChapterFunct = async () => {
      try {
         const resp = await fetch(
            `https://api.scripture.api.bible/v1/bibles/${versionId}/books/${bookId}/chapters`,
            {
               method: "GET",
               headers: {
                  "api-key": `${chosenKey}`
               }
            }
         );
         const json = await resp.json();
         setGetNewVerse(json.data);
         setLoadingState("done");
      } catch (error) {
         setLoadingState("error");
         setGetNewVerse([]);
         console.log(error);
      }
   };

   useEffect(() => {
      getNewChapterFunct();
   }, []);

   return (
      <div className={`full-cover-bkg ${selectNewScriptureStyles.majorWrapperChapter}`}>
         <p className={`std-text-block--small-title ${selectNewScriptureStyles.modalTitle}`}>
            CHAPTER 🔢
         </p>
         <div
            className={(selectNewScriptureStyles.wrapper, selectNewScriptureStyles.wrapperChapter)}>
            <div className='closeModal' onClick={closeModal}>
               X
            </div>
            <div className='goBack' onClick={goBackModal}>
               {"<"}
            </div>
            {getNewVerse.length > 0 &&
               getNewVerse.map((el) => (
                  <div
                     key={el.id}
                     data-chapter={`${el.id}`}
                     className={selectNewScriptureStyles.bibleBookChapter}
                     onClick={() => openGetNewVerse(el)}>
                     <p className={`std-text-block`}>{el.number}</p>
                  </div>
               ))}

            {loadingState == "loading" && (
               <CardsLazyLoading
                  amount={30}
                  compClass={cardsLazyLoadingStyles.selectScriptureChapter}
               />
            )}

            {loadingState == "error" && (
               <div className={cardsLazyLoadingStyles.errorImage}>
                  <Image layout='fill' alt='resource not found' src={"/Parks10.png"} />
               </div>
            )}
         </div>
      </div>
   );
};

export default GetNewChapter;
