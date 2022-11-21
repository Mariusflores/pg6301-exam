import {useEffect, useState} from "react";
import {Navigate} from "../app";
import {useNavigate} from "react-router-dom";

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

    const navigate = useNavigate();
    const [title, setTitle] = useState("");

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
                <li key  ={dish.id}>{dish.title}</li>
            ))}
        </ul>

        <form onSubmit={handleSubmit}>
            <h1>Add new dish</h1>

            <label>Dish <input type="text" onChange={e => setTitle(e.target.value)}/></label>
            <button>Submit</button>

        </form>
    </div>


    async function handleSubmit(e) {
        e.preventDefault();

        await fetch("/api/dishes", {
            method:"POST",
            headers: {
                "content-type": "application/json"
            },
            body:JSON.stringify({title})
        })
        window.location.reload();
    }
}