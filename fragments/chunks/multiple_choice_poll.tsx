import { Parragraph } from "../Typography/parragraph";
import styles from "./multiple_choice_poll.module.css";

type TMultipleChoicePollProps = {
   options: number[];
};

export const MultipleChoicePoll = ({ options }: TMultipleChoicePollProps) => {
   // ------------------ alphabet to assign uniwue letter to each option -----------
   const alphabet = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z"
   ];

   // ------------------- extrapolate percentages -------------

   const totalVotes = options.reduce((a, b) => a + b, 0);
   const max = Math.max(...options);
   const min = Math.min(...options);
   return (
      <div className={styles.mainWrapper}>
         <section className={styles.optionsWrapper}>
            {options.map((option: number, index: number) => (
               <div className={styles.option}>
                  <div
                     className={`${styles.bar} ${max === option && styles.max} ${
                        min === option && styles.min
                     }`}
                     style={{ height: `${(option / totalVotes) * 15}rem` }}></div>
                  <div className={styles.letter}>
                     <Parragraph
                        size='xsmall'
                        text={alphabet[index]}
                        align='center'
                        bold={true}
                        lineHieght='.9em'
                     />
                  </div>
               </div>
            ))}
         </section>
         <div className={styles.totalVotes}>
            <Parragraph size='small' quiet={true} text={`Total votes: ${totalVotes}`} />
         </div>
      </div>
   );
};
