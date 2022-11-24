import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

export function Home(props) {
    const [pageData, setPageData] = useState([])

    useEffect(() => {
        setPageData(props.listData)

    }, [props.listData])
    if (pageData.length >0) {


        const itemCollection = pageData.map((item) => {
            return (
                <div className="col-md-4">                 
                    <div className="card">
                         <Image urlgetter = {props.imageGetter} imgPath={"bookcovers/" + item.Cover}/>    
                        <div className="card-body">
                            <h5 className="card-title">
                                {item.Title}
                            </h5>
                            <Link to={"/book/"+ item.id}>Detail</Link>
                        </div>
                    </div>
                </div>
            )

        })
        return (
            <div className="Home">
                <h1>Home</h1>
                <div className="container">
                    <div className="row">
                        {itemCollection}
                    </div>
                </div>
            </div>


        )
    }else{
        return null
    }

}

function Image(props){
    const [imageURL,setImageURL]= useState()

    useEffect(()=>{
        if (!imageURL){
           props.urlgetter(props.imgPath) 
           .then((url)=> setImageURL(url))
           .catch((error) => console.log(error))
        }
        
    })

    if (imageURL){
    return (
            <img src={imageURL} className="Card-img-top " alt={props.title}/>

        )

    }else{
        return (<div> loading....</div>)
    }
   
}