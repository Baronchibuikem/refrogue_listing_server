import { useQuery, useMutation } from "@apollo/client";
import { displayListings, deleteSingleList } from "../libs/api";
import {
  ListingsData,
  DeleteListingData,
  DeleteListingVariables,
} from "./types";
import { Alert, Avatar, Button, List, Spin } from "antd";
import "./styles/Listing.css";
import { ListingsSkeleton } from "./components";

interface Props {
  title: string;
}

export const Listings = (props: Props) => {
  //   const [listings, setListings] = useState<Listing[] | null>(null);

  const { loading, error, data } = useQuery<ListingsData>(displayListings);

  const [
    deleteListing,
    { loading: deletingListLoading, error: deleteListError },
  ] = useMutation<DeleteListingData, DeleteListingVariables>(deleteSingleList);

  const { title } = props;

  // for deleting a single listing
  const deleteSingleListing = async (id: string) => {
    deleteListing({
      variables: { id },
      refetchQueries: [{ query: displayListings }],
    });
    console.log("button pressed");
  };

  // for displaying error if one occurs when we are fetching our list items
  const deleteListingErrorAlert = deleteListError ? (
    <Alert
      type="error"
      message="Uh oh! Something went wrong :(. Please try again later."
      className="listings__alert"
    />
  ) : null;

  const listings = data ? data.listings : null;

  const listingsList = listings ? (
    <List
      itemLayout="horizontal"
      dataSource={listings}
      renderItem={(listing) => (
        <List.Item
          actions={[
            <Button
              type="primary"
              onClick={() => deleteSingleListing(listing.id)}
            >
              Delete
            </Button>,
          ]}
        >
          <List.Item.Meta
            title={listing.title}
            description={listing.address}
            avatar={<Avatar src={listing.image} shape="square" size={48} />}
          />
        </List.Item>
      )}
    />
  ) : null;

  if (loading) {
    return (
      <div className="listings">
        <ListingsSkeleton title={title} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="listings">
        <ListingsSkeleton title={title} error />
      </div>
    );
  }
  return (
    <div className="listings">
      {deleteListingErrorAlert}
      <Spin spinning={deletingListLoading}>
        <h2>{title}</h2>
        {listingsList}
      </Spin>
    </div>
  );
};

// IMPORTANT NOTES

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

// Here's a summary of how React Apollo's useQuery and useMutation Hooks behave.

// The useQuery and useMutation Hooks take two arguments, the query or mutation in question and an options object.
// The useQuery and useMutation Hooks accept two type variables, one to represent the shape of data to be returned and the other to represent the shape of variables that can be passed in.
// The useQuery Hook returns a series of fields within an object recognized as the QueryResult . data, loading, error, And a refetch() function are some of the fields within the QueryResult. The QueryResult object also returns a bunch of other fields like the Apollo client itself, the networkStatus of the request, a fetchMore() function, and so on.
// The useMutation Hook returns a tuple of two values. The first value being the mutation function itself and the second value being the mutation result values which are similar to the result returned in useQuery.

//  const listingsList = listings ? (
// <ul>
//   {listings.map((listing) => {
//     return (
//       <li key={listing.id}>
//         {listing.title}
//         <button onClick={() => deleteSingleListing(listing.id)}>
//           Delete
//         </button>
//       </li>
//     );
//   })}
// </ul>
// ) :
// null;
