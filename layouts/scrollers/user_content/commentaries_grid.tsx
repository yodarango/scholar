import { useEffect, useState } from "react";

// components
import { UserAvatarWUsername } from "../../../fragments/chunks/user_avatar_w_username";
import { UnevenGrid } from "../uneven_grid";
import { SearchInput } from "../../../fragments/inputs/search_input";
import { Primary } from "../../../fragments/buttons/primary";

// styles
import styles from "./commentaries_grid.module.css";

type Commentary = {
   userId: string;
   userAvatar: string;
   username: string;
   userAuthority: number;
};

export const CommentariesGrid = () => {
   const [commentaries, setcommentaries] = useState<Commentary[]>([]);
   useEffect(() => {
      setcommentaries([
         {
            userId: "123",
            userAvatar: "images/user_avatars/default.png",
            username: "JohnDoe",
            userAuthority: 1
         },
         {
            userId: "123",
            userAvatar: "images/user_avatars/default.png",
            username: "JohnDoe",
            userAuthority: 1
         },
         {
            userId: "123",
            userAvatar: "images/user_avatars/default.png",
            username: "JohnDoe",
            userAuthority: 1
         },
         {
            userId: "123",
            userAvatar: "images/user_avatars/default.png",
            username: "JohnDoe",
            userAuthority: 1
         },
         {
            userId: "123",
            userAvatar: "images/user_avatars/default.png",
            username: "JohnDoe",
            userAuthority: 1
         }
      ]);
      // fetch commentaries with helper function
   }, []);

   // handle search for the user
   const handleUserSearch = (user: string) => {
      console.log(user);
   };

   // handle get more commentaries
   const getMoreCommentaies = () => {
      // fetch commentaries
   };

   return (
      <div className={styles.mainWrapper}>
         <div className={styles.search}>
            <SearchInput
               placeholder='Search username'
               maxL={150}
               cta={{ handleOnChange: handleUserSearch }}
            />
         </div>
         <div className={styles.unevenGrid}>
            <UnevenGrid>
               {commentaries.map((commentary) => (
                  <UserAvatarWUsername
                     userId={commentary.userId}
                     userAuthority={commentary.userAuthority}
                     flowV={true}
                     avatarSrc={commentary.userAvatar}
                     username={commentary.username}
                     quiet={true}
                  />
               ))}
            </UnevenGrid>
         </div>

         <div className={styles.moreButton}>
            <Primary type='1' title='Load more' cta={{ handleClick: getMoreCommentaies }} />
         </div>
      </div>
   );
};
