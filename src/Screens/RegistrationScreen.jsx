import LogRegBackgorund from "../Components/Log&RegBackground"
import RegistrationComponent from "../Components/RegisterComp"
import "../Style/LoginScreen.css"

function RegistrationScreen() {
    return(
        <>
        <div className="container3">
            <div className="back"><RegistrationComponent /></div>
            <div className="logincomp"><LogRegBackgorund /></div>
        </div>
        
        </>
    )
}

export default RegistrationScreen;