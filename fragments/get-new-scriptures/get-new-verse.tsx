// **************************  PURPOSE ******************************* //
// *** Thi component calls for a list of all bible verses ************ //
// *** based on the result obtained from the "get-new-chapter ******** //
// *** component call ************************************************ //

// core
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

//components
import CardsLazyLoading from "../../layouts/cards-lazy-loading";

// styles
import selectNewScriptureStyles from "../../styles/layouts/SelectNewScripture.module.css";
import cardsLazyLoadingStyles from "../../styles/layouts/CardsLazyLoading.module.css";

// helpers

// others

type getNewVerseProps = {
   closeModal: React.MouseEventHandler;
   goBackModal: React.MouseEventHandler;
   renderSelectedVerse: React.MouseEventHandler;
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
const GetNewVerse = ({
   chapterId,
   closeModal,
   goBackModal,
   renderSelectedVerse,
   versionId
}: getNewVerseProps) => {
   // loading state
   const [loadingState, setLoadingState] = useState<string>("loading");

   const [getNewVerse, setGetNewVerse] = useState<TnewVerse[]>([]);

   const getNewChapterFunct = async () => {
      try {
         const resp = await fetch(
            `https://api.scripture.api.bible/v1/bibles/${versionId}/chapters/${chapterId}/verses`,
            {
               method: "GET",
               headers: {
                  "api-key": `${process.env.NEXT_PUBLIC_BIBLE_API_KEY}`
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
      <>
         <div className={`full-cover-bkg ${selectNewScriptureStyles.majorWrapperVerse}`}>
            <p className={`std-text-block--small-title ${selectNewScriptureStyles.modalTitle}`}>
               VERSE 📃
            </p>
            <div className={selectNewScriptureStyles.wrapper}>
               <div className='closeModal' onClick={closeModal}>
                  X
               </div>
               <div className='goBack' onClick={goBackModal}>
                  {"<"}
               </div>
               {getNewVerse.length > 0 &&
                  getNewVerse.map((el) => (
                     <Link href={`/?verse=${el.id}`}>
                        <a
                           key={el.id}
                           data-verse={`${el.id}`}
                           data-name={`${el.reference}`}
                           className={selectNewScriptureStyles.bibleBookRow}
                           onClick={renderSelectedVerse}>
                           <p
                              className={`std-text-block ${selectNewScriptureStyles.stdTextNoMargin}`}>
                              {el.reference}
                           </p>
                        </a>
                     </Link>
                  ))}
               {loadingState == "loading" && (
                  <CardsLazyLoading
                     amount={30}
                     compClass={cardsLazyLoadingStyles.selectScriptureVerseBook}
                  />
               )}

               {loadingState == "error" && (
                  <div className={cardsLazyLoadingStyles.errorImage}>
                     <Image layout='fill' alt='resource not found' src={"/Parks10.png"} />
                  </div>
               )}
            </div>
         </div>
      </>
   );
};

export default GetNewVerse;
