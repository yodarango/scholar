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
import { Parragraph } from "../fragments/Typography/parragraph";
import Portal from "../hoc/potal";
import { SelectReadingActions } from "./menus/select_reading_actions";

type chapterProps = {
   chapterId: string;
   versionId: string;
   fontSize?: string;
};
export const BibleChapter = ({ chapterId, versionId, fontSize = "main" }: chapterProps) => {
   // states
   const [showReadingMenu, setshowReadingMenu] = useState<boolean>(false);

   const [data, setdata] = useState<any>(`1
     [1] In the beginning God created the heaven and the earth.  [2] And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters.
     [32] And God said, Let there be light: and there was light.  [4] And God saw the light, that it was good: and God divided the light from the darkness.  [5] And God called the light Day, and the darkness he called Night. And the evening and the morning were the first day.
     [62] ¶ And God said, Let there be a firmament in the midst of the waters, and let it divide the waters from the waters.  [7] And God made the firmament, and divided the waters which were under the firmament from the waters which were above the firmament: and it was so.  [8] And God called the firmament Heaven. And the evening and the morning were the second day.
     [92] ¶ And God said, Let the waters under the heaven be gathered together unto one place, and let the dry land appear: and it was so.  [10] And God called the dry land Earth; and the gathering together of the waters called he Seas: and God saw that it was good.  [11] And God said, Let the earth bring forth grass, the herb yielding seed, and the fruit tree yielding fruit after his kind, whose seed is in itself, upon the earth: and it was so.  [12] And the earth brought forth grass, and herb yielding seed after his kind, and the tree yielding fruit, whose seed was in itself, after his kind: and God saw that it was good.  [13] And the evening and the morning were the third day.
     [142] ¶ And God said, Let there be lights in the firmament of the heaven to divide the day from the night; and let them be for signs, and for seasons, and for days, and years:  [15] And let them be for lights in the firmament of the heaven to give light upon the earth: and it was so.  [16] And God made two great lights; the greater light to rule the day, and the lesser light to rule the night: he made the stars also.  [17] And God set them in the firmament of the heaven to give light upon the earth,  [18] And to rule over the day and over the night, and to divide the light from the darkness: and God saw that it was good.  [19] And the evening and the morning were the fourth day.
     [202] And God said, Let the waters bring forth abundantly the moving creature that hath life, and fowl that may fly above the earth in the open firmament of heaven.  [21] And God created great whales, and every living creature that moveth, which the waters brought forth abundantly, after their kind, and every winged fowl after his kind: and God saw that it was good.  [22] And God blessed them, saying, Be fruitful, and multiply, and fill the waters in the seas, and let fowl multiply in the earth.  [23] And the evening and the morning were the fifth day.
     [24] ¶ And God said, Let the earth bring forth the living creature after his kind, cattle, and creeping thing, and beast of the earth after his kind: and it was so.  [25] And God made the beast of the earth after his kind, and cattle after their kind, and every thing that creepeth upon the earth after his kind: and God saw that it was good.
     [26] ¶ And God said, Let us make man in our image, after our likeness: and let them have dominion over the fish of the sea, and over the fowl of the air, and over the cattle, and over all the earth, and over every creeping thing that creepeth upon the earth.  [27] So God created man in his own image, in the image of God created he him; male and female created he them.  [28] And God blessed them, and God said unto them, Be fruitful, and multiply, and replenish the earth, and subdue it: and have dominion over the fish of the sea, and over the fowl of the air, and over every living thing that moveth upon the earth.
     [29] ¶ And God said, Behold, I have given you every herb bearing seed, which is upon the face of all the earth, and every tree, in the which is the fruit of a tree yielding seed; to you it shall be for meat.  [30] And to every beast of the earth, and to every fowl of the air, and to every thing that creepeth upon the earth, wherein there is life, I have given every green herb for meat: and it was so.  [31] And God saw every thing that he had made, and, behold, it was very good. And the evening and the morning were the sixth day.


1.4 the light from…: Heb. between the light and between the darkness
1.5 And the evening…: Heb. And the evening was, and the morning was etc.
1.6 firmament: Heb. expansion
1.8 And the evening…: Heb. And the evening was, and the morning was etc.
1.11 grass: Heb. tender grass
1.13 And the evening…: Heb. And the evening was, and the morning was etc.
1.14 the day…: Heb. between the day and between the night
1.16 to rule the day…: Heb. for the rule of the day, etc.
1.19 And the evening…: Heb. And the evening was, and the morning was etc.
1.20 moving: or, creeping
1.20 life: Heb. soul
1.20 fowl…: Heb. let fowl fly
1.20 open…: Heb. face of the firmament of heaven
1.23 And the evening…: Heb. And the evening was, and the morning was etc.
1.28 moveth: Heb. creepeth
1.29 bearing…: Heb. seeding seed
1.29 yielding…: Heb. seeding seed
1.30 life: Heb. a living soul
1.31 And the evening…: Heb. And the evening was, and the morning was etc.`);
   const [copyright, setcopyright] = useState<string>("");
   const [loading, setloading] = useState("done");

   const fetchData = async () => {
      const chapter = await fetchBibleChapter(chapterId, versionId);
      if (chapter === undefined) {
         setloading("error");
         setdata([]);
         setcopyright("");
      } else {
         setloading("done");
         setdata(chapter.content);
         console.log(chapter.content);
         setcopyright(chapter.copyright);
      }
   };

   useEffect(() => {
      //fetchData();
   }, []);

   // ==============FUNCTION:  Get a referenced scripture =================
   // const [openRefState, setOpenRefState] = useState<JSX.Element | boolean>(false);
   // const openNote = (e: any) => {
   //    setOpenRefState(
   //       <NotificationPopup
   //          title='Note'
   //          closeModal={() => setOpenRefState(false)}
   //          contentString={e.target.textContent}
   //          newClass={fetchNewChapterStyles.verseRefPopup}
   //       />
   //    );
   // };

   // const openReference = async (verseRef: string) => {
   //    try {
   //       const req = await fetch(
   //          `https://api.scripture.api.bible/v1/bibles/${versionId}/verses/${verseRef}?content-type=html&include-verse-numbers=true&include-titles=true`,
   //          {
   //             method: "GET",
   //             headers: {
   //                "api-key": `${chosenKey}`
   //             }
   //          }
   //       );

   //       const verseData = await req.json();

   //       setOpenRefState(
   //          <NotificationPopup
   //             title={verseData.data.reference}
   //             closeModal={() => setOpenRefState(false)}
   //             contentString={
   //                <>
   //                   <div dangerouslySetInnerHTML={{ __html: verseData.data.content }}></div>{" "}
   //                   <span className='scriptures-copyright'>{verseData.data.copyright}</span>
   //                </>
   //             }
   //             newClass={fetchNewChapterStyles.verseRefPopup}
   //          />
   //       );
   //    } catch (error) {
   //       console.log(error);
   //       setOpenRefState(
   //          <NotificationPopup
   //             title='Sorry 🙁'
   //             closeModal={() => setOpenRefState(false)}
   //             contentString='Something went wrong while fetching the source'
   //             newClass='notification-wrapper--Error'
   //          />
   //       );
   //    }
   // };
   //console.log(data);

   // TODO: Parse references since they are being ignored rn see https://github.com/yodarango-saas/scholar/issues/107#issue-1367003020
   const chapterTitle = data.split("\n")[0];
   const versesArray = data.split(/\[[0-9]*\]/g);
   const references = versesArray[versesArray.length - 1].split(/([0-9].[0-9])/g);
   console.log(references);
   console.log(versesArray[versesArray.length - 1]);

   return (
      <>
         {loading === "done" && data && (
            <div className={styles.mainWrapper}>
               <Portal>
                  {showReadingMenu && (
                     <SelectReadingActions
                        cta={{ handleCloseModal: () => setshowReadingMenu(false) }}
                     />
                  )}
               </Portal>
               <div className={styles.chapter}>
                  <Header text={`Chapter ${chapterTitle} `} size='main' color='#B293FE' type={3} />
               </div>
               <div className={styles.versesWrapper}>
                  {versesArray.map(
                     (verse: string, index: number) =>
                        // exclude the chapter and the references
                        index !== 0 &&
                        index + 1 !== versesArray.length && (
                           <div className={styles.verseLine}>
                              <span
                                 onClick={() => setshowReadingMenu(true)}
                                 className={`${styles.verseNumber} ${
                                    index > 99 && styles.bigVerseNumber
                                 }`}>
                                 {index}
                              </span>
                              <p className={styles.verse}>
                                 <span className={styles.tab}></span>
                                 {verse}
                              </p>
                           </div>
                        )
                  )}
               </div>
            </div>
         )}
         {loading === "loading" && <RoundLoader />}
         {loading === "done" && copyright && <p className='scriptures-copyright'>{copyright}</p>}
         {loading == "error" && <ResourceNotFoundError />}
      </>
   );
};
