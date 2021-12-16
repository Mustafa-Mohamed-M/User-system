import React from "react";
import TheNavBar from "./navbar";
import { useEffect } from "react";
import { useState } from "react";
import {  useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function AssignUserProject(){

    const {state} = useLocation();
    const navigate = useNavigate();

    const [projects, setProjects] = useState([]);
    const [message, setMessage] = useState(null);
    const[selectedProject, setSelectedProject] = useState(null);

    async function assignProject( ){
        if (selectedProject === null){
            setMessage('Please select a project')
        }
        else{
            setMessage(null);
            try {
                let response = await axios.post(
                    `http://localhost:5001/projects/assign_user_project`,
                    {
                        project: selectedProject,
                        user: state.user.id,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("admin-token")}`,
                        },
                    }
                );
                navigate('/admin/users');
            } catch (error) {
                console.log(error.response);
                setMessage('Something went wrong. Try again later.');
            }
        }
    }

    async function getProjectsWithoutUsers(){
        try{
            setMessage('Fetching open projects...');
            let response = await axios.get(
                `http://localhost:5001/projects/get_all_projects`,
                {
                    headers: {
                    Authorization: `Bearer ${localStorage.getItem("admin-token")}`,
                    },
                }
            );
            let theProjects = response.data.projects;
            
            const unassigned = theProjects.filter((element, index)=>{
                return element.assigned === 'Not assigned';
            });
            // console.log(theProjects);
            setProjects(unassigned);
            setMessage(null);
        } catch (error){
            setMessage('An error occurred.');
        }
    }

    useEffect(async ()=>{
        
        if (state.user){
            let user_id = state.user.id;
            if (user_id){
                //ensure user does not have a project already
                try{
                    setMessage('Checking if user has a project...');
                    let response = await axios.post(
                        `http://localhost:5001/projects/get_user_project`,
                        {},
                        {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem("admin-token")}`,
                            }
                        }
                    )
                    let project = {};
                    if (response.data.project){
                        project = response.data.project;
                    }
                    if (project.name) {
                        setMessage(`User already has a project: ${project.name}`);
                    }
                    else{
                        getProjectsWithoutUsers();
                    }
                } catch (error){
                    console.log(error);
                    setMessage('An error occurred. Please try again later.');
                }
            }
            else{
                navigate('/admin/users');
            }
        }
        else{
            navigate('/admin/users');
        }
    }, []);


    let theProjects = projects.map((item)=>{
        return (
            <div className="custom-control custom-radio" key={item.id}>
                <input className="custom-control-input" id={item.id} type="radio" name="customRadio" 
                    onChange={()=>setSelectedProject(item.id)}
                 />
                <label className="custom-control-label" htmlFor={item.id}>{item.name}</label>
            </div>
        )
    })

    return (
        <React.Fragment>
            <TheNavBar />
            <div className="container" >
                <label>Assign user "{state.user.username}" a project</label>
                {
                    message && 
                    <div className="alert alert-warning fade in show" >
                        {message}
                    </div>
                }
                <br/>
                <label>Select project </label>
                <div >
                    {theProjects}
                </div>
                <button className="btn btn-success mb-3 mr-3" style={{marginTop: "5px"}} 
                onClick={()=>assignProject()}
                 >Save</button>
            </div>
        </React.Fragment>
    )
}