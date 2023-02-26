// styles
import { InputPrimary } from "../fragments/inputs/input_primary";
import { TextAreaPrimary } from "../fragments/inputs/text_area_primary";
import styles from "./quote_editor.module.css";

type TQuoteEditorProps = {
   background?: string;
   darkText?: boolean;
   quote?: string;
   author?: string;
   cta: {
      handleQuote: (value: string) => void;
      handleAuthor: (value: string) => void;
   };
};

export const QuoteEditorTextEditor = ({
   background,
   darkText,
   quote,
   author,
   cta
}: TQuoteEditorProps) => {
   return (
      <div className={styles.mainWrapper}>
         <div className={styles.quote}>
            <TextAreaPrimary
               darkText={darkText}
               defaultValue={quote}
               alignment='center'
               transparent={true}
               bold={true}
               fontSize='large'
               maxLength={150}
               placeHolder='Type your awesome quote...'
               cta={{ handleCurrentValue: (value) => cta.handleQuote(value) }}
            />
         </div>
         <div className={styles.author}>
            <InputPrimary
               darkText={darkText}
               value={author}
               alignment='right'
               type='text'
               fontSize='xsmall'
               bold={true}
               placeholder='author'
               transparent={true}
               maxL={150}
               cta={{
                  handleValue: (value) => cta.handleAuthor(value)
               }}
            />
         </div>
      </div>
   );
};
