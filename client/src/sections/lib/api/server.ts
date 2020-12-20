// import axios from "axios"

// What our body properties will look like when the are returnrd from the server
interface Body<TVariables>{
    query : string;
    variables? : TVariables
}

// what an error would look like when returned from the server
interface Error {
    message : string
}

export const server = {
    fetch : async <TData = any, TVariables = any>(body: Body<TVariables>) => {
        const res = await fetch("/api", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
        })

        if(!res.ok){
            throw new Error("failed to fetch from server")
        }
        // Type assertion
        return res.json() as Promise<{ data: TData, errors: Error[] }>;
    }
}

/*
Type assertions are a TypeScript capability where one can override the types that TypeScript either
infers or analyzes. There are two ways of type asserting - either using the as syntax or using the
angle brackets syntax.
return <Promise<{ data: TData }>>res.json(); // angle brackets to type assert
return res.json() as Promise<{ data: TData }>; // (as) to type assert res.
*/