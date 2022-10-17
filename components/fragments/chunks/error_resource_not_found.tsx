import Image from "next/image";

//comps
import { Parragraph } from "../Typography/parragraph";

// styles
import styles from "./error_resource_not_found.module.css";

type TResourceNotFoundErrorProps = {
   text?: string;
};

export const ResourceNotFoundError = ({
   text = "Resource not found"
}: TResourceNotFoundErrorProps) => {
   return (
      <div className={styles.mainWrapper}>
         <div className={styles.image}>
            <Image
               layout='fill'
               alt='resource not found'
               src={"/images/layouts/resource_not_found.png"}
            />
         </div>
         <div className={styles.text}>
            <Parragraph size='xsmall' align='center' color='#ff4d62' text={text} />
         </div>
      </div>
   );
};
