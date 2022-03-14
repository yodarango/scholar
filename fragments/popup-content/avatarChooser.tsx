// core
import { useState } from "react";

import avatarChoserStyles from "../../styles/fragments/popup-content/AvatarChooser.module.css";

const AvatarChooser = () => {
   type choiceType = {
      gender: string[];
      skin: string[];
      hair: string[];
      accessories: string[];
   };
   const [choicesState] = useState<choiceType>({
      gender: ["🙋", "🙋‍♂️", "🙋‍♀️"],
      skin: ["🙋‍♂️", "🙋🏼‍♂️", "🙋🏻‍♂️", "🙋🏾‍♂️", "🙋‍♀️", "🙋🏼‍♀️", "🙋🏻‍♀️", "🙋🏾‍♀️"],
      hair: ["👱‍♂️", "👨‍🦲", "👩", "👩‍🦱"],
      accessories: ["❌", "👓"]
   });

   type choiceClassType = {
      gender: string;
      skin: string;
      hair: string;
      accessories: string;
   };
   const [choicesClassState, setchoicesClassState] = useState<choiceClassType>({
      gender: "",
      skin: "",
      hair: "",
      accessories: ""
   });

   type extraChoiceType = {
      type: string;
      content: string[];
   };
   // -------------------- extra options pop up -----------------------
   const [extraChoicePopUpState, setExtraChoicePopUpState] = useState<extraChoiceType>({
      type: "",
      content: []
   });

   // -------------------- current selections -------------------------
   const [currSelection, setcurrSelection] = useState<choiceClassType>({
      gender: "🙋",
      skin: "🙋‍♂️",
      hair: "👱‍♂️",
      accessories: "❌"
   });

   return (
      <div className={avatarChoserStyles.mainWrapper}>
         <p className={`std-text-block ${avatarChoserStyles.textBlock}`}>Filter Avatars</p>

         {/* ---------------------- EXTRA CHOICES WRAP BUBBLE ------------------ */}
         {extraChoicePopUpState?.content.length > 0 && (
            <div className={avatarChoserStyles.extraOptionsWrapper}>
               {extraChoicePopUpState.content.map((avatar: string) =>
                  extraChoicePopUpState.type == "gender" ? (
                     <span
                        onClick={() => (
                           // ------------------ gender --------------------
                           setcurrSelection({
                              ...currSelection,
                              gender: avatar,
                              skin: avatar,
                              hair: avatar == "🙋‍♂️" ? "👱‍♂️" : "👩"
                           }),
                           setchoicesClassState({
                              ...choicesClassState,
                              gender: avatarChoserStyles.choiceSelected
                           }),
                           setExtraChoicePopUpState({ type: "", content: [] })
                        )}>
                        {avatar}
                     </span>
                  ) : // ------------------ skin --------------------
                  extraChoicePopUpState.type == "skin" ? (
                     <span
                        onClick={() => (
                           setcurrSelection({ ...currSelection, skin: avatar }),
                           setchoicesClassState({
                              ...choicesClassState,
                              skin: avatarChoserStyles.choiceSelected
                           }),
                           setExtraChoicePopUpState({ type: "", content: [] })
                        )}>
                        {avatar}
                     </span>
                  ) : // ------------------ hair --------------------
                  extraChoicePopUpState.type == "hair" ? (
                     <span
                        onClick={() => (
                           setcurrSelection({ ...currSelection, hair: avatar }),
                           setchoicesClassState({
                              ...choicesClassState,
                              hair: avatarChoserStyles.choiceSelected
                           }),
                           setExtraChoicePopUpState({ type: "", content: [] })
                        )}>
                        {avatar}
                     </span>
                  ) : (
                     // ------------------ accressories --------------------
                     <span
                        onClick={() => (
                           setcurrSelection({ ...currSelection, accessories: avatar }),
                           setchoicesClassState({
                              ...choicesClassState,
                              accessories: avatarChoserStyles.choiceSelected
                           }),
                           setExtraChoicePopUpState({ type: "", content: [] })
                        )}>
                        {avatar}
                     </span>
                  )
               )}
            </div>
         )}

         {/* ---------------------- MAIN FILTERS WRAPPER ----------------- */}
         <div className={avatarChoserStyles.filterWrapper}>
            {/* ------------------------- gender options --------------------- */}
            <section className={avatarChoserStyles.filterItemWrapper}>
               <div
                  onClick={() =>
                     setExtraChoicePopUpState({ type: "gender", content: choicesState.gender })
                  }
                  className={choicesClassState.gender ? avatarChoserStyles.choiceSelected : ""}>
                  {currSelection.gender}
               </div>
               <p className={avatarChoserStyles.filterLabel}>gender</p>
            </section>

            {/* ------------------------- skin options --------------------- */}

            {currSelection.gender != "🙋" && (
               <section className={avatarChoserStyles.filterItemWrapper}>
                  <div
                     onClick={() => {
                        currSelection.gender == "🙋‍♂️"
                           ? setExtraChoicePopUpState({
                                type: "skin",
                                content: ["🙋‍♂️", "🙋🏼‍♂️", "🙋🏻‍♂️", "🙋🏾‍♂️"]
                             })
                           : setExtraChoicePopUpState({
                                type: "skin",
                                content: ["🙋‍♀️", "🙋🏼‍♀️", "🙋🏻‍♀️", "🙋🏾‍♀️"]
                             });
                     }}
                     className={choicesClassState.skin ? avatarChoserStyles.choiceSelected : ""}>
                     {currSelection.skin}
                  </div>
                  <p className={avatarChoserStyles.filterLabel}>skin</p>
               </section>
            )}

            {/* ------------------------- accessories options --------------------- */}
            <section className={avatarChoserStyles.filterItemWrapper}>
               <div
                  onClick={() =>
                     setExtraChoicePopUpState({
                        type: "accessories",
                        content: choicesState.accessories
                     })
                  }
                  className={
                     choicesClassState.accessories ? avatarChoserStyles.choiceSelected : ""
                  }>
                  {currSelection.accessories}
               </div>
               <p className={avatarChoserStyles.filterLabel}>glasses</p>
            </section>

            {/* ------------------------- hair options --------------------- */}

            {currSelection.gender != "🙋" && (
               <section className={avatarChoserStyles.filterItemWrapper}>
                  <div
                     onClick={() => {
                        currSelection.gender == "🙋‍♂️"
                           ? setExtraChoicePopUpState({ type: "hair", content: ["👱‍♂️", "👨‍🦲"] })
                           : setExtraChoicePopUpState({ type: "hair", content: ["👩", "👩‍🦱"] });
                     }}
                     className={choicesClassState.hair ? avatarChoserStyles.choiceSelected : ""}>
                     {currSelection.hair}
                  </div>
                  <p className={avatarChoserStyles.filterLabel}>hair</p>
               </section>
            )}
         </div>

         {/* ================== avatars ================= */}
         {/* <section className={avatarChoserStyles.avatarWrapper}>
            {avatarArray.map((avatarLink) => (
               <img src={avatarLink} className={avatarChoserStyles.avatar} />
            ))}
         </section> */}
      </div>
   );
};

export default AvatarChooser;
