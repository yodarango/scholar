import { Parragraph } from "../Typography/parragraph";
import styles from "./multiple_choice_poll.module.css";

type TMultipleChoicePollProps = {
   votes: number[] | undefined;
};

export const MultipleChoicePoll = ({ votes }: TMultipleChoicePollProps) => {
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
   console.log(votes);
   const totalVotes = votes && votes.reduce((a, b) => a + b, 0);
   const max = votes ? Math.max(...votes) : 0;
   const min = votes ? Math.min(...votes) : 0;
   return (
      <div className={styles.mainWrapper}>
         <section className={styles.optionsWrapper}>
            {votes &&
               votes.map((vote: number, index: number) => (
                  <div className={styles.option} key={index}>
                     <div
                        className={`${styles.bar} ${max === vote && styles.max} ${
                           min === vote && styles.min
                        }`}
                        style={{ height: `${(vote / totalVotes) * 15}rem` }}></div>
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
