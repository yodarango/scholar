import React, { useEffect, useState } from "react";
import styles from "./sticker_chooser.module.css";
import PortalSecondary from "../../hoc/portal_secondary";
import { CloseContent } from "../../fragments/buttons/close_content";
import { SearchInput } from "../../fragments/inputs/search_input";
import { emojis } from "../../../data/emojis";
import Image from "next/image";
import { Parragraph } from "../../fragments/Typography/parragraph";

type TStickerChooserProps = {
   cta: {
      handleClose: () => void;
      handleChoice: (sticker: { id: string; path: string }) => void;
   };
};

type TEmoji = { id: string; path: string; description: string; categories: string[] };
type TEmojis = TEmoji[];

export const StickerChooser = ({ cta }: TStickerChooserProps) => {
   const [stickers, setSticker] = useState<TEmojis>([]);

   const getAllEmojis = () => {
      const allEmojis: TEmojis = [];
      Object.keys(emojis).forEach((key) => {
         const emoji = {
            id: key,
            path: `${emojis[key]}`,
            description: key.split("_").join(" "),
            categories: key.split("_")
         };

         allEmojis.push(emoji);
      });

      return allEmojis;
   };

   const filterStickers = (value: string) => {
      const stkrz = getAllEmojis();
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
      setSticker(getAllEmojis());
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
               {stickers.map((sticker: TEmoji, index: number) => (
                  <div
                     className={styles.sticker}
                     key={index}
                     onClick={() => {
                        cta.handleChoice({ id: sticker.id, path: sticker.path });
                        cta.handleClose();
                     }}>
                     {/* not doing emojis for now */}
                     {/* <Image src={sticker.path} alt={sticker.description} layout='fill' /> */}
                     <Parragraph text={sticker.path} size='xxlarge' />
                  </div>
               ))}
            </section>
         </div>
      </PortalSecondary>
   );
};
