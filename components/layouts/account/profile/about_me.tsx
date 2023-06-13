import { useEffect, useState } from "react";

// comps
import { AboutMeItem } from "../../../fragments/cards/about_me_item";
import { Primary } from "../../../fragments/buttons/primary";
import {
   TgetUserAboutMeVariables,
   getUserAboutMe
} from "../../../../helpers/functions/users/get_user_about_me";

// styles
import styles from "./about_me.module.css";

// helpers / types
import { Header } from "../../../fragments/Typography/header";
import { TUser } from "../../../../types/user";

type TAboutMeProps = {
   userID?: string;
};

export const AboutMe = ({ userID }: TAboutMeProps) => {
   const [data, setData] = useState<TUser | any>({
      my_church: "",
      my_favorite_color: "",
      my_job: "",
      my_true_color_personality_test: "",
      my_favorite_verse: "",
      my_ministry: ""
   });

   const {
      my_church = "",
      my_favorite_color = "",
      my_job = "",
      my_true_color_personality_test = "",
      my_favorite_verse = "",
      my_ministry = "",
      is_Bible_public = ""
   } = data || {};

   const getData = async (variables?: TgetUserAboutMeVariables) => {
      try {
         const { data } = await getUserAboutMe(variables);

         setData(data);
      } catch (error) {
         console.error(error);
      }
   };

   useEffect(() => {
      if (userID === "@me") {
         getData();
      } else {
         getData({ ID: userID });
      }
   }, []);

   return (
      <div className={styles.mainWrapper}>
         <div className={styles.title}>
            <Header text='About Me' size='main' color='#F1EAFF' type={4} />
         </div>
         <div className={styles.aboutMeWrapper}>
            <AboutMeItem emoji='⛪️' value={my_church} initialValue='My church' />
            <AboutMeItem emoji='🔨' value={my_ministry} initialValue='My ministry' />
            <AboutMeItem emoji='📖' value={my_favorite_verse} initialValue='My favorite verse' />
            <AboutMeItem emoji='👔' value={my_job} initialValue='My job' />
            <AboutMeItem
               emoji='🎨'
               value={my_true_color_personality_test}
               initialValue='My color test personality'
            />
            <AboutMeItem emoji='🖌' value={my_favorite_color} initialValue='My favorite color' />
         </div>
         <div className={styles.moreButton}>
            <Primary type='1' title='More about me' href={`/users/about-me/${userID}`} />
         </div>
         {is_Bible_public && (
            <div className={styles.myBibleBtn}>
               <Primary type='2' title="Read this user's Bible" href={`/read/${userID}`} />
            </div>
         )}
      </div>
   );
};
