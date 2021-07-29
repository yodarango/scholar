import React, { useEffect, useState, useRef } from "react";
import { bibleApi } from "../../env";
import selectNewScriptureStyles from "../../styles/layouts/SelectNewScripture.module.css";

type getNewChapterProps = {
   closeModal: React.MouseEventHandler;
   goBackModal: React.MouseEventHandler;
   openGetNewVerse: any;
   bookId?: string;
   versionId: string;
};

export type InewChapter = {
   id?: string;
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
   const [getNewVerse, setGetNewVerse] = useState<InewChapter[]>([]);
   const currentWrapper = useRef<HTMLDivElement>(null);

   const getNewChapterFunct = async () => {
      const resp = await fetch(
         `https://api.scripture.api.bible/v1/bibles/${versionId}/books/${bookId}/chapters`,
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
      console.log(currentWrapper);
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
            {getNewVerse.map((el) => (
               <div
                  key={el.id}
                  data-chapter={`${el.id}`}
                  className={selectNewScriptureStyles.bibleBookChapter}
                  onClick={() => openGetNewVerse(el)}>
                  <p className={`std-text-block`}>{el.number}</p>
               </div>
            ))}
         </div>
      </div>
   );
};

export default GetNewChapter;
