import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Navigate, useNavigate } from "react-router-dom"

export function Signin(props) {
    
    const [email,setEmail]= useState('')
    const [password, setPassword] = useState('')
    const [success, setSuccess] = useState(false)
    const  navigate = useNavigate()

    useEffect(()=> {
        if(success){
            navigate('/')
        }
    })
    const submitHandler = (event)=>{

        //stop the form from refresh the page
        event.preventDefault()
        //reset error message
        //setError(null)
      
       //capture date from form
       const data = new FormData(event.target)
       props.handler(data.get("useremail"),data.get("userpw"))
       .then(()=> setSuccess(true))
       .catch((error)=> {
       //console.log(error)
       //handleErrors(error.code)
       }
       )
    }
    return (
        <div className="container">
            <div className="row">

                <form className="col-md-4 offset-md-4"  onSubmit={ submitHandler } >

                    <h2>Sign in to your account</h2>
                    <div className="mb-3">
                        <label htmlFor="useremail">Email</label>
                        <input
                            type="email"
                            id="useremail"
                            name="useremail"
                            placeholder="you@domain.com"
                            className="form-control"
                            value={email}
                            onChange={(event) => setEmail(event.target.value) }
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="userepw">Password</label>
                        <input
                            type="password"
                            id="userpw"
                            name="userpw"
                            placeholder="you@domain.com"
                            className="form-control"
                            value={password}
                            onChange={(event)=> setPassword(event.target.value)}

                        />
                    </div>

                    <div className="d-grid">
                        <button
                            type="submit"
                            className="btn btn-primary"

                        >Sign in
                        </button>

                    </div>

                </form>
            </div>
            <div className="row">
                <div className="col text-center">
                    <Link className="btn btn-link" to="/signup">I am new user</Link> </div>
            </div>
        </div>
    )
}