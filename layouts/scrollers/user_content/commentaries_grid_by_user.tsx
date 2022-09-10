import { useEffect, useState } from "react";

// components
import { UserAvatarWUsername } from "../../../fragments/chunks/user_avatar_w_username";
import { UnevenGrid } from "../uneven_grid";
import { SearchInput } from "../../../fragments/inputs/search_input";
import { Primary } from "../../../fragments/buttons/primary";

// styles
import styles from "./commentaries_grid_by_user.module.css";

type Commentary = {
   userId: string;
   userAvatar: string;
   username: string;
   userAuthority: number;
};

type TCommentariesGridProps = {
   verseId: string;
};

export const CommentariesGridByUser = ({ verseId }: TCommentariesGridProps) => {
   const [commentariesImmutable, setcommentariesImmmutable] = useState<Commentary[]>([]);
   const [commentaries, setcommentaries] = useState<Commentary[]>([]);
   useEffect(() => {
      setcommentariesImmmutable([
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
   const handleUserSearch = (value: string) => {
      const findUser = commentariesImmutable.filter((user) => {
         const u = user.username.toLocaleLowerCase();
         return u.includes(value.toLocaleLowerCase());
      });

      setcommentaries(findUser);
   };

   // handle get more commentaries
   const getMoreCommentaies = () => {
      verseId;
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
               {commentaries.map((commentary, index: number) => (
                  <UserAvatarWUsername
                     key={index}
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
