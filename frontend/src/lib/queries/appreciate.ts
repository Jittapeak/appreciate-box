import { gql } from "@apollo/client";


export const APPRECIATE_FIELDS = gql`
  fragment AppreciateFields on Appreciate {
    id
    user_id
    text
    created_at
    updated_at
  }
`;


