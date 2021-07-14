// core
import React, { useState, useEffect } from "react";

// styles
import scripturesHTMLStyles from "../styles/fragments/popup-content/ScripturesHTML.module.css";

// helpers
import { bibleApi } from "../env";

const Chapter = ({ content }: any) => {
   const checkParenthesis = /^\($$/gm;
   const checkForLastParenthesis = /^\)$/gm;
   const checkTitle = /^[0-9]$/gm;
   const semiColon = /^; {1,1}$/gm;
   const checkForReference = /^([0-9]) |([A-Z])[a-z]{3,} [0-9]{1,3}:[0-9]{1,3}/gm;
   const checkForVerseNum = /^[0-9]{1,2}$/gm;
   const checkForNotesCTA = /(^[0-9]{1,2}):([0-9])/gm;
   const checkForNotes = /^([A-Z])([a-zA-Z]){1,7} ([a-zA-Z])/;
   /*===========check if ther is a title or chapter Number===========*/
   return (
      <div className={scripturesHTMLStyles.mainWrapper}>
     {    for(let i = 0; i < content.length; i++)
         { content[i].map((el: any) => {
            if (el.text) {
               {
                  checkParenthesis.test(el.text) ||
                     (semiColon.test(el.text) && (
                        <span className={scripturesHTMLStyles.reference}>{el.text}</span>
                     ));
               }

               {
                  checkForLastParenthesis.test(el.text) && (
                     <span className={scripturesHTMLStyles.reference}>{el.text}</span>
                  );
               }
               {
                  checkTitle.test(el.text) && (
                     <h2 className={scripturesHTMLStyles.chapter}>Chapter {el.text}</h2>
                  );
               }

               <h2 className={scripturesHTMLStyles.title}>{el.text}</h2>;
            } else if (!el.text && el.items) {
               /*=====check if the string is a a ref====*/
               el.items.map((el: any) => {
                  if (el.text) {
                     {
                        checkForReference.test(el.text) && (
                           <span className={scripturesHTMLStyles.reference}>{el.text}</span>
                        );
                     }
                     <span className={scripturesHTMLStyles.verse}>{el.text}</span>;
                  } else if (!el.text && el.items) {
                     /*=====check if the string is a verse or note====*/
                     el.items.map((el: any) => {
                        if (el.text) {
                           {
                              checkForVerseNum.test(el.text) && (
                                 <span className={scripturesHTMLStyles.verseNumber}>{el.text}</span>
                              );
                           }

                           {
                              checkForNotesCTA.test(el.text) && (
                                 <span className={scripturesHTMLStyles.noteCTA}>{el.text}</span>
                              );
                           }
                           {
                              checkForNotes.test(el.text) && (
                                 <span className={scripturesHTMLStyles.note}>{el.text}</span>
                              );
                           }
                           <span className={scripturesHTMLStyles.verse}>{el.text}</span>;
                        }
                     });
                  }
               });
            }
         })}
      }</div>
   );
};

const FetchChapter = ({ chapterId }: any) => {
   const [contentState, setContentState] = useState<any[]>([]);

   const readDailyWholeChapter = async () => {
      const req = await fetch(
         `https://api.scripture.api.bible/v1/bibles/bba9f40183526463-01/chapters/${chapterId}?content-type=json&include-notes=true&include-chapter-numbers=true&include-verse-spans=true`,
         {
            method: "GET",
            headers: { "api-key": bibleApi }
         }
      );

      const chapterJson = await req.json();
      const chapterData = chapterJson.data;
      const content = chapterData.content;
      setContentState(content);
      console.log(content);
   };

   useEffect(() => {
      readDailyWholeChapter();
   }, []);

   return (
      <>
         <Chapter content={contentState} />
      </>
   );
};

export default FetchChapter;
