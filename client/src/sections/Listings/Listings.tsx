import { server, useQuery } from "../lib/api/";
import {
  ListingsData,
  DeleteListingData,
  DeleteListingVariables,
} from "./types";

const LISTINGS = `
    query Listings {
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

const DELETE_LISTING = `
    mutation DeleteListing ($id: ID!){
        deleteListing (id: $id) {
            id
        }
    }
`;

interface Props {
  title: string;
}

export const Listings = (props: Props) => {
//   const [listings, setListings] = useState<Listing[] | null>(null);

// Using our custom hooks
  const { data, refetch } = useQuery<ListingsData>(LISTINGS);

// The useEffect Hook doesn’t return any values but instead takes two arguments The first being
// required and the second optional. The second argument of the useEffect Hook is optional and 
// is a dependency list which allows us to tell React to skip applying the effect only until in certain conditions.
// The useEffect Hook also provides the ability to run a cleanup after the effect. This can be done by specifying a return function at the end of our effect.
//   useEffect(() => {
//       console.log("Effect has run")

//       return () => {
//         console.log("Effect is cleaned up!");
//         };
//   },[listings, count])



  const { title } = props;


  const deleteListing = async (id: string) => {
    await server.fetch<
      DeleteListingData,
      DeleteListingVariables
    >({
      query: DELETE_LISTING,
      variables: {
        id
      },
    });
    refetch()
  };

  const listings = data ? data.listings : null;

  const listingsList = listings ? (
    <ul>
      {listings.map((listing) => {
        return <li key={listing.id}>{listing.title}
        <button onClick={() => deleteListing(listing.id)}>Delete</button>
        </li>;
        
      })}
    </ul>
  ): null;

  return (
    <div>
      <h2>{title}</h2>
      {listingsList}
      {/* <button onClick={FetchListings}>Query Listings</button> */}
      {/* <button onClick={deleteListing}>Delete a listing</button> */}
    </div>
  );
};
