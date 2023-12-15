import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { gettingSearchUserDetails, gettingAllPost } from "../Services/firebase"
import { getDownloadURL } from "firebase/storage"
import "../Style/Post.css"

function SearchUserPostComp() {
    const { userId } = useParams()
    const[searchUserPost, setSearchUserPost] = useState([])
    const[searchUserEmail, setSearchUserEmail] = useState()
    const y = []

    useEffect(() => {
        const gettingSearchData = async(searchingUserPost) => {
            try{
                const z = await gettingSearchUserDetails(searchingUserPost);
                y.push(z)
                setSearchUserEmail(y[0].id)
            }
            catch(err){
                console.log(err)
            }
        }

        gettingSearchData(userId)
    })

    const getting = async() => {
        try{
            const result = await gettingAllPost(searchUserEmail)
            const urls = await Promise.all(
                result.map(async (post) => {
                  return await getDownloadURL(post);
                })
            );
    
            setSearchUserPost(urls);
            
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
        <div className="individualpostCont">
            { searchUserPost.map((e) => <div className="postback" key={e}><img src={e} key={e} className="postss"/></div>)}
        </div>
        </>
    )
}

export default SearchUserPostComp