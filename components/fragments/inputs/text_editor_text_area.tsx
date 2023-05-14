// styles
import { useState } from "react";
import { PRIMARY_COLOR } from "../../../constants/tokens";
import { Parragraph } from "../Typography/parragraph";
import { Icon } from "../chunks/icons";
import styles from "./text_editor_text_area.module.css";
import { StickerChooser } from "../popups/sticker_chooser";

type TTextEditorTextAreaProps = {
   withTitle?: boolean;
   titleMaxL?: number;
   titleDefaultValue?: string;
   titlePlaceHolder?: string;
   defaultValue: string | null;
   withSticker?: boolean;
   placeHolder: string;
   maxLength: number;
   cta: {
      handleBodyValue: (body: string) => void;
      handleTitleValue?: (title: string) => void;
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
   cta
}: TTextEditorTextAreaProps) => {
   const [showStickers, setShowStickers] = useState(false);
   return (
      <div className={styles.mainWrapper}>
         {showStickers && <StickerChooser cta={{ handleClose: () => setShowStickers(false) }} />}
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
                  <Parragraph text='Add sticker' quiet bold size='xs' />
               </div>
               <div className={styles.sticker}>
                  <Icon name='add' color={PRIMARY_COLOR} size='2rem' strokeWidth='100' />
               </div>
            </div>
         )}
         <textarea
            maxLength={maxLength}
            className={styles.textArea}
            defaultValue={defaultValue ? defaultValue : ""}
            placeholder={placeHolder}
            onChange={(e) => cta.handleBodyValue(e.target.value)}></textarea>
      </div>
   );
};
