import * as React from "react";
import {  useNavigate } from "react-router-dom";
import axios from "axios";
import TheNavBar from "./navbar";
import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";

export default function TheUsers(){
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState(null);
    const [isOpenAssignProject, setIsOpenAssignProject] = useState(false);
    const [currentUser, setCurrentUser] = useState(null); //used in the modal dialog for assigning a user
    const [openProjects, setOpenProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const navigate = useNavigate();
    
    //get the projects that have no users yet.
    async function getOpenProjects(){
        try{
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
            setOpenProjects(unassigned);
            // setMessage(null);
        } catch (error){
            setMessage('An error occurred.');
        }
    }

    async function getAllUsers(){
        setMessage('Fetching users.');
        try {
            let response = await axios.get(`http://localhost:5000/admin/get_all_users`, 
            {
                headers:{
                    'Authorization': `Bearer ${localStorage.getItem('admin-token')}`,
                },
            });
            setUsers(response.data.users);
            setMessage(null);
            return true;
        } catch (error) {
            if (error.response && error.response.status === 401){
                navigate('/admin/login');
            }
            else{
                setMessage('Something went wrong. Try again later.');    
            }
            return false;
        }
    }
    

    async function assignProject( ){
        // console.log({selectedProject, currentUser});
        if (selectedProject === null){
            setMessage('Please select a project')
        }
        else{
            setMessage(null);
            console.log({selectedProject})
            try {
                let response = await axios.post(
                    `http://localhost:5001/projects/assign_user_project`,
                    {
                        project: selectedProject,
                        user: currentUser.id,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("admin-token")}`,
                        },
                    }
                );

                //get the name of the project from the list of projects
                let project_name = openProjects.find(element =>element.id === parseInt(selectedProject));
                //check if the project was found
                if (project_name) project_name = project_name.name
                else project_name = '';
                //send email to user that he has been assigned project
                axios.post(`http://localhost:5003/email/assigned_project`, {
                    email: currentUser.email,
                    username: currentUser.username,
                    project_name
                }); // no need for await
                setIsOpenAssignProject(false);
                getAllUsers();
                getOpenProjects();
            } catch (error) {
                console.log(error.response);
                setMessage('Something went wrong. Try again later.');
            }
        }
    }

    useEffect(()=>{
        async function init(){
            const success = await getAllUsers();
            if (success){
                getOpenProjects();
            }
        };
        init();
    }, [])

    function assignUserProject(user){
        
        setCurrentUser(user);
        setIsOpenAssignProject(true);
    }

    function hideAssignUserProjectDialog(){
        setIsOpenAssignProject(false);
    }

    function assignUserTask(user){
        navigate('/admin/assign_user_task', {state:{
            user: user,
        }});
    }

    return (
        <React.Fragment>
            <TheNavBar active={1} />

            <Modal className="text-dark" show={isOpenAssignProject} onHide={hideAssignUserProjectDialog} centered >
                <Modal.Header>
                    <Modal.Title>Assign Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>Select project</label>
                    <select className="form-control" 
                            onChange={(evt)=>setSelectedProject(evt.target.value)} >
                        <option hidden disabled selected value> -- Select project -- </option>
                        {
                            openProjects.map((item, index)=>{
                                return <option key={item.id} value={item.id} >{item.name}</option>
                            })
                        }
                    </select>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary" onClick={()=>assignProject()} >Save</button>
                    <button className="btn btn-secondary ml-2" onClick={()=>hideAssignUserProjectDialog()} >Cancel</button>
                </Modal.Footer>
            </Modal>
            <div className="container" >
                <h4>Users</h4>
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
                                        
                                        <button className="btn btn-danger btn-sm mr-3 mb-3" >Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            </div>
        </React.Fragment>
    );
}