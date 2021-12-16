import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TheNavBar from "./navbar";


export default function AssignUserTask(){
    const {state} = useLocation();
    const [tasks, setTasks] = useState([]);
    const [message, setMessage] = useState(null);

    useEffect(async()=>{
        //get the tasks for the project
        const user_id = state.user.user_id;
        const project_id = state.user.project_id;
        try {
            setMessage('Fetching tasks...');
            let response = await axios.get(
                `http://localhost:5001/projects/get_project_tasks/${project_id}`,
                {
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem("admin-token")}`,
                    },
                }
            );
            let theTasks = response.data;
            setTasks(theTasks.filter((item, index)=>{
                return !item.user_id;
            }));
            console.log(response);
            setMessage(null);
        } catch (error) {
            setMessage('An error occurred while getting the tasks for the project.');
        }
        
    }, []);

    return (
        <React.Fragment>
            <TheNavBar />
            <div className="container" >
                <label>User {state.user.username} is working on project "{state.user.project_name}"</label>
                <br/>
                {
                    message && 
                    <div className="alert alert-info show" >
                        {message}
                    </div>
                }
                <label>Select the tasks that you want to assigned to {state.user.username}</label>
                <br/>
                {
                    tasks.map((item, index)=>{
                        return (
                            <div className="custom-control custom-checkbox" key={item.id} >
                                <input className="custom-control-input" id={item.id} type="checkbox" />
                                <label htmlFor={item.id} >{item.name}</label>
                            </div>
                        );
                    })
                }
                {
                    tasks.length === 0 && 
                    <div>
                        {"It seems the project does not have any available tasks."}
                    </div>
                }
                <button 
                    disabled={tasks.length === 0}
                 className="btn btn-success btn-sm mb-5 mr-5" >Save</button>
            </div>
        </React.Fragment>
    );
};