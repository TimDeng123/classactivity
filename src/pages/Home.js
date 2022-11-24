import { useState, useEffect } from "react"
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
                        <div className="card-body">
                            <h5 className="card-title">
                                {item.Title}
                            </h5>
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
