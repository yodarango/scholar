/*********************************************************************************************
-  gets an array of verse Id's trhough the parent an maps over them.
-  returns an array with the total count of tags the parent
*********************************************************************************************/

import { useEffect, useState } from "react";
import { DEFAULT_BIBLE_SETTINGS } from "../../constants/defaults";
import { ReadingPreferences } from "../../types/browser/local_storage";

// comps

import { VerseRefTag } from "./chunks/verse_ref_tag";
import { Header } from "./Typography/header";

// styles
import styles from "./verse_ref_tag_wrapper.module.css";

type TVerseRefTagWrapperProps = {
   refs: any;
   showRemoveoption?: boolean;
   cta?: {
      handleUpdateTagArray: (tags: string[]) => void;
   };
};

export const VerseRefTagWrapper = ({ refs, showRemoveoption, cta }: TVerseRefTagWrapperProps) => {
   // states
   const [versionId, setVersionId] = useState<null | string>(null);
   const [allTags, setallTags] = useState<string[]>(refs);

   //! check if the user has reading preferences to use that versionId. Might be able to refactor this. #COMEBACK
   const getLS = () => {
      const versionId = localStorage.getItem("reading-preferences");

      if (versionId) {
         const prefs: ReadingPreferences = JSON.parse(versionId);
         setVersionId(prefs.versionId);
      } else {
         setVersionId(DEFAULT_BIBLE_SETTINGS.VERSION_ID);
      }
   };

   useEffect(() => {
      if (typeof refs === "string") {
         refs = refs.split(",");
         setallTags(refs);
      } else if (typeof refs === "object") {
         refs = refs.map((ref: any) => ref).join(",");
         refs = refs.split(",");
         setallTags(refs);
      }
      getLS();
   }, [refs]);

   // ------------------- remove the tags
   const handleRemoveTag = (tagId: string) => {
      const removedtag: string[] = allTags?.filter((tag) => tag !== tagId);
      setallTags(removedtag);

      // update the tag array and pass it to the parent
      cta?.handleUpdateTagArray(removedtag);
   };

   return (
      <div className={styles.mainWrapper}>
         <div className={styles.title}>
            <Header type={5} size='main' quiet={true} text='References' />
         </div>
         {!showRemoveoption && (
            <div className={styles.tagsWrapper}>
               {versionId &&
                  allTags &&
                  allTags.map((ref: string, index: number) => (
                     <div className={styles.tag} key={index}>
                        <VerseRefTag
                           reference={ref}
                           showRemoveoption={false}
                           versionId={versionId}
                        />
                     </div>
                  ))}
            </div>
         )}

         {showRemoveoption && (
            <div className={styles.tagsWrapper}>
               {versionId &&
                  allTags.map((ref: string, index: number) => (
                     <div className={styles.tag} key={index}>
                        <VerseRefTag
                           reference={ref}
                           showRemoveoption={true}
                           cta={() => handleRemoveTag(ref)}
                           versionId={versionId}
                        />
                     </div>
                  ))}
            </div>
         )}
      </div>
   );
};
