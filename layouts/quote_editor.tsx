// styles
import { InputPrimary } from "../fragments/inputs/input_primary";
import { TextAreaPrimary } from "../fragments/inputs/text_area_primary";
import styles from "./quote_editor.module.css";

type TQuoteEditorProps = {
   quote: string;
   author: string;
};

export const QuoteEditor = ({ quote, author }: TQuoteEditorProps) => {
   return (
      <div className={styles.mainWrapper}>
         <div className={styles.quote}>
            <TextAreaPrimary
               defaultValue={quote}
               alignment='center'
               transparent={true}
               bold={true}
               fontSize='large'
               maxLength={150}
               placeHolder='Type your awesome quote...'
               cta={{ handleCurrentValue: (value) => console.log(value) }}
            />
         </div>
         <div className={styles.author}>
            <InputPrimary
               value={author}
               alignment='right'
               type='text'
               fontSize='xsmall'
               bold={true}
               placeholder='author'
               transparent={true}
               maxL={150}
               cta={{
                  handleValue: (value) => console.log(value)
               }}
            />
         </div>
      </div>
   );
};
