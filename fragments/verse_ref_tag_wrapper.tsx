//! #COMEBACK cant test in story right now sice router is not working in stories
// -    gets an array of verse Id's trhough the parent an maps over them.
// -    retruns an array with the total count of tags to send them to the server with the post
import { useEffect, useState } from "react";

// comps
import { TBiblePreferences } from "./buttons/bible_version_scripture";
import { VerseRefTag } from "./chunks/verse_ref_tag";

// styles
import styles from "./verse_ref_tag_wrapper.module.css";

type TVerseRefTagWrapperProps = {
   refs: string[];
   showRemoveoption?: boolean;
   cta: {
      updateTagArray: (tags: string[]) => void;
   };
};

export const VerseRefTagWrapper = ({ refs, showRemoveoption, cta }: TVerseRefTagWrapperProps) => {
   // --------- states -----------------
   const [versionId, setVersionId] = useState<null | string>(null);
   const [allTags, setallTags] = useState<string[]>(refs);

   const getLS = () => {
      const versionId = localStorage.getItem("reading-preferences");

      if (versionId) {
         const prefs: TBiblePreferences = JSON.parse(versionId);
         setVersionId(prefs.versionId);
      } else {
         setVersionId("de4e12af7f28f599-02");
      }
   };

   useEffect(() => {
      getLS();
   }, []);

   // ------------------- remove the tags
   const handleRemoveTag = (tagId: string) => {
      const removedtag: string[] = allTags.filter((tag) => tag !== tagId);
      setallTags(removedtag);

      // update the tag array and pass it to the parent
      cta.updateTagArray(removedtag);
   };

   return (
      <div className={styles.mainWrapper}>
         {!showRemoveoption && (
            <div className={styles.tagsWrapper}>
               {versionId &&
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
