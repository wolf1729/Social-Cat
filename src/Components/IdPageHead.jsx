import "../Style/IdPageHead.css"
import { useEffect, useState } from "react"
import { userInfo, getProfilePhoto, getCurrentUser, gettingAllPost, getCurrentUserId, gettingUserDetails } from "../Services/firebase";
import { getDownloadURL } from "firebase/storage";

function IdPageHead() {
    const[userDisplayName, setUserDisplayName] = useState();
    const[userId, setUserId] = useState();
    const[url, setURL] = useState();
    const[allPost, setAllPost] = useState([])
    const[userEmail, setUserEmail] = useState();
    const[userViewers, setUserViewers] = useState()
    const y = []

    useEffect(() => {
        const gettingUserInfo = async () => {
            try{
                const user = await userInfo()
                setUserDisplayName(user)
                const useremail = await getCurrentUser()
                setUserEmail(useremail)
                console.log(user)
                const image = await getProfilePhoto(userEmail);
                setURL(image)
                const id = await getCurrentUserId()
                setUserId(id)
                const z = await gettingUserDetails(userId)
                y.push(z)
                setUserViewers(y[0].viewers)
                console.log()
            }
            catch(err){
                console.error(err)
            }
        }

        gettingUserInfo();
    }, )

    const getting = async() => {
        try{
            const result = await gettingAllPost(userEmail)
            const urls = await Promise.all(
                result.map(async (post) => {
                  return await getDownloadURL(post);
                })
            );
    
            setAllPost(urls);
            
        }
        catch(err){
            console.error(err)
        }
    }

    useEffect(() => {
        getting()
    })


    return(
        <>
        <div className="container4">
            <div className="userImageCont">
                <img src={url} className="image"></img>
            </div>
            <div className="userDataCont">
                <div className="userIdCont">
                    <div className="userId">
                        <p>@{userDisplayName}</p>
                        <p id="userfirebaseId">#{userId}</p>
                    </div>
                </div>
                <div className="userProDataCont">
                    <div className="viewersCont">
                        <p className="viewers">Viewers</p>
                        <p className="numViewers">{userViewers}</p>
                    </div>
                    <div className="postCont">
                        <p className="post">Post</p>
                        <p className="numPost">{allPost.length}</p>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default IdPageHead;