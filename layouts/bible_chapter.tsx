/**************************************************************************************** 
-  This component renders a reading full Bible chapter of the Bible APi. 
-  The rendering is control by a parent's state wich is dependant on the useRouter hook, 
   so everytime a new Scripture is selected, the router is updated and this component 
   re-rendered.
-  this component passes down data to all his children as the prop {data} so that its
   children do not have to refetch
****************************************************************************************/
// core
import { useState, useEffect } from "react";
import Link from "next/link";

// styles
import styles from "./bible_chapter.module.css";

// helpers
import { fetchBibleChapter } from "../helpers/APIs/fetch_bible_chapter";
import { RoundLoader } from "../fragments/chunks/round_loader";
import { ResourceNotFoundError } from "../fragments/chunks/error_resource_not_found";
import { Header } from "../fragments/Typography/header";
import { SelectReadingActions } from "./menus/select_reading_actions";
import Portal from "../hoc/potal";

// helpers
import { higlighterColorPicker } from "../data/color_picker";

type chapterProps = {
   chapterId: string;
   versionId: string;
   fontSize?: string;
};

export const BibleChapter = ({ chapterId, versionId, fontSize = "main" }: chapterProps) => {
   // states
   const [showReadingMenu, setshowReadingMenu] =
      useState<undefined | { verseNumber: string; verseContent: string }>(undefined);
   const [highlightedVerses, sethighlightedVerses] = useState<string[]>([]);
   const [data, setdata] = useState<any>(null);
   const [loading, setloading] = useState("done");

   // fetch the Bible API Data along with the highlighted verses by the user
   const fetchData = async () => {
      const chapter = await fetchBibleChapter(chapterId, versionId);
      //const HLVerses = await getHighlightedVerses()
      if (chapter === undefined) {
         setloading("error");
         setdata(null);
         sethighlightedVerses([]);
      } else {
         setloading("done");
         setdata(chapter);
         sethighlightedVerses([]);
      }
   };

   useEffect(() => {
      fetchData();
   }, []);

   // highlight the verse
   const handleHighlightVerse = (
      color: string | { light: string; dark: string },
      verseId: string,
      ID: string
   ) => {
      // check if the color is transparent with ID of -1 which means the user is removeing the highlight
      if (color === "transparent") {
         // remove the verse from the array
         const findVerse = highlightedVerses.filter(
            (highlight) => highlight && highlight.split(":")[0] !== verseId
         );

         sethighlightedVerses(findVerse);
      } else {
         const highlightedVerse: string = `${verseId}:${ID}`;

         // exclude the verse being highlighted from the saved verses in case it already exists
         const findVerse = highlightedVerses.filter(
            (highlight) => highlight && highlight.split(":")[0] !== verseId
         );

         sethighlightedVerses([...findVerse, `${highlightedVerse}`]);
      }

      // close modal
      setshowReadingMenu(undefined);
   };

   // TODO: Parse references since they are being ignored rn see https://github.com/yodarango-saas/scholar/issues/107#issue-1367003020
   const chapterTitle = data && data.content.split("\n")[0];
   const versesArray = data && data.content.split(/\[[0-9]*\]/g);

   return (
      <>
         {loading === "done" && data && (
            <div className={styles.mainWrapper}>
               {/* Portals */}
               <Portal>
                  {showReadingMenu && (
                     <SelectReadingActions
                        data={{ ...data, ...showReadingMenu }}
                        cta={{
                           handleCloseModal: () => setshowReadingMenu(undefined),
                           handleHighlightVerse
                        }}
                     />
                  )}
               </Portal>
               <div className={styles.chapter}>
                  <Header text={`Chapter ${chapterTitle} `} size='main' color='#B293FE' type={3} />
               </div>

               {/* loop through the data array to render the Chapter  */}
               <div className={styles.versesWrapper}>
                  {versesArray.map((verse: string, index: number) => {
                     // check if the verse is Highlighted
                     const isHighlighted = highlightedVerses.find(
                        (verse) => verse && verse.split(":")[0] === `${chapterId}.${index}`
                     );

                     const highlight = isHighlighted ? isHighlighted.split(":")[1] : "";

                     // get the metadata for the highlighted color if found
                     const getHighlighMeta = higlighterColorPicker.find(
                        (meta) => meta.ID === highlight
                     );

                     return (
                        index !== 0 &&
                        // exclude the chapter and the references
                        index + 1 !== versesArray.length && (
                           <div
                              className={styles.verseLine}
                              key={index}
                              style={{ backgroundColor: getHighlighMeta?.bkgColor }}>
                              <span
                                 onClick={() =>
                                    setshowReadingMenu({
                                       verseNumber: `${index}`,
                                       verseContent: verse
                                    })
                                 }
                                 className={`${styles.verseNumber} ${
                                    index > 99 && styles.bigVerseNumber
                                 }`}>
                                 {index}
                              </span>
                              <p className={styles.verse} style={{ color: getHighlighMeta?.color }}>
                                 <span className={styles.tab}></span>
                                 {verse}
                              </p>
                           </div>
                        )
                     );
                  })}
               </div>
            </div>
         )}

         {loading === "loading" && <RoundLoader />}
         {loading === "done" && data && data.copyright && (
            <p className='scriptures-copyright'>{data.copyright}</p>
         )}
         {loading == "error" && <ResourceNotFoundError />}
      </>
   );
};
