import React from "react";
import TheNavBar from "./navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";



export default function AddProject(){

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState(null);

    const navigate = useNavigate();


    async function saveProject(){
        if (name === ''){
            setMessage('Enter project name');
        }
        else{
            setMessage('Saving project...');
            try {
                await axios.post(
                    `http://localhost:5001/projects/save_project`,
                    {
                        name: name,
                        description: description,
                    },
                    {
                        headers: {
                        Authorization: `Bearer ${localStorage.getItem("admin-token")}`,
                        },
                    }
                );
                navigate('/admin');
            } catch (error) {
                console.log(error);
                console.log(error.response);
                setMessage('Something went wrong. Please try again later');
            }
        }
    }

    return (
        <React.Fragment>
            <TheNavBar />
            {
                message && 
                <div className="alert alert-warning fade in show" >
                    {message}
                </div>
            }
            <div className="bg-white text-dark border rounded-sm p-4 mb-3">
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                    <span className="input-group-text" id="form-5-at">
                        Project name
                    </span>
                    </div>
                    <input onChange={(evt)=>setName(evt.target.value)}
                    className="form-control" type="text" placeholder="Project name" aria-label="Project name" aria-describedby="form-5-at" />
                </div>

                <div className="input-group">
                    <div className="input-group-prepend">
                    <span className="input-group-text">
                        Description
                    </span>
                    </div>
                    <textarea 
                    onChange={(evt)=>setDescription(evt.target.value)}
                    className="form-control" aria-label="Description" rows="3">
                    </textarea>
                </div>

                <button className="btn btn-primary mr-3 mb-3" onClick={()=>saveProject()} >Save project</button>
            </div>
        </React.Fragment>
    );
}