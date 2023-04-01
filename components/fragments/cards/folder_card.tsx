import Image from "next/image";
import React from "react";
import { Parragraph } from "../Typography/parragraph";
import style from "./folder_card.module.css";

type FolderCardProps = {
   className?: string;
   thumbnail: string;
   folderName: string;
   postCount: number | string;
   ID: string | number;
};
export const FolderCard = ({
   className,
   thumbnail,
   folderName,
   postCount,
   ID
}: FolderCardProps) => {
   return (
      <div className={`shadow-s ${style.mainWrapper} ${className}`}>
         <div className={style.imageWrapper}>
            {thumbnail && (
               <Image
                  src={thumbnail}
                  alt='thumbnail for a book of the bible'
                  layout='fill'
                  defaultValue={""}
               />
            )}
         </div>
         <div className={style.folderName}>
            <Parragraph text={folderName} size='main' />
         </div>

         <div className={style.postCount}>
            <Parragraph text={postCount} bold size='main' />
         </div>
      </div>
   );
};
