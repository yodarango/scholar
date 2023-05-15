import React, { useEffect, useState } from "react";
import styles from "./sticker_chooser.module.css";
import PortalSecondary from "../../hoc/portal_secondary";
import { CloseContent } from "../../fragments/buttons/close_content";
import { SearchInput } from "../../fragments/inputs/search_input";
import Image from "next/image";

type TStickerChooserProps = {
   cta: {
      handleClose: () => void;
      handleChoice: (sticker: { id: string; path: string }) => void;
   };
};

export const StickerChooser = ({ cta }: TStickerChooserProps) => {
   const [stickers, setSticker] = useState([]);

   const s = [
      {
         id: "123",
         name: "add",
         path: "/images/bible_books/1.png",
         description: "description",
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
      const stkrz: any = [...Array(20)].map((_, i) => s[0]);
      let filteredStickers = stkrz.filter((s: any) => {
         const categories = s.categories.join(" ");
         if (categories.includes(value)) {
            return s;
         }
      });
      filteredStickers = filterStickers.length === 0 || !filterStickers ? [] : filteredStickers;
      filteredStickers = !value || value === "" ? stkrz : filteredStickers;
      setSticker(filteredStickers);
   };

   useEffect(() => {
      const stkrz: any = [...Array(20)].map((_, i) => s[0]);
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
                  placeholder='Search by topic...'
                  maxL={30}
                  bounceTime={100}
                  cta={{ handleOnChange: filterStickers }}
               />
            </div>

            <section className={styles.stickerWrapper}>
               {stickers.map((sticker: any, index: number) => (
                  <div
                     className={styles.sticker}
                     key={index}
                     onClick={() => {
                        cta.handleChoice({ id: sticker.id, path: sticker.name });
                        cta.handleClose();
                     }}>
                     <Image src={sticker.path} alt={sticker.description} layout='fill' />
                  </div>
               ))}
            </section>
         </div>
      </PortalSecondary>
   );
};
