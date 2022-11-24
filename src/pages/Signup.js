import{useState,useEffect} from 'react'
export function Signup(props){
    const [email, setEmail]= useState('')
    const [password,setPassword]= useState('')
    const [validEmail, setValidEmail]=useState(false)
    const [validPassword, setValidPassword]=useState(false)

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

    return (
        <div className="container">
            <div className="row">
                <form className="col-md-4 offset-md-4">

                    <h2>Sign up for an account</h2>
                    <div className = "mb-3">
                        <label htmlFor = "useremail">Email</label>
                        <input 
                            type ="email" 
                            id="useremail" 
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
                    </div>

                </form>
            </div>
        </div>

        
    )

}