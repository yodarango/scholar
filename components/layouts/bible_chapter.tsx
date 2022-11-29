/**************************************************************************************** 
-  This component renders a reading full Bible chapter of the Bible APi. 
-  The rendering is control by a parent's state which is dependant on the useRouter hook, 
   so every time a new Scripture is selected, the router is updated and this component 
   re-rendered via the chapterId prop.
-  this component passes down data to all his children as the prop {data} so that its
   children do not have to refetch
****************************************************************************************/
// core
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

// styles
import styles from "./bible_chapter.module.css";

// components
import { fetchBibleChapter } from "../../helpers/APIs/fetch_bible_chapter";
import { RoundLoader } from "../fragments/chunks/round_loader";
import { ResourceNotFoundError } from "../fragments/chunks/error_resource_not_found";
import { Header } from "../fragments/Typography/header";
import { SelectReadingActions } from "./menus/select_reading_actions";
import Portal from "../hoc/potal";

// helpers
import { higlighterColorPicker } from "../../data/color_picker";
import {
   handleGetHighilightedVerses,
   ThighlightedVersesVariables
} from "../../helpers/functions/reading/highlighted_verses";

// types
import { THighlightVerses } from "../../types/read";
import { handleGetBookmarks, TBookmarksVariables } from "../../helpers/functions/reading/bookmarks";

type chapterProps = {
   chapterId: string | string[]; // string[] is only to satisfy next router type
   fontSize?: string;
   versionId: string;
   theme?: string;
};

export const BibleChapter = ({
   chapterId,
   versionId,
   fontSize = "main",
   theme = "1"
}: chapterProps) => {
   console.log(chapterId, versionId);

   // states
   const [showReadingMenu, setshowReadingMenu] =
      useState<undefined | { verseNumber: string; verseContent: string }>(undefined);
   const [highlightedVerses, sethighlightedVerses] = useState<THighlightVerses[]>([]);
   const [data, setdata] = useState<any>(null);
   const [loading, setloading] = useState("loading");
   const [fntSize, setfntSize] = useState<string | undefined>(fontSize);
   const [thme, setthme] = useState<string | undefined>(fontSize);
   const [hlVaraibles, sethlVariables] = useState<ThighlightedVersesVariables>({
      last_id: 9999999,
      VERSE_ID: "",
      USER_ID: 1001
   });
   // fetch the Bible API Data along with the highlighted verses by the user
   const fetchData = async (chapterId: string | string[], versionId: string) => {
      try {
         const chapter = await fetchBibleChapter(chapterId, versionId);

         if (chapter === undefined) {
            setloading("error");
            setdata(null);
            sethighlightedVerses([]);
         } else {
            // call "done" in the highlighted verses call since it is the last step to run
            setdata(chapter);
            sethlVariables({ ...hlVaraibles, VERSE_ID: chapter.id });
            sethighlightedVerses([]);
         }
      } catch (error) {
         console.error(error);
         setloading("error");
         setdata(null);
         sethighlightedVerses([]);
      }
   };

   // fetch highlighted verses
   const fetchHighLightedVerses = async (variables: ThighlightedVersesVariables) => {
      try {
         const { data }: any = await handleGetHighilightedVerses(variables);
         if (data.highlighted_verses) {
            sethighlightedVerses(data.highlighted_verses);
            setloading("done");
         } else {
            sethighlightedVerses([]);
         }
      } catch (error) {
         sethighlightedVerses([]);
         console.log(error);
      }
   };

   // call chapter data API on chapter Id change
   useEffect(() => {
      fetchData(chapterId, versionId);
   }, [chapterId]);

   // get the highlighted verses
   useEffect(() => {
      if (hlVaraibles.VERSE_ID) {
         fetchHighLightedVerses(hlVaraibles);
      }
   }, [hlVaraibles]);

   // update font
   useEffect(() => {
      const LSExists = localStorage.getItem("reading-preferences");
      if (LSExists) {
         const LSParsed = JSON.parse(LSExists);
         const font = LSParsed.font;
         setfntSize(
            font === "small"
               ? styles.fontSmall
               : font === "main"
               ? styles.fontMain
               : font === "large"
               ? styles.fontLarge
               : styles.fontXlarge
         );
      }
   }, [fontSize]);

   // update theme
   useEffect(() => {
      const LSExists = localStorage.getItem("reading-preferences");
      if (LSExists) {
         const LSParsed = JSON.parse(LSExists);
         const theme = LSParsed.theme;
         setthme(
            theme === "1"
               ? styles.firstTheme
               : theme === "2"
               ? styles.secondTheme
               : theme === "4"
               ? styles.fourthTheme
               : styles.thirdTheme // default one
         );
      }
   }, [theme]);

   // highlight the verse
   const handleHighlightVerse = (
      color: string | { light: string; dark: string },
      VERSE_ID: string,
      highlight_id: number
   ) => {
      // check if the color is transparent with ID of -1 which means the user is removing the highlight
      if (highlight_id === -1) {
         // remove the verse from the array
         const findVerse = highlightedVerses.filter((highlight) => highlight.VERSE_ID !== VERSE_ID);
         sethighlightedVerses(findVerse);
      } else {
         // exclude the verse being highlighted from the saved verses in case it already exists
         const findVerse: THighlightVerses[] = highlightedVerses.filter(
            (highlight) => highlight.VERSE_ID !== VERSE_ID
         );

         sethighlightedVerses([...findVerse, { ID: 2, USER_ID: "1", VERSE_ID, highlight_id }]);
      }

      // close modal
      setshowReadingMenu(undefined);
   };

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
                           handleHighlightVerse: handleHighlightVerse
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
                        (verse) => verse.VERSE_ID === `${chapterId}.${index}`
                     );

                     const highlight = isHighlighted ? isHighlighted.highlight_id : "";

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
                              <p
                                 className={`${styles.verse} ${fntSize} ${thme}`}
                                 style={{ color: getHighlighMeta?.color }}>
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

         {loading === "loading" && (
            <div className={styles.loader}>
               <RoundLoader />
            </div>
         )}
         {loading === "done" && data && data.copyright && (
            <p className='scriptures-copyright'>{data.copyright}</p>
         )}
         {loading == "error" && (
            <div className={styles.error}>
               <ResourceNotFoundError />
            </div>
         )}
      </>
   );
};
