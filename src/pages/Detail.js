import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import {Reviews} from "../components/Reviews"

export function Detail(props) {
    const [bookData, setBookData] = useState()
    const [bookReviews, setBookReviews] = useState([])
    const [userHasReview, setUserHasReview] = useState(false)
 
    let { BooksId } = useParams()
   // props.resetReviews()
    useEffect(() => {
        if (!bookData) {
            props.getter("Books", BooksId)
                .then((data) => {
                    setBookData(data)
                  
                })
        }
    })

    useEffect(()=> {
        if(bookReviews.length == 0){
            props.getReviews(BooksId)

        }
    },[bookData])

    useEffect(()=>{
        setBookReviews(props.reviews)
    },[props.reviews])

    useEffect (()=>{
        if (props.auth){
           
           if(bookReviews.length > 0){
            let userReview = bookReviews.filter((review)=>{
                if (review.UserId == props.auth.uid){
                    setUserHasReview(true)
                    return review
                }
            })
           }
        }
    },[bookReviews])

    const reviewSubmitHandler = (event) =>{
       event.preventDefault()

       const data = new FormData( event.target)
       
        props.addReview(data.get("BooksId"), data.get("reviewtext"), data.get("userId"))
        .then ((res) => console.log(res))

        event.target.reset()
    }   

    if (bookData) {



        return (
            <div className="Container my-4">
                <div className="row">
                    <div className="col">
                        <h2>{bookData.Title}</h2>
                        <h4>{bookData.Tagline}</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <DetailImage data={bookData} getter={props.imageGetter} />
                    </div>
                    <div className="col">
                        <h4>Author</h4>
                        <p>{bookData.Author}</p>
                        <h5>ISBN 10</h5>
                        <p>{bookData.ISBN10}</p>
                        <h5>ISBN 13</h5>
                        <p>{bookData.ISBN13}</p>
                        <h5>Pages</h5>
                        <p>{bookData.Pages}</p>
                        <h5>Year</h5>
                        <p>{bookData.Year}</p>
                        <div style={(props.auth) ? { display: "block" } : { display: "none" }}>
                            {/* <botton className="btn btn-info">Add to Favouries</botton> */}

                            <form method = "post" onSubmit={reviewSubmitHandler}>
                                <label className="form-lable"><h5>Write a review</h5></label>
                                <textarea  rows="4" cols="30" name="reviewtext" className="form-control" placeholder="Say something here..."></textarea>
                                <input type = "hidden" name = "userId" value={(props.auth)? props.auth.uid : ""}></input>
                                <input type = "hidden" name = "BooksId" value = {BooksId} />
                                <button 
                                className="btn btn-info my-2 "
                                disabled = {(userHasReview)? true : false}
                                >review this book
                                </button>
                                <div className = "alert alert-warning" role = "alert" style = {{display: (userHasReview)? "block" : "none"}}>
                                    You can only have one review for each book
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Reviews reviews={bookReviews}/>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="container my-4">

            </div>
        )
    }
}

function DetailImage(props) {
    const [imgUrl, setImageUrl] = useState()

    useEffect(() => {
        if (props.data) {
            props.getter("bookcovers/" + props.data.Cover)
                .then((url) => setImageUrl(url))
        }

    }, [props.data])

    if (imgUrl) {
        return (
            <img src={imgUrl} style={{ width: "40%" }} alt="book cover" />
        )
    } else {
        return <p>loading...</p>

    }
}

