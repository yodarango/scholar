import { BugReport as BugReportForm } from "../layouts/forms/bug_report";

// styles
import styles from "./page_global.module.css";

const BugReport = () => {
   return (
      <div className={styles.mainWrapper}>
         <BugReportForm />
      </div>
   );
};

export default BugReport;
