import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React from "react";


export default function Signup(){

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);


    async function signUp(event){
        event.preventDefault();
        if (email === '' || username === ''){
            setMessage('Please enter username and email address');
        }
        else if (password.trim() === ''){
            setMessage('Please provide a password');
        }
        else if (password !== confirm){
            setMessage('The two passwords do not match.');
        }
        else{
            setMessage('Just a moment.');
            setLoading(true);
            try {
                const body = {
                    username,
                    email,
                    password,
                    phone_number: phoneNumber,
                }
                const response = await axios.post(`http://localhost:5000/auth/signup`, body);
                setMessage('Registration successful. Redirecting...');
                navigate('/login');
            } 
            catch (error) {
                console.log({error});
                let mess = 'Something went wrong. That\'s all we know.'
                if (error.response){
                    mess = error.response.data;
                    if (error.response.status === 500) mess = "Please try a different username-email combination."
                }
                setLoading(false);
                setMessage(`${mess}`);
            }
        }
    }

    return (
        <React.Fragment>
            <div className='container mt-5'>
                <div className='row d-flex justify-content-center' >
                    <div className='col-lg-5' >
                        <div className="bg-white text-dark border rounded-sm p-4 mb-3" >
                                <form>
                                    
                                    <div className="form-group col" >
                                        <label htmlFor="username" >Username</label>
                                        <input className="form-control" id="username" type="text" 
                                            placeholder="Username" onChange={(evt)=>setUsername(evt.target.value)}  ></input>
                                    </div>
                                    <div className="form-group col" >
                                        <label htmlFor="email" >Email</label>
                                        <input className="form-control" id="email" type="email" 
                                            onChange={(evt)=>setEmail(evt.target.value)}
                                            placeholder="Email" ></input>
                                    </div>
                                    <div className="form-group col" >
                                        <label htmlFor="phone" >Phone number</label>
                                        <input className="form-control" id="phone" type="text" 
                                            onChange={(evt)=>setPhoneNumber(evt.target.value)}
                                            placeholder="Phone number" ></input>
                                    </div>
                                    <div className="form-group col" >
                                        <label htmlFor="password" >Password</label>
                                        <input className="form-control" id="password" 
                                            onChange={(evt)=>setPassword(evt.target.value)}
                                            type="password" placeholder="Password" ></input>
                                    </div>
                                    <div className="form-group col" >
                                        <label htmlFor="confirmPassword" >Password (again)</label>
                                        <input className="form-control" id="confirmPassword" 
                                            onChange={(evt)=>setConfirm(evt.target.value)}
                                            type="password" placeholder="Password (again)" ></input>
                                    </div>
                                    {
                                        message && <div className="alert alert-sm alert-info show">
                                            {message}
                                        </div>
                                    }
                                    
                                    <button disabled={loading} onClick={()=>navigate('/login')}  className="btn btn-secondary" >Login instead</button>
                                    <button disabled={loading} className="btn btn-primary ml-5" type="submit" 
                                        onClick={(evt)=>signUp(evt)} >Sign up</button>
                                </form>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
};