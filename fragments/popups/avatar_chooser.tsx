// core
import { useState } from "react";

// styles
import styles from "./avatar_chooser.module.css";

// helpers
import { sortedAvatar } from "../../data/available_avatars";
import { Secondary } from "../buttons/secondary";
import Portal from "../../hoc/potal";
import { PrimaryMenuBkg } from "./primary_menu_bkg";
import { Parragraph } from "../Typography/parragraph";
import { MenuPrimaryOption } from "../buttons/menu_options/menu_primary_option";
import { Icon } from "../chunks/icons";
import { SmallLoader } from "../chunks/small_loader";

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
         { avatar: "❓", val: "" },
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
   // extra options pop up
   const [extraChoicePopUpState, setExtraChoicePopUpState] = useState<extraChoiceType>({
      type: "",
      content: []
   });

   //  current selections
   type currChoiceType = {
      gender: { avatar: string; val: string };
      skin: { avatar: string; val: string };
      hair: { avatar: string; val: string };
      accessories: { avatar: string; val: boolean | null };
   };
   const [currSelection, setcurrSelection] = useState<currChoiceType>({
      gender: { avatar: "❓", val: "" },
      skin: { avatar: "🙋‍♂️", val: "" },
      hair: { avatar: "👱‍♂️", val: "" },
      accessories: { avatar: "❌", val: null }
   });

   //  handle selection
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

   //  gender selction function
   const handleGenderSelcetion = (avatar: string, val: string) => {
      setcurrSelection({
         gender: { avatar, val },
         skin: { avatar, val: "" },
         hair: { avatar: avatar == "🙋‍♂️" ? "👱‍♂️" : "👩", val: "" },
         accessories: { avatar: "❌", val: null }
      }),
         setchoicesClassState({
            gender: styles.choiceSelected,
            skin: "",
            hair: "",
            accessories: ""
         }),
         setExtraChoicePopUpState({ type: "", content: [] });

      // ----------- fileter array
      setGenderArray(sortedAvatar.filter((item) => item.gender == val));
      setoriginalAvatarArray(sortedAvatar.filter((item) => item.gender == val));
   };

   //  skin selection function
   const handleSkinSelection = (avatar: string, val: string) => {
      setcurrSelection({
         ...currSelection,
         skin: { avatar, val },
         accessories: { avatar: "❌", val: null }
      });
      setchoicesClassState({
         ...choicesClassState,
         skin: styles.choiceSelected,
         accessories: "",
         hair: ""
      });
      setExtraChoicePopUpState({ type: "", content: [] });

      //  filter array
      setSkinArray(genderArray.filter((avatar: avatarObj) => avatar.skin == val));
      setoriginalAvatarArray(genderArray.filter((avatar: avatarObj) => avatar.skin == val));
   };

   //  handle accessories selection
   const handleAccessoriesSelection = (avatar: string, val: boolean) => {
      setcurrSelection({
         ...currSelection,
         accessories: { avatar, val }
      }),
         setchoicesClassState({
            ...choicesClassState,
            accessories: styles.choiceSelected,
            hair: ""
         }),
         setExtraChoicePopUpState({ type: "", content: [] });

      //  filter array
      setAccessoriesArray(skinArray.filter((item: avatarObj) => item.glasses == val));
      setoriginalAvatarArray(skinArray.filter((item: avatarObj) => item.glasses == val));
   };

   //  accessories seelction function
   const handleHairSelection = (avatar: string, val: string) => {
      setcurrSelection({ ...currSelection, hair: { avatar, val } }),
         setchoicesClassState({
            ...choicesClassState,
            hair: styles.choiceSelected
         }),
         setExtraChoicePopUpState({ type: "", content: [] });

      //  filter array
      setHairArray(accessoriesArray.filter((item: avatarObj) => item.hair == val));
      setoriginalAvatarArray(accessoriesArray.filter((item: avatarObj) => item.hair == val));
   };

   //  bring up the avatar pop up --------------
   const [avatarChooserPopUpState, setAvatarChooserPopUpState] = useState<boolean | string>(false);

   // handle avatar update
   const [smallLoader, setSmallLoader] = useState<boolean | JSX.Element>(false);
   const [notificationPopUpState, setNotificationPopUpState] =
      useState<boolean | JSX.Element>(false);

   const handleAvatarSelection = async (image: string) => {
      console.log(image);
      setSmallLoader(true);
      //   try {
      //      setSmallLoaderState(<SmallLoader />);
      //      client.mutate({
      //         mutation: UPDATE_MY_AVATAR,
      //         variables: { avatar: image }
      //      });
      //      closePopUp(image);
      //      setSmallLoaderState(false);
      //   } catch (error: any) {
      //      setSmallLoaderState(false);
      //      setNotificationPopUpState(
      //         <NotificationPopup
      //            closeModal={() => setNotificationPopUpState(false)}
      //            title={`You're not authorized! 👮‍♂️`}
      //            contentString={error.graphQLErrors[0].message} //'Something has gone south ⬇️ and we are performing surgery on the issue 👨‍⚕️. Please try again later!'
      //            newClass='notification-wrapper--Error'
      //         />
      //      );
      //   }
   };

   return (
      <>
         {avatarChooserPopUpState && typeof avatarChooserPopUpState === "string" && (
            <Portal>
               <PrimaryMenuBkg
                  customColors={{
                     light: "#F1EAFF",
                     dark: "#ff89a9"
                  }}
                  cta={{ handleClose: () => setAvatarChooserPopUpState(false) }}>
                  <div className={styles.menuOption}>
                     {!smallLoader && (
                        <MenuPrimaryOption
                           iconType='icon'
                           textType='text'
                           cta={{
                              handleOptionClick: () =>
                                 handleAvatarSelection(avatarChooserPopUpState)
                           }}
                           optionProperties={{
                              icon: <Icon name='checkmark' color='#f1eaff' />,
                              text: "Set as avatar",
                              iconShadow: "#f1eaff"
                           }}
                        />
                     )}
                     {smallLoader && (
                        <SmallLoader inline customColors={["#F1EAFF", "#F1EAFF", "#F1EAFF"]} />
                     )}
                  </div>
                  <div className={styles.menuOption}>
                     <MenuPrimaryOption
                        iconType='icon'
                        textType='text'
                        cta={{ handleOptionClick: () => setAvatarChooserPopUpState(false) }}
                        optionProperties={{
                           icon: <Icon name='close' color='#ff4d62' />,
                           text: "Cancel",
                           descColor: "#ff4d62",
                           iconShadow: "#ff4d62"
                        }}
                     />
                  </div>
               </PrimaryMenuBkg>
            </Portal>
         )}
         <div className={styles.mainWrapper}>
            <div className={styles.title}>
               <Parragraph text='Filter avatar' size='main' align='center' />
            </div>

            {/* ---------------------- EXTRA CHOICES WRAP BUBBLE ------------------ */}
            {extraChoicePopUpState?.content.length > 0 && (
               <div className={styles.extraOptionsWrapper}>
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
            {console.log(choicesClassState)}
            <div className={styles.filterWrapper}>
               {/* ------------------------- gender options --------------------- */}
               <Secondary
                  cta={{
                     handleClick: () =>
                        setExtraChoicePopUpState({
                           type: "gender",
                           content: choicesState.gender
                        })
                  }}
                  title='Gender'
                  fullWidth={false}
                  icon={currSelection.gender.avatar}
                  type={choicesClassState.gender === "" ? "1" : "2"}
               />
               {/* ------------------------- skin options --------------------- */}

               {currSelection.gender.val != "" && (
                  <Secondary
                     cta={{
                        handleClick: () => {
                           currSelection.gender.avatar == "🙋‍♂️"
                              ? setExtraChoicePopUpState({
                                   type: "skin",
                                   content: choicesState.skin_male
                                })
                              : setExtraChoicePopUpState({
                                   type: "skin",
                                   content: choicesState.skin_female
                                });
                        }
                     }}
                     title='Skin'
                     fullWidth={false}
                     icon={currSelection.skin.avatar}
                     type={choicesClassState.skin === "" ? "1" : "2"}
                  />
               )}

               {/* ------------------------- accessories options --------------------- */}
               {currSelection.skin.val != "" && (
                  <Secondary
                     cta={{
                        handleClick: () =>
                           setExtraChoicePopUpState({
                              type: "accessories",
                              content: choicesState.accessories
                           })
                     }}
                     title='Glasses'
                     fullWidth={false}
                     icon={currSelection.accessories.avatar}
                     type={choicesClassState.accessories === "" ? "1" : "2"}
                  />
               )}

               {/* ------------------------- hair options --------------------- */}

               {currSelection.accessories.val != null && (
                  <Secondary
                     cta={{
                        handleClick: () => {
                           currSelection.gender.avatar == "🙋‍♂️"
                              ? setExtraChoicePopUpState({
                                   type: "hair",
                                   content: choicesState.hair_male
                                })
                              : setExtraChoicePopUpState({
                                   type: "hair",
                                   content: choicesState.hair_female
                                });
                        }
                     }}
                     title='Hair'
                     fullWidth={false}
                     icon={currSelection.hair.avatar}
                     type={choicesClassState.accessories === "" ? "1" : "2"}
                  />
               )}
            </div>

            {/* ================== avatars ================= */}
            {originalAvatarArray.length > 0 && (
               <section className={styles.avatarWrapper}>
                  {originalAvatarArray.map((avatarLink: avatarObj) => (
                     <div onClick={() => setAvatarChooserPopUpState(avatarLink.url)}>
                        <img className={styles.avatar} src={avatarLink.url} />
                     </div>
                  ))}
               </section>
            )}
         </div>
      </>
   );
};

export default AvatarChooser;
