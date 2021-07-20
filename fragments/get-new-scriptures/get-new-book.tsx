// Thi component calls for a list of all bible books;

import React, { MouseEventHandler, useEffect, useState, useRef } from "react";
import selectNewScriptureStyles from "../../styles/layouts/SelectNewScripture.module.css";
import { bibleApi } from "../../env";

type getNewBookProps = {
   closeModal: MouseEventHandler;
   openGetNewChapterFunc: any;
   versionId: string;
};

type bibleBooks = {
   id?: string;
   bibleId?: string;
   abbreviation?: string;
   name?: string;
   nameLong?: string;
};
const GetNewBook = ({ closeModal, openGetNewChapterFunc, versionId }: getNewBookProps) => {
   const [getnewChapter, setGetnewChapter] = useState<bibleBooks[]>([]);

   const getNewBook = async () => {
      const requ = await fetch(`https://api.scripture.api.bible/v1/bibles/${versionId}/books`, {
         method: "GET",
         headers: {
            "api-key": bibleApi
         }
      });

      const json = await requ.json();
      setGetnewChapter(json.data);
   };

   useEffect(() => {
      getNewBook();
   }, []);

   return (
      <div className={`full-cover-bkg`}>
         <p className={`std-text-block--small-title ${selectNewScriptureStyles.modalTitle}`}>
            BOOK 📖
         </p>
         <div className={selectNewScriptureStyles.wrapper}>
            <div className='closeModal' onClick={closeModal}>
               X
            </div>
            {getnewChapter.map((el) => (
               <div
                  key={el.id}
                  data-book={`${el.id}`}
                  className={selectNewScriptureStyles.bibleBookRow}
                  onClick={() => openGetNewChapterFunc(el.id)}>
                  <p className={`std-text-block ${selectNewScriptureStyles.stdTextNoMargin}`}>
                     {el.name}
                  </p>
               </div>
            ))}
         </div>
      </div>
   );
};

export default GetNewBook;
