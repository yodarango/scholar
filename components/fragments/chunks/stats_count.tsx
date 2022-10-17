import { Header } from "../Typography/header";
import { Parragraph } from "../Typography/parragraph";
import styles from "./stats_count.module.css";

type TStatsCountprops = {
   alignment?: string;
   countColor?: string;
   count: number | string;
   title: string;
};

export const StatsCount = ({
   count,
   title,
   countColor = "#F1EAFF",
   alignment = "center"
}: TStatsCountprops) => {
   return (
      <div className={styles.mainWrapper}>
         <div className={styles.count}>
            <Header
               type={4}
               text={count}
               size={"large"}
               align={alignment}
               lineHieght={".8em"}
               color={countColor}
            />
         </div>
         <div className={styles.title}>
            <Parragraph text={title} size={"xsmall"} align={alignment} lineHieght={".8em"} />
         </div>
      </div>
   );
};
