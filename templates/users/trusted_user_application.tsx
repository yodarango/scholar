import { useRouter } from "next/router";

// styles
import styles from "./trusted_user_application.module.css";

// comps
import { TrustedUserApplicationForm } from "../../fragments/popups/forms/trusted_user_application";
import { PrimaryStack } from "../../layouts/stacks/templates/primary_stack";
import { Parragraph } from "../../fragments/Typography/parragraph";

type userVerificationApplicationProps = {
   user_data?: {
      church: string | undefined;
      f_name: string | undefined;
      l_name: string | undefined;
   };
};

export const TrustedUserApplication = ({ user_data }: userVerificationApplicationProps) => {
   // router
   const router = useRouter();

   return (
      <>
         <PrimaryStack
            cta={{ handleClose: () => router.back() }}
            title='Become a trusted user'
            icon='star'>
            <div className={styles.subTitle}>
               <Parragraph text='What is a trusted user? ' size='main' bold quiet />
            </div>
            <div className={styles.description}>
               <Parragraph
                  text={
                     <>
                        A trusted user is someone whom, by the grace of our Lord, has proven to be
                        faithful to God and His word. Someone who is qualified by time in the
                        ministry, formal biblical education, or both to teach others.
                        <br />
                        <br />A trusted user is someone who's content can be trusted with higher
                        reliability, thus helping equip the community who benefit from their
                        content. Because a trusted user must be deemed reliable, each submission is
                        carefully examined and may or may not be approved.
                     </>
                  }
                  size='small'
               />
            </div>

            <div className={styles.subTitle}>
               <Parragraph text='Personal and ministerial information' size='main' bold quiet />
            </div>
            <TrustedUserApplicationForm />
         </PrimaryStack>
      </>
   );
};
