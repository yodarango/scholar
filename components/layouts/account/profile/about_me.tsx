// core
import Link from "next/link";

// styles
import styles from "./about_me.module.css";

// helpers / types
import { Header } from "../../../fragments/Typography/header";
import { AboutMeItem } from "../../../fragments/cards/about_me_item";
import { Primary } from "../../../fragments/buttons/primary";

type TAboutMeProps = {
   userId: string;
   myChurch: string;
   ministry: string;
   favBibleVerse: string;
   fullTimeJob: string;
   colorPersonality: string;
   favColor: string;
};

export const AboutMe = ({
   userId,
   myChurch,
   ministry,
   favBibleVerse,
   fullTimeJob,
   colorPersonality,
   favColor
}: TAboutMeProps) => {
   return (
      <div className={styles.mainWrapper}>
         <div className={styles.title}>
            <Header text='About Me' size='main' color='#F1EAFF' type={4} />
         </div>
         <div className={styles.aboutMeWrapper}>
            <AboutMeItem emoji='⛪️' value={myChurch} />
            <AboutMeItem emoji='🔨' value={ministry} />
            <AboutMeItem emoji='📖' value={favBibleVerse} />
            <AboutMeItem emoji='👔' value={fullTimeJob} />
            <AboutMeItem emoji='🎨' value={colorPersonality} />
            <AboutMeItem emoji='🖌' value={favColor} />
         </div>
         <div className={styles.moreButton}>
            <Primary type='1' title='More about me' href={`/users/my-story/${userId}`} />
         </div>
      </div>
   );
};
