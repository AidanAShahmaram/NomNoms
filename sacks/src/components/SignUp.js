import './SignUp.css'

export const SignUp = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    function getSignUpInfo() {
        const [signUpInfo, setSignUpInfo] = useState({
            
        });


    }

    const changeUsername = (event) => {
        setUsername(event.target.value)
    }

    const changeEmail = (event) => {
        setEmail(event.target.value)
    }

    const changePassword = (event) => {
        setPassword(event.target.value)
    }

    return (
        <>
            
        <form>
            <h1>Sign Up</h1>
            <label for="username"> Create Username </label>
            <br></br>
            <input type="username" value={username} onChange={changeUsername} placeholder="Username" id="username" required></input>
            <br></br>
            <br></br>
            <label for="email"> Email </label>
            <br></br>
            <input type="email" value={email} onChange={changeEmail} placeholder="Email" id="email" required></input>
            <br></br>
            <br></br>
            <label for="password"> Password </label>
            <br></br>
            <input type="password" value={password} onChange={changePassword} placeholder="Password" id="password" required></input>
            <br></br>
            <br></br>
            <label for="confirm_password"> Confirm Password </label>
            <br></br>
            <input type="password" placeholder="Confirm Password" id="confirm_password" required></input>
            <br></br>
            <br></br>
            <button>Sign Up</button>
            <br></br>
            <br></br>
        </form>
        
        
        
        </>
    )

}

export default SignUp