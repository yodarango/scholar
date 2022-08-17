import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// components
import { TextEditorTextArea } from "../fragments/inputs/text_editor_text_area";
import { TextEditorActions } from "./text_editor_actions";
import { CloseContent } from "../fragments/buttons/close_content";

//styles
import styles from "./text_editor.module.css";
import { VerseRefTagWrapper } from "../fragments/verse_ref_tag_wrapper";

// helpers / types

type TTextEditorProps = {
   body: string | null;
   postImage: string;
   userAuthority: number;
   userId: string;
   username: string;
   avatar: string;
   postPostedOnDate: string;
   postCreatedDate: string;
   postCategory: string;
   postReferences: string[];
   postPrivacy: boolean;
   renderClose?: boolean;
   cta: {
      handleCategorySelection: (category: string) => void;
      handlePrivacySelection: (privacy: boolean) => void;
      handleRefVerseSelection: (verse: string) => void;
      handlePost: (body?: any) => void;
      handleBody: (body: string) => void;
      handleReferencedVerses: (verses: string[]) => void;
   };
};

export const TextEditor = ({
   body,
   postImage,
   userAuthority,
   userId,
   username,
   avatar,
   postPostedOnDate,
   postCreatedDate,
   postCategory,
   postReferences,
   postPrivacy,
   renderClose = true,
   cta
}: TTextEditorProps) => {
   // router
   const router = useRouter();

   return (
      <div className={styles.mainWrapper}>
         {renderClose && (
            <div className={styles.close}>
               <CloseContent cta={{ handleClick: () => router.push("/commentary") }} />
            </div>
         )}
         <div className={styles.textArea}>
            <TextEditorTextArea
               defaultValue={body}
               placeHolder='Commentary...'
               maxLength={2500}
               cta={{ handleCurrentValue: cta.handleBody }}
            />
         </div>

         <div className={styles.tagsWraper}>
            <VerseRefTagWrapper
               showRemoveoption={true}
               refs={postReferences}
               cta={{ handleUpdateTagArray: cta.handleReferencedVerses }}
            />
         </div>

         <div className={styles.bottomGridHolder}></div>

         <div className={styles.editorActions}>
            <TextEditorActions
               body={body}
               postImage={postImage}
               userAuthority={userAuthority}
               userId={userId}
               username={username}
               avatar={avatar}
               postPostedOnDate={postPostedOnDate}
               postCreatedDate={postCreatedDate}
               postCategory={postCategory}
               postReferences={postReferences}
               postPrivacy={postPrivacy}
               cta={{
                  handleCategorySelection: cta.handleCategorySelection,
                  handlePrivacySelection: cta.handlePrivacySelection,
                  handleRefVerseSelection: cta.handleRefVerseSelection,
                  handlePost: cta.handlePost
               }}
            />
         </div>
      </div>
   );
};
