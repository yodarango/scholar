import { BugReport as BugReportForm } from "../fragments/popups/forms/bug_report";

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
