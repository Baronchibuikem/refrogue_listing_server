import { useState, useEffect, useCallback } from "react";
import { server } from "./server";

interface State<TData> {
  data: TData | null;
}

export const useQuery = <TData = any>(query: string) => {
  const [state, setState] = useState<State<TData>>({ data: null });

  

  const fetch = useCallback(()=>{
    const fetchApi = async () => {
        //   
        const { data } = await server.fetch<TData>({ query });
        setState({ data });
    };
    fetchApi()
  },[query])


  useEffect(() => {
    fetch();
  }, [fetch]);

  return { ...state, refetch: fetch};
};


/*

USEEFFECT AND USECALLBACK
What we’ve introduced might appear a little confusing so we’ll summarize what we’ve just done.
We’ve used the useEffect Hook to attempt to run our server.fetch() function when a
component mounts for the first time.

    export const useQuery = <TData = any>(query: string) => {
        useEffect(() => {
            const fetchApi = async () => {
            const { data } = await server.fetch<TData>({ query });
            setState({ data });
            };
            fetchApi();
            }, []);
        };

Our useEffect Hook depends on the query parameter with which it expects us to define in the
dependencies list to avoid any potential issues. Since query is to be a static constant referenced
outside of the component, we can specify it in the dependencies list of the useEffect Hook with no
issues

    export const useQuery = <TData = any>(query: string) => {
        useEffect(() => {
            const fetchApi = async () => {
            const { data } = await server.fetch<TData>({ query });
            setState({ data });
            };
            fetchApi();
        }, [query]);
    };

We, however, wanted to have the fetchApi() function extractable from the Hook itself, and as a
result needed to declare fetchApi() outside of the useEffect Hook.

    export const useQuery = <TData = any>(query: string) => {
        const fetchApi = async () => {
            const { data } = await server.fetch<TData>({ query });
            setState({ data });
            };

        useEffect(() => {
            fetchApi();
            }, [query]); // ESLint warning - fetchApi is a missing dependency
    };

The useEffect Hook wants to ensure we’re not doing something incorrectly and asks if we can
specify the fetchApi() function as a dependency or wrap it within a useCallback Hook. We’re
not sure how the fetchApi() function will behave as the component gets updated and we only
want fetchApi() to run on initial mount, so we instead use the useCallback Hook to memoise
our callback function to never change unless the query parameter changes, which is unlikely to.


    export const useQuery = <TData = any>(query: string) => {
        const fetch = useCallback(() => {
            const fetchApi = async () => {
            const { data } = await server.fetch<TData>({
            query
            });
            setState({ data });
            };
            fetchApi();
        }, [query]);

        useEffect(() => {
            fetch();
        }, [fetch]);
    };

With what we’ve just done, we’ve been able to return a refetch property from our useQuery Hook
that will allow components to refetch a query.
*/