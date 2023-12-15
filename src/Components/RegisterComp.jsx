import { useState } from 'react'
import '../Style/RegistrationComp.css'
import { createUserAccount, userDatabase } from "../Services/firebase"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function RegistrationComponent() {
    const[email, setEmail] = useState();
    const[password, setPass] = useState();
    const[displayName, setDisplayName] = useState();
    const navigate = useNavigate();

    const registrationFunction = async () => {
        try{
            const id = await createUserAccount(email, password, displayName)
            await userDatabase(id, email, displayName)
            console.log("Register successful")
            navigate('/')
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
                <div className="displayNameCont">
                    <p className="tagTitle">Username</p>
                    <input className="inputTag" type='text' value={displayName} onChange={(e) => setDisplayName(e.target.value)}></input>
                </div>
                <div className="emailCont">
                    <p className="tagTitle">Email</p>
                    <input className="inputTag" type='email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                </div>
                <div className="passCont">
                    <p className="tagTitle">Password</p>
                    <input className="inputTag" type='password' value={password} onChange={(e) => setPass(e.target.value)}></input>
                </div>
                <button className='submitBut' onClick={registrationFunction}>Register</button>
                <p className='logreg'>Already Registered? <span><Link to="/">Login</Link></span></p>
            </div>
        </div>
        </>
    )
}

export default RegistrationComponent;