import { Header } from "../Typography/header";
import { Parragraph } from "../Typography/parragraph";
import styles from "./stats_count.module.css";

type TStatsCountprops = {
   count: number | string;
   title: string;
};

export const StatsCount = ({ count, title }: TStatsCountprops) => {
   return (
      <div className={styles.mainWrapper}>
         <div className={styles.title}>
            <Header type={4} text={count} size={"large"} align={"center"} lineHieght={".8em"} />
         </div>

         <Parragraph text={title} size={"xsmall"} align={"center"} lineHieght={".8em"} />
      </div>
   );
};
