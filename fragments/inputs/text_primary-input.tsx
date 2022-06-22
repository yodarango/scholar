// styles
import textPrimaryInputStyles from "../../styles/fragments/inputs/TextPrimaryInput.module.css";

export type primaryInput = {
   cta?: any;
   placeholder: string;
};
const TextPrimaryInput = ({ cta, placeholder }: primaryInput) => {
   return (
      <div className={textPrimaryInputStyles.mainWrapper}>
         {cta && <input className='std-input' onChange={cta} placeholder={placeholder} />}
         {!cta && <input className='std-input' placeholder={placeholder} />}
      </div>
   );
};

export default TextPrimaryInput;
