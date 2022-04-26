import { gql } from "@apollo/client";

export const GET_ORDER_SUCCESS_DATA = gql`
   query ($session_id: String) {
      order_success(session_id: $session_id) {
         ... on Successful_Order {
            name
            email
         }

         ... on Failed_Order {
            message
         }
      }
   }
`;

export const CREATE_CHECKOUT_SESSION = gql`
   mutation ($price_id: String) {
      create_checkout_session(price_id: $price_id)
   }
`;
