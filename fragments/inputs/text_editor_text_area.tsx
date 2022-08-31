// styles
import styles from "./text_editor_text_area.module.css";

type TTextEditorTextAreaProps = {
   withTitle?: boolean;
   titleMaxL?: number;
   titleDefaultValue?: string;
   titlePlaceHolder?: string;
   defaultValue: string | null;
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
   defaultValue,
   placeHolder,
   maxLength,
   cta
}: TTextEditorTextAreaProps) => {
   return (
      <div className={styles.mainWrapper}>
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
         <textarea
            maxLength={maxLength}
            className={styles.textArea}
            defaultValue={defaultValue ? defaultValue : ""}
            placeholder={placeHolder}
            onChange={(e) => cta.handleBodyValue(e.target.value)}></textarea>
      </div>
   );
};
