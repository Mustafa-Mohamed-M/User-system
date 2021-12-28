import * as React from "react";
import TheNavBar from "./navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";

export default function ProjectsHome(){


    const [modalOpen, setModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState(null);
    const [modalMessage, setModalMessage] = useState(null);
    const [projects, setProjects] = useState([]);
    const [projectCount, setProjectCount] = useState(0); //the total number of the projects (not necessarily the same as the number of projects displayed)
    const [rowCount, setRowCount] = useState(3); //the number of rows to fetch at a time
    const [currentPage, setCurrentPage] = useState(1);//the current page in the pagination list

    const navigate = useNavigate();

    async function getProjects(){
        try{
            setMessage('Fetching projects...');
            //without pagination
            let url = `http://localhost:5001/projects/get_all_projects`;
            //with pagination
            url = `http://localhost:5001/projects/get_all_projects_paginated?page=${currentPage}&limit=${rowCount}`;
            let response = await axios.get(
                url,    
                {
                    headers: {
                    Authorization: `Bearer ${localStorage.getItem("admin-token")}`,
                    },
                }
            );
            let theProjects = response.data.projects;
            setProjectCount(response.data.totalProjects)
            setProjects(theProjects.map((item, index)=>{
                return {
                    id: item.id,
                    name: item.name,
                    number: index + 1,
                    description: item.description,
                    tasks: item.tasks,
                    email: item.email,
                    actions: 
                    <React.Fragment>
                        <button className="btn btn-primary btn-sm mr-3 mb-3" 
                            onClick={()=>viewTasks(item)}
                            >View tasks</button>
                        <button className="btn btn-primary btn-sm mr-3 mb-3" 
                            >Edit project</button>
                        <button className="btn btn-danger btn-sm mr-3 mb-3" >Delete</button>
                    </React.Fragment>
                };
                
            }));
            setMessage(null);
            
        } catch (error){
            if (error.response && error.response.status === 401){
                //navigate to login page
                navigate('/admin/login');
            }
            else{
                setMessage('An error occurred. Please come back later.');    
            }
        }
    }

    function toggleModal(){
        setModalOpen(false);
    }

    //get the projects after page has rendered
    useEffect(()=>{
        //if there is no token set, go to login page
        if (!localStorage.getItem("admin-token")) {
            navigate("/admin/login");
        }
        else{
            getProjects();
        }
    }, []);

    //get the projects when the row count changes
    useEffect(()=>{
        //start over from page 1
        setCurrentPage(1);
        getProjects();
    }, [rowCount]);

    //get the projects when the current page changes
    useEffect(()=>{
        getProjects();
    }, [currentPage]);

    function addProject(){
        navigate("/admin/new_project");
    }

    function viewTasks(project){
        navigate("/admin/project_tasks", {
            state: {
                project
            }
        });
    }

    //show a page from the pagination pages
    function goToPage(event, page){
        event.preventDefault();
        setCurrentPage(page); //a useEffect gets the projects automatically when the page changes
    }

    //called from modal dialog to save project
    async function saveProject(){
        if (name === ''){
            setModalMessage('Enter project name');
        }
        else{
            setModalMessage('Saving project')
            try {
                let response = await axios.post(
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
                getProjects(); //refreshes the project list
                //navigate to the last page so that the newly added project is immediately visible
                setCurrentPage(projectCount / rowCount);
                toggleModal(); //closes the modal dialog
                // navigate('/admin');
            } catch (error) {
                console.log(error);
                console.log(error.response);
                setModalMessage('Something went wrong. Please try again later');
            }
        }
    }

    //determine the number of page numbers to show in the pagination area
    let pageLinks = [];

    for (let i = 0; i < projectCount / rowCount; i++){
        pageLinks.push(<li className="page-item" key={i} >
            <button className="page-link" onClick={(evt)=>goToPage(evt, i + 1)} >
                {i + 1}
            </button>
        </li>)
    }

    //set the title of the page to something appropriate
    document.title = 'Usersystem Admin | Projects';
    
    return (
        <React.Fragment>
        <TheNavBar active={2} />

        <Modal className="text-dark" show={modalOpen} onHide={toggleModal} centered>
            <Modal.Header >
                <Modal.Title>Add Project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="alert alert-primary show">
                    {modalMessage === null ? "Enter project name and description" : modalMessage}
                </div>
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
            </Modal.Body>
        </Modal>

        <div className="container">

            <div className="alert alert-primary show" >
                {message === null ? "You are now on the projects page" : message}
            </div>        

            <h4 style={{display: "inline"}} >Usersystem: Available Projects ({projectCount})</h4>
            <button 
            onClick={()=>setModalOpen(true)}
            className="btn btn-primary btn-sm mt-2 mr-3 mb-3" style={{marginLeft: "5px"}} >Add project</button>
            <table className="table table-hover table-dark" >
                <thead>
                    <tr>
                        <th>Project name</th>
                        <th>Description</th>
                        <th>Tasks</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        projects.map((item)=>{
                            return <tr key={item.id} >
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{item.tasks}</td>
                                <td>{item.actions}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
            <table className="table table-dark">
                <tbody>
                    <tr>
                        <td style={{width: "20%"}} >
                            <select className="form-control" onChange={(evt)=>setRowCount(parseInt(evt.target.value))}>
                                <option>3</option>
                                <option>10</option>
                                <option>30</option>
                            </select>
                        </td>
                        <td>
                            <div className="d-flex ">
                                <nav aria-label="Pagination">
                                    <ul className="pagination">
                                        <li className="page-item ">
                                            <button className="page-link" href="#">Previous
                                            </button>
                                        </li>
                                        {pageLinks}
                                        <li className="page-item ">
                                            <button className="page-link" href="#">Next
                                            </button>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        </React.Fragment>
    );
}