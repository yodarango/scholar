// core
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import HeadContent from "../SEO/head_content";

// graphQL
import { client } from "../apollo-client";
import { AUTHENTICATE_USER } from "../graphql/users/authenticate_user";
import { errorMessages } from "../data/error_messages";

// child comps
import { SmallLoader } from "../components/fragments/chunks/small_loader";
import { Notification } from "../components/fragments/popups/notification";
import { Layer1 } from "../components/layouts/backgrounds/layer_1";

// styles
import { InputPrimary } from "../components/fragments/inputs/input_primary";
import { Primary } from "../components/fragments/buttons/primary";
import { InternalLink } from "../components/fragments/Typography/internal_link";
import styles from "./login.module.css";
import PortalSecondary from "../components/hoc/portal_secondary";
import { ForgotPasswordTemplate } from "../components/templates/account/forgot_password";
//import ForgotPassword from "../archive/forgot-password-modal";

export default function Login() {
   const router = useRouter();

   const [notification, setnotification] = useState<{ title: string; body: string; type: string }>({
      title: "",
      body: "",
      type: ""
   });
   const [data, setdata] = useState<{ signature: string; password: string }>({
      signature: "",
      password: ""
   });
   const [modal, setmodal] = useState<string>("");
   const [loading, setloading] = useState<string>("done");
   const [isLoggedIn, setisLoggedIn] = useState(false);

   // const checkedIfUserLoggedIn = async () => {
   //    try {
   //       const { data } = await client.query({
   //          query: CHECK_IF_USER_LOGGED_IN,
   //          variables: {}
   //       });

   //       setIsLoggedIn(data.is_user_logged_in);

   //       if (data.is_user_logged_in === true) {
   //          router.replace("/users/me");
   //       }
   //    } catch (error) {
   //       console.log(error);
   //    }
   // };

   useEffect(() => {
      //checkedIfUserLoggedIn();
   }, []);

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
               // --------- switching to local storage because apple has a bug that expires cookies at session time
               // document.cookie = `authorization=${data.authenticate_user.token}; expires=${expTime}; domain=${window.location.hostname}; path=/`;
               const today = Date.now();
               const expTime = today + 1209600000;

               const jwtAuth = {
                  auth: login.data.authenticate_user.token,
                  expiresIn: expTime
               };
               localStorage.setItem("auth", JSON.stringify(jwtAuth));
               location.href = "/login";
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
            console.log(error);
            setloading("error");
            setnotification({
               title: errorMessages.login.failToLogin.title,
               body: errorMessages.login.failToLogin.body,
               type: "4"
            });
         }
      }
   };

   //  FUNCTION: Handle the forgot password popup

   const handleForgotPassword = () => {
      setmodal("forgot_password");
   };

   return (
      <>
         <Head>
            <HeadContent />
         </Head>

         {modal === "forgot_password" && (
            <PortalSecondary>
               <ForgotPasswordTemplate
                  cta={{
                     handleClose: () => setmodal("none")
                  }}
               />
            </PortalSecondary>
         )}
         {!isLoggedIn && (
            <div className='main-wrapper'>
               <div className={styles.top}>
                  <img className={styles.logo} src='/images/shrood_logo/logo_round_pow_small.png' />
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
                        <Link href='/register'>
                           <a className={styles.btn}>
                              <Primary
                                 type='2'
                                 title='Register'
                                 cta={{ handleClick: handleLogin }}
                              />
                           </a>
                        </Link>
                        <div className={styles.btn}>
                           <InternalLink
                              cta={{ onClick: () => setmodal("forgot_password") }}
                              type='2'>
                              Forgot password
                           </InternalLink>
                        </div>
                     </>
                  )}
                  {loading === "loading" && <SmallLoader />}
               </section>
            </div>
         )}
         <div className='spacer-page-bottom'></div>
      </>
   );
}
