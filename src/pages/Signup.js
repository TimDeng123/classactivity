import{useState,useEffect} from 'react'
import { Navigate } from 'react-router-dom'
import { useNavigate,Link } from 'react-router-dom'
export function Signup(props){
    const [email, setEmail]= useState('')
    const [password,setPassword]= useState('')
    const [validEmail, setValidEmail]=useState(false)
    const [validPassword, setValidPassword]=useState(false)
    const [error, setError]= useState();
    const [success, setSuccess]=useState(false)

    useEffect(()=> {
        //check the value of email
        //check if email contain @ and it's not the first character
        if(email.length >=5 && email.indexOf('@')>0){
            setValidEmail(true)
        }else{
            setValidEmail(false)
        }
    },[email])
    
    useEffect(()=> {
        if(password.length >= 8 ){
            setValidPassword(true)
        }else{
            setValidPassword(false)
        }

    },[password])

    useEffect(()=>{
        if(success){
            navigate('/')
        }
    },[success])

    const submitHandler = (event)=>{
        //stop the form from refresh the page
        event.preventDefault()
        //reset error message
        setError(null)
      
       //capture date from form
       const data = new FormData(event.target)
       props.handler(data.get("useremail"),data.get("userpw"))
       .then(()=> setSuccess(true))
       .catch((error)=> {
       //console.log(error)
       handleErrors(error.code)
       }
       )
    }

    const handleErrors = (code)=>{
        //turn firebase error into plain error message for users
        if("auth/email-already-in-use"){
            setError("This email is already in used")
        }

    }

    const navigate = useNavigate();

    //if( success === false){
        return (
            <div className="container">
                <div className="row">
    
                    <form className="col-md-4 offset-md-4" onSubmit={ submitHandler }>
    
                        <h2>Sign up for an account</h2>
                        <div className = "mb-3">
                            <label htmlFor = "useremail">Email</label>
                            <input 
                                type ="email" 
                                id="useremail" 
                                name="useremail"
                                placeholder="you@domain.com" 
                                className="form-control"
                                value={email}
                                onChange={(event) => setEmail(event.target.value) }
                            />
                        </div>
                                    
                        <div className = "mb-3">
                            <label htmlFor = "userepw">Password(minmum 8 characters)</label>
                            <input 
                                type ="password" 
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
                            disabled = {(validEmail && validPassword)? false : true}
                            >Sign up
                            </button>
                            <div>{error}</div>
                        </div>
    
                    </form>
                </div>
                <div className= "row">
                    <div className="col text-center">
                        <Link className = "btn btn-link" to = "/signin">Already have a account</Link> </div>
                </div>
            </div>
    
            
        )
    //}else{
    //    <Navigate to="/" />
    //}

    

}