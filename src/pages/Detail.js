import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

export function Detail (props){
    const [bookData, setBookData]= useState()
    
    let {BooksId} = useParams()

    useEffect(()=>{
        if(!bookData){
            props.getter("Books",BooksId)
            .then((data)=>{
                setBookData(data)
               //get image
              
            })
        }
    })
  
    if(bookData){


    
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
                     <DetailImage data = {bookData} getter={props.imageGetter}/>
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
                    <div style = { (props.auth)? { display: "block"} : {display: "none"} }>
                        <botton className="btn btn-info">Add to Favouries</botton>
                        <botton className="btn btn-info">review this book</botton>
                    </div>

                </div>
            </div>
        </div>
    )
}else{
    return (
        <div className="container my-4">

        </div>
    )
}
}

function DetailImage (props){
    const[imgUrl, setImageUrl] = useState()

    useEffect(()=> {
      if(props.data){
        props.getter("bookcovers/"+ props.data.Cover)
        .then ( (url) => setImageUrl(url))
      }

    },[props.data])

    if (imgUrl){
        return (
            <img src= {imgUrl} style={{ width: "100%"}}/>
        )
    }else{
        return <p>loading...</p>
        
    }
}