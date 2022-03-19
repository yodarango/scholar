// core
import { useState } from "react";
import Image from "next/image";

// styles
import avatarChoserStyles from "../../styles/fragments/popup-content/AvatarChooser.module.css";

// helpers
import { sortedAvatar } from "../../helpers/content/sortedAvatars";
import AvatarChooserPopup from "../squares/avatar-chooser-popup";

type avatarChooserProps = {
   closeAvatarChooser: any;
};

const AvatarChooser = ({ closeAvatarChooser }: avatarChooserProps) => {
   type choiceType = {
      gender: { avatar: string; val: string }[];
      skin_male: { avatar: string; val: string }[];
      skin_female: { avatar: string; val: string }[];
      hair_male: { avatar: string; val: string }[];
      hair_female: { avatar: string; val: string }[];
      accessories: { avatar: string; val: boolean }[];
   };

   const [choicesState] = useState<choiceType>({
      gender: [
         { avatar: "🙋", val: "" },
         { avatar: "🙋‍♂️", val: "male" },
         { avatar: "🙋‍♀️", val: "female" }
      ],
      skin_male: [
         { avatar: "🙋‍♂️", val: "" },
         { avatar: "🙋🏼‍♂️", val: "light" },
         { avatar: "🙋🏻‍♂️", val: "medium" },
         { avatar: "🙋🏾‍♂️", val: "dark" }
      ],
      skin_female: [
         { avatar: "🙋‍♀️", val: "" },
         { avatar: "🙋🏼‍♀️", val: "light" },
         { avatar: "🙋🏻‍♀️", val: "medium" },
         { avatar: "🙋🏾‍♀️", val: "dark" }
      ],
      hair_male: [
         { avatar: "👱‍♂️", val: "hair" },
         { avatar: "👨‍🦲", val: "bald" }
      ],
      hair_female: [
         { avatar: "👩", val: "down" },
         { avatar: "👱‍♀️", val: "up" }
      ],
      accessories: [
         { avatar: "❌", val: false },
         { avatar: "👓", val: true }
      ]
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
      content: { avatar: string; val: string | boolean }[];
   };
   // -------------------- extra options pop up -----------------------
   const [extraChoicePopUpState, setExtraChoicePopUpState] = useState<extraChoiceType>({
      type: "",
      content: []
   });

   // -------------------- current selections -------------------------
   type currChoiceType = {
      gender: { avatar: string; val: string };
      skin: { avatar: string; val: string };
      hair: { avatar: string; val: string };
      accessories: { avatar: string; val: boolean | null };
   };
   const [currSelection, setcurrSelection] = useState<currChoiceType>({
      gender: { avatar: "🙋", val: "" },
      skin: { avatar: "🙋‍♂️", val: "" },
      hair: { avatar: "👱‍♂️", val: "" },
      accessories: { avatar: "❌", val: null }
   });

   // --------------------- handle selection ---------------------------
   type avatarObj = {
      url: string;
      gender: string;
      skin: string;
      hair: string;
      glasses: boolean;
      kin?: any;
   };

   const [originalAvatarArray, setoriginalAvatarArray] = useState<any>([]);
   const [genderArray, setGenderArray] = useState<any>();
   const [skinArray, setSkinArray] = useState<any>();
   const [accessoriesArray, setAccessoriesArray] = useState<any>();
   const [hairArray, setHairArray] = useState<any>();

   // ------------------------ gender selction function
   const handleGenderSelcetion = (avatar: string, val: string) => {
      setcurrSelection({
         gender: { avatar, val },
         skin: { avatar, val: "" },
         hair: { avatar: avatar == "🙋‍♂️" ? "👱‍♂️" : "👩", val: "" },
         accessories: { avatar: "❌", val: null }
      }),
         setchoicesClassState({
            gender: avatarChoserStyles.choiceSelected,
            skin: "",
            hair: "",
            accessories: ""
         }),
         setExtraChoicePopUpState({ type: "", content: [] });

      // // ------------ fileter array
      setGenderArray(sortedAvatar.filter((item) => item.gender == val));
      setoriginalAvatarArray(sortedAvatar.filter((item) => item.gender == val));
   };

   // ------------------------ skin selction function
   const handleSkinSelection = (avatar: string, val: string) => {
      setcurrSelection({
         ...currSelection,
         skin: { avatar, val },
         accessories: { avatar: "❌", val: null }
      });
      setchoicesClassState({
         ...choicesClassState,
         skin: avatarChoserStyles.choiceSelected,
         accessories: "",
         hair: ""
      });
      setExtraChoicePopUpState({ type: "", content: [] });

      // ------------ filetr array
      setSkinArray(genderArray.filter((avatar: avatarObj) => avatar.skin == val));
      setoriginalAvatarArray(genderArray.filter((avatar: avatarObj) => avatar.skin == val));
   };

   // -------------------- handle accessories seletion
   const handleAccessoriesSelection = (avatar: string, val: boolean) => {
      setcurrSelection({
         ...currSelection,
         accessories: { avatar, val }
      }),
         setchoicesClassState({
            ...choicesClassState,
            accessories: avatarChoserStyles.choiceSelected,
            hair: ""
         }),
         setExtraChoicePopUpState({ type: "", content: [] });

      // ------------ fileter array
      setAccessoriesArray(skinArray.filter((item: avatarObj) => item.glasses == val));
      setoriginalAvatarArray(skinArray.filter((item: avatarObj) => item.glasses == val));
   };

   // ------------------------ accessories selction function
   const handleHairSelection = (avatar: string, val: string) => {
      setcurrSelection({ ...currSelection, hair: { avatar, val } }),
         setchoicesClassState({
            ...choicesClassState,
            hair: avatarChoserStyles.choiceSelected
         }),
         setExtraChoicePopUpState({ type: "", content: [] });

      // ------------ fileter array
      setHairArray(accessoriesArray.filter((item: avatarObj) => item.hair == val));
      setoriginalAvatarArray(accessoriesArray.filter((item: avatarObj) => item.hair == val));
   };

   // -------------------------- bring up the avatar pop up --------------
   const [avatarChooserPopUpState, setAvatarChooserPopUpState] = useState<boolean | JSX.Element>(
      false
   );
   const bringUpAvatarChooserPopUp = (avatarLink: string) => {
      setAvatarChooserPopUpState(
         <AvatarChooserPopup image={avatarLink} closePopUp={closeAvatarChooser} />
      );
   };
   return (
      <>
         {avatarChooserPopUpState}
         <div className={avatarChoserStyles.mainWrapper}>
            <p className={`std-text-block ${avatarChoserStyles.textBlock}`}>Filter Avatars</p>

            {/* ---------------------- EXTRA CHOICES WRAP BUBBLE ------------------ */}
            {extraChoicePopUpState?.content.length > 0 && (
               <div className={avatarChoserStyles.extraOptionsWrapper}>
                  {extraChoicePopUpState.content.map((avatar: { avatar: string; val: any }) =>
                     extraChoicePopUpState.type == "gender" ? (
                        // ------------------ gender --------------------
                        <span
                           onClick={() => handleGenderSelcetion(avatar.avatar, avatar.val)}
                           key={Math.random()}>
                           {avatar.avatar}
                        </span>
                     ) : // ------------------ skin --------------------
                     extraChoicePopUpState.type == "skin" ? (
                        <span
                           onClick={() => handleSkinSelection(avatar.avatar, avatar.val)}
                           key={Math.random()}>
                           {avatar.avatar}
                        </span>
                     ) : // ------------------ hair --------------------
                     extraChoicePopUpState.type == "hair" ? (
                        <span
                           onClick={() => handleHairSelection(avatar.avatar, avatar.val)}
                           key={Math.random()}>
                           {avatar.avatar}
                        </span>
                     ) : (
                        // ------------------ accressories --------------------
                        <span
                           onClick={() => handleAccessoriesSelection(avatar.avatar, avatar.val)}
                           key={Math.random()}>
                           {avatar.avatar}
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
                        setExtraChoicePopUpState({
                           type: "gender",
                           content: choicesState.gender
                        })
                     }
                     className={choicesClassState.gender ? avatarChoserStyles.choiceSelected : ""}>
                     {currSelection.gender.avatar}
                  </div>
                  <p className={avatarChoserStyles.filterLabel}>gender</p>
               </section>

               {/* ------------------------- skin options --------------------- */}

               {currSelection.gender.val != "" && (
                  <section className={avatarChoserStyles.filterItemWrapper}>
                     <div
                        onClick={() => {
                           currSelection.gender.avatar == "🙋‍♂️"
                              ? setExtraChoicePopUpState({
                                   type: "skin",
                                   content: choicesState.skin_male
                                })
                              : setExtraChoicePopUpState({
                                   type: "skin",
                                   content: choicesState.skin_female
                                });
                        }}
                        className={choicesClassState.skin ? avatarChoserStyles.choiceSelected : ""}>
                        {currSelection.skin.avatar}
                     </div>
                     <p className={avatarChoserStyles.filterLabel}>skin</p>
                  </section>
               )}

               {/* ------------------------- accessories options --------------------- */}
               {currSelection.skin.val != "" && (
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
                        {currSelection.accessories.avatar}
                     </div>
                     <p className={avatarChoserStyles.filterLabel}>glasses</p>
                  </section>
               )}

               {/* ------------------------- hair options --------------------- */}

               {currSelection.accessories.val != null && (
                  <section className={avatarChoserStyles.filterItemWrapper}>
                     <div
                        onClick={() => {
                           currSelection.gender.avatar == "🙋‍♂️"
                              ? setExtraChoicePopUpState({
                                   type: "hair",
                                   content: choicesState.hair_male
                                })
                              : setExtraChoicePopUpState({
                                   type: "hair",
                                   content: choicesState.hair_female
                                });
                        }}
                        className={choicesClassState.hair ? avatarChoserStyles.choiceSelected : ""}>
                        {currSelection.hair.avatar}
                     </div>
                     <p className={avatarChoserStyles.filterLabel}>hair</p>
                  </section>
               )}
            </div>

            {/* ================== avatars ================= */}
            {originalAvatarArray.length > 0 && (
               <section className={avatarChoserStyles.avatarWrapper}>
                  {originalAvatarArray.map((avatarLink: avatarObj) => (
                     <div>
                        <img
                           className={avatarChoserStyles.avatar}
                           src={avatarLink.url}
                           onClick={() => bringUpAvatarChooserPopUp(avatarLink.url)}
                        />
                     </div>
                  ))}
               </section>
            )}
         </div>
      </>
   );
};

export default AvatarChooser;
