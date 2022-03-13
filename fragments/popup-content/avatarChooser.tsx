// core
import { useState } from "react";

import avatarChoserStyles from "../../styles/fragments/popup-content/AvatarChooser.module.css";

const AvatarChooser = () => {
   // ==================== handle gender selection
   const [currGenderSelectionState, setCurrGenderSelectionState] = useState({
      male: false,
      female: false
   });
   const handleGenderSelection = (selection: number) => {
      selection === 1
         ? (setCurrGenderSelectionState({ male: true, female: false }),
           setCurrLooksSelectionState("👱‍♂️"),
           setcurrSkinColorSelectionState("🙋🏻‍♂️"))
         : (setCurrGenderSelectionState({ male: false, female: true }),
           setCurrLooksSelectionState("👩"),
           setcurrSkinColorSelectionState("🙋🏻‍♀️"));
   };

   // =============== seletion popups
   const [showSelectionPopUp, setshowSelectionPopUp] = useState<{ hair: boolean; skin: boolean }>({
      hair: false,
      skin: false
   });

   // =================== handle skin color selection
   const [currSkinColorSelectionState, setcurrSkinColorSelectionState] = useState<string>("");
   const handleChooseSkinColor = (selection: number) => {
      setshowSelectionPopUp({
         hair: false,
         skin: false
      });
      switch (selection) {
         case 1:
            setcurrSkinColorSelectionState("🙋🏼‍♂️");
            break;
         case 2:
            setcurrSkinColorSelectionState("🙋🏻‍♂️");
            break;
         case 3:
            setcurrSkinColorSelectionState("🙋🏾‍♂️");
            break;
         case 4:
            setcurrSkinColorSelectionState("🙋🏼‍♀️");
            break;
         case 5:
            setcurrSkinColorSelectionState("🙋🏻‍♀️");
            break;
         case 6:
            setcurrSkinColorSelectionState("🙋🏾‍♀️");
            break;
      }
   };

   // =================== handle looks selection
   const [currLooksSelectionState, setCurrLooksSelectionState] = useState<string>("");
   const handleLooksSelection = (selection: number) => {
      setshowSelectionPopUp({
         hair: false,
         skin: false
      });
      switch (selection) {
         case 1:
            setCurrLooksSelectionState("👱‍♂️");
            break;
         case 2:
            setCurrLooksSelectionState("👨‍🦲");
            break;
         case 3:
            setCurrLooksSelectionState("👩");
            break;
         case 4:
            setCurrLooksSelectionState("👩‍🦱");
            break;
      }
   };

   // ================== handle classes selection
   const [glassesSelectionState, setGlassesSelectionState] = useState(false);

   // ================= iterate through all the avatar images ==========
   //const [avatarArrayState, setAvatarArrayState] = useState<string[]>([]);
   let avatarArray: string[] = [];
   for (let i = 1; i < 200; i++) {
      avatarArray.push(`/images/user-avatars/males/${i}.png`);
      //setAvatarArrayState([...avatarArrayState, `/images/user-avatars/males/${i}.png`]);
   }
   return (
      <div className={avatarChoserStyles.mainWrapper}>
         <p className={`std-text-block ${avatarChoserStyles.textBlock}`}>Choose your gender</p>
         <div className={avatarChoserStyles.filterWrapper}>
            {!currGenderSelectionState.male && (
               <div className={avatarChoserStyles.male} onClick={() => handleGenderSelection(1)}>
                  🙋‍♂️
               </div>
            )}
            {currGenderSelectionState.male && (
               <div
                  className={`${avatarChoserStyles.male} ${avatarChoserStyles.choiceSelected}`}
                  onClick={() => handleGenderSelection(1)}>
                  🙋‍♂️
               </div>
            )}
            {currGenderSelectionState.female && (
               <div
                  className={`${avatarChoserStyles.female} ${avatarChoserStyles.choiceSelected}`}
                  onClick={() => handleGenderSelection(2)}>
                  🙋‍♀️
               </div>
            )}
            {!currGenderSelectionState.female && (
               <div className={avatarChoserStyles.female} onClick={() => handleGenderSelection(2)}>
                  🙋‍♀️
               </div>
            )}
         </div>
         <p className={`std-text-block ${avatarChoserStyles.textBlock}`}>
            Filter By Looks and Styles
         </p>
         <div
            className={`${avatarChoserStyles.filterWrapper} ${avatarChoserStyles.filterWrapperAccessories}`}>
            <div className={avatarChoserStyles.skinColor}>
               {currSkinColorSelectionState && (
                  <div
                     className={`${avatarChoserStyles.skinColorSelection} ${avatarChoserStyles.choiceSelected}`}
                     onClick={() => setshowSelectionPopUp({ hair: false, skin: true })}>
                     {currSkinColorSelectionState}
                  </div>
               )}

               {!currSkinColorSelectionState && (
                  <div
                     className={`${avatarChoserStyles.skinColorSelection}`}
                     onClick={() => setshowSelectionPopUp({ hair: false, skin: true })}>
                     🙋‍♂️
                  </div>
               )}
               {!currSkinColorSelectionState && currGenderSelectionState.female && (
                  <div
                     className={`${avatarChoserStyles.skinColorSelection}`}
                     onClick={() => setshowSelectionPopUp({ hair: false, skin: true })}>
                     🙋‍♀️
                  </div>
               )}
               {showSelectionPopUp.skin && (
                  <section className={avatarChoserStyles.skinColorWrapper}>
                     {currGenderSelectionState.male && (
                        <>
                           <div onClick={() => handleChooseSkinColor(1)}>🙋🏼‍♂️</div>
                           <div onClick={() => handleChooseSkinColor(2)}>🙋🏻‍♂️</div>
                           <div onClick={() => handleChooseSkinColor(3)}>🙋🏾‍♂️</div>
                        </>
                     )}
                     {currGenderSelectionState.female && (
                        <>
                           <div onClick={() => handleChooseSkinColor(4)}>🙋🏼‍♀️</div>
                           <div onClick={() => handleChooseSkinColor(5)}>🙋🏻‍♀️</div>
                           <div onClick={() => handleChooseSkinColor(6)}>🙋🏾‍♀️</div>
                        </>
                     )}
                  </section>
               )}
            </div>
            {glassesSelectionState && (
               <div
                  className={`${avatarChoserStyles.glasses} ${avatarChoserStyles.choiceSelected}`}
                  onClick={() => setGlassesSelectionState(false)}>
                  👓
               </div>
            )}
            {!glassesSelectionState && (
               <div
                  className={avatarChoserStyles.glasses}
                  onClick={() => setGlassesSelectionState(true)}>
                  👓
               </div>
            )}
            <div className={avatarChoserStyles.hair}>
               {!currLooksSelectionState && (
                  <div
                     className={avatarChoserStyles.hairSelection}
                     onClick={() => setshowSelectionPopUp({ hair: true, skin: false })}>
                     👱‍♂️
                  </div>
               )}
               {!currLooksSelectionState && currGenderSelectionState.female && (
                  <div
                     className={avatarChoserStyles.hairSelection}
                     onClick={() => setshowSelectionPopUp({ hair: true, skin: false })}>
                     👩
                  </div>
               )}
               {currLooksSelectionState && currGenderSelectionState.male && (
                  <div
                     className={`${avatarChoserStyles.hairSelection} ${avatarChoserStyles.choiceSelected}`}
                     onClick={() => setshowSelectionPopUp({ hair: true, skin: false })}>
                     {currLooksSelectionState}
                  </div>
               )}
               {currLooksSelectionState && currGenderSelectionState.female && (
                  <div
                     className={`${avatarChoserStyles.hairSelection} ${avatarChoserStyles.choiceSelected}`}
                     onClick={() => setshowSelectionPopUp({ hair: true, skin: false })}>
                     {currLooksSelectionState}
                  </div>
               )}
               {showSelectionPopUp.hair && (
                  <section className={avatarChoserStyles.hairStyleWrapper}>
                     {currGenderSelectionState.male && (
                        <>
                           <div onClick={() => handleLooksSelection(1)}>👱‍♂️</div>
                           <div onClick={() => handleLooksSelection(2)}>👨‍🦲</div>
                        </>
                     )}
                     {currGenderSelectionState.female && (
                        <>
                           <div onClick={() => handleLooksSelection(3)}>👩</div>
                           <div onClick={() => handleLooksSelection(4)}>👩‍🦱</div>
                        </>
                     )}
                  </section>
               )}
            </div>
         </div>
         {/* ================== avatars ================= */}
         <section className={avatarChoserStyles.avatarWrapper}>
            {avatarArray.map((avatarLink) => (
               <img src={avatarLink} className={avatarChoserStyles.avatar} />
            ))}
         </section>
      </div>
   );
};

export default AvatarChooser;
