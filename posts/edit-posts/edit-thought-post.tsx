// **************************  PURPOSE ******************************* //
// *** This component allows the user to edit a specified post ******* //
// ******************************************************************* //

// core
import { useState } from "react";
import Link from "next/link";

// child Comps
import TextEditor from "../../fragments/text-editor";
import FormattingRules from "../../fragments/buttons/formatting-rules";

// styes
import editCommentaryStyles from "../../styles/posts/edit-posts/EditCommentary.module.css";

// types / helpers
import { Tthought } from "../thought";
import { TverseContent } from "../../pages/index";

type editCommentaryPostProps = {
   thought: Tthought;
};

const EditThoughtPost = ({ thought }: editCommentaryPostProps) => {
   // ===========  FUNCTION: add the selected Verse to editor
   type IreferencedVerseState = {
      id: string;
      name: string;
   };

   // 2. loop through the array to set them in the required format Type "IreferencedVerseState"
   let originalReferencedVerses: IreferencedVerseState[] = [];
   // 1. get the referenced verses from the user field and split them by space since is a sole string
   if (thought.referenced_verses?.length > 0) {
      const currReferencedVerses: Array<string> = thought.referenced_verses.split(" ");
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

   // render the selected verse from the editor settings
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

   return (
      <>
         <div className={`${editCommentaryStyles.mainWrapper}`}>
            <Link href={`/users/me`}>
               <a className={`closeModal ${editCommentaryStyles.closeModal}`}>X</a>
            </Link>

            {/* ---------------- text editor ------------------- */}
            <div>
               <TextEditor
                  contentTypeToPost='THOUGHT-EDIT'
                  verseBeingCommented={verseDataStata}
                  title='Edit Thought'
                  currentText={thought.body}
                  postId={thought.ID}
                  formattingRules={
                     <FormattingRules renderSelectedVerseFunc={renderSelectedVerseFunc} />
                  }
                  assignedTags={{
                     first: thought.category_tags.split(" ")[0],
                     second: thought.category_tags.split(" ")[1]
                  }}
                  referencedVerses={referencedVerseState}
                  removeVerse={removeVerse}
               />
            </div>
         </div>
      </>
   );
};

export default EditThoughtPost;
