// core
import React from "react";
import Link from "next/link";

// styles
import libraryAuthorStyles from "../styles/fragments/LibraryAuthor.module.css";

export type IuserData = {
   id: string;
   name: string;
   lastName: string;
   signature: string;
   avatar: string;
   trusted: true;
   reputation?: 54;
};

type libraryAuthorProps = {
   userData: IuserData;
   content: string;
};

const LibraryAuthor = ({ userData, content }: libraryAuthorProps) => {
   return (
      <div className={`${libraryAuthorStyles.mainWrapper}`}>
         <Link href={`/library/${content}?userid=${userData.id}`}>
            <a>
               <img
                  src={userData.avatar}
                  alt='user avatar'
                  className={`${libraryAuthorStyles.avatar}`}
               />
            </a>
         </Link>
         <h1 className={`std-button_gradient-text`}>{userData.signature}</h1>
         <Link href={`/profile?userid=${userData.id}`}>
            <a>visit {userData.signature} profile </a>
         </Link>
      </div>
   );
};

export default LibraryAuthor;
