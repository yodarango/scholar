import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { WithTextContentStack } from "../../../components/layouts/stacks/with_text_content_stack";
import {
   getUserAboutMePage,
   TgetUserAboutMeVariables
} from "../../../helpers/functions/users/get_user_about_me";

// styles
import styles from "./about_me.module.css";

type TAboutMe = {
   authority_level: number;
   signature: string;
   about_me: string;
   avatar: string;
   ID: string;
};
export const AboutMeTemplate = () => {
   const router = useRouter();
   const [data, setdata] = useState<TAboutMe | null>(null);
   const [userId, setUserId] = useState<string | null>(null);

   // handle post
   const handleBodyValue = (value: string) => {};

   // fetch Data
   const getData = async (variables: TgetUserAboutMeVariables) => {
      try {
         const { data } = await getUserAboutMePage(variables);
         console.log(data);
         if (data) {
            setdata(data);
         } else {
            setdata(null);
         }
      } catch (error) {
         setdata(null);
         console.error(error);
      }
   };

   useEffect(() => {
      if (typeof router?.query?.id === "string") setUserId(router?.query?.id);
   }, [router.isReady]);

   useEffect(() => {
      if (userId) {
         if (userId === "@me") {
            getData({ isSelf: true });
         } else if (typeof userId === "string") {
            getData({ ID: userId });
         }
      }
   }, [userId]);

   return (
      <div className={styles.mainWrapper}>
         {data && (
            <WithTextContentStack
               withEdit
               noResize
               closeHref={`/users/${userId}`}
               title='Get to know me'
               body={data.about_me}
               cta={{
                  handleSubmit() {},
                  handleBodyValue(value) {}
               }}
               postImage='/images/bible_books/1.png'
               textAreaHeight='50rem'
               textAreaMaxHeight='50rem'
               textAreaMaxLength={5000}
               userAuthority={1}
               userId={data.ID}
               username={data.signature}
               avatar={data.avatar}
            />
         )}
      </div>
   );
};
