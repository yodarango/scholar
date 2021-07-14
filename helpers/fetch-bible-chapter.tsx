// styles
import scripturesHTMLStyles from "../styles/fragments/popup-content/ScripturesHTML.module.css";

// helpers
import { bibleApi } from "../env";

// ========== DATA STRUCTURE =============
/// The chapter data comes in json in the "content" key value
////// (The option of fetching HTML exists to)
/// what it is being fetch below is the array of objects contained in the "content" key
/// There are four main types of data returned which are being fetched by the function and each is nested inside the array further with repect to html tags hierarchy:

/// content: [{
//    first-level: titles and chapter numbers
//    second-level: [{
//       second-level: referenced chapters
//       third-level: [{
//          third-level: verse parragraphs and notes
//       }]
//    }]
// }]

const chapter = (content: any) => {
   const versesArray: any[] = [];

   for (let i = 0; i < content.length; i++) {
      /*===========check if ther is a title or chapter Number===========*/
      content[i].map((el: any) => {
         if (el.text) {
            const checkParenthesis = /^\($$/gm;
            const checkForLastParenthesis = /^\)$/gm;
            const checkTitle = /^[0-9]$/gm;
            const semiColon = /^; {1,1}$/gm;
            if (checkParenthesis.test(el.text) || semiColon.test(el.text)) {
               versesArray.push(`<span class=${scripturesHTMLStyles.reference}>${el.text}</span>`);
            } else if (checkForLastParenthesis.test(el.text)) {
               versesArray.push(
                  `<span class=${scripturesHTMLStyles.reference}>${el.text}</span><div class=${scripturesHTMLStyles.verseSpacer}></div>`
               );
            } else if (checkTitle.test(el.text)) {
               versesArray.push(
                  `<h2 class=${scripturesHTMLStyles.chapter}>Chapter ${el.text}</h2>`
               );
            } else {
               versesArray.push(`<h2 class=${scripturesHTMLStyles.title}>${el.text}</h2>`);
            }
         } else if (!el.text && el.items) {
            /*=====check if the string is a a ref====*/
            el.items.map((el: any) => {
               const checkForReference = /^([0-9]) |([A-Z])[a-z]{3,} [0-9]{1,3}:[0-9]{1,3}/gm;
               if (el.text) {
                  if (checkForReference.test(el.text)) {
                     versesArray.push(
                        `<span class=${scripturesHTMLStyles.reference}>${el.text}</span>`
                     );
                  } else {
                     versesArray.push(
                        `<span class=${scripturesHTMLStyles.verse}>${el.text}</span>`
                     );
                  }
               } else if (!el.text && el.items) {
                  /*=====check if the string is a verse or note====*/
                  el.items.map((el: any) => {
                     const checkForVerseNum = /^[0-9]{1,2}$/gm;
                     const checkForNotesCTA = /(^[0-9]{1,2}):([0-9])/gm;
                     const checkForNotes = /^([A-Z])([a-zA-Z]){1,7} ([a-zA-Z])/;
                     if (el.text) {
                        if (checkForVerseNum.test(el.text)) {
                           versesArray.push(
                              `<div class=${scripturesHTMLStyles.verseSpacer}></div><span class=${scripturesHTMLStyles.verseNumber}>${el.text}</span>`
                           );
                        } else if (checkForNotesCTA.test(el.text)) {
                           versesArray.push(
                              `<span class=${scripturesHTMLStyles.noteCTA}>${el.text}</span>`
                           );
                        } else if (checkForNotes.test(el.text)) {
                           versesArray.push(
                              `<span class=${scripturesHTMLStyles.note} disabled>${el.text}</span>`
                           );
                        } else {
                           versesArray.push(
                              `<span class=${scripturesHTMLStyles.verse}>${el.text}</span>`
                           );
                        }
                     } // else if (!el.text && el.items) {
                     //    /*=====check if the string is a note====*/
                     //    el.items.map((el: any) => {
                     //       const checkForNotes = /(^[0-9]{1,2}):([0-9]{1,3})/gm;
                     //       if (el.text) {
                     //          if (checkForNotes.test(el.text)) {
                     //             versesArray.push(
                     //                `<span class=${scripturesHTMLStyles.note}>${el.text}</span>`
                     //             );
                     //          } else {
                     //             versesArray.push(
                     //                `<span class=${scripturesHTMLStyles.note}>${el.text}</span>`
                     //             );
                     //          }
                     //       }
                     //    });
                     // }
                  });
               }
            });
         }
      });
   }
   return versesArray;
};

export const readDailyWholeChapter = async (chapterId?: string) => {
   const req = await fetch(
      `https://api.scripture.api.bible/v1/bibles/bba9f40183526463-01/chapters/${chapterId}?content-type=json&include-notes=true&include-chapter-numbers=true&include-verse-spans=true`,
      {
         method: "GET",
         headers: { "api-key": bibleApi }
      }
   );

   const chapterJson = await req.json();
   const chapterData = chapterJson.data;
   const content = chapterData.content.map((el: any) => {
      if (el.items) return el.items;
   });

   return chapter(content);
};
