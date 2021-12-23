import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';


export default function UserHome(){

    const [message, setMessage] = useState();
    const [project, setProject] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [rowCount, setRowCount] = useState(3);
    const [numTasks, setNumTasks] = useState(0);

    const columns = [
        {dataField: 'number', text: '#'},
        {dataField: 'name', text: 'Task name'},
        {dataField: 'description', text: 'Description'},
        {dataField: 'completed', text: 'Completed'}
    ];


    const navigate = useNavigate();

    function logOut(event){
        event.preventDefault();
        localStorage.removeItem('token');
        navigate('/login');
    }

    async function rowCountChanged(value){
        setRowCount(parseInt(value));
        setCurrentPage(1); //start over since the number of rows has changed
        //getUserTasks(); //refresh the tasks that are being displayed
    }

    async function goToPage(page){
        setCurrentPage(parseInt(page));
    }

    async function getUserTasks(){
        let url = `http://localhost:5001/projects/get_user_tasks`;
        let orderBy = 'id';
        url = 
        `http://localhost:5001/projects/get_user_tasks_paginated?page=${currentPage}&limit=${rowCount}&orderBy=${orderBy}`
        try{
            let result = await axios.get(url,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            
            setTasks(result.data.tasks.map((item, index)=>{
                return {
                    id: item.id,
                    number: index + 1,
                    name: item.name,
                    description: item.description,
                    completed: item.completed ? "Yes" : "No",
                }
            }));
            setNumTasks(result.data.totalTasks);
        } catch (err){
            setMessage(`Something's not right. Please try again later.`);
        }
    }

    async function getProject(){
        try{
            let result = await axios.post(`http://localhost:5001/projects/get_user_project`, 
            {}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            
            let theProject = result.data;
            if (theProject['id']){
                setProject(theProject);
            }
            else{
                setProject(null);
            }
            return true;
        } catch (err){
            console.log('An error occurred.');
            setMessage(err.response ? err.response.data : "An error occurred.");
            return false;
        }
    }

    useEffect( ()=>{

        if (!localStorage.getItem('token')){
            navigate('/login');
        }
        else{
            async function getStuff(){
                let success = await getProject();
                if (success){
                    getUserTasks();
                    setEmail(localStorage.getItem('email'));
                    setUsername(localStorage.getItem('username'));
                }
                else{
                    navigate('/login');
                }    
            };
            getStuff();
            
        }
    }, []);

    useEffect(()=>{
        getUserTasks();
    }, [rowCount, currentPage])


    //get the number of pages needed
    let numPages = 0;
    if (numTasks > 0){
        numPages = parseInt(numTasks / rowCount) + 1;
    }

    let pageLinks = [];
    for (let i = 0; i < numPages; i++){
        pageLinks.push(<li key={i} className="page-item"><a className="page-link" href="#" onClick={(evt)=>goToPage(i + 1)} >{i + 1}</a></li>);
    }

    return <React.Fragment>
        <nav id="navbar-0" className="navbar navbar-expand-sm navbar-dark bg-primary mb-3">
            <a className="navbar-brand" href="#">User system</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-0" aria-controls="navbar-0" aria-expanded="false" aria-label="Toggle Navigation">
                <span className="navbar-toggler-icon">
                </span>
            </button>
            <div className="collapse navbar-collapse" id="navbar-0">
                <div className="navbar-nav ml-auto">
                    <a className="nav-item nav-link" href="#" >
                        Logged in as {username}
                    </a>
                </div>
            </div>
            <div className="collapse navbar-collapse" id="navbar-0">
                <div className="navbar-nav ml-auto">
                    <a className="nav-item nav-link" href="#" onClick={(evt)=>logOut(evt)}>
                        Logout
                    </a>
                </div>
            </div>
        </nav>
        <div className="container" >
            <div className="row" >
                <div className="col-1" ></div>
                <div className="col-10" >
                    {
                        project === null ? 
                        
                            <div className="card text-dark mt-3" >
                                <div className="card-header" >
                                    No Project. Yet.
                                </div>
                                <div className="card-body" >
                                    <div className="card-title" >Breathe!</div>
                                    <div className="card-text" >
                                        You have not been assigned a project yet.
                                        However, we are working to find you something to do.
                                    </div>
                                    <div className="card-footer">
                                        <button className="btn btn-primary" >Refresh this page</button>
                                        <button className="btn btn-secondary ml-3" onClick={(evt)=>logOut(evt)} >Log out</button>
                                    </div>
                                </div>
                            </div>
                        
                        : 
                        <div className="alert alert-info alert-sm show" >
                            You have been assigned 1 project.
                            <p>{project.name}</p>
                            <p>{project.description}</p>
                        </div>
                    }
                    {
                        project && 
                        <div>
                            {tasks.length === 0 ? "You have not been assigned any tasks yet." : 
                                "You have been assigned " + numTasks + " task(s)."}
                            <br/>
                            <table className="table table-hover table-dark table-bordered" >
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Task</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Completed</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        tasks.map((item)=>{
                                            return <tr key={item.id} >
                                                <td>{item.number}</td>
                                                <td>{item.name}</td>
                                                <td>{item.description}</td>
                                                <td>{item.completed}</td>
                                            </tr>
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
                                                <a className="page-link" href="#">Previous</a>
                                            </li>
                                            {pageLinks.length > 0 && 
                                                pageLinks.map((item, index)=>{
                                                    return item;
                                                })
                                            }
                                            <li className="page-item" >
                                                <a className="page-link" href="#">Next</a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            }
                        </div>
                    }
                </div>
                <div className="col-1" ></div>
            </div>
        </div>
        
    </React.Fragment>;
}