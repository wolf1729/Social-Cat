import { useNavigate } from "react-router-dom";
import "../Style/SearchResultHead.css"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { addingViewer, getCurrentUserId, gettingSearchUserDetails, updateTotalViewers } from "../Services/firebase";

function SearchResultHead() {
    const navigate = useNavigate()
    const { userId } = useParams()
    const[loggedInId, setLoggedInId] = useState()
    const[viewersNumber, setViewersNumber] = useState()
    const y = []

    useEffect(() => {
        const gettingBasicDetails = async() => {
            try{
                setLoggedInId(await getCurrentUserId())
                const z = await gettingSearchUserDetails(userId)
                y.push(z)
                setViewersNumber(y[0].viewers)
            }
            catch(err){
                console.log(err)
            }
        }

        gettingBasicDetails()
    })

    const addingViewerFunction = async() => {
        try{
            await addingViewer(loggedInId, userId, viewersNumber)
            let updatedViewer = viewersNumber
            updatedViewer++
            await updateTotalViewers(userId, updatedViewer)
            console.log("added")
        }
        catch(err){
            console.log(err)
        }
    }

    const returnFunction = () => {
        navigate("/userMainPage")
    }

    return (
        <>
        <div className="headButtonCont">
            <button type="button" className="backButton" onClick={returnFunction}>&#8592;</button>
            <button className="followButton" onClick={addingViewerFunction}>follow</button>
        </div>
        </>
    )
}

export default SearchResultHead;