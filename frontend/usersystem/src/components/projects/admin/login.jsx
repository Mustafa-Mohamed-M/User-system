import * as React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function AdminLogin(){

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [message, setMessage] = React.useState(null);
    const [errorMessage, setErrorMessage] = React.useState(null);

    const navigate = useNavigate();

    async function login(event){
        event.preventDefault();
        if (email === ''){
            setErrorMessage('Please enter email address');
        }
        else{
            setMessage('Validating...');
            try {
                let result = await axios.post(`http://localhost:5000/auth/admin/login`, {
                    email: email ,
                    password: password,
                });
                if (result.status === 200){
                    const {token} = result.data;
                    // setMessage('Success. Redirecting...');
                    localStorage.setItem('admin-token', token);
                    navigate('/admin');
                }
                else{
                    setErrorMessage('Unable to login. Try again later.');
                }
            } catch (err) {
                setErrorMessage(`Failed: ${err.response.data}`);
            }
        }
    }

    return (
        <div className="container" style={{marginTop: "10%"}} >
            <div className="bg-white text-dark border rounded-sm p-4 mb-3">
                <form>
                    {
                        message && 
                        <div className="alert alert-success fade in show">
                        {message}
                      </div>
                    }
                    {
                        errorMessage && 
                        <div className="alert alert-danger fade in  show">
                            
                            {errorMessage}
                        </div>
                    }
                    <div className="form-group">
                    <label htmlFor="form-1-email">
                        Email address
                    </label>
                    <input className="form-control" id="form-1-email" type="email" 
                    aria-describedby="form-1-email-help" placeholder="Enter email" 
                    onChange={(evt)=>setEmail(evt.target.value)}/>
                    <small className="form-text text-muted" id="form-1-email-help">
                        We'll never share your email with anyone else.
                    </small>
                    </div>
                    <div className="form-group">
                    <label htmlFor="form-1-password">
                        Password
                    </label>
                    <input className="form-control" id="form-1-password" type="password" 
                    placeholder="Password" 
                    onChange={(evt)=>setPassword(evt.target.value)}
                    />
                    </div>
                    <button className="btn btn-primary" type="submit" onClick={(event)=>login(event)}>
                        Login
                    </button>
                </form>
            </div>
        </div>
    
    );
}