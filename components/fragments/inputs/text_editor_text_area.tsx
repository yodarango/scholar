// styles
import { useState } from "react";
import { PRIMARY_COLOR } from "../../../constants/tokens";
import { Parragraph } from "../Typography/parragraph";
import { Icon } from "../chunks/icons";
import styles from "./text_editor_text_area.module.css";
import { StickerChooser } from "../../layouts/scrollers/sticker_chooser";
import Image from "next/image";
import { COMMENTARY_STICKER_DEFAULT, POST_TYPE_ARTICLE } from "../../../constants/defaults";

type TTextEditorTextAreaProps = {
   withTitle?: boolean;
   titleMaxL?: number;
   titleDefaultValue?: string;
   titlePlaceHolder?: string;
   defaultValue: string | null;
   withSticker?: boolean;
   sticker?: string | undefined;
   placeHolder: string;
   maxLength: number;
   contentType?: number;
   cta: {
      handleBodyValue: (body: string) => void;
      handleTitleValue?: (title: string) => void;
      handleStickerChoice?: (sticker: { id: string; path: string }) => void;
   };
};

export const TextEditorTextArea = ({
   withTitle = false,
   titleMaxL = 100,
   titleDefaultValue = "",
   titlePlaceHolder = "",
   withSticker,
   defaultValue,
   placeHolder,
   maxLength,
   sticker,
   contentType,
   cta
}: TTextEditorTextAreaProps) => {
   const [showStickers, setShowStickers] = useState(false);
   const [currentSticker, setcurrentSticker] = useState<string | undefined>(sticker);

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

   return (
      <div className={styles.mainWrapper}>
         {showStickers && (
            <StickerChooser
               cta={{
                  handleClose: () => setShowStickers(false),
                  handleChoice: (sticker) => {
                     cta?.handleStickerChoice && cta.handleStickerChoice(sticker);
                     setcurrentSticker(sticker.path);
                  }
               }}
            />
         )}
         {withTitle && (
            <div className={styles.title}>
               <input
                  defaultValue={titleDefaultValue}
                  placeholder={titlePlaceHolder}
                  maxLength={titleMaxL}
                  onChange={(e) => cta.handleTitleValue && cta.handleTitleValue(e.target.value)}
               />
            </div>
         )}
         {withSticker && (
            <div className={styles.stickerWrapper} onClick={() => setShowStickers(true)}>
               <div className={styles.stickerText}>
                  <Parragraph
                     text={sticker ? "your sticker" : "Add sticker"}
                     quiet
                     bold
                     size='xs'
                  />
               </div>
               {!sticker && (
                  <div className={styles.sticker}>
                     <Icon name='add' color={PRIMARY_COLOR} size='2rem' strokeWidth='100' />
                  </div>
               )}
               {sticker && (
                  <div className={styles.sticker}>
                     <Image
                        src={
                           s.find((s) => s.path === currentSticker)?.path ||
                           COMMENTARY_STICKER_DEFAULT
                        }
                        alt={s.find((s) => s.path === currentSticker)?.path || ""}
                        layout='fill'
                     />
                  </div>
               )}
            </div>
         )}
         <textarea
            maxLength={maxLength}
            className={`${styles.textArea} ${
               contentType === POST_TYPE_ARTICLE ? styles.textAreaArticle : ""
            }`}
            defaultValue={defaultValue ? defaultValue : ""}
            placeholder={placeHolder}
            onChange={(e) => cta.handleBodyValue(e.target.value)}></textarea>
      </div>
   );
};
