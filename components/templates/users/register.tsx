// core
import { useState, useEffect } from "react";
import Head from "next/head";
import HeadContent from "../../../SEO/head_content";

// child comps
import { SmallLoader } from "../../../components/fragments/chunks/small_loader";
import { InputPrimary } from "../../../components/fragments/inputs/input_primary";
import { Primary } from "../../../components/fragments/buttons/primary";

// styles
import { Notification } from "../../../components/fragments/popups/notification";
import { STATUS_DONE, STATUS_ERROR, STATUS_LOADING } from "../../../constants/common";
import { useRegisterUser } from "../../../hooks/use_register_user";

import styles from "./login.module.css";

export default function RegisterTemplate() {
   const [data, setdata] = useState<{ signature: string; password: string; email: string }>({
      signature: "",
      password: "",
      email: ""
   });

   const [status, setstatus] = useState<number>(0);

   const { response, handleRegister } = useRegisterUser(
      data.signature,
      data.password,
      data.email,
      setstatus
   );

   return (
      <>
         <Head>
            <HeadContent />
         </Head>
         {status === STATUS_ERROR && response && (
            <Notification
               title={response.title}
               type={response.type}
               body={response.body}
               cta={{ handleClose: () => setstatus(STATUS_DONE) }}
            />
         )}

         <div className='main-wrapper'>
            <div className={styles.top}>
               <img className={styles.logo} src='/images/branding/logo_round_pow_small.png' />
            </div>

            <section className={styles.inputs}>
               <div className={styles.btn}>
                  <InputPrimary
                     placeholder='Enter your email'
                     type='email'
                     maxL={150}
                     cta={{ handleValue: (val) => setdata({ ...data, email: val }) }}
                  />
               </div>
               <div className={styles.btn}>
                  <InputPrimary
                     placeholder='Choose a username'
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
               {status !== STATUS_LOADING && (
                  <>
                     <div className={styles.btn}>
                        <Primary type='1' title='Register' cta={{ handleClick: handleRegister }} />
                     </div>

                     <div className={styles.btn}>
                        <Primary type='2' title='Login instead' href='/login' />
                     </div>
                  </>
               )}
               {status === STATUS_LOADING && <SmallLoader />}
            </section>
         </div>

         <div className='spacer-page-bottom'></div>
      </>
   );
}
