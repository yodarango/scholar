// **************************  PURPOSE ******************************* //
// *** This component allows the user to edit a specified post ******* //
// ******************************************************************* //

// core
import { useState, useEffect } from "react";

// child Comps
import TextEditor from "../../fragments/text-editor";
import FormattingRules from "../../fragments/buttons/formatting-rules";

// styes
import editCommentaryStyles from "../../styles/posts/edit-posts/EditCommentary.module.css";

// types / helpers
import { Tcommentary } from "../comment";
import { TverseContent } from "../../pages";

type editCommentaryPostProps = {
   commentary: Tcommentary;
};

const EditCommentaryPost = ({ commentary }: editCommentaryPostProps) => {
   // ===========  FUNCTION: add the selected Verse to editor
   type IreferencedVerseState = {
      id: string;
      name: string;
   };

   // 2. loop through the array to set them in the required format Type "IreferencedVerseState"
   let originalReferencedVerses: IreferencedVerseState[] = [];
   // 1. get the referenced verses from the user field and split them by space since is a sole string
   if (commentary.referenced_verses?.length > 0) {
      const currReferencedVerses: Array<string> = commentary.referenced_verses.split(" ");
      originalReferencedVerses = currReferencedVerses.map((verse) => {
         const referencedVerse = {
            id: verse,
            name: verse
         };
         return referencedVerse;
      });
   }

   const [referencedVerseState, setreferencedVerseIdState] =
      useState<IreferencedVerseState[]>(originalReferencedVerses);
   const renderSelectedVerseFunc = (verse: any) => {
      document.body.style.overflow = "scroll";
      setreferencedVerseIdState((referencedVersesState) => [
         ...referencedVersesState,
         { id: verse.id, name: verse.reference }
      ]);
   };

   // ===========  FUNCTION: remove a specific tag from the editor
   const removeVerse = (verseId: string) => {
      const nodeletedValues = referencedVerseState.filter((el) => {
         return el.id != verseId;
      });
      setreferencedVerseIdState(nodeletedValues);
   };

   // =========== FUNCTION: fetch the verse the user commented on upon rendering of this component ============== //
   const [verseDataStata, setVerseDataStata] = useState<TverseContent>({
      id: "",
      orgId: "",
      bookId: "",
      chapterId: "",
      bibleId: "",
      reference: "",
      content: "",
      verseCount: 0,
      copyright: "",
      next: { id: "", number: "" },
      previous: { id: "", number: "" }
   });
   useEffect(() => {
      const fetchVerse = async () => {
         const request = await fetch(
            `https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-02/verses/${commentary.VERSE_ID}?content-type=text&include-verse-numbers=false`,
            {
               method: "GET",
               headers: {
                  "api-key": `${process.env.NEXT_PUBLIC_BIBLE_API_KEY}`
               }
            }
         );
         const response = await request.json();
         setVerseDataStata(response.data);
      };
      fetchVerse();
   }, []);

   return (
      <>
         <div className={`${editCommentaryStyles.mainWrapper}`}>
            {/* ---------------- verse commenting on ------------------- */}
            <div>
               <div className={editCommentaryStyles.commentaryVerseWrapper}>
                  <p className='std-text-block--info'>{verseDataStata.reference}</p>
                  <p className='std-text-block'>{verseDataStata.content}</p>
               </div>
            </div>

            {/* ---------------- text editor ------------------- */}
            <div>
               <TextEditor
                  contentTypeToPost='COMMENTARY-EDIT'
                  verseBeingCommented={verseDataStata}
                  title='Your Commentary'
                  commentary={`Commentary`}
                  currentText={commentary.body}
                  formattingRules={
                     <FormattingRules renderSelectedVerseFunc={renderSelectedVerseFunc} />
                  }
                  assignedTags={{
                     first: commentary.category_tags.split(" ")[0],
                     second: commentary.category_tags.split(" ")[1]
                  }}
                  referencedVerses={referencedVerseState}
                  removeVerse={removeVerse}
               />
            </div>
         </div>
      </>
   );
};

export default EditCommentaryPost;
