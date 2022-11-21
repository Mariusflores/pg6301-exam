
export function LoginPage(){

    return <div>
        <form action={"/login"} method={"post"}>
            <div>username:<input type="text" name={"username"}/></div>
            <div>password:<input type="text" name={"password"}/></div>
            <div>
                <button>Log in</button>
            </div>

        </form>
    </div>
}