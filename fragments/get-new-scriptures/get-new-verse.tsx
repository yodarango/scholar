import React, { useEffect, useState } from "react";
import selectNewScriptureStyles from "../../styles/layouts/SelectNewScripture.module.css";
import { bibleApi } from "../../env";

type getNewVerseProps = {
   closeModal: React.MouseEventHandler;
   goBackModal: React.MouseEventHandler;
   renderSelectedVerse: React.MouseEventHandler;
   chapterId?: string;
};

type InewVerse = {
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
   renderSelectedVerse
}: getNewVerseProps) => {
   const [getNewVerse, setGetNewVerse] = useState<InewVerse[]>([]);

   const getNewChapterFunct = async () => {
      const resp = await fetch(
         `https://api.scripture.api.bible/v1/bibles/c315fa9f71d4af3a-01/chapters/${chapterId}/verses`,
         {
            method: "GET",
            headers: {
               "api-key": bibleApi
            }
         }
      );
      const json = await resp.json();
      setGetNewVerse(json.data);
      console.log(json);
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
               {getNewVerse.map((el) => (
                  <div
                     key={el.id}
                     data-verse={`${el.id}`}
                     data-name={`${el.reference}`}
                     className={selectNewScriptureStyles.bibleBookRow}
                     onClick={renderSelectedVerse}>
                     <p className={`std-text-block ${selectNewScriptureStyles.stdTextNoMargin}`}>
                        {el.reference}
                     </p>
                  </div>
               ))}
            </div>
         </div>
      </>
   );
};

export default GetNewVerse;
