import "./Login.css"

export const BusinessLogin = () => {



    function getLogin() {


    }

    return (
        <>
        <center><img src="../../logo.png" alt="logo"></img></center>
        <center><form>
            <h1>Business Login</h1>
            <label for="username"> Username </label>
            <br></br>
            <input class="input-box" type="username" placeholder="Username" id="username" required></input>
            <br></br>
            <br></br>
            <label for="password"> Password </label>
            <br></br>
            <input class="input-box" type="password" placeholder="Password" id="password" required></input>
            <br></br>
            <br></br>
            <button class="submit" onclick="">Log In</button>
            <br></br>
            <br></br>
        </form>
        </center>
        </>
    )
} 

export default BusinessLogin

