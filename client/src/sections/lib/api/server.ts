// import axios from "axios"

interface Body<TVariables>{
    query : string;
    variables? : TVariables
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
        return res.json() as Promise<{ data: TData }>;
    }
}

/*
Type assertions are a TypeScript capability where one can override the types that TypeScript either
infers or analyzes. There are two ways of type asserting - either using the as syntax or using the
angle brackets syntax.
return <Promise<{ data: TData }>>res.json(); // angle brackets to type assert
return res.json() as Promise<{ data: TData }>; // (as) to type assert res.
*/