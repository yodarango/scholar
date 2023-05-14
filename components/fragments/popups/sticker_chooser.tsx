import React, { useEffect, useState } from "react";
import styles from "./sticker_chooser.module.css";
import { SearchInput } from "../inputs/search_input";
import { CloseContent } from "../buttons/close_content";
import PortalSecondary from "../../hoc/portal_secondary";

type TStickerChooserProps = {
   cta: {
      handleClose: () => void;
   };
};

export const StickerChooser = ({ cta }: TStickerChooserProps) => {
   const [stickers, setSticker] = useState([]);

   const s = [
      {
         id: 123,
         name: "add",
         categories: [
            "love",
            "happy",
            "sad",
            "angry",
            "funny",
            "animals",
            "food",
            "sports",
            "travel",
            "music",
            "movies",
            "tv",
            "gaming",
            "anime",
            "cartoons",
            "celebrities",
            "memes",
            "stickers",
            "emoji",
            "random"
         ]
      }
   ];

   const filterStickers = (value: string) => {
      let filteredStickers = stickers.filter((s: any) => s.categories.includes(value));
      filteredStickers = filterStickers.length === 0 || !filterStickers ? [] : filteredStickers;
      console.log(filteredStickers);
      setSticker(filteredStickers);
   };

   useEffect(() => {
      const stkrz: any = [...Array(20)].map((_, i) => s);
      setSticker(stkrz);
   }, []);

   return (
      <PortalSecondary>
         <div className={styles.mainWrapper}>
            <div className={styles.close}>
               <CloseContent cta={{ handleClick: cta.handleClose }} />
            </div>
            <div className={styles.search}>
               <SearchInput
                  maxL={50}
                  cta={{ handleOnChange: filterStickers }}
                  placeholder='search by topic...'
                  bounceTime={100}
               />
            </div>
            <div className={styles.stickerWrapper}>
               {stickers.map((sticker, i) => (
                  <div className={styles.sticker} key={i} />
               ))}
            </div>
         </div>
      </PortalSecondary>
   );
};
