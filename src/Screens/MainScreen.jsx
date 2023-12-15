import IdPageHead from "../Components/IdPageHead";
import MainHeader from "../Components/MainPageHeader";
import PostComp from "../Components/PostComp";
import "../Style/MainScreen.css"

function MainScreen() {

    return (
        <>
        <MainHeader />
        <div className="userDetails"><IdPageHead /></div>
        <div className="postDetails"><PostComp /></div>
        </>
    )
}

export default MainScreen;