import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { WithTextContentStack } from "../../../components/layouts/stacks/with_text_content_stack";
import { loggedInUser } from "../../../helpers/auth/get-loggedin-user";
import {
   getUserAboutMePage,
   TgetUserAboutMeVariables
} from "../../../helpers/functions/users/get_user_about_me";

// styles
import styles from "./about_me.module.css";
import { useAboutMe } from "../../../helpers/functions/posts/about_me";

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
   const [routerId, setrouterId] = useState<string | null>(null);
   const [loggedIn, setloggedIn] = useState<boolean>(false);
   const [body, setbody] = useState<string>("");
   const { save } = useAboutMe();

   // handle post
   const handleBodyValue = (value: string) => {
      setbody(value);
   };

   // fetch Data
   const getData = async (variables: TgetUserAboutMeVariables) => {
      try {
         const { data } = await getUserAboutMePage(variables);

         if (data) {
            setdata(data);
            let user: any = loggedInUser()?.ID;
            user = user && parseInt(user);
            setloggedIn(parseInt(data.ID) === user);
         } else {
            setdata(null);
         }
      } catch (error) {
         setdata(null);
         console.error(error);
      }
   };

   useEffect(() => {
      if (typeof router?.query?.id === "string") setrouterId(router?.query?.id);
   }, [router.isReady]);

   useEffect(() => {
      if (routerId) {
         if (routerId === "@me") {
            getData({ isSelf: true });
         } else {
            getData({ ID: routerId });
         }
      }
   }, [routerId]);

   return (
      <div className={styles.mainWrapper}>
         {data && (
            <WithTextContentStack
               withEdit={loggedIn}
               noResize
               closeHref={`/users/${routerId}`}
               title='Get to know me'
               body={data.about_me}
               cta={{
                  handleSubmit() {
                     save(body);
                  },
                  handleBodyValue
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
