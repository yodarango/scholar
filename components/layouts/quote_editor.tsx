// styles
import { InputPrimary } from "../fragments/inputs/input_primary";
import { TextAreaPrimary } from "../fragments/inputs/text_area_primary";
import styles from "./quote_editor.module.css";

type TQuoteEditorProps = {
   background?: string;
   quote?: string;
   author?: string;
   cta: {
      handleQuote: (value: string) => void;
      handleAuthor: (value: string) => void;
   };
};

export const QuoteEditorTextEditor = ({ background, quote, author, cta }: TQuoteEditorProps) => {
   let darkText: boolean =
      background === "quote-bkg--5" ||
      background === "quote-bkg--11" ||
      background === "quote-bkg--12" ||
      background === "quote-bkg--13" ||
      background === "quote-bkg--20";

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
