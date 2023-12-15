import { useEffect, useState } from "react"
import "../Style/SearchResultIdDetails.css"
import { useParams } from "react-router-dom";
import { gettingSearchUserDetails, getProfilePhoto, gettingAllPost } from "../Services/firebase";
import { getDownloadURL } from "firebase/storage";

function SearchResultIdDetail() {
    const { userId } = useParams()
    const[searchUserDisplayName, setSearchUserDisplayName] = useState()
    const[searchUserTotalPost, setSearchUserTotalPost] = useState([])
    const[searchUserDisplayImg, setSearchUserDisplayImg] = useState();
    const[searchUserEmail, setSearchUserEmail] = useState();
    const[searchUserViewers, setSearchUserViewers] = useState()
    const y = []

    useEffect(() => {
        const gettingData = async (searchUser) => {
            try{
                const z = await gettingSearchUserDetails(searchUser)
                y.push(z)
                setSearchUserEmail(y[0].id)
                setSearchUserDisplayName(y[0].username)
                setSearchUserViewers(y[0].viewers)
                const image = await getProfilePhoto(searchUserEmail);
                setSearchUserDisplayImg(image)
            }
            catch(err){
                console.log(err)
            }
        }

        gettingData(userId)
    })

    const getting = async() => {
        try{
            const result = await gettingAllPost(searchUserEmail)
            const urls = await Promise.all(
                result.map(async (post) => {
                  return await getDownloadURL(post);
                })
            );
    
            setSearchUserTotalPost(urls);
            
        }
        catch(err){
            console.error(err)
        }
    }

    useEffect(() => {
        getting()
    })

    return (
        <>
        <div className="container4">
            <div className="userImageCont">
                <img src={searchUserDisplayImg} className="image"></img>
            </div>
            <div className="userDataCont">
                <div className="userIdCont">
                    <p className="userId">@{searchUserDisplayName}</p>
                </div>
                <div className="userProDataCont">
                    <div className="viewersCont">
                        <p className="viewers">Viewers</p>
                        <p className="numViewers">{searchUserViewers}</p>
                    </div>
                    <div className="postCont">
                        <p className="post">Post</p>
                        <p className="numPost">{searchUserTotalPost.length}</p>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default SearchResultIdDetail