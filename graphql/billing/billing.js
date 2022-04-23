import { gql } from "@apollo/client";

export const CREATE_CHECKOUT_SESSION = gql`
   mutation ($price_id: String) {
      create_checkout_session(price_id: $price_id)
   }
`;
