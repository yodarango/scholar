// styles
import cardsLazyLoadingStyles from "../styles/layouts/CardsLazyLoading.module.css";

type cardsLazyLoadingPorops = {
   amount: number;
   compClass: string;
};

const CardsLazyLoading = ({ amount, compClass }: cardsLazyLoadingPorops) => {
   return (
      <div className={`${cardsLazyLoadingStyles.mainWrapper} ${compClass}`}>
         {[...Array(amount)].map((_, index) => (
            <div key={index}></div>
         ))}
      </div>
   );
};

export default CardsLazyLoading;
