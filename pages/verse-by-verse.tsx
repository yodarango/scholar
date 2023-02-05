import { VerseByVerse } from "../components/templates/verse_by_verse";
import styles from "./verse_by_verse.module.css";

const Index = () => {
   return (
      <main className={styles.mainWrapper}>
         <VerseByVerse />
         <div className='spacer-page-bottom'></div>
      </main>
   );
};

export default Index;
