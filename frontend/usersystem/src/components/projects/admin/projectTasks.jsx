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
    const [currentPage, setCurrentPage] = useState(1);
    const [rowCount, setRowCount] = useState(3);
    const [numTasks, setNumTasks] = useState(0);
    
    const navigate = useNavigate();

    async function getTasks(){
        if (!state || state === null){
            navigate('/admin');
        }
        else{
            try {
                setMessage('Fetching tasks..');
                let url = `http://localhost:5001/projects/get_project_tasks_paginated/${state.project.id}?page=${currentPage}&limit=${rowCount}`;
                let response = await axios.get(
                    url,
                    {
                        headers:{
                            Authorization: `Bearer ${localStorage.getItem("admin-token")}`,
                        },
                    }
                );
                console.log(response);
                setTasks(response.data.tasks);
                setNumTasks(response.data.totalTasks);
                setMessage(null);
                
            } catch (error) {
                if (error.response){
                    if (error.response.status === 401){
                        navigate('/admin/login')
                    }
                    else{
                        setMessage(`We could not fetch the tasks as requested: ${error.response.data}`);
                    }
                }
                else{
                    setMessage(`We could not fetch the tasks as requested.`);   
                }
                //setMessage(`We could not fetch the tasks as requested: ${error.response.status}`);
            }
        }
    }

    async function rowCountChanged(value){
        setRowCount(parseInt(value));
        setCurrentPage(1);
    }

    async function assignTaskToUser(task){
        if (state.project.user_id === null){
            setMessage('The project has not yet been assigned a user.');
        }
        else{
            setMessage('Just a moment...');
            try{
                let response = await axios.post(
                    `http://localhost:5001/projects/assign_user_task`,
                    {
                        task: task.id,
                        user: state.project.user_id,
                    },
                    {
                        headers:{
                            Authorization: `Bearer ${localStorage.getItem("admin-token")}`,
                        },
                    }
                );
                //send notification email
                const taskName = task.name;
                const username = state.project.assigned;
                const email = state.project.email;
                console.log({taskName, username, email});
                axios.post(`http://localhost:5003/email/assigned_task`, {
                    task_name: taskName,
                    username: username,
                    email: email
                });
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

    async function goToPage(event, page){
        event.preventDefault();
        setCurrentPage(parseInt(page));
    }

    function toggleModal(){
        setModalMessage(null);
        setIsOpen(!isOpen);
    }

    useEffect( ()=>{
        if (!localStorage.getItem("admin-token")) {
            navigate("/admin/login");
        }
        else{
            getTasks();
        }
    }, []);

    useEffect(()=>{
        getTasks();
    }, [currentPage, rowCount]);

    //get the number of pages needed
    let numPages = 0;
    if (numTasks > 0){
        numPages = parseInt(numTasks / rowCount) + 1;
    }

    let pageLinks = [];
    for (let i = 0; i < numPages; i++){
        let theClassName = "page-item"
        if (i + 1 === currentPage){
            theClassName = "page-item active"
        }
        console.log(i + theClassName);
        pageLinks.push(<li key={i} 
            className={'' + theClassName + ''}>
            <a className="page-link" href="#" onClick={(evt)=>goToPage(evt, i + 1)} >{i + 1}</a>
            </li>);
    }

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
        
        
        <div className="container" id="theContainer" >
            <label>Tasks for project "{state === null ? "" : state.project.name}"</label>
            <button className="btn btn-primary btn-sm ml-5" 
            onClick={()=>toggleModal()}
            >Add task...</button>
            <button className="btn btn-primary btn-sm ml-5" 
            onClick={()=>navigate('/admin/')}
             >Back to projects</button>
            <br/>
            <label>{numTasks} tasks found</label>
            <br/>
            {message && 
                <div className="alert alert-info show"  >
                    {message}
                </div>
            }
            
            <table className="table table-hover table-dark" id="table"  >
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
                                        onClick={()=>assignTaskToUser(item)}
                                        >Assign user</button>            
                                        <button className="btn btn-danger btn-sm mr-3 mb-3" >Delete</button>            
                                    </td>
                                </tr>
                            );
                        })
                    }
                    
                </tbody>
            </table>
            {
                numTasks > 0 && 
                <div className="d-flex justify-content-center">
                    <select className="form-control mr-1" 
                    onChange={(evt)=>rowCountChanged(evt.target.value)} >
                        <option value="3" >3</option>
                        <option value="10" >10</option>
                        <option value="30" >30</option>
                    </select>

                    <nav aria-label="Pagination">
                        <ul className="pagination" >
                            <li className="page-item" >
                                <button className="page-link" href="#">Previous</button>
                            </li>
                            {pageLinks.length > 0 && 
                                pageLinks.map((item, index)=>{
                                    return item;
                                })
                            }
                            <li className="page-item" >
                                <button className="page-link" href="#">Next</button>
                            </li>
                        </ul>
                    </nav>
                </div>
            }
        </div>
        </React.Fragment>
    );
}