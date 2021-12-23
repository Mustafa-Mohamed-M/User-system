import * as React from "react";
import TheNavBar from "./navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";

export default function ProjectTasks(){
    const {state} = useLocation();
    const [message, setMessage] = useState();
    const [tasks, setTasks] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [modalMessage, setModalMessage] = useState(null);
    
    const navigate = useNavigate();

    async function getTasks(){
        if (!state || state === null){
            navigate('/admin');
        }
        else{
            try {
                setMessage('Fetching tasks..');
                let response = await axios.get(
                    `http://localhost:5001/projects/get_project_tasks/${state.project.id}`,
                    {
                        headers:{
                            Authorization: `Bearer ${localStorage.getItem("admin-token")}`,
                        },
                    }
                );
                setTasks(response.data);
                setMessage(null);
                
            } catch (error) {
                setMessage('An error occurred.');
            }
        }
    }


    async function assignTaskToUser(task_id){
        if (state.project.user_id === null){
            setMessage('The project has not yet been assigned a user.');
        }
        else{
            setMessage('Just a moment...');
            try{
                let response = await axios.post(
                    `http://localhost:5001/projects/assign_user_task`,
                    {
                        task: task_id,
                        user: state.project.user_id,
                    },
                    {
                        headers:{
                            Authorization: `Bearer ${localStorage.getItem("admin-token")}`,
                        },
                    }
                );
                getTasks();
            }
            catch (err){
                if (err.response){
                    setMessage(`An error occurred: ${err.response.data}`);
                }
                else{
                    setMessage("Something's not right. Please try again later.");
                }
                
            }
            
        }
    }

    async function saveTask(){

        //prevent saving an empty task (no name or description)
        if (name.trim() === '' || description.trim() === ''){
            setModalMessage('Please enter name and description.');
            return;
        }
        try {
            
            let response = await axios.post(
                `http://localhost:5001/projects/save_task`,
                {
                    name: name,
                    description, description,
                    project: state.project.id,
                },
                {
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem("admin-token")}`,
                    },
                }
            );
            setMessage('Task saved successfully.');
            setModalMessage(null);
            setName('');
            setDescription('');
            toggleModal();
            getTasks();
        } catch (error) {
            console.log(error.response);
            // toggleModal();
            // setMessage('An error occurred while saving the task.');
            setModalMessage('An error occurred while saving the task.');
        }
    }

    function toggleModal(){
        setModalMessage(null);
        setIsOpen(!isOpen);
    }

    useEffect(async ()=>{
        if (!localStorage.getItem("admin-token")) {
            navigate("/admin/login");
        }
        else{
            getTasks();
        }
    }, []);

    return (
        <React.Fragment>
        <TheNavBar />

        <Modal className="text-dark" show={isOpen} onHide={toggleModal} centered>
            <Modal.Header >
                <Modal.Title>Add Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {modalMessage && 
                    <div className="alert alert-danger show">
                        {modalMessage}
                    </div>
                }
                <div className="card text-dark mb-3">
                    <div className="card-body" >
                    <div className="card-text " >
                        <form>
                            <div className="form-group" >
                                <label htmlFor="taskName" >Name</label>
                                <input className="form-control" 
                                onChange={(evt)=>setName(evt.target.value)}
                                id="taskName" placeholder="Task name" />
                            </div>
                            <div className="form-group" >
                                <label htmlFor="taskDescription" >Description</label>
                                <textarea className="form-control" 
                                onChange={(evt)=>setDescription(evt.target.value)}
                                id="taskDescription" placeholder="Description"></textarea>
                            </div>
                        </form>
                    </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
            <button className="btn btn-success btn-sm" 
                    onClick={()=>saveTask()}
                        > Save</button>
                    <button className="btn btn-warning btn-sm ml-5"
                    onClick={()=>toggleModal()}
                        >Cancel</button>
            </Modal.Footer>
        </Modal>
        
        
        <div className="container-fluid" id="theContainer" >
            <label>Tasks for project "{state === null ? "" : state.project.name}"</label>
            <button className="btn btn-primary btn-sm ml-5" 
            onClick={()=>toggleModal()}
            >Add task...</button>
            <br/>
            <label>{tasks.length} tasks found</label>
            <br/>
            {message && 
                <div className="alert alert-info show"  >
                    {message}
                </div>
            }
            
            <table className="table table table-dark" id="table"  >
                <thead>
                    <tr>
                    <th scope="col">
                        #
                    </th>
                    <th scope="col">
                        Task name
                    </th>
                    <th scope="col">
                        Task description
                    </th>
                    <th scope="col">
                        User
                    </th>
                    <th scope="col">
                        Actions
                    </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tasks.map((item, index)=>{
                            
                            return (
                                <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>{item.user_id === null? "No user assigned" : item.user_name}</td>
                                    <td>
                                        <button 
                                        disabled={item.user_id !== null}
                                        className="btn btn-primary btn-sm mr-3 mb-3" 
                                        onClick={()=>assignTaskToUser(item.id)}
                                        >Assign user</button>            
                                        <button className="btn btn-danger btn-sm mr-3 mb-3" >Delete</button>            
                                    </td>
                                </tr>
                            );
                        })
                    }
                    
                </tbody>
            </table>
        </div>
        </React.Fragment>
    );
}