import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

export function Detail(props) {
    const [bookData, setBookData] = useState()
    const [bookReviews, setBookReviews] = useState([])
    let { BooksId } = useParams()

    useEffect(() => {
        if (!bookData) {
            props.getter("Books", BooksId)
                .then((data) => {
                    setBookData(data)
                    //get review
                    let reviews = props.getReviews(BooksId)
                    setBookReviews(reviews)
                        
                })
        }
    })

    const reviewSubmitHandler = (event) =>{
       event.preventDefault()
       const data = new FormData( event.target)
       
        props.addReview(data.get("BooksId"), data.get("reviewtext"), data.get("userId"))
       // .then ((res) => console.log(res))
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
                                <textarea cols="5" rows="5" name="reviewtext" className="form-control" placeholder="Say something here..."></textarea>
                                <input type = "hidden" name = "userId" value={props.auth.uid}></input>
                                <input type = "hidden" name = "BooksId" value = {BooksId} />
                                <button className="btn btn-info my-2 ">review this book</button>
                            </form>
                        </div>

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
            <img src={imgUrl} style={{ width: "100%" }} alt="book cover" />
        )
    } else {
        return <p>loading...</p>

    }
}