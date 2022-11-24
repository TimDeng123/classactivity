import { useParams } from "react-router-dom"
export function Detail (props){
    let {BooksId} = useParams()

    return (
        <div className="Container my-4">
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
}