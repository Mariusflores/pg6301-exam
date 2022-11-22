import {useState} from "react";
import {useNavigate} from "react-router-dom";


export function AddDish(){

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("")

    async function handleSubmit(e) {
        e.preventDefault();

        await fetch("/api/dishes", {
            method:"POST",
            headers: {
                "content-type": "application/json"
            },
            body:JSON.stringify({title, description})
        })
        navigate("/menu")
    }

    return <div>
        <form onSubmit={handleSubmit}>
            <h1>Add new dish</h1>

            <div className={"input"}>
                <label>Dish <input type="text" onChange={e => setTitle(e.target.value)}/></label>
                <label> Description <input type="text" onChange={e => setDescription(e.target.value)}/></label>
            </div>
            <button>Submit</button>
        </form>
    </div>
}