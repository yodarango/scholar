// core
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import HeadContent from "../../../SEO/head_content";

// graphQL
import { client } from "../../../apollo-client";
import { AUTHENTICATE_USER } from "../../../graphql/users/authenticate_user";
import { errorMessages } from "../../../data/error_messages";

// child comps
import { SmallLoader } from "../../../components/fragments/chunks/small_loader";
import { InputPrimary } from "../../../components/fragments/inputs/input_primary";
import { Primary } from "../../../components/fragments/buttons/primary";
import { InternalLink } from "../../../components/fragments/Typography/internal_link";
import PortalSecondary from "../../../components/hoc/portal_secondary";
import { ForgotPasswordTemplate } from "../../../components/templates/account/forgot_password";

// styles
import styles from "./login.module.css";
import { Notification } from "../../../components/fragments/popups/notification";
import { useUserAuth } from "../../../hooks/use_user_auth";

export default function LoginTemplate() {
   const [notification, setnotification] = useState<{
      title: string;
      body: string;
      type: string;
   } | null>(null);

   const [data, setdata] = useState<{ signature: string; password: string }>({
      signature: "",
      password: ""
   });
   const [modal, setmodal] = useState<string>("");
   const [loading, setloading] = useState<string>("done");
   const [canMoveForward, setcanMoveForward] = useState(false);

   const handleLogin = async () => {
      if (data.signature && data.password) {
         setloading("loading");

         try {
            const login = await client.mutate({
               mutation: AUTHENTICATE_USER,
               variables: {
                  signature: `${data.signature.toUpperCase()}`,
                  password: `${data.password}`
               }
            });

            if (login?.data?.authenticate_user?.ID) {
               useUserAuth(login.data.authenticate_user.token);
            }

            if (login?.data?.authenticate_user.message) {
               setloading("done");
               setnotification({
                  title: errorMessages.unknown.a.title,
                  body: login.data.authenticate_user.message,
                  type: "3"
               });
            }
         } catch (error) {
            console.error(error);
            setloading("error");
            setnotification({
               title: errorMessages.login.failToLogin.title,
               body: errorMessages.login.failToLogin.body,
               type: "4"
            });
         }
      }
   };

   return (
      <>
         <Head>
            <HeadContent />
         </Head>
         {notification && (
            <Notification
               title={notification.title}
               type={notification.type}
               body={notification.body}
               cta={{ handleClose: () => setnotification(null) }}
            />
         )}
         {modal === "forgot_password" && (
            <PortalSecondary>
               <ForgotPasswordTemplate
                  cta={{
                     handleClose: () => setmodal("none")
                  }}
               />
            </PortalSecondary>
         )}

         <div className='main-wrapper'>
            <div className={styles.top}>
               <img className={styles.logo} src='/images/branding/logo_round_pow_small.png' />
            </div>

            <section className={styles.inputs}>
               <div className={styles.btn}>
                  <InputPrimary
                     placeholder='Enter signature'
                     type='text'
                     maxL={150}
                     cta={{ handleValue: (val) => setdata({ ...data, signature: val }) }}
                  />
               </div>
               <div className={styles.btn}>
                  <InputPrimary
                     placeholder='Enter password'
                     type='password'
                     maxL={150}
                     cta={{ handleValue: (val) => setdata({ ...data, password: val }) }}
                  />
               </div>
               {loading !== "loading" && (
                  <>
                     <div className={styles.btn}>
                        <Primary type='1' title='Login' cta={{ handleClick: handleLogin }} />
                     </div>

                     <div className={styles.btn}>
                        <Primary type='2' title='Register' href='/register' />
                     </div>

                     <div className={styles.btn}>
                        <InternalLink cta={{ onClick: () => setmodal("forgot_password") }} type='2'>
                           Forgot password
                        </InternalLink>
                     </div>
                  </>
               )}
               {loading === "loading" && <SmallLoader />}
            </section>
         </div>

         <div className='spacer-page-bottom'></div>
      </>
   );
}
