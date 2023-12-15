import { getCurrentUser, gettingAllPost } from "../Services/firebase"
import { useState, useEffect } from "react"
import { getDownloadURL } from "firebase/storage";
import "../Style/Post.css"

function PostComp() {
    const[userEmail, setUserEmail] = useState();
    const[allPost, setAllPost] = useState([])
    

    useEffect(() => {
        const currentuser = async() => {
            try{
                const useremail = await getCurrentUser();
                setUserEmail(useremail)
            }
            catch(err){
                console.log(err)
            }
        }

        currentuser();
    })

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
        <div className="individualpostCont">
            { allPost.map((e) => <div className="postback" key={e}><img src={e} key={e} className="postss"/></div>)}
        </div>
        </>
    )
}

export default PostComp;