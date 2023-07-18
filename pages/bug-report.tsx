import Head from "next/head";
import { BugReport as BugReportForm } from "../components/layouts/forms/bug_report";

// styles
import styles from "./page_global.module.css";
import HeadContent from "../SEO/head_content";

const BugReport = () => {
   return (
      <div className={styles.mainWrapper}>
         <Head key='bug-report'>
            <HeadContent title='Bug report' />
         </Head>
         <BugReportForm />
      </div>
   );
};

export default BugReport;
