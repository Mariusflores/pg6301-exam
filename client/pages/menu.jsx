import {useEffect, useState} from "react";

function useLoading(loadingFunction){
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const[data, setData] = useState();

    async function load(){

        try{
            setLoading(true);
            setData(await loadingFunction())
        }catch (error){
            setError(error);
        }finally {
            setLoading(false);
        }
    }

    useEffect( () => {
        load();
    }, [])

    return{loading, error, data, reload:load}
}

async function fetchJSON(url){

    const res = await fetch(url)

    if (!res.ok){
        throw new Error(`Failed to load ${res.status} : ${res.statusText}`)
    }

    return await res.json();
}

export function MenuPage(){

    const {loading, error, data} = useLoading(
        async() => fetchJSON("/api/dishes")
    )

    if (loading){
        return <div>Loading..</div>
    }
    if (error){
        return <div>
            <h1>Error</h1>
            <div>{error.toString()}</div>
        </div>

    }


    return <div>

        <h1>Menu</h1>

        <ul>
            {data.map(dish => (
                <li key  ={dish.id}>{dish.dish}</li>
            ))}
        </ul>

        <form >
            <h1>Add new dish</h1>


        </form>
    </div>
}