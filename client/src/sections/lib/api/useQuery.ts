import { gql } from "@apollo/client";

export const displayListings = gql`
   query {
    listings {
      id
      title
      image
      address
      price
      numOfGuests
      numOfBeds
      numOfBaths
      rating
    }
  }
`;

export const deleteSingleList= gql`
  mutation($id: ID!) {
    deleteListing(id: $id) {
      id
    }
  }
`;