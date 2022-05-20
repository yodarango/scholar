// core
import { useState, useEffect } from "react";
//import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";

// components
import NotificationPopup from "../fragments/notification-popup";
import ResourceNotFoundError from "./resource-not-found-error";

// styles
import fetchNewChapterStyles from "../styles/layouts/FetchNewChapter.module.css";
import cardsLazyLoadingStyles from "../styles/layouts/CardsLazyLoading.module.css";
import CardsLazyLoading from "./cards-lazy-loading";

// helpers
import { chosenKey } from "../helpers/APIs/select-random-api-key";

type chapterProps = {
   chapterId: string | boolean | undefined;
   versionId: string | boolean;
};
const Chapter = ({ chapterId, versionId }: chapterProps) => {
   // FUNCTION: ===========  get the netire chapter by passing a chaoter Id  ===========
   const [contentState, setContentState] = useState<any[]>([]);
   const [copyrightState, setCopyrightState] = useState<string>("");
   const [loadingState, setLoadingState] = useState("loading");

   const readDailyWholeChapter = async () => {
      try {
         const req = await fetch(
            `https://api.scripture.api.bible/v1/bibles/${versionId}/chapters/${chapterId}?content-type=json&include-notes=true&include-chapter-numbers=true&include-verse-spans=true&include-titles=true`,
            {
               method: "GET",
               headers: { "api-key": `${chosenKey}` }
            }
         );
         const chapterJson = await req.json();
         const chapterData = chapterJson.data;
         const content = chapterData.content;
         setContentState(content);
         setCopyrightState(chapterData.copyright);
         setLoadingState("done");
      } catch (error) {
         console.log(error);
         setLoadingState("error");
      }
   };

   useEffect(() => {
      readDailyWholeChapter();
   }, []);

   // ==============FUNCTION:  Get a referenced scripture =================
   const [openRefState, setOpenRefState] = useState<JSX.Element | boolean>(false);
   const openNote = (e: any) => {
      setOpenRefState(
         <NotificationPopup
            title='Note'
            closeModal={() => setOpenRefState(false)}
            contentString={e.target.textContent}
            newClass={fetchNewChapterStyles.verseRefPopup}
         />
      );
   };

   const openReference = async (verseRef: string) => {
      try {
         const req = await fetch(
            `https://api.scripture.api.bible/v1/bibles/${versionId}/verses/${verseRef}?content-type=html&include-verse-numbers=true&include-titles=true`,
            {
               method: "GET",
               headers: {
                  "api-key": `${chosenKey}`
               }
            }
         );

         const verseData = await req.json();
         console.log(verseData.data);

         setOpenRefState(
            <NotificationPopup
               title={verseData.data.reference}
               closeModal={() => setOpenRefState(false)}
               contentString={
                  <>
                     <div dangerouslySetInnerHTML={{ __html: verseData.data.content }}></div>{" "}
                     <span className='scriptures-copyright'>{verseData.data.copyright}</span>
                  </>
               }
               newClass={fetchNewChapterStyles.verseRefPopup}
            />
         );
      } catch (error) {
         console.log(error);
         setOpenRefState(
            <NotificationPopup
               title='Sorry 🙁'
               closeModal={() => setOpenRefState(false)}
               contentString='Something went wrong while fetching the spurce'
               newClass='notification-wrapper--Error'
            />
         );
      }
   };
   return (
      <>
         {openRefState}
         {loadingState === "done" && contentState && (
            <div className={fetchNewChapterStyles.mainWrapper}>
               {/* CHAPTER NUM AND TITLES: distinguish the type of contents in the first array of objects in the "content" property where c = chapter, s1 = subtitle, and m= message*/}
               {contentState.map((content: any) =>
                  content.attrs &&
                  content.attrs.style !== "r" &&
                  content.attrs.style !== "b" &&
                  content.attrs.style !== "c" ? (
                     content.items.map((chapter: any) => (
                        <>
                           {/* not all objects will have a title, render a tag for it onlyif it exists */}
                           {chapter.text && (
                              <span
                                 key={chapter.text}
                                 /*id={chapter.attrs.style}*/ className={
                                    fetchNewChapterStyles.title
                                 }>
                                 {chapter.text}
                              </span>
                           )}
                           {chapter.items
                              ? /* VERSES: check the second array of objects inside the "items" property of the first array */
                                chapter.items.map((verse: any) => (
                                   <span>
                                      {verse.items && verse.name === "verse"
                                         ? /* NOTES: check the third array of objects inside the "items" property of the first array */
                                           // check if the text is a verse number
                                           verse.items.map((verseNum: any) => (
                                              <span key={verse.attrs.sid}>
                                                 <div
                                                    className={
                                                       fetchNewChapterStyles.verseSpacer
                                                    }></div>
                                                 {verse.attrs.sid && (
                                                    <Link
                                                       href={`/?verse=${verse.attrs.sid.replace(
                                                          /[\s:]/g,
                                                          "."
                                                       )}`}>
                                                       <a
                                                          key={verseNum.text}
                                                          className={
                                                             fetchNewChapterStyles.verseNumber
                                                          }
                                                          id={verse.attrs.style}>
                                                          {verseNum.text}
                                                       </a>
                                                    </Link>
                                                 )}
                                              </span>
                                           ))
                                         : (verse.items && verse.attrs.style === "ft") ||
                                           (verse.items && verse.attrs.style === "fl") ||
                                           (verse.items && verse.attrs.style === "fqa")
                                         ? // check if the text is a note reference
                                           verse.items.map((notes: any) => (
                                              <span
                                                 id={verse.attrs.style}
                                                 className={fetchNewChapterStyles.note}
                                                 onClick={openNote}>
                                                 {notes.text}
                                              </span>
                                           ))
                                         : verse.items && verse.attrs.style === "fr"
                                         ? // check if the text is a note text
                                           verse.items.map((notes: any) => (
                                              <span
                                                 id={verse.attrs.style}
                                                 className={fetchNewChapterStyles.noteCTA}>
                                                 {notes.text}
                                              </span>
                                           ))
                                         : (verse.items && verse.attrs.style === "xt") ||
                                           verse.attrs.style === "xo"
                                         ? // some older translations have odd notes, these will be hidden
                                           verse.items.map((notes: any) => (
                                              <span
                                                 id={verse.attrs.style}
                                                 className={fetchNewChapterStyles.hideElement}>
                                                 {notes.text}
                                              </span>
                                           ))
                                         : /*changed*/ verse.items && verse.attrs.style !== "fr"
                                         ? verse.items.map((notes: any) => (
                                              <span
                                                 id={verse.attrs.style}
                                                 className={fetchNewChapterStyles.verse}>
                                                 {notes.text}
                                              </span>
                                           ))
                                         : null}
                                      <span
                                         id={verse.attrs.style}
                                         className={fetchNewChapterStyles.verse}>
                                         {" "}
                                         {verse.text}
                                      </span>
                                   </span>
                                ))
                              : null}
                        </>
                     ))
                  ) : content.attrs && content.attrs.style === "r" ? (
                     /* distinguish the type of contents in the first array of objects in the "content" property where c = chapter, s1 = subtitle, and m= message*/
                     <div className={fetchNewChapterStyles.referenceWrapper}>
                        {content.items.map((chapter: any) => (
                           <>
                              <span
                                 id={content.attrs.style}
                                 className={fetchNewChapterStyles.reference}>
                                 {chapter.text}
                              </span>
                              {chapter.items ? (
                                 <span className={fetchNewChapterStyles.refwrapper}>
                                    <span
                                       id={chapter.attrs.style}
                                       onClick={() => openReference(chapter.attrs.id)}
                                       className={fetchNewChapterStyles.refVerseId}>
                                       {chapter.items.map((referenceText: any) => (
                                          <span className={fetchNewChapterStyles.reference}>
                                             {referenceText.text}
                                          </span>
                                       ))}
                                    </span>
                                 </span>
                              ) : null}
                           </>
                        ))}
                     </div>
                  ) : content.attrs && content.attrs.style === "b" ? null : content.attrs &&
                    content.attrs.style === "c" ? (
                     // check it the text is a chapter number
                     <div id={content.attrs.style} className={fetchNewChapterStyles.chapter}>
                        Chapter {content.attrs.number}
                     </div>
                  ) : null
               )}
            </div>
         )}
         {loadingState === "loading" && (
            <CardsLazyLoading amount={2} compClass={cardsLazyLoadingStyles.wholeChapterRead} />
         )}
         <div className='small-spacer'></div>
         {loadingState === "done" && copyrightState && (
            <p className='scriptures-copyright'>{copyrightState}</p>
         )}
         {loadingState == "error" && <ResourceNotFoundError />}
      </>
   );
};

//export default dynamic(() => Promise.resolve(Chapter), { ssr: false });
export default Chapter;
