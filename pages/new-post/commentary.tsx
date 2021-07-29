// core
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

// components
import TextEditor from "../../fragments/text-editor";
import Header from "../../layouts/header";
import FormattingRules from "../../fragments/buttons/formatting-rules";

// styles
import cardStyles from "../../styles/components/Cards.module.css";
import commentaryStiles from "../../styles/pages/Commentary.module.css";

//others
import { bibleApi } from "../../env";

const Commentary = () => {
   type IInitialVerse = {
      content: string;
      reference: string;
   };

   type ISwitchVerse = {
      previousVerseId: string;
      nextVerseId: string;
   };

   // ===========FUNCTION: Get verse from link ===============================
   // API to get the params in the Link and set it as the initial state for 'initialverse'
   const { query } = useRouter();
   const initialVerseFromRedirect = query.verse;

   const [verse, setverse] = useState<IInitialVerse>({ content: "", reference: "" });
   const [initialVerse, setInitialVerse] = useState<string>(`${initialVerseFromRedirect}`);
   const [switchVerse, setSwitchVerse] = useState<ISwitchVerse>({
      previousVerseId: "JHN.3.15",
      nextVerseId: "JHN.3.17"
   });

   const callBibleApi: () => void = async () => {
      const requ = await fetch(
         `https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-01/verses/${initialVerse}?content-type=text&include-verse-numbers=false`,
         {
            method: "GET",
            headers: {
               "api-key": bibleApi
            }
         }
      );

      const json = await requ.json();
      setverse(json.data);

      setSwitchVerse({
         previousVerseId: `${json.data.previous.id}`,
         nextVerseId: `${json.data.next.id}`
      });
   };

   // call the BibleAPI on verse change render
   useEffect(() => {
      callBibleApi();
   }, [initialVerse]);

   /// go a verse forward
   const goBackAVerse = () => {
      setInitialVerse(switchVerse.previousVerseId);
   };

   /// go a verse backward
   const goFordAVerse = () => {
      setInitialVerse(switchVerse.nextVerseId);
   };

   // ===========  FUNCTION: add the selected Verse to editor
   type IreferencedVerseState = {
      id: string;
      name: string;
   };
   const [referencedVerseState, setreferencedVerseIdState] = useState<IreferencedVerseState[]>([]);
   const renderSelectedVerseFunc = (e: any) => {
      const newVerseId = e.currentTarget.dataset.verse;
      const newVerseName = e.currentTarget.dataset.name;
      e.target.style.color = "orange";
      document.body.style.overflow = "scroll";
      setreferencedVerseIdState((referencedVersesState) => [
         ...referencedVersesState,
         { id: newVerseId, name: newVerseName }
      ]);
   };

   // ===========  FUNCTION: remove a specific tag from the editor
   const removeVerse = (verseId: string) => {
      const nodeletedValues = referencedVerseState.filter((el) => {
         return el.id != verseId;
      });
      setreferencedVerseIdState(nodeletedValues);
   };
   return (
      <div className={`main-wrapper ${commentaryStiles.mainWrapper}`}>
         <Header currPage={`Commentary`} />
         <div>
            <div className={commentaryStiles.commentaryVerseWrapper}>
               <p className='std-text-block--info'>{verse.reference}</p>
               <p className='std-text-block'>{verse.content}</p>

               <div className={`${commentaryStiles.commentaryVerseWrapperFooter}`}>
                  <div
                     className={`std-vector-icon ${cardStyles.dailyVerseIconSwitchVerseBackward}`}
                     onClick={goBackAVerse}></div>
                  <div
                     className={`std-vector-icon ${cardStyles.dailyVerseIconSwitchVerseForward}`}
                     onClick={goFordAVerse}></div>
               </div>
            </div>
         </div>
         <div>
            <TextEditor
               title='Your Commentary'
               commentary={`Commentary`}
               formattingRules={
                  <FormattingRules renderSelectedVerseFunc={renderSelectedVerseFunc} />
               }
               referencedVerses={referencedVerseState}
               removeVerse={removeVerse}
            />
         </div>
      </div>
   );
};

export default dynamic(() => Promise.resolve(Commentary), { ssr: false });
