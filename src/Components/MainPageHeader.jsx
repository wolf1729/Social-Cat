import { userSignOut, uploadProfilePhoto, getCurrentUser, post, getCurrentUserId } from "../Services/firebase";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../Style/MainPageHeader.css"
import "reactjs-popup"
import Popup from "reactjs-popup";

function MainHeader() {
    const navigate = useNavigate();
    // eslint-disable-next-line no-unused-vars
    const [selectedFile, setSelectedFile] = useState(null);
    const[email, setEmail] = useState();
    const[postFile, setPostFile] = useState();
    const[userId, setUserID] = useState();
    const[searchUser, setSearchUser] = useState();

    useEffect(() => {
        const currentuser = async() => {
            try{
                const useremail = await getCurrentUser();
                const userid = await getCurrentUserId();
                console.log(useremail)
                setEmail(useremail)
                setUserID(userid)
            }
            catch(err){
                console.error(err)
            }
        }

        currentuser();
    }, [])

    const userProfilePhotoUpload = async() => {
        try{
            console.log(email)
            await uploadProfilePhoto(selectedFile, email)
            console.log("upload done")
        }
        catch(err){
            console.error(err)
        }
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        console.log('Selected file:', file);
    };

    const handlePostFileChange = (event) => {
        const file = event.target.files[0];
        setPostFile(file);
        console.log('Selected file:', file);
    };

    const userSigningOut = async () => {
        try{
            await userSignOut();
            console.log("signed out")
            navigate("/");
        }
        catch(err){
            console.error(err)
        }
    }

    const userPost = async() => {
        try{
            await post(email, postFile, postFile.name, userId)
            console.log("posted")
        }
        catch(err){
            console.error(err)
        }
    }

    const gettingUserDetails = async() => {
        try{
            navigate(`/searchedUser/${searchUser}`);
            console.log("done")
        }
        catch(err){
            console.log(err)
        }
    }

    return (
        <>
        <div className="container5">
            <div className="headingCont">
                <p className="heading">Social Cat</p>
                <input type="text" value={searchUser} onChange={(e) => setSearchUser(e.target.value)} className="searchInput"></input>
                <button type="button" onClick={gettingUserDetails} className="searchButton">Search</button>
            </div>
            <div className="buttonCont">
                <button type="button" onClick={userSigningOut} className="signoutButton">Sign Out</button>
                <Popup trigger={<button type="button" className="triggerButton">DP Change</button>} position={"bottom left"}>
                    <input type="file" id="imageInput" name="image" accept="image/*" onChange={handleFileChange} />
                    <button type="button" onClick={userProfilePhotoUpload}>Submit</button>
                </Popup>
                <Popup trigger={<button type="button" className="postButton">Post</button>} position={"bottom left"}>
                    <input type="file" id="imageInput" name="image" accept="image/*" onChange={handlePostFileChange} />
                    <button type="button" onClick={userPost}>Submit</button>
                </Popup>
            </div>
        </div>
        </>
    )
}

export default MainHeader;