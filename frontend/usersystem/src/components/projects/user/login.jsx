import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Login(){

    const [email, setEmail] = useState('');
    const [password, setPassword ] = useState('');

    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    async function validateLogin(event){
        event.preventDefault();
        if (email === ''){
            setMessage('Please enter email address');
        }
        else{
            setLoading(false);
            try {
                let result = await axios.post(`http://localhost:5000/auth/login`, {
                    email: email ,
                    password: password,
                });
                if (result.status === 200){
                    const {token, username, email} = result.data;
                    localStorage.setItem('token', token);
                    localStorage.setItem('email', email);
                    localStorage.setItem('username', username);
                    navigate('/');
                }
                else{
                    setMessage('Unable to login. Please try again in a few moments.');
                }
            } catch (err) {
                setMessage(`Failed: ${err.response.data}`);
            }
        }
    }


    return <React.Fragment>
        
            <div className='container mt-5'>
                <div className='row d-flex justify-content-center' >
                    <div className='col-lg-5' >
                        <div className="bg-white text-dark border rounded-sm p-4 mb-3" >
                            <form>
                                <label className='form-text' >Welcome back. Please login to continue</label>
                                <div className='form-group' >
                                    <label htmlFor='email' >Email address</label>
                                    <input onChange={(event)=>setEmail(event.target.value)} className='form-control' type="email" placeholder='Enter email address' id='email' />
                                </div>
                                <div className='form-group' >
                                    <label htmlFor='password' >Password</label>
                                    <input  onChange={(evt)=>setPassword(evt.target.value)} className='form-control' type="password" placeholder='Enter password' id='password' />
                                </div>
                                {message && <div className="alert alert-sm alert-warning show" >
                                    {message}
                                    </div>}
                                <button className='btn btn-info ml-5 ' onClick={()=>navigate('/signup')} >Create an account</button>
                                <button disabled={loading} onClick={(evt)=>validateLogin(evt)} className='btn btn-primary ml-5' type='submit'>Login</button>
                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        
        
    </React.Fragment>
};