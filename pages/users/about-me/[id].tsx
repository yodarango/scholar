import { WithTextContentStack } from "../../../components/layouts/stacks/with_text_content_stack";
import { AboutMeTemplate } from "../../../components/templates/users/about_me";

// styles
import styles from "./index.module.css";

const AboutMe = () => {
   const handleBodyValue = (value: string) => {};
   return (
      <div className={styles.mainWrapper}>
         <AboutMeTemplate />
      </div>
   );
};

export default AboutMe;
