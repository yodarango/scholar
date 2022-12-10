import { useState, useEffect } from "react";
import { WithTextContentStack } from "../../../components/layouts/stacks/with_text_content_stack";
import {
   getUserAboutMePage,
   TgetUserAboutMeVariables
} from "../../../helpers/functions/users/get_user_about_me";

// styles
import styles from "./about_me.module.css";

export type TAboutMeProps = {
   userID?: string;
};

export const AboutMeTemplate = ({ userID }: TAboutMeProps) => {
   const [data, setdata] = useState<string | null>(null);

   // handle post
   const handleBodyValue = (value: string) => {};

   // fetch Data
   const getData = async (variables: TgetUserAboutMeVariables) => {
      try {
         const { data } = await getUserAboutMePage(variables);
         if (data.about_me) {
            setdata(data.about_me);
         } else {
            setdata(null);
         }
      } catch (error) {
         setdata(null);
         console.error(error);
      }
   };

   useEffect(() => {
      if (userID) {
         getData({ ID: userID });
      } else {
         getData({ isSelf: true });
      }
   }, []);

   return (
      <div className={styles.mainWrapper}>
         <WithTextContentStack
            withEdit
            noResize
            closeHref={`/users/${userID}`}
            title='About me'
            body={data}
            cta={{
               handleSubmit() {},
               handleBodyValue(value) {}
            }}
            postImage='/images/bible_books/1.png'
            textAreaHeight='50rem'
            textAreaMaxHeight='50rem'
            textAreaMaxLength={5000}
            userAuthority={1}
            userId='1'
            username='username'
            avatar='/images/user_avatars/default.png'
            postCategory='PNK'
         />
      </div>
   );
};
