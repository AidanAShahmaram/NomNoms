import "./Login.css"
import logo from '../assets/logo-icononly.png';


export const BusinessLogin = () => {

    function getLogin() {

    }

    return (
        <>
        <center><img src={logo} alt="logo" className="login-img"></img></center>

        <center><form>
            <div className="h1-login">Business Login</div>
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
            <button class="submit-login" onclick="">Log In</button>
            <br></br>
            <br></br>
        </form>
        </center>
        </>
    )
} 

export default BusinessLogin

