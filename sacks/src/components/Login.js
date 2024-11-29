import "./Login.css"


export const Login = () => {



    function getLogin() {


    }

    return (
        
        <center><form>
            <h1>Login</h1>
            <label class="input-label" for="username"> Username </label>
            <br></br>
            <input class="input-box" type="username" placeholder="Username" id="username" required></input>
            <br></br>
            <br></br>
            <label class="input-label" for="password"> Password </label>
            <br></br>
            <input class="input-box" type="password" placeholder="Password" id="password" required></input>
            <br></br>
            <br></br>
            <button class="submit" onclick="">Log In</button>
            <br></br>
            <br></br>
        </form>
        </center>
    )
} 

export default Login