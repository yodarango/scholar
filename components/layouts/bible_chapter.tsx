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
   ThandlePostHighlight,
   handlePostHighlight,
   ThighlightedVersesVariables,
   handleRemoveHighlight
} from "../../helpers/functions/reading/highlighted_verses";

// types
import { THighlightVerses } from "../../types/read";
import { CONTENT_LAST_ID } from "../../constants/defaults";
import { GRADIENT_1__LIGHT } from "../../constants/tokens";
import { errorMessages } from "../../data/error_messages";
import {
   handleGetChapterRefs,
   useGetChapterData
} from "../../helpers/functions/reading/use_chapter_data";
import { ViewCommentary } from "../templates/posts/view_commentary";
import PortalTernary from "../hoc/portal_ternary";

type chapterProps = {
   chapterId: string | string[]; // string[] is only to satisfy next router type
   searchText?: string; //finds a string within a verse
   fontSize?: string;
   versionId: string;
   theme?: string;
   userId?: string;
   cta: {
      handleUpdateTextSearchCount: (count: number) => void;
   };
};

export const BibleChapter = ({
   chapterId,
   versionId,
   fontSize = "main",
   searchText,
   theme = "1",
   userId,
   cta
}: chapterProps) => {
   const router = useRouter();

   // states
   const [showReadingMenu, setshowReadingMenu] = useState<
      undefined | { verseNumber: string; verseContent: string }
   >(undefined);

   const [highlightedVerses, sethighlightedVerses] = useState<THighlightVerses[]>([]);
   const [data, setdata] = useState<any>(null);
   const [loading, setloading] = useState("loading");
   const [fntSize, setfntSize] = useState<string | undefined>(fontSize);
   const [thme, setthme] = useState<string | undefined>(fontSize);
   const [hlVaraibles, sethlVariables] = useState<ThighlightedVersesVariables>({
      last_id: CONTENT_LAST_ID,
      VERSE_ID: "",
      USER_ID: userId
   });

   const [versesArray, setversesArray] = useState<{ text: string; meta: any }[]>([
      { text: "", meta: {} }
   ]);
   const [chapterTitle, setchapterTitle] = useState<string>("");

   const getChapterRefsVars = {
      VERSE_ID: typeof chapterId === "string" ? chapterId : "",
      USER_ID: userId,
      last_id: CONTENT_LAST_ID
   };
   const [commentaries, setcommentaries] = useState([]);
   const [commentaryModal, setcommentaryModal] = useState<string>("none");

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
   const fetchChapterData = async (variables: ThighlightedVersesVariables) => {
      try {
         const highlights: any = await handleGetHighilightedVerses(variables);
         const refs: any = await handleGetChapterRefs(getChapterRefsVars);
         if (highlights.data?.highlighted_verses) {
            sethighlightedVerses(highlights.data.highlighted_verses);
            setloading("done");
         } else {
            setloading("done");
            sethighlightedVerses([]);
            console.warn(errorMessages.read.noHighlightVerses.description);
         }

         // chapter comments
         if (refs.data) {
            setcommentaries(refs.data);
            setloading("done");
         } else {
            setloading("done");
            setcommentaries([]);
            console.warn(errorMessages.read.noChapterRefs.description);
         }
      } catch (error) {
         setloading("done");
         sethighlightedVerses([]);
         console.error(error);
      }
   };

   // call chapter data API on chapter Id change
   useEffect(() => {
      fetchData(chapterId, versionId);
   }, [chapterId]);

   // get the highlighted verses
   useEffect(() => {
      if (hlVaraibles.VERSE_ID) {
         fetchChapterData(hlVaraibles);
      }
   }, [hlVaraibles]);

   // highlight the verse
   const handleHighlightVerse = async ({
      VERSE_ID,
      highlight_type,
      color
   }: ThandlePostHighlight) => {
      // check if the color is transparent with ID of -1 which means the user is removing the highlight
      if (highlight_type === -1) {
         try {
            const { data } = await handleRemoveHighlight(VERSE_ID);
            if (data) {
               // if the verse is removed remove the verse from the array
               const findVerse = highlightedVerses.filter(
                  (highlight) => highlight.VERSE_ID !== VERSE_ID
               );

               sethighlightedVerses(findVerse);
            }
         } catch (error) {
            console.error(error);
         }
      } else {
         try {
            const { data } = await handlePostHighlight({
               VERSE_ID,
               highlight_type,
               color
            });

            if (data.VERSE_ID) {
               // exclude the verse being highlighted from the saved verses in case it already exists
               const findVerse: THighlightVerses[] = highlightedVerses.filter(
                  (highlight) => highlight.VERSE_ID !== VERSE_ID
               );
               sethighlightedVerses([
                  ...findVerse,
                  { ID: 2, USER_ID: "1", VERSE_ID, highlight_type }
               ]);
            }
         } catch (error) {
            console.error(error);
         }
      }

      // close modal
      setshowReadingMenu(undefined);
   };

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

   useEffect(() => {
      let verse = data && data.content.split(/\[[0-9]*\]/g);
      const chapterTitle = data && data.content.split("\n")[0];
      verse =
         verse &&
         verse.map((verse: string, i: number) => ({
            text: verse.replaceAll("¶", ""),
            meta: {
               // random ID so we can find this verse when fileting
               uid: i * Math.floor(Math.random() * 9000) + 100
            }
         }));

      setchapterTitle(chapterTitle);
      setversesArray(verse);
   }, [data]);

   // filter the verses based on the search text
   useEffect(() => {
      if (!searchText || searchText === "") {
         setversesArray(
            versesArray.map((verse) => ({
               ...verse,
               meta: { ...verse.meta, isSearchResult: false }
            }))
         );

         cta.handleUpdateTextSearchCount(0);
      } else if (searchText) {
         // remove the previous search
         const removePreviousSearch = versesArray.map((verse) => ({
            ...verse,
            meta: { ...verse.meta, isSearchResult: false }
         }));

         const search = searchText.toLowerCase();
         const findVerse = versesArray.filter((verse) => verse.text.toLowerCase().includes(search));

         let updatedVerse = versesArray;
         let findVerseIndex: number[] = [];

         findVerse.map((verse1) => {
            let index = versesArray.findIndex((verse2) => verse1.meta.uid === verse2.meta.uid);
            if (index > -1) findVerseIndex.push(index);

            findVerseIndex.map((index) => {
               const editVerseMeta = removePreviousSearch[index];
               editVerseMeta.meta.isSearchResult = true;
            });

            updatedVerse = removePreviousSearch;
         });

         cta.handleUpdateTextSearchCount(findVerseIndex.length);
         setversesArray(updatedVerse);

         if (findVerse.length > 0) {
            let verse = document.getElementById(`${findVerse[0].meta.uid}`);

            verse?.scrollIntoView({
               behavior: "smooth"
            });
         }
      }
   }, [searchText]);

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
                  <Header
                     text={`Chapter ${chapterTitle} `}
                     size='main'
                     color={GRADIENT_1__LIGHT}
                     type={3}
                  />
               </div>

               {/* loop through the data array to render the Chapter  */}
               <div className={styles.versesWrapper}>
                  {versesArray.map((verse, index: number) => {
                     // check if the verse is Highlighted
                     const isHighlighted = highlightedVerses.find(
                        (verse) => verse.VERSE_ID === `${chapterId}.${index}`
                     );

                     const highlight = isHighlighted ? isHighlighted.highlight_type : "";

                     // get the metadata for the highlighted color if found
                     const getHighlighMeta = higlighterColorPicker.find(
                        (meta) => meta.ID === highlight
                     );

                     // get the commentary references if any
                     const commentary: any = commentaries.find(
                        (c: any) => c.VERSE_ID === `${chapterId}.${index}`
                     );

                     return (
                        index !== 0 &&
                        // exclude the chapter and the references
                        index + 1 !== versesArray.length && (
                           <div
                              id={verse.meta.uid}
                              className={styles.verseLine}
                              key={index}
                              style={{
                                 backgroundColor: verse.meta.isSearchResult
                                    ? "rgba(255, 255, 255, 0.2)"
                                    : getHighlighMeta?.bkgColor
                              }}>
                              <span
                                 onClick={() =>
                                    setshowReadingMenu({
                                       verseNumber: `${index}`,
                                       verseContent: verse.text
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
                                 {verse.text}
                                 {commentary && (
                                    <span
                                       className={styles.commentarySticker}
                                       onClick={() => setcommentaryModal(commentary.ID)}
                                    />
                                 )}
                              </p>
                           </div>
                        )
                     );
                  })}
               </div>
            </div>
         )}

         {commentaryModal !== "none" && (
            <PortalTernary>
               <ViewCommentary
                  commentaryID={commentaryModal}
                  cta={{
                     handleClose: () => setcommentaryModal("none"),
                     handleEdit: () => router.push(`/posts/commentary/edit/${commentaryModal}`)
                  }}
                  withEdit
               />
            </PortalTernary>
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
