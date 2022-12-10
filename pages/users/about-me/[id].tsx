import { TextAreaPrimary } from "../../../components/fragments/inputs/text_area_primary";
import { TextEditorTextArea } from "../../../components/fragments/inputs/text_editor_text_area";
import { Parragraph } from "../../../components/fragments/Typography/parragraph";
import { FourthStackHeader } from "../../../components/layouts/stacks/headers/fourth_stack_header";
import { PrimaryStackHeader } from "../../../components/layouts/stacks/headers/primary_stack_header";
import { ProfileArt } from "../../../components/layouts/stacks/headers/profile_art";
import { WithTextContentStack } from "../../../components/layouts/stacks/with_text_content_stack";
import { TextEditor } from "../../../components/layouts/text_editor";
// styles
import styles from "./index.module.css";
export type TAboutMeProps = {
   ID: string;
};
const AboutMe = ({ ID }: TAboutMeProps) => {
   const handleBodyValue = (value: string) => {};
   return (
      <div className={styles.mainWrapper}>
         {/* replace this with the commentary header */}
         {/* <PrimaryStackHeader icon='profile' title='My story ' href={`/users/${1}`} />
         <div className={styles.text}>
            <Parragraph text={"sadsds"} size='main' />
         </div>
         <div className={styles.text}>
            <TextAreaPrimary
               transparent
               border='bottom'
               defaultValue=''
               maxHeight={50}
               maxLength={500}
               placeHolder='Tell others about you'
               height='25rem'
               cta={{ handleCurrentValue: handleBodyValue }}
            />
         </div> */}
         <WithTextContentStack
            withEdit
            title='My title'
            body={"fdsfdsfdsfds"}
            cta={{ handleCloseModal: () => console.log("close modal") }}
            postImage='/images/bible_books/1.png'
            userAuthority={1}
            userId='1'
            username='username'
            avatar='/images/user_avatars/default.png'
            postCategory='PNK'
         />
      </div>
   );
};

export default AboutMe;
