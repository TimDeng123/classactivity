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
               
            })
        }
    })
  
    if(bookData){


    
    return (
        <div className="Container my-4">
            <div className="row">
                <div className="col">
                    <h2>{bookData.Title}</h2>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <h2>{BooksId}</h2>
                <h3>book cover image</h3>
                </div>    
                <div className="col">
                    <h3>ISBN</h3>
                    <h3>summary</h3>
                    <botton className="btn btn-info">Add to Favouries</botton>
                    <botton className="btn btn-info">review this book</botton>
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