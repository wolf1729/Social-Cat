import LogRegBackgorund from "../Components/Log&RegBackground"
import LoginComponent from "../Components/LoginComp";
import "../Style/LoginScreen.css"

function LoginScreen() {
    return(
        <>
        <div className="container3">
            <div className="back"><LoginComponent /></div>
            <div className="logincomp"><LogRegBackgorund /></div>
        </div>
        
        </>
    )
}

export default LoginScreen;