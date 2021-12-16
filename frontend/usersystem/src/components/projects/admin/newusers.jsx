import * as React from "react";
import {  useNavigate } from "react-router-dom";
import axios from "axios";
import TheNavBar from "./navbar";
import { useState, useEffect } from "react";

export default function TheUsers(){
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();
    
    
    useEffect(async ()=>{
        setMessage('Fetching users...')
        try {
            let response = await axios.get(`http://localhost:5000/admin/get_all_users`, 
            {
                headers:{
                    'Authorization': `Bearer ${localStorage.getItem('admin-token')}`,
                },
            });
            setUsers(response.data.users);
            setMessage(null);
        } catch (error) {
            setMessage('Something went wrong. Try again later.');
        }
    }, [])

    function assignUserProject(user){
        // console.log({user});
        navigate('/admin/assign_user_project', {state: {
            user : user
        }});
    }

    function assignUserTask(user){
        navigate('/admin/assign_user_task', {state:{
            user: user,
        }});
    }

    return (
        <React.Fragment>
            <TheNavBar active={1} />
            <label>Users ({users.length})</label>
            {
                message && 
                <div className="alert alert-warning fade in alert-dismissible show">
                    {message}
                </div>
            }
            <table className="table table table-dark" style={{margin: "3%", width: "95%"}} >
                <thead>
                    <tr>
                    <th scope="col">
                        #
                    </th>
                    <th scope="col">
                        Username
                    </th>
                    <th scope="col">
                        Email address
                    </th>
                    <th scope="col">
                        Phone number
                    </th>
                    <th>
                        Project
                    </th>
                    <th scope="col">
                        Actions
                    </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((item, index)=>{
                            return (
                                <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone_number}</td>
                                    <td>{item.project_id === -1 ? "Not assigned" : item.project_name }</td>
                                    <td>
                                        <button className="btn btn-primary btn-sm mr-3 mb-3"
                                        disabled={item.project_id !== -1}
                                        onClick={()=>assignUserProject(item)}
                                         >Assign project</button>
                                        <button className="btn btn-primary btn-sm mr-3 mb-3" 
                                        disabled={item.project_id === -1}
                                        onClick={()=>assignUserTask(item)}
                                        >Assign task</button>
                                        <button className="btn btn-danger btn-sm mr-3 mb-3" >Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    
                </tbody>
            </table>
        </React.Fragment>
    );
}