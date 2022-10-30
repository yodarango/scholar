import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// components
import { MultipleChoicePollCard } from "../../../components/fragments/cards/multiple_choice_poll";
import { ThumbsUpDownPoll } from "../../../components/fragments/cards/thumbs_up_down_poll";
import { SecondaryStack } from "../../layouts/stacks/templates/secondary_stack";
import { RoundLoader } from "../../fragments/chunks/round_loader";
import { ResourceNotFoundError } from "../../fragments/chunks/error_resource_not_found";

// styles
import styles from "./polls.module.css";

// helpers
import { getAllPolls } from "../../../helpers/functions/interactive/polls";

export const PollsTemplate = () => {
   // router
   const router = useRouter();
   const [polls, setpolls] = useState<Array<any>>([]);
   const [loading, setloading] = useState<string>("loading");

   // fetch data
   const fetchData = async () => {
      try {
         const { data, status } = await getAllPolls();
         data && setpolls(data.all_polls);
         setloading(status);
      } catch (error) {
         console.error(error);
         setpolls([]);
         setloading("error");
      }
   };

   useEffect(() => {
      fetchData();
   }, []);

   return (
      <SecondaryStack title='Polls' icon='chart' cta={{ handleClose: () => router.back() }}>
         <>
            {loading === "done" &&
               polls.map((poll: any, index: number) => {
                  return (
                     <div key={index} className={styles.poll}>
                        {poll.type === 1 && <ThumbsUpDownPoll dataFromParent data={poll} />}
                        {poll.type === 2 && <MultipleChoicePollCard dataFromParent data={poll} />}
                     </div>
                  );
               })}

            {loading === "loading" && (
               <div className={styles.loader}>
                  <RoundLoader />
               </div>
            )}
            {loading === "error" && (
               <div className={styles.error}>
                  <ResourceNotFoundError />
               </div>
            )}
         </>
      </SecondaryStack>
   );
};
