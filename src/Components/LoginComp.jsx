import { useState } from 'react'
import '../Style/LoginComp.css'
import { userSignIn } from "../Services/firebase"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function LoginComponent() {
    const[email, setEmail] = useState();
    const[password, setPass] = useState();
    const navigate = useNavigate();

    const loginFunction = async () => {
        try{
            await userSignIn(email, password)
            console.log("Login successful")
            navigate('/userMainPage')
        }catch(err){
            console.error(err)
        }
    }

    return(
        <>
        <div className="container2">
            <div className="titleContainer">
                <p className="title">Social Cat</p>
            </div>
            <div className="inputContainer">
                <div className="emailCont">
                    <p className="tagTitle">Email</p>
                    <input className="inputTag" type='email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                </div>
                <div className="passCont">
                    <p className="tagTitle">Password</p>
                    <input className="inputTag" type='password' value={password} onChange={(e) => setPass(e.target.value)}></input>
                </div>
                <button className='submitBut' onClick={loginFunction}>Login</button>
                <p className='logreg'>Havent Registered Yet? <span><Link to="/registration">Register</Link></span></p>
            </div>
        </div>
        </>
    )
}

export default LoginComponent;