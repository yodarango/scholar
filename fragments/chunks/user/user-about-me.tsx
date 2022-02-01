// core
import Link from "next/link";

// styles
import usersAboutMeStyles from "../../../styles/fragments/chunks/users/UserAboutMe.module.css";

// helpers / types
import { Tuser } from "../../../pages/users/[userId]";

type userAboutMeProps = {
   user: Tuser;
};

const UserAboutMe = ({ user }: userAboutMeProps) => {
   return (
      <section className={usersAboutMeStyles.aboutMeWrapper}>
         <h3 className={usersAboutMeStyles.aboutMeTitle}>About Me</h3>
         <ul>
            {user.first_name && user.gender === "male" && (
               <li>
                  👨 Full name is {user.first_name} {user.last_name}
               </li>
            )}
            {user.first_name && user.gender === "female" && (
               <li>
                  👩 Full name is {user.first_name} {user.last_name}
               </li>
            )}
            {user.my_church && <li>⛪ I attend {user.my_church}</li>}
            {user.my_favorite_verse && (
               <li>
                  📖 Favorite verse is{" "}
                  <span className={usersAboutMeStyles.favoriteVerseSpan}>
                     {user.my_favorite_verse}
                  </span>
               </li>
            )}
            {user.my_ministry && <li>🧹 My ministry is {user.my_ministry}</li>}
            {user.my_job && <li>👔 I am full time {user.my_job}</li>}
            {user.my_true_color_personality_test &&
               user.my_true_color_personality_test === "Green" && (
                  <li>🎨 True Color Personality is 🟩</li>
               )}
            {user.my_true_color_personality_test &&
               user.my_true_color_personality_test === "Blue" && (
                  <li>🎨 True Color Personality is 🟦</li>
               )}
            {user.my_true_color_personality_test &&
               user.my_true_color_personality_test === "Gold" && (
                  <li>🎨 True Color Personality is 🟨</li>
               )}
            {user.my_true_color_personality_test &&
               user.my_true_color_personality_test === "Orange" && (
                  <li>🎨 True Color Personality is 🟧</li>
               )}
            {user.my_story && (
               <li className={usersAboutMeStyles.myStory}>
                  <Link href={`/my-story/${user.ID}`}>
                     <a> This is my sotry </a>
                  </Link>
               </li>
            )}
         </ul>
      </section>
   );
};

export default UserAboutMe;
