export const Login = () => {



    function getLogin() {


    }

    return (
        
        <center><form>
            <h1>Login</h1>
            <label for="username"> Username </label>
            <br></br>
            <input type="username" placeholder="Username" id="username" required></input>
            <br></br>
            <br></br>
            <label for="password"> Password </label>
            <br></br>
            <input type="password" placeholder="Password" id="password" required></input>
            <br></br>
            <br></br>
            <button onclick="">Log In</button>
            <br></br>
            <br></br>
        </form>
        </center>
    )
} 

export default Login