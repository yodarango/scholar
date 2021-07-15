// core
import React, { useState, useEffect } from "react";
import Link from "next/link";

// components
import NotificationPopup from "../fragments/notification-popup";

// styles
import scripturesHTMLStyles from "../styles/fragments/popup-content/ScripturesHTML.module.css";

// helpers
import { bibleApi } from "../env";

const Chapter = ({ chapterId }: any) => {
   // FUNCTION: ===========  get the netire chapter by passing a chaoter Id  ===========
   const [contentState, setContentState] = useState<any[]>([]);
   const [copyrightState, setCopyrightState] = useState<string>('');

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
      setCopyrightState(chapterData.copyright)
      console.log(content)
   };

   useEffect(() => {
      readDailyWholeChapter();
   }, []);

   // ==============FUNCTION:  Get a referenced scripture =================
   const [openRefState, setOpenRefState] = useState<JSX.Element | boolean>(false);
   const openNote = (e: any) => {
      console.log(e.target.textContent);
      setOpenRefState(
         <NotificationPopup
            title='Note'
            closeModal={() => setOpenRefState(false)}
            contentString={e.target.textContent}
            newClass={scripturesHTMLStyles.verseRefPopup}
         />
      );
   };

   const openReference = async (verseRef: string) => {
      const req = await fetch(
         `https://api.scripture.api.bible/v1/bibles/bba9f40183526463-01/verses/${verseRef}?content-type=html&include-verse-numbers=true`,
         {
            method: "GET",
            headers: {
               "api-key": bibleApi
            }
         }
      );

      const verseData = await req.json();
      console.log(verseData.data);
      
      setOpenRefState(
         <NotificationPopup
            title={verseData.data.reference}
            closeModal={() => setOpenRefState(false)}
            contentString={<><div dangerouslySetInnerHTML={{__html: verseData.data.content}}></div> <span className="scriptures-copyright">{verseData.data.copyright}</span></>}
            newClass={scripturesHTMLStyles.verseRefPopup}
         />
      );
   };
   return (
      <>
         {openRefState}
         <div key={`${Math.random()}`} className={scripturesHTMLStyles.mainWrapper}>
            {/* CHAPTER NUM AND TITLES: distinguish the type of contents in the first array of objects in the "content" property where c = chapter, s1 = subtitle, and m= message*/}
            {contentState.map((content: any) =>
               content.attrs && content.attrs.style !== "r" && content.attrs.style !== "b" && content.attrs.style !== "c" ? (
                  content.items.map((chapter: any) => (
                     <>
                        {/* not all objects will have a title, render a tag for it onlyif it exists */}
                        {chapter.text && <span className={scripturesHTMLStyles.title}>{chapter.text}</span>}
                        {chapter.items
                           ? /* VERSES: check the second array of objects inside the "items" property of the first array */
                             chapter.items.map((verse: any) => (
                                <span>
                                   {verse.items && verse.name === "verse"
                                      ? /* NOTES: check the third array of objects inside the "items" property of the first array */
                                        // check if the text is a verse number
                                        verse.items.map((verseNum: any) => (
                                           <span>
                                              <div
                                                 className={scripturesHTMLStyles.verseSpacer}></div>
                                              <span
                                                 key={verseNum.text}
                                                 className={scripturesHTMLStyles.verseNumber}>
                                                 {verseNum.text}
                                              </span>
                                           </span>
                                        ))
                                      : verse.items && verse.attrs.style === "ft"
                                      ? // check if the text is a note reference
                                        verse.items.map((notes: any) => (
                                           <span
                                              className={scripturesHTMLStyles.note}
                                              onClick={openNote}>
                                              {notes.text}
                                           </span>
                                        ))
                                      : verse.items && verse.attrs.style === "fr"
                                      ? // check if the text is a note text
                                        verse.items.map((notes: any) => (
                                           <span className={scripturesHTMLStyles.noteCTA}>
                                              {notes.text}
                                           </span>
                                        ))
                                      : null}
                                   <span className={scripturesHTMLStyles.verse}> {verse.text}</span>
                                </span>
                             ))
                           : null}
                     </>
                  ))
               ) : content.attrs && content.attrs.style === "r" ? (
                  /* distinguish the type of contents in the first array of objects in the "content" property where c = chapter, s1 = subtitle, and m= message*/
                  <div className={scripturesHTMLStyles.referenceWrapper}>
                     {content.items.map((chapter: any) => (
                        <>
                           <span className={scripturesHTMLStyles.reference}>{chapter.text}</span>
                           {chapter.items ? (
                              <span className={scripturesHTMLStyles.refwrapper}>
                                 <span
                                    onClick={() => openReference(chapter.attrs.id)}
                                    className={scripturesHTMLStyles.refVerseId}>
                                    {chapter.items.map((referenceText: any) => (
                                       <span className={scripturesHTMLStyles.reference}>
                                          {referenceText.text}
                                       </span>
                                    ))}
                                 </span>
                              </span>
                           ) : null}
                        </>
                     ))}
                  </div>
               ) : content.attrs && content.attrs.style === "b" ? null : content.attrs && content.attrs.style === "c"? 
               // check it the text is a chapter number
               <div className ={scripturesHTMLStyles.chapter}>Chapter {content.attrs.number}</div> : null
            )}
         </div>
         <div className="small-spacer"></div>
         <p className="scriptures-copyright">{copyrightState}</p>
      </>
   );
};

export default Chapter;
