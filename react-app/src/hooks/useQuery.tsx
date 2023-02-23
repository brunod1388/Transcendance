import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export function useQuery(name: string): string {
    // console.log('by');
    const search = useLocation().search;
    const [query, setQuery] = useState("");

    useEffect(() => {
        let tmp = new URLSearchParams(search).get(name)?.toString();
        if (tmp === undefined) {
            throw new Error("Failed to get the query, from the url!");
        } else {
            // console.log(tmp);
            setQuery(tmp);
        }
    }, [search, name]);
    // console.log(`quey obtained: ${query}`);
    return query;
}
